import fs from 'fs/promises';
import path from 'path';

const answersPath = path.resolve('data/answers.json');

const AnswersController = {
  getAllAnswers: async (req, res) => {
    try {
      const data = await fs.readFile(answersPath, 'utf-8');
      const answers = JSON.parse(data);
      res.status(200).json(answers);
    } catch (err) {
      console.error('Error reading answers:', err);
      res.status(500).json({ error: 'Error reading answers' });
    }
  },

  getAnswerById: async (req, res) => {
    try {
      const data = await fs.readFile(answersPath, 'utf-8');
      const answers = JSON.parse(data);
      const answer = answers.find(a => a.id === req.params.answerId);
      if (!answer) {
        return res.status(404).json({ error: 'Answer not found' });
      }
      res.json(answer);
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export default AnswersController;