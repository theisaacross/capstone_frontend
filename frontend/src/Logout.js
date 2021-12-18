import React, { Component} from "react";
import "./App.css"

export default class Logout extends Component{
    constructor(props){
        super(props)
        this.state ={

        }
    }
    render(){
        return(
            <div className="parentWelcome">
                {(this.props.state.loggedIn ? <div className="welcome"><h1 >Welcome {this.props.state.username}</h1><button onClick={this.props.logout} action='/user/logout' method="GET" className="logout">Logout</button> </div>: "")}
            </div>
        )
    }
}