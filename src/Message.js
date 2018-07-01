import React from 'react';

class Message extends React.Component {
    render() {
        return (
            <div className="message">
                <strong>{this.props.username}</strong>
                <em>{this.props.time}</em>
                <p>{this.props.content}</p>
            </div>
        );
    }
}

export default Message;