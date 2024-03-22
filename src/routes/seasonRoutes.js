const express = require('express');
const router = express.Router();
const Season = require('../models/season'); // Adjust the path as necessary
const Joi = require('joi');

// Define Joi schema for season validation
const seasonSchema = Joi.object({
    year: Joi.string().required(),
    players: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).required(),
    games: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
    practices: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
});

// Authentication middleware (to be implemented based on your auth system)
const isAuthenticated = (req, res, next) => {
    // Your authentication check goes here
    next();
};

// GET all seasons with pagination
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sort = req.query.sort || 'year';

    try {
        const seasons = await Season.find().sort(sort).skip(skip).limit(limit).populate(['players', 'games', 'practices']);
        const totalSeasons = await Season.countDocuments();
        res.json({
            total: totalSeasons,
            page,
            totalPages: Math.ceil(totalSeasons / limit),
            seasons
        });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// GET a season by ID
router.get('/:id', async (req, res) => {
    try {
        const season = await Season.findById(req.params.id).populate(['players', 'games', 'practices']);
        if (!season) {
            return res.status(404).json({ message: 'Season not found' });
        }
        res.json(season);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// GET a season by year
router.get('/year/:year', async (req, res) => {
    try {
        const season = await Season.findOne({ year: req.params.year }).populate(['players', 'games', 'practices']);
        if (!season) {
            return res.status(404).json({ message: 'Season not found for the given year' });
        }
        res.json(season);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// GET players from a season by season ID
router.get('/:id/players', async (req, res) => {
    try {
        const season = await Season.findById(req.params.id).populate('players');
        if (!season) {
            return res.status(404).json({ message: 'Season not found' });
        }
        res.json(season.players);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// GET games from a season by season ID
router.get('/:id/games', async (req, res) => {
    try {
        const season = await Season.findById(req.params.id).populate('games');
        if (!season) {
            return res.status(404).json({ message: 'Season not found' });
        }
        res.json(season.games);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// GET practices from a season by season ID
router.get('/:id/practices', async (req, res) => {
    try {
        const season = await Season.findById(req.params.id).populate('practices');
        if (!season) {
            return res.status(404).json({ message: 'Season not found' });
        }
        res.json(season.practices);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// POST a new season with validation
router.post('/', isAuthenticated, async (req, res) => {
    const { error, value } = seasonSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const season = new Season(value);

    try {
        await season.save();
        res.status(201).json(season);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create season', error: err.message });
    }
});

// PATCH to update a season with validation
router.patch('/:id', isAuthenticated, async (req, res) => {
    const { error, value } = seasonSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const updatedSeason = await Season.findByIdAndUpdate(req.params.id, value, { new: true }).populate(['players', 'games', 'practices']);
        if (!updatedSeason) {
            return res.status(404).json({ message: 'Season not found' });
        }
        res.json(updatedSeason);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// DELETE a season
router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        const season = await Season.findByIdAndDelete(req.params.id);
        if (!season) {
            return res.status(404).json({ message: 'Season not found' });
        }
        res.json({ message: 'Season deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

module.exports = router;
