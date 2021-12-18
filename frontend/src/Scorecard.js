import React, { Component } from "react";
import "./App.css"

export default class Scorecard extends Component{
    constructor(props){
        super(props)
        this.state ={
        }
    }
    render(){
        let scorecard = this.props.stats.map((score) =>{
            return(
                <div key={score.id} className="score">Location: {score.location} | Date: {score.location} | Hole: {score.hole} | Score: {score.score} | Putts: {score.putts} 
                    {(this.props.state.editForm ? '' : <div><button onClick={() => this.props.deleteScore(score.id)}>Delete</button>
                    <button onClick={() => this.props.toggleEditForm(score.id)}>Edit</button></div>)}
                </div>
            )
        })
        return(
            <>
                {(this.props.state.newForm ? 
                <div className="previousScores2">
                    <h1>Previous Scores:</h1>
                    {scorecard}
                </div>: <div className="previousScores">
                    <h1>Previous Scores:</h1>
                    {scorecard}
                </div>)}
            </>
        )
    }
}
// "data": [`   
//     {
//         "date": "01/16/2003",
//         "hole": 1,
//         "id": 1,
//         "location": "south mountain",
//         "putts": 2,
//         "score": 4,
//         "user": {
//             "id": 1,
//             "username": "isaac"
//         }
//     }
// ]