import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Avatar,
  Typography
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

type Message = {
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How can I help you today?", sender: 'ai', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      // Call your backend API
      const response = await fetch('http://localhost:5000/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();

      const aiResponse: Message = {
        text: data.reply,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        text: "Sorry, I couldn't process your request.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };


  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      maxWidth: '800px',
      margin: '0 auto',
      padding: 2
    }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 2 }}>
        AI Chat Assistant
      </Typography>

      <Paper elevation={3} sx={{ flexGrow: 1, overflow: 'auto', mb: 2 }}>
        <List sx={{ padding: 2 }}>
          {messages.map((message, index) => (
            <ListItem
              key={index}
              sx={{
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <Box sx={{
                display: 'flex',
                flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                alignItems: 'center',
                maxWidth: '70%'
              }}>
                <Avatar sx={{
                  bgcolor: message.sender === 'user' ? 'primary.main' : 'secondary.main',
                  margin: message.sender === 'user' ? '0 0 0 8px' : '0 8px 0 0'
                }}>
                  {message.sender === 'user' ? 'U' : 'AI'}
                </Avatar>
                <Paper
                  elevation={1}
                  sx={{
                    padding: 1.5,
                    bgcolor: message.sender === 'user' ? 'primary.light' : 'grey.100',
                    color: message.sender === 'user' ? 'primary.contrastText' : 'text.primary'
                  }}
                >
                  <ListItemText
                    primary={message.text}
                    secondary={message.timestamp.toLocaleTimeString()}
                    sx={{
                      '& .MuiListItemText-secondary': {
                        color: message.sender === 'user' ? 'primary.contrastText' : 'text.secondary'
                      }
                    }}
                  />
                </Paper>
              </Box>
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Paper>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSend}
          disabled={!input.trim()}
          endIcon={<SendIcon />}
          sx={{ height: '56px' }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatInterface;