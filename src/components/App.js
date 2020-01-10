import React from 'react';
import logo from '../logo.svg';
import './App.css';
import UsersList from './usersList/UsersList';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': []
    }
    this.updateUsersList = this.updateUsersList.bind(this);
  }

  updateUsersList() {
    axios.get('http://localhost:3000/users')
      .then(response => {
        console.log(response);
        this.setState({'users': response.data});
      })
  }

  render() {
    return (
      <div>
        <button onClick={this.updateUsersList}>request users</button>
        <UsersList users={this.state.users}/>
      </div>
    );
  }
}

export default App;
