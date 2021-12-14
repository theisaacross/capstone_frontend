import React, { Component } from 'react';

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
        
        }
    }

    
    render(){
        return(
            <div>
                {(this.props.state.loggedIn ? <div>{this.props.state.loggedIn}</div> : <form onSubmit={this.props.handleLogin} action='/user/login' method="POST">
                <input type="username" name="username" placeholder="username" required onChange={this.props.handleChange}></input>
                <input type="password" name="password" placeholder="password" required onChange={this.props.handleChange}></input>
                <button onSubmit={this.props.handleLogin} type="submit">Login</button>
                </form>)}
            </div>
        )
    }
}

