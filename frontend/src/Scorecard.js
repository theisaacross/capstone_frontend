import React, { Component } from "react";

export default class Scorecard extends Component{
    constructor(props){
        super(props)
        this.state ={
        }
    }
    render(){
        // console.log(this.props.stats[0].location)
        let scorecard = this.props.stats.map((score,i) =>{
            return(
                <div key={i}>location: {score.location} <button onClick={() => this.props.deleteScore(score.id)}>X</button></div>
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