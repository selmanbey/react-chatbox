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
            <div>
                <ul>
                    {content}
                </ul>
            </div>
        );
    }
}

export default UsersBox;