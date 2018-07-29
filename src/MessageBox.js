import React from 'react';
import Message from './Message';

class MessageBox extends React.Component {
    render() {
        let content = [];

        for (let msg of this.props.messages) {
            content.push(
                <Message key={msg._id} username={msg.username}
                        time={msg.time}
                        content={msg.content}/>
            );
        }

        return (
            <div className="chat-log-box">
                {content}
            </div>
        );
    }
}

export default MessageBox;
