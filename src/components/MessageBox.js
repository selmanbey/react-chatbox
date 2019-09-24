import React from 'react';
import Message from './Message';

const MessageBox = props => {
  let content = [];

  for (let msg of props.messages) {
    content.push(
      <Message key={msg._id} username={msg.username}
              time={msg.time}
              content={msg.content} />
    );
  }

  return ( <div className="chat-log-box"> { content } </div> );
}

export default MessageBox;
