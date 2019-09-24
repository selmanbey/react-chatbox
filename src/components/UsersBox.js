import React from 'react';

const UsersBox = props => {
  let content = [];

  for (let usr of props.users) {
    content.push( <li key={ usr._id }> { usr.username } </li> );
  }
  return (
      <div className="users-box">
          <p className="users-header">USERS</p>
          <ul className="users-list">
              { content }
          </ul>
      </div>
  );
}

export default UsersBox;
