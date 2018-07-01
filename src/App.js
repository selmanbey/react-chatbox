import React, { Component } from 'react';
import MessageBox from './MessageBox'
import UsersBox from './UsersBox';
import InputBox from './InputBox';
import './App.css';


const UPDATERATE = 2000;

class App extends Component {
  state = {
      messages : [],

      users: []
  };

  lastUpdate = 0;

  checkServer = (timestamp) => {
    if (this.lastUpdate + UPDATERATE < timestamp) {
      console.log("Checking server");
      this.fetches();
      this.lastUpdate = timestamp;
    }
    window.requestAnimationFrame(this.checkServer);
  }

  fetches = () => {
    fetch('http://0.0.0.0:3500/users').then((res) => {
      res.json().then( (users) => {
        this.setState({users: users});
      });
    }).catch( (err) => {
      console.log(err);
    });
    fetch('http://0.0.0.0:3500/chatlog').then((res) => {
      res.json().then( (messages) => {
        this.setState({messages: messages});
      });
    }).catch( (err) => {
      console.log(err);
    });
  }

  componentDidMount() {
    this.fetches();
    window.requestAnimationFrame(this.checkServer);
  }


  render() {

    return (
      <div className="container">
        <div className="header">
          <h1 className="header-text">REACT CHAT BOX</h1>
        </div>

        <div className="chat-log-container">
          <MessageBox
            className="chat-log-box"
            messages={this.state.messages} />
        </div>

        <div className="users-container">
          <UsersBox
            className="users-box"
            users={this.state.users} />
        </div>

        <div className="input-container">
          <InputBox />
        </div>

      </div>
    );
  }
}

export default App;
