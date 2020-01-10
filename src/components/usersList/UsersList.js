import React from 'react';


const UsersList = ({users}) => {
  return (
    <React.Fragment>
      <ul>
        {
          users.map((user, i) => <li key={user.id}>{user.name}</li>)
        }
      </ul>
    </React.Fragment>
  );
}

export default UsersList