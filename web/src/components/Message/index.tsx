import React from 'react';
import './styles.css';

interface MessageProps {
    message: string;
    type: 'send' | 'get';
}


const Message: React.FC<MessageProps> = (props) => {
  let cssMessage = ['send', 'flex-end'];

  if (props.type === 'get') {
    cssMessage[0] = 'get';
    cssMessage[1] = 'flex-start';
  }

  return (
    <div className="message-container" style={{ justifyContent: cssMessage[1]}}>
      <span className={cssMessage[0]}>
        {props.message}
      </span>
    </div>
  );
}

export default Message;
