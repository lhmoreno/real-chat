import React, { useEffect, useRef, FormEvent, useState, useCallback } from 'react';

import './styles.css';
import Message from '../Message';

interface MessageProps {
  id: string;
  message: string;
  type: 'send' | 'get';
}

const socket = new WebSocket('ws://localhost:3333');

function Chat() {
  const [messages, setMessages] = useState<MessageProps[]>([{ id: 'null', message: '', type: 'send' }]);

  const messagesRef = useRef<MessageProps[]>(messages);
  const inputRef = useRef<HTMLInputElement>(null);

  const submitForm = useCallback((e: FormEvent) => {
    e.preventDefault();
    
    
    if (inputRef.current) {
      const message = inputRef.current.value;
      const messageObj: MessageProps = { id: `${Math.random()}`, message, type: 'send' };
      if (messagesRef.current[0].id === 'null') { // seta o estado das mensagens se estiver no estado inicial
        setMessages([messageObj])
        messagesRef.current = [messageObj];
      } else {
        setMessages(prevState => [messageObj, ...prevState]);
        messagesRef.current = [messageObj, ...messagesRef.current];
      }

      socket.send(message);
      inputRef.current.value = '';
    }


  }, []);

  useEffect(() => {
    console.log('RENDER CHAT');
    console.log('messagesState = ', messages);
  });

  useEffect(() => {
    function messageListener(e: MessageEvent) {
      const messageObj: MessageProps = { id: `${Math.random()}`, message: e.data, type: 'get' };
      if (messagesRef.current[0].id === 'null') { // seta o estado das mensagens se estiver no estado inicial
        setMessages([messageObj])
        messagesRef.current = [messageObj];
      } else {
        setMessages(prevState => [messageObj, ...prevState]);
        messagesRef.current = [messageObj, ...messagesRef.current];
      }
    }

    socket.addEventListener('message', messageListener);

    return () => socket.removeEventListener('message', messageListener);
  }, []);

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages[0].id !== 'null' && messages.map(list => (
          <Message key={list.id} message={list.message} type={list.type}/>
        ))}
      </div>

      <form className="form-message" onSubmit={submitForm}>
        <input 
          ref={inputRef}
          type="text"
          placeholder="Digite sua mensagem"
        />
        <button type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Chat;
