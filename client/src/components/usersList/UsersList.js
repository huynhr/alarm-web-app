import React from 'react';


const UsersList = ({users}) => {
  return (
    <React.Fragment>
      {
        users.map(user => <li>{user.user}</li>)
      }
    </React.Fragment>
  );
}

export default UsersList