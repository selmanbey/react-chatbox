import React from 'react';

class UsersBox extends React.Component {
    render () {
        let content = [];

        for (let usr of this.props.users) {
            content.push(
                <li>{usr.username}</li>
            );
        }
        return (
            <div className="users-box">
                <p className="users-header">USERS</p>
                <ul className="users-list">
                    {content}
                </ul>
            </div>
        );
    }
}

export default UsersBox;
