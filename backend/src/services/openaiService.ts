import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export const getAIResponse = async (userMessage: string): Promise<string> => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [{ role: 'user', content: userMessage }],
    max_tokens: 500,
  });

  return response.choices[0].message.content?.trim() || "I didn't understand";
};