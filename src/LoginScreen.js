import React from 'react'
import PropTypes from 'prop-types'

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  sendData(e) {
      e.preventDefault();
      fetch('http://0.0.0.0:3500/login', {
          method: 'post',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              username: this.state.username,
          })
      }).then((res) => {
          res.json().then((content) => {
            if(content.success) {
              this.props.setUser(this.state.username);
            }
          });
      }).catch( (err) => {
          console.log(err);
      } );

  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      username: e.target.value,
    })
  }

  render () {
    return(
      <dialog ref="loginDialog" open>
          <h1>LOGIN</h1>
          <form onSubmit={this.sendData}>
            <input type="text" placeholder="who are you?" value={this.state.username}
            onChange={this.handleChange}/><br/>
            <button>enter a username</button>
          </form>
      </dialog>
    );
  }
}

export default LoginScreen;
