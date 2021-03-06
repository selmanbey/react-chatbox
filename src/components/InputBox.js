import React from 'react';

class InputBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        message: ''
    }

    this.sendLog = this.sendLog.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  sendLog(event) {
    event.preventDefault();
    if(this.state.message) {
      this.setState({ message: '' });
      let dt = new Date();
      fetch('http://0.0.0.0:3500/chatlog', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: this.state.message,
            username: this.props.currentUser,
            time: dt.getHours() + ':' + dt.getMinutes()
        })
      }).then( res => {
        res.json().then( content => { /* pass */ });
      }).catch( err => {
        console.log(err);
      });
    };
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({message: event.target.value});
  }

  render () {
    return (
      <form className="input-form" onSubmit={this.sendLog}>
        <input
          className="chat-input-box"
          type="text"
          placeholder="Say Something!"
          value={this.state.message}
          onChange={this.handleChange}/>
        <button
          className="send-button"
          type="submit">SEND</button>
      </form>
    );
  }
}

export default InputBox;
