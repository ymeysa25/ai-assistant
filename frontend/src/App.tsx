import React from 'react';
import { CssBaseline, Container } from '@mui/material';
import ChatInterface from './components/ChatInterface';

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ height: '100vh', py: 2 }}>
        <ChatInterface />
      </Container>
    </>
  );
}

export default App;