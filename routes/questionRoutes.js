import express from 'express';
import QuestionController from '../controllers/questionsController.js';

const router = express.Router();

router.get('/', QuestionController.getAllQuestions);
router.get('/:questionId', QuestionController.getQuestionById);
router.get('/:questionId/answers', QuestionController.getAnswersByQuestionId);

export default router;