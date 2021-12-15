import React, { Component } from "react";

export default class Scorecard extends Component{
    constructor(props){
        super(props)
        this.state ={
            editForm: false
        }
    }
    render(){
        let scorecard = this.props.stats.map((score,i) =>{
            return(
                <div key={i}>Location: {score.location} | Hole: {score.hole} | Score: {score.score} | Putts: {score.putts} 
                <button onClick={() => this.props.deleteScore(score.id)}>X</button>
                {((this.state.editForm ? <form onSubmit={() => this.props.editScore(score.id)} action={'/stats/' + score.id} method="PUT">
                <input type="date" name="date" placeholder="dd/mm/yy" required onChange={this.props.handleChange} ></input>
                <input type="hole" name="hole" placeholder="hole" required onChange={this.props.handleChange}></input>
                <input type="location" name="location" placeholder="location" required onChange={this.props.handleChange}></input>
                <input type="score" name="score" placeholder="score" required onChange={this.props.handleChange}></input>                
                <input type="putts" name="putts" placeholder="putts" required onChange={this.props.handleChange}></input>
               <button onSubmit={() => this.props.editScore(score.id)} type="submit">edit score</button>
                </form>: <button onClick={() => this.setState({editForm: true})}>Edit</button>))}
                </div>
            )
        })
        return(
            <div>{scorecard}</div>
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