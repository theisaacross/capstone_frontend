import React, { Component } from 'react';
import Login from './Login';


let baseURL = 'http://localhost:3000';


class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      stats : [],
      loggedIn: false
    }
  }

  getStats = () =>{
    console.log(baseURL)
    fetch(baseURL + '/stats',{
      credentials: "include"
    })
    .then(data =>{
      return data.json()},
      err => console.log(err))
      .then(data => this.setState({stats: data}))
  }
  componentDidMount(){
    // this.getStats()
  }

  render(){
    // let list = this.state.stats
    // console.log(list.message)
    return(
      <div>
        <Login baseURL={baseURL} getStats={this.getStats}/>
      </div>
    )
  }
}

export default App;
