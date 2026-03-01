import express from 'express';
import {
  getAllChallenges,
  getChallengeById,
  createChallenge,
  updateChallenge,
  deleteChallenge,
  getPendingApprovals,
  updateApprovalStatus,
} from '../controllers/challengeController.js';


const challengeRoute = express.Router();

// @route   GET /api/challenges
challengeRoute.get('/', getAllChallenges);

// @route   GET /api/challenges/approvals/pending
challengeRoute.get('/approvals/pending', getPendingApprovals);

// @route   GET /api/challenges/:id
challengeRoute.get('/:id', getChallengeById);

// @route   POST /api/challenges
challengeRoute.post('/', createChallenge);

// @route   PATCH /api/challenges/:id/approval
challengeRoute.patch('/:id/approval', updateApprovalStatus);

// @route   PUT /api/challenges/:id
challengeRoute.put('/:id', updateChallenge);

// @route   DELETE /api/challenges/:id
challengeRoute.delete('/:id', deleteChallenge);

export default challengeRoute;