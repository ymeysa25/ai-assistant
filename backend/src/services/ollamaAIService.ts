// src/services/aiService.ts
import fetch from 'node-fetch';

interface OllamaResponse {
  response: string;
  done: boolean;
}

export const getAIResponse = async (userMessage: string): Promise<string> => {
  const OLLAMA_URL = 'http://localhost:11434/api/generate'; // Default Ollama port
  const MODEL_NAME = 'llama3.2'; // Change to your preferred model (e.g. 'llama3', 'mistral')
  try {
    const response = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL_NAME,
        prompt: userMessage,
        stream: false, // Set to true for streaming (see advanced section)
        options: {
          temperature: 0.7,
          num_predict: 200 // Max tokens to generate
        }
      })
    });
    if (!response.ok) {
      throw new Error(`Ollama error: ${response.statusText}`);
    }

    // Usage
    const rawData = await response.json();
    if (!isOllamaResponse(rawData)) {
      throw new Error('Invalid Ollama response format');
    }
    const data: OllamaResponse = rawData;
    return data.response || "No response from Ollama AI.";

  } catch (error) {
    console.error('Ollama connection failed:', error);
    return "I'm experiencing technical difficulties. Please try again later.";
  }
};

// Add this type guard function
function isOllamaResponse(obj: any): obj is OllamaResponse {
  return typeof obj === 'object' &&
    obj !== null &&
    'response' in obj &&
    typeof obj.response === 'string';
}

