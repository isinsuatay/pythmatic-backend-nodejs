import express from 'express';
import questionRoutes from './questionRoutes.js';
import AnswersController from '../controllers/answersController.js';
import { runCode } from '../controllers/compilerController.js';

const router = express.Router();

// Soru rotası
router.use('/questions', questionRoutes);

// Cevap rotası
router.get('/answers', AnswersController.getAllAnswers);
router.get('/answers/:answerId', AnswersController.getAnswerById);

// compier rotası
router.use('/run-code', runCode);

export default router;