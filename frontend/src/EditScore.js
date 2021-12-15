import React, { Component } from 'react';

export default class EditScore extends Component {
    constructor(props){
        super(props)
        this.state = {
        
        }
    }

    
    render(){
        return(
            <div>
                {((this.props.state.loggedIn && this.props.editForm ? <form onSubmit={(e) => {
                    e.preventDefault()
                }}>
                <input type="date" name="date" value={this.props.state.date} required onChange={this.props.handleChange} ></input>
                <input type="hole" name="hole" value={this.props.state.value} required onChange={this.props.handleChange}></input>
                <input type="location" name="location" value={this.props.state.location} required onChange={this.props.handleChange}></input>
                <input type="score" name="score" placeholder="score" required onChange={this.props.handleChange}></input>                
                <input type="putts" name="putts" placeholder="putts" required onChange={this.props.handleChange}></input>
               <button type="submit">edit score</button>
                </form>: ''))}
            </div>
        )
    }
}