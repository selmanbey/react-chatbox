import React from 'react';

class Message extends React.Component {
    render() {
        return (
            <div className="message">
                <p>
                  <strong className="message-sent-by"> {this.props.username} </strong>
                  <em className="message-sent-at"> {this.props.time} </em>
                  :
                  <span className="message-sent"> {this.props.content} </span>
                </p>
            </div>
        );
    }
}

export default Message;
