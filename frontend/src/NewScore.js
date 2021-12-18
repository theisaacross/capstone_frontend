import React, { Component } from "react";
import "./App.css"

export default class NewScore extends Component{
    constructor(props){
        super(props)
        this.state ={
            
        }
    }
    render(){
        return(
            <div className="addScore">
                {(this.props.state.newForm || this.props.state.editForm ? '' : <button onClick={this.props.toggleNewForm} className="addScoreBtn" type="button">Add Score</button>)}
                {((this.props.state.loggedIn && this.props.state.newForm ? <form className="newForm" onSubmit={this.props.handleAddScore} action='/stats/' method="POST">
                <input type="date" name="date" placeholder="dd/mm/yy" required onChange={this.props.handleChange} ></input>
                <input type="hole" name="hole" placeholder="hole" required onChange={this.props.handleChange}></input>
                <input type="location" name="location" placeholder="location" required onChange={this.props.handleChange}></input>
                <input type="score" name="score" placeholder="score" required onChange={this.props.handleChange}></input>                
                <input type="putts" name="putts" placeholder="putts" required onChange={this.props.handleChange}></input>
                <div className="twoBtns">
                <button onClick={this.props.toggleNewForm} className=" newScoreBtn side" type='button'>Cancel</button>
               <button onSubmit={this.props.handleAddScore} type="submit" className="newScoreBtn right">Add score</button>
               </div>
                </form>: ''))}
            </div>
        )
    }
}