import { Request, Response } from 'express';
import { getAIResponse } from '../services/ollamaAIService';

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const aiResponse = await getAIResponse(message);
    res.json({ reply: aiResponse });
  } catch (error) {
    res.status(500).json({ error: 'AI processing failed' });
  }
};