import fs from 'fs/promises';
import path from 'path';

const questionsPath = path.resolve('data/questions.json');
const answersPath = path.resolve('data/answers.json');

const QuestionController = {
  getAllQuestions: async (req, res) => {
    try {
      const data = await fs.readFile(questionsPath, 'utf-8');
      const questions = JSON.parse(data);
      res.status(200).json(questions);
    } catch (err) {
      console.error('Error reading questions:', err);
      res.status(500).json({ error: 'Error reading questions' });
    }
  },

  getQuestionById: async (req, res) => {
    try {
      const questionsData = await fs.readFile(questionsPath, 'utf-8');
      const answersData = await fs.readFile(answersPath, 'utf-8');

      const questions = JSON.parse(questionsData);
      const answers = JSON.parse(answersData);

      const question = questions.find(q => q.id === req.params.questionId);
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }

      const questionAnswers = answers.filter(a => a.questionId === req.params.questionId);
      res.json({ question, answers: questionAnswers });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getAnswersByQuestionId: async (req, res) => {
    try {
      const data = await fs.readFile(answersPath, 'utf-8');
      const answers = JSON.parse(data);
      const questionAnswers = answers.filter(a => a.questionId === req.params.questionId);
      res.json(questionAnswers);
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export default QuestionController;

