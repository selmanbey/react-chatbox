import React from 'react';
import Message from './Message';

class MessageBox extends React.Component {
    render() {
        let content = [];

        for (let msg of this.props.messages) {
            content.push(
                <Message username={msg.username}
                        time={msg.time}
                        content={msg.content}/>
            );
        }

        return (
            <div>
                {content}
            </div>
        );
    }
}

export default MessageBox;