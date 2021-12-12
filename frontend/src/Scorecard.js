import React, { Component } from "react";

export default class Scorecard extends Component{
    constructor(props){
        super(props)
        this.state ={
            stats: this.props.state.stats
        }
    }
    render(){
        return(
            <div>{this.state.stats[0]}</div>
        )
    }
}