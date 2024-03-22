const express = require('express');
const router = express.Router();
const Game = require('../models/game'); // Adjust the path as necessary
const mongoose = require('mongoose');
const Joi = require('joi');

// Authentication middleware
const isAuthenticated = (req, res, next) => {
    // Placeholder for your authentication logic
    next();
};

// Define Joi schema for game validation
const gameSchema = Joi.object({
    season_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    date: Joi.date().required(),
    opponent: Joi.string().required(),
    location: Joi.string().required(),
    tempo_events: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
    shot_events: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
});

// GET all games with pagination and optional sorting
router.get('/', isAuthenticated, async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sort = req.query.sort || 'date'; // Sort games by date by default

    try {
        const games = await Game.find()
                                .populate('season_id tempo_events shot_events')
                                .skip(skip).limit(limit).sort(sort);
        const totalGames = await Game.countDocuments();
        res.json({
            total: totalGames,
            page,
            totalPages: Math.ceil(totalGames / limit),
            games
        });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// Add specific GET functions for season_id, date, opponent, location, tempo_events, and shot_events
// Example: GET games by season_id
router.get('/bySeason/:seasonId', isAuthenticated, async (req, res) => {
    try {
        const games = await Game.find({ season_id: mongoose.Types.ObjectId(req.params.seasonId) })
                                .populate('season_id tempo_events shot_events');
        res.json(games);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// Repeat the pattern above for other specific GET functions by adapting the query as needed
router.get('/byDate/:date', isAuthenticated, async (req, res) => {
    try {
        const games = await Game.find({ date: req.params.date })
                                .populate('season_id tempo_events shot_events');
        res.json(games);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

router.get('/byOpponent/:opponent', isAuthenticated, async (req, res) => {
    try {
        const games = await Game.find({ opponent: req.params.opponent })
                                .populate('season_id tempo_events shot_events');
        res.json(games);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

router.get('/byLocation/:location', isAuthenticated, async (req, res) => {
    try {
        const games = await Game.find({ location: req.params.location })
                                .populate('season_id tempo_events shot_events');
        res.json(games);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

router.get('/byTempoEvent/:tempoEventId', isAuthenticated, async (req, res) => {
    try {
        const games = await Game.find({ tempo_events: mongoose.Types.ObjectId(req.params.tempoEventId) })
                                .populate('season_id tempo_events shot_events');
        res.json(games);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

router.get('/byShotEvent/:shotEventId', isAuthenticated, async (req, res) => {
    try {
        const games = await Game.find({ shot_events: mongoose.Types.ObjectId(req.params.shotEventId) })
                                .populate('season_id tempo_events shot_events');
        res.json(games);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// GET a game by ID
router.get('/:id', isAuthenticated, async (req, res) => {
    try {
        const game = await Game.findById(req.params.id).populate('season_id tempo_events shot_events');
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }
        res.json(game);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// POST a new game with validation
router.post('/', isAuthenticated, async (req, res) => {
    const { error, value } = gameSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const game = new Game(value);

    try {
        await game.save();
        res.status(201).json(game);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create game', error: err.message });
    }
});

// PATCH to update a game by ID with validation
router.patch('/:id', isAuthenticated, async (req, res) => {
    const { error, value } = gameSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const updatedGame = await Game.findByIdAndUpdate(req.params.id, value, { new: true })
                                       .populate('season_id tempo_events shot_events');
        if (!updatedGame) {
            return res.status(404).json({ message: 'Game not found' });
        }
        res.json(updatedGame);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// DELETE a game by ID
router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        const game = await Game.findByIdAndDelete(req.params.id);
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }
        res.json({ message: 'Game deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

module.exports = router;
