import React, { Component } from 'react';
import Login from './Login';
import Logout from './Logout';
import NewScore from './NewScore';
import Register from './Register';
import Scorecard from './Scorecard';

let baseURL = 'http://localhost:3000';


class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      stats : [],
      username : '',
      password: '',
      loggedIn: false,
      scores: {
        date: '',
        hole:'',
        location: '',
        score:'',
        putts: ''
      }
    }
  }

  getStats = () =>{
    fetch(baseURL + '/stats',{
      credentials: "include"
    })
    .then(data =>{
      console.log("this is data: " + data)
      return data.json()},
      err => console.log(err))
      .then(data => this.setState({stats: data}))
      const allStats = this.state.stats['data']
      console.log(allStats)
  }
  componentDidMount(){
    this.getStats()
  }
  handleChange = (e) =>{
    const {name,value} = e.target
    this.setState({[name]:value})
}

  handleLogin = (e) =>{
    e.preventDefault()
    this.login()
  } 
  handleRegister = (e) =>{
    e.preventDefault()
    this.register()
  } 

  handleAddScore = (e) =>{
    e.preventDefault()
    this.addScore()
  }

  login = () =>{
    fetch('/users/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "username": this.state.username,
            "password": this.state.password
        }),
        credentials: "include"
    })
    .then(res =>{
        if (res.status === 200) {
          this.setState({
            loggedIn: true
          })
          console.log("logged in")
          return res.json()
        }
        else alert("There has been some error")
    })
    .catch(error =>{
        console.error("There was an error", error)
    })
    console.log(this.state.stats)
    this.getStats()
  }

  register = () =>{
    fetch('/users/register', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "username": this.state.username,
            "password": this.state.password
        }),
        credentials: "include"
    })
    .then(res =>{
        if (res.status === 201){
          this.setState({
            loggedIn: true
          })
          console.log("logged in with new account")
          console.log(this.state)
          return res.json()
        } 
        else alert("There has been some error")
    })
    .catch(error =>{
        console.error("There was an error", error)
    })
    this.getStats()
  }

  logout = () =>{
    fetch('/users/logout', {
        method: "GET",
        credentials: "include"
    })
    .then(res =>{
        if (res.status === 200) return res.json()
        else alert("There has been some error")
    })
    .then(data =>{
        this.setState({
            stats : [],
            username: '',
            password:'',
            loggedIn: false
        })
        console.log("logged out")
        console.log(this.state)
    })
    .catch(error =>{
        console.error("There was an error", error)
    })
  }

  addScore = () =>{
    console.log(this.state)
    fetch('/stats', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "date": this.state.scores.date,
            "hole": this.state.scores.hole,
            "location": this.state.scores.location,
            "score": this.state.scores.score,
            "putts": this.state.scores.putts,
        }),
        credentials: "include"
    })
    .then(res =>{
        if (res.status === 201) return res.json()
        else alert("There has been some error")
    })
    .catch(error =>{
        console.error("There was an error", error)
    })
  }
  render(){
    return(
      <div>
        <Login handleLogin={this.handleLogin} login={this.login} state={this.state} handleChange={this.handleChange}/>
        <Register handleRegister ={this.handleRegister} register={this.register} state={this.state} handleChange={this.handleChange}/>
        <Logout logout={this.logout} state={this.state}/>
        <Scorecard state={this.state}/>
        <NewScore handleChange={this.handleChange} state={this.state} handleAddScore={this.handleAddScore}/>
      </div>
    )
  }
}

export default App;
