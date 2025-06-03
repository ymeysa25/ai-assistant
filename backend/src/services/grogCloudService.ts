// aiService.ts
export const getAIResponse = async (userMessage: string): Promise<string> => {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`, // Get at console.groq.com
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192', // Free model
        messages: [{ role: 'user', content: userMessage }],
        temperature: 0.7
      })
    });
  
    const data = await response.json();
    return data.choices[0].message.content;
  };