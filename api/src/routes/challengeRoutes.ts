import express from 'express';
import {
    createChallenge,
    deleteChallenge,
    getAllChallenges,
    getChallengeById,
    joinChallenge,
    updateChallenge,
} from '../controllers/challengeController.js';
import authenticate from '../middleware/authenticate.js';


const challengeRoute = express.Router();

// @route   GET /api/challenges
// @desc    Get all challenges
// @access  Public
challengeRoute.get('/', getAllChallenges);

// @route   GET /api/challenges/:id
// @desc    Get challenge by ID
// @access  Public
challengeRoute.get('/:id', getChallengeById);

// @route   POST /api/challenges
// @desc    Create new challenge
// @access  Private (add authentication middleware as needed)
challengeRoute.post('/', createChallenge);

// @route   PUT /api/challenges/:id
// @desc    Update challenge
// @access  Private (add authentication middleware as needed)
challengeRoute.put('/:id', updateChallenge);

// @route   DELETE /api/challenges/:id
// @desc    Delete challenge
// @access  Private (add authentication middleware as needed)
challengeRoute.delete('/:id', deleteChallenge);

// @route   POST /api/challenges/:id/join
// @desc    Join a challenge
// @access  Private (requires authentication)
challengeRoute.post('/:id/join', authenticate, joinChallenge);

export default challengeRoute;