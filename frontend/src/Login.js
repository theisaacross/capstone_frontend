import React, { Component } from 'react';
import "./App.css"
export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
        
        }
    }

    
    render(){
        return(
            <div className="container">
                {(this.props.state.loggedIn ? <div>{this.props.state.loggedIn}</div> : <form className='box' onSubmit={this.props.handleLogin} action='/user/login' method="POST">
                <h1>Login</h1>
                <input type="username" name="username" placeholder="username" required onChange={this.props.handleChange}></input>
                <input type="password" name="password" placeholder="password" required onChange={this.props.handleChange}></input>
                <button onSubmit={this.props.handleLogin} type="submit" className="btn auth">Login</button>
                <button onClick={this.props.toggleForm} className='toggle' type='button'>toggle</button>
                </form>)}
            </div>
        )
    }
}

