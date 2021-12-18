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
                {((this.props.state.loggedIn && this.props.state.editForm ? <form className="editForm" onSubmit={() => this.props.handleEditScore(this.props.state.currentID)} action='/stats/' method="PUT">
                <input type="date" name="date" placeholder={this.props.state.stats[this.props.state.foundID].date} required onChange={this.props.handleChange} ></input>
                <input type="hole" name="hole" placeholder={this.props.state.stats[this.props.state.foundID].hole} required onChange={this.props.handleChange}></input>
                <input type="location" name="location" placeholder={this.props.state.stats[this.props.state.foundID].location} required onChange={this.props.handleChange}></input>
                <input type="score" name="score" placeholder={this.props.state.stats[this.props.state.foundID].score} required onChange={this.props.handleChange}></input>                
                <input type="putts" name="putts" placeholder={this.props.state.stats[this.props.state.foundID].putts} required onChange={this.props.handleChange}></input>
                <div className="twoBtns">
                <button onClick={this.props.toggleEditForm} className=" newScoreBtn side" type='button'>Cancel</button>
                <button onSubmit={() => this.props.handleEditScore(this.props.state.currentID)} type="submit" className="newScoreBtn right">Edit score</button>
               </div>
                </form>: ''))}
            </div>
        )
    }
}