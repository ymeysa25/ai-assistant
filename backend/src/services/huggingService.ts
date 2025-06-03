// aiService.ts
export const getAIResponse = async (userMessage: string): Promise<string> => {
    const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";
    const headers = {
      Authorization: `Bearer ${process.env.HF_API_KEY}`, // Get at hf.co/settings/tokens
      "Content-Type": "application/json",
    };
  
    const response = await fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({ inputs: userMessage }),
    });
    
    const data = await response.json();
    return data[0]?.generated_text || "No response";
  };