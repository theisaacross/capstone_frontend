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
      date: '',
      hole:'',
      location: '',
      score:'',
      putts: ''
    }
  }

  getStats = () =>{
    fetch(baseURL + '/stats',{
      credentials: "include"
    })
    .then(res =>{
      return res.json()},
      err => console.log(err))
    .then(data => {this.setState({stats: data.data})
    }
    )
  }
  // componentDidMount(){
  //   this.getStats()
  // }
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
          this.getStats()
          return res.json()
        }
        else alert("There has been some error")
    })
    .catch(error =>{
        console.error("There was an error", error)
    })
    console.log(this.state.stats)
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
            loggedIn: true,
            date: '',
            hole:'',
            location: '',
            score:'',
            putts: ''
          })
          console.log("logged in with new account")
          console.log(this.state)
          this.getStats()
          return res.json()
        } 
        else alert("There has been some error")
    })
    .catch(error =>{
        console.error("There was an error", error)
    })
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
    fetch('/stats/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "date": this.state.date,
            "hole": this.state.hole,
            "location": this.state.location,
            "score": this.state.score,
            "putts": this.state.putts,
        }),
        credentials: "include"
    })
    .then(res =>{
        if (res.status === 201) return res.json()
        else alert("There has been some error")
    })
    .then(data =>{
      if (this.state.stats.length === 0){
        this.setState({
          stats: [data.data]
        })
        return
      }
      const copyStats = [...this.state.stats, data.data]
      this.setState({
        stats: copyStats
      })
      console.log(copyStats)
    })
    .catch(error =>{
        console.error("There was an error", error)
    })
  }
  render(){
    console.log(this.state)
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
