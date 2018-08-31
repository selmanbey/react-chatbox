import React, { Component } from 'react';
import MessageBox from './MessageBox'
import UsersBox from './UsersBox';
import InputBox from './InputBox';
import LoginScreen from './LoginScreen';
import './App.css';


const UPDATERATE = 100;
const DELETE_TIMEOUT = 900000;   // 15 minutes

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
          messages : [],
          users: [],
          currentUser: 'NULL',
      };

    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.pruneUsers = this.pruneUsers.bind(this);
    this.keepUserAlive = this.keepUserAlive.bind(this);
  }

  lastUpdate = 0;

  setCurrentUser(username) {
    this.setState( {
      currentUser: username
    });
  }

  pruneUsers = () => {
    let timeout = Date.now() - DELETE_TIMEOUT;

    fetch(`http://0.0.0.0:3400/users?lastseen=lte.${timeout}`, {
        method: 'delete',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Methods": "GET, POST,HEAD, OPTIONS,PUT, DELETE",
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiY2hhdF91c2VyIn0.GK6768PTfnno8Q0rJL1rFQYZXAcqIe_pMMXWjcMkZbo'
        }
    }).then((res) => {
        // console.log(res.status)
    }).catch( (err) => {
        console.log(err);
    } );
  };

  keepUserAlive = (username) => {
    let now = Date.now();
    fetch(`http://0.0.0.0:3400/users?username=eq.${ username }`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiY2hhdF91c2VyIn0.GK6768PTfnno8Q0rJL1rFQYZXAcqIe_pMMXWjcMkZbo'
        },
        body: JSON.stringify({
          'lastseen': now
        }),
    }).then((res) => {
      //
    }).catch( (err) => {
        console.log(err);
    } );
  };

  checkServer = (timestamp) => {
    if (this.lastUpdate + UPDATERATE < timestamp) {
      this.fetches();
      this.lastUpdate = timestamp;
    }
    window.requestAnimationFrame(this.checkServer);
  }

  fetches = () => {
    if (this.state.currentUser !== "NULL") {
      this.pruneUsers();
      let user = this.state.currentUser;
      this.keepUserAlive(user);
      fetch('http://0.0.0.0:3400/users?order=username.asc').then((res) => {
        res.json().then((users) => {
          this.setState({users: users});
        });
      }).catch( (err) => {
        console.log(err);
      });

      fetch(`http://0.0.0.0:3400/chatlog`).then((res) => {
        res.json().then( (messages) => {
          this.setState({messages: messages});
        });
      }).catch( (err) => {
        console.log(err);
      });

      // fetch('http://0.0.0.0:3500').then((res) => {
      //   console.log(res);
      //   // res.json().then( (activeUsers) => {
      //   //   if (!activeUsers.includes(this.state.currentUser)) {
      //   //     this.setState({
      //   //       currentUser: "NULL"
      //   //     })
      //   //   };
      //   // });
      // }).catch( err => {
      //   console.log(err)
      // });
    }
  }

  componentDidMount() {
    this.fetches();
    window.requestAnimationFrame(this.checkServer);
  }


  render() {
    if(this.state.currentUser !== "NULL") {
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
            <InputBox
              currentUser={this.state.currentUser}/>
          </div>

        </div>
      );
    } else {
      return (
          <LoginScreen
              setUser={this.setCurrentUser}/>
      );
    }


  }
}

export default App;
