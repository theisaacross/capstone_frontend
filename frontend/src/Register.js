import React, { Component } from 'react';
import "./App.css"
export default class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
        
        }
    }

    
    render(){
        return(
            <div className="container">
                {(this.props.state.loggedIn ? <div>{this.props.state.loggedIn}</div> : <form className='box' onSubmit={this.props.handleRegister} action='/user/register' method="POST">
                <h1>Register</h1>
                <input type="username" name="username" placeholder="username" required onChange={this.props.handleChange}></input>
                <input type="password" name="password" placeholder="password" required onChange={this.props.handleChange}></input>
                <button onSubmit={this.props.handleRegister} type="submit" className="btn auth">Register</button>
                <button onClick={this.props.toggleForm}>toggle</button>
                </form>)}
            </div> 
        )
    }
}