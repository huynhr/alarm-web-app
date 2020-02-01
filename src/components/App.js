import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import config from '../config/config.json';
import './App.css';
import UsersList from './usersList/UsersList';
import axios from 'axios';

function App() {
  const [users, getUsers] = useState([])
  const [isAuthenticated, getAuth] = useState(false)
  const [jtwToken, updateJtwToken] = useState('')

  async function fetchUsersList() {
    await axios.get('http://localhost:3000/api/v1/users', {headers: {'token': jtwToken} })
      .then(response => {
        getUsers(response.data)
      })
      .catch(response => {
        console.log('Error response: ', response);
        getAuth(false)
        updateJtwToken('')
      })
  }

  const googleResponse = (response) => {
    const payload = {
      access_token: response.accessToken,
      userProfile: response.profileObj
    };
    axios.post('http://localhost:3000/api/v1/auth', payload)
      .then(response => {
        if (response.headers["x-auth-token"]) {
          getAuth(true);
          updateJtwToken(response.headers["x-auth-token"]);
        } else {
          getAuth(false);
          onFailure();
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
      <p>{jtwToken}</p>
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
