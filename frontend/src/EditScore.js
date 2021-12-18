import React, { Component } from 'react';
import "./App.css"

export default class EditScore extends Component {
    constructor(props){
        super(props)
        this.state = {
        
        }
    }

    
    render(){
        return(
            <div className="addScore">
                {((this.props.state.loggedIn && this.props.state.editForm ? <form className="newForm" onSubmit={() => this.props.handleEditScore(this.props.state.currentID)} action='/stats/' method="PUT">
                <input type="date" name="date" value= {this.props.state.foundDate} required onChange={this.props.handleChange} ></input>
                <input type="hole" name="hole" value={this.props.state.foundHole} required onChange={this.props.handleChange}></input>
                <input type="location" name="location" value={this.props.state.foundLocation} required onChange={this.props.handleChange}></input>
                <input type="score" name="score" value={this.props.state.foundScore} required onChange={this.props.handleChange}></input>                
                <input type="putts" name="putts" value={this.props.state.foundPutts} required onChange={this.props.handleChange}></input>
                <div className="twoBtns">
                <button onClick={this.props.toggleEditForm} className=" newScoreBtn side" type='button'>Cancel</button>
                <button onSubmit={() => this.props.handleEditScore(this.props.state.currentID)} type="submit" className="newScoreBtn right">Edit score</button>
               </div>
                </form>: ''))}
            </div>
        )
    }
}
