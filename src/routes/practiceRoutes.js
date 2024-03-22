const express = require('express');
const router = express.Router();
const Practice = require('../models/practice'); // Adjust the path as necessary
const mongoose = require('mongoose');
const Joi = require('joi');

// Authentication middleware
const isAuthenticated = (req, res, next) => {
    // Placeholder for your authentication logic
    next();
};

// Define Joi schema for practice validation
const practiceSchema = Joi.object({
    season_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    date: Joi.date().required(),
    drills: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
    team_purple: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
    team_gray: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
});

// GET all practices with pagination
router.get('/', isAuthenticated, async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sort = req.query.sort || 'date'; // Sort practices by date by default

    try {
        const practices = await Practice.find()
                                        .populate('season_id drills team_purple team_gray')
                                        .skip(skip).limit(limit).sort(sort);
        const totalPractices = await Practice.countDocuments();
        res.json({
            total: totalPractices,
            page,
            totalPages: Math.ceil(totalPractices / limit),
            practices
        });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// GET a practice by ID
router.get('/:id', isAuthenticated, async (req, res) => {
    try {
        const practice = await Practice.findById(req.params.id).populate('season_id drills team_purple team_gray');
        if (!practice) {
            return res.status(404).json({ message: 'Practice not found' });
        }
        res.json(practice);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// GET practices by date
router.get('/byDate/:date', isAuthenticated, async (req, res) => {
    try {
        const practices = await Practice.find({ date: req.params.date }).populate('season_id drills team_purple team_gray');
        if (!practices.length) {
            return res.status(404).json({ message: 'No practices found for the given date' });
        }
        res.json(practices);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// GET practices by season_id
router.get('/bySeason/:seasonId', isAuthenticated, async (req, res) => {
    try {
        const practices = await Practice.find({ season_id: mongoose.Types.ObjectId(req.params.seasonId) })
                                        .populate('season_id drills team_purple team_gray');
        res.json(practices);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// GET practices by drill ID
router.get('/byDrill/:drillId', isAuthenticated, async (req, res) => {
    try {
        const practices = await Practice.find({ drills: mongoose.Types.ObjectId(req.params.drillId) })
                                        .populate('season_id drills team_purple team_gray');
        res.json(practices);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// GET practices by team_purple player ID
router.get('/byTeamPurple/:playerId', isAuthenticated, async (req, res) => {
    try {
        const practices = await Practice.find({ team_purple: mongoose.Types.ObjectId(req.params.playerId) })
                                        .populate('season_id drills team_purple team_gray');
        res.json(practices);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// GET practices by team_gray player ID
router.get('/byTeamGray/:playerId', isAuthenticated, async (req, res) => {
    try {
        const practices = await Practice.find({ team_gray: mongoose.Types.ObjectId(req.params.playerId) })
                                        .populate('season_id drills team_purple team_gray');
        res.json(practices);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// POST a new practice with validation
router.post('/', isAuthenticated, async (req, res) => {
    const { error, value } = practiceSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const practice = new Practice(value);

    try {
        await practice.save();
        res.status(201).json(practice);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create practice', error: err.message });
    }
});

// PATCH to update a practice by ID with validation
router.patch('/:id', isAuthenticated, async (req, res) => {
    const { error, value } = practiceSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const updatedPractice = await Practice.findByIdAndUpdate(req.params.id, value, { new: true })
                                               .populate('season_id drills team_purple team_gray');
        if (!updatedPractice) {
            return res.status(404).json({ message: 'Practice not found' });
        }
        res.json(updatedPractice);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// DELETE a practice by ID
router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        const practice = await Practice.findByIdAndDelete(req.params.id);
        if (!practice) {
            return res.status(404).json({ message: 'Practice not found' });
        }
        res.json({ message: 'Practice deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete practice', error: err.message });
    }
});

module.exports = router;
