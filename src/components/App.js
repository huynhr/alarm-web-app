import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import config from '../config/config.json';
import './App.css';
import UsersList from './usersList/UsersList';
import axios from 'axios';

function App() {
  const [users, getUsers] = useState([])
  const [isAuthenticated, getAuth] = useState(false)

  async function fetchUsersList() {
    await axios.get('http://localhost:3000/api/v1/users')
      .then(response => {
        getUsers(response.data)
      });
  }

  const googleResponse = (response) => {
    const payload = {
      accessToken: response.accessToken,
      userProfile: response.profileObj
    };
    axios.post('http://localhost:3000/api/v1/auth', payload)
      .then(response => {
        if (response.data.token) {
          getAuth(true)
        } else {
          getAuth(false)
          onFailure()
        }
      })
      .catch(response => console.log(response))
  }

  const onFailure = () => alert('Login Failed.')

  let content = !!isAuthenticated ? (
    <React.Fragment>
      <GoogleLogout
        clientId={config.GOOGLE_CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={() => getAuth(false)}
      />
      <button onClick={fetchUsersList}>request users</button>
      <UsersList users={users} />
    </React.Fragment>
  ) : (
    <React.Fragment>
      <GoogleLogin
        clientId={config.GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={googleResponse}
        onFailure={onFailure}
      />
    </React.Fragment>
  );
  console.log('current state : ', users)
  return (
    <div>
      {content}
    </div>
  );
} 

export default App;
