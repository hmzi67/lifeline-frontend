import express from 'express';
import {
  getAllChallenges,
  getChallengeById,
  createChallenge,
  updateChallenge,
  deleteChallenge,
} from '@controllers/challengeController';


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

export default challengeRoute;