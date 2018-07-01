import React, { Component } from 'react';
import MessageBox from './MessageBox'
import UsersBox from './UsersBox';
import InputBox from './InputBox';

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
      <div>
        <MessageBox messages={this.state.messages}/>
        <UsersBox users={this.state.users}/>
        <InputBox/>
      </div>
    );
  }
}

export default App;
