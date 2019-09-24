import React from 'react';

const Message = props => {
  return (
    <div className="message">
      <p>
        <strong className="message-sent-by"> {props.username} </strong>
        <em className="message-sent-at"> {props.time} </em>
        :
        <span className="message-sent"> {props.content} </span>
      </p>
    </div>
  )
}

export default Message;
