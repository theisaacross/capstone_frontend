import React, { Component } from "react";

export default class NewScore extends Component{
    constructor(props){
        super(props)
        this.state ={
            
        }
    }
    render(){
        return(
            <div>
                {((this.props.state.loggedIn ? <form onSubmit={this.props.handleAddScore} action='/stats/' method="POST">
                <input type="date" name="date" placeholder="dd/mm/yy" required onChange={this.props.handleChange}></input>
                <input type="hole" name="hole" placeholder="hole" required onChange={this.props.handleChange}></input>
                <input type="location" name="location" placeholder="location" required onChange={this.props.handleChange}></input>
                <input type="score" name="score" placeholder="score" required onChange={this.props.handleChange}></input>                
                <input type="putts" name="putts" placeholder="putts" required onChange={this.props.handleChange}></input>
               <button onSubmit={this.props.handleAddScore} type="submit">Add score</button>
                </form>: ''))}
            </div>
        )
    }
}