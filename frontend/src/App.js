import React, { Component } from 'react';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';

let baseURL = 'http://localhost:3000';


class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      stats : [],
      username : '',
      password: '',
      loggedIn: false
    }
  }

  getStats = () =>{
    fetch(baseURL + '/stats',{
      credentials: "include"
    })
    .then(data =>{
      return data.json()},
      err => console.log(err))
      .then(data => this.setState({stats: data}))
      console.log(this.state.stats)
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
          console.log(this.state)
          return res.json()
        }
        else alert("There has been some error")
    })
    .catch(error =>{
        console.error("There was an error", error)
    })
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

  render(){
    return(
      <div>
        <Login handleLogin={this.handleLogin} login={this.login} state={this.state} handleChange={this.handleChange}/>
        <Register handleRegister ={this.handleRegister} register={this.register} state={this.state} handleChange={this.handleChange}/>
        <Logout logout={this.logout} state={this.state}/>
      </div>
    )
  }
}

export default App;
