import express from 'express';
import { runCode } from '../controllers/compilerController.js';

const router = express.Router();

router.post('/run-code', runCode);

export default router;
