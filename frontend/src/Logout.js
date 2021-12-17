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
            <div>
                {(this.props.state.loggedIn ? <button onClick={this.props.logout} action='/user/logout' method="GET">Logout</button> : "")}
            </div>
        )
    }
}