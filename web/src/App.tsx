import React, { useEffect, useState } from 'react';

import './App.css';
import Chat from './components/Chat';

function App() {
  const [handleChat, setHandleChat] = useState('loading');

  useEffect(() => {
    console.log('RENDER APP')
  });

  useEffect(() => {
    setTimeout(() => {
      console.log('SET APP CHAT');
      setHandleChat('release');
    }, 500);
  }, []);

  switch(handleChat) {
    case 'loading':
      return <h1>Carregando...</h1>

    case 'blocked':
      return <h1>Bloqueado!</h1>

    case 'release':
      return <Chat />

    default:
      return <h1>Erro desconhecido!</h1>
  }
}

export default App;
