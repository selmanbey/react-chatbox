import React from 'react'
import { FaAngleRight } from 'react-icons/fa'

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
      fetch('http://0.0.0.0:3400/users', {
          method: 'post',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiY2hhdF91c2VyIn0.GK6768PTfnno8Q0rJL1rFQYZXAcqIe_pMMXWjcMkZbo'
          },
          body: JSON.stringify({
              username: this.state.username,
              lastseen: Date.now(),
          })
      }).then((res) => {
          this.props.setUser(this.state.username);
      }).catch( (err) => {
          console.log(err);
          alert(`CANNOT CONNECT TO SERVER AT THE MOMENT. PLEASE TRY AGAIN. \n\n ${err}`)
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
      <dialog ref="loginDialog" className="login-dialog-box" open>
          <h1 className="header-big">REACT CHAT BOX</h1>
          <div className="form-container">
            <form className="login-form" onSubmit={this.sendData}>
              <label className="login-label">LOGIN</label><br/>
              <input className="login-input" type="text" placeholder="who are you?" value={this.state.username}
              onChange={this.handleChange}/><br/>
              <button className="login-button"><FaAngleRight/></button>
            </form>
          </div>
      </dialog>
    );
  }
}

export default LoginScreen;
