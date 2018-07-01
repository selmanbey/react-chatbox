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
        let dt = new Date();
        fetch('http://0.0.0.0:3500/chatlog', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: this.state.message,
                username: 'osman3',
                time: dt.getHours() + ':' + dt.getMinutes()
            })
        }).then((res) => {
            res.json().then((content) => {
                //
            });
        }).catch( (err) => {
            console.log(err);
        } );
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({message: event.target.value});
    }

    render () {
        return (
            <form onSubmit={this.sendLog}>
                <input type="text" value={this.state.message} onChange={this.handleChange}/>
                <input type="submit" value="Send"/>
            </form>
        );
    }
}

export default InputBox;