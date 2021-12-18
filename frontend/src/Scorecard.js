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
                <tr key={score.id} className="score"><td>{score.location}</td> <td>{score.date}</td> <td>{score.hole}</td> <td>{score.score}</td> <td>{score.putts}</td>
                    {(this.props.state.editForm ? '' : <div><button onClick={() => this.props.toggleEditForm(score.id)} className="newScoreBtn">Edit</button><button onClick={() => this.props.deleteScore(score.id)} className="newScoreBtn">Delete</button>
                    </div>)}
                </tr>
            )
        })
        return(
            <>
                <div>
                {(this.props.state.editForm ? 
                <div className="previousScores2">
                    <h1>Previous Scores:</h1>
                    <table className="table">
                    <tr>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Hole</th>
                        <th>Score</th>
                        <th>Putts</th>
                    </tr>
                    {scorecard}
                    </table>
                </div>
                : <div>{(this.props.state.newForm ? 
                <div className="previousScores2">
                    <h1>Previous Scores:</h1>
                    <table className="table">
                    <tr>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Hole</th>
                        <th>Score</th>
                        <th>Putts</th>
                    </tr>
                    {scorecard}
                    </table>
                </div>
                : <div className="previousScores">
                    <h1>Previous Scores:</h1>
                    <table className="table">
                    <tr>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Hole</th>
                        <th>Score</th>
                        <th>Putts</th>
                    </tr>
                    {scorecard}
                    </table>
                </div>)}</div>
                )}
                </div>
                {/* {(this.props.state.newForm ? 
                <div className="previousScores2">
                    <h1>Previous Scores:</h1>
                    {scorecard}
                </div>: <div className="previousScores">
                    <h1>Previous Scores:</h1>
                    {scorecard}
                </div>)} */}
                
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