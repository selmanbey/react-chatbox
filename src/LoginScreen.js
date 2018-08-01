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
      <dialog ref="loginDialog" class="login-dialog-box" open>
          <h1 class="header-big">REACT CHAT BOX</h1>
          <div class="form-container">
            <form class="login-form" onSubmit={this.sendData}>
              <label>LOGIN</label><br/>
              <input class="login-input" type="text" placeholder="who are you?" value={this.state.username}
              onChange={this.handleChange}/><br/>
              <button class="login-button"></button>
            </form>
          </div>
      </dialog>
    );
  }
}

export default LoginScreen;
