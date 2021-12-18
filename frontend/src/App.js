import "./App.css"
import React, { Component } from 'react';
import Login from './Login';
import Logout from './Logout';
import NewScore from './NewScore';
import Register from './Register';
import Scorecard from './Scorecard';
import EditScore from './EditScore.js'

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
      putts: '',
      id: undefined,
      editForm: false,
      loginForm: false,
      newForm: false,
      currentID: undefined,
      foundID: undefined
    }
  }
  toggleForm = () =>{
    if (this.state.loginForm === true){
      this.setState({
        loginForm: false
      })
    }else{
      this.setState({
        loginForm: true
      })
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
    let {name,value} = e.target
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
    e.target.date.value =''
    e.target.hole.value =''
    e.target.location.value =''
    e.target.score.value =''
    e.target.putts.value =''
    this.setState({
      newForm: false
    })
  }

  handleEditScore = (id)  =>{
    // e.preventDefault()
    this.setState({
      editForm: false
    })
    this.findScore(id)
    this.editScore(id)
  }

  toggleNewForm = () =>{
    if (this.state.newForm === true){
      this.setState({
        newForm: false
      })
    }else{
      this.setState({
        newForm: true
      })
    }
  }
  toggleEditForm = (id) =>{
    if (this.state.editForm === true){
      this.setState({
        editForm: false,
        currentID: id
      })
    }else{
      this.setState({
        editForm: true,
        currentID: id
      })
    }
  }
  findScore = (id) =>{
    for (let i = 0; i <= this.state.stats.length; i++){
      if (this.state.stats[i].id === id){
        this.setState({
          foundID: this.state.stats[i].id
        })
      }
    }
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
          this.getStats()
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
            loggedIn: true,
            date: '',
            hole:'',
            location: '',
            score:'',
            putts: ''
          })
          console.log("logged in with new account")
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
    })
    .catch(error =>{
        console.error("There was an error", error)
    })
  }

  addScore = () =>{
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
            "id":this.state.id
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
        stats: copyStats,
      })
    })
    .catch(error =>{
        console.error("There was an error", error)
    })
  }
  refreshPage = () => {
    this.setState(
      {reload: true},
      () => this.setState({reload: false})
    )
  }

  deleteScore = (id) =>{
    fetch(baseURL + '/stats/' + id,{
      method: "DELETE",
      credentials: "include"
    })
    .then(res =>{
      return res.json()},
      err => console.log(err))
    .then(data =>{
      for (let i = 0; i < this.state.stats.length; i++){
        if (this.state.stats[i].id === id){
          this.state.stats.splice(this.state.stats[i],1)
        }
      }
      this.refreshPage()
    })
  }
  editScore = (id) =>{
    // e.preventDefault()
    console.log(id)
    fetch('/stats/' + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "date": this.state.date,
            "hole": this.state.hole,
            "location": this.state.location,
            "score": this.state.score,
            "putts": this.state.putts,
            "id":this.state.id
        }),
        credentials: "include"
    })
    .then(res =>{
      if (res.status === 200) return res.json()
      else alert("There has been some error")
    })
    .then(data =>{
      if (this.state.stats.length === 0){
        this.setState({
          stats: [data.data]
        })
        return
      }
      
      const copyStats = [...this.state.stats]
      const findIndex = this.state.stats.findIndex(score => score.id === data.data.id)

      // console.log(JSON.stringify(data))
      // console.log(JSON.stringify(data.data))
      // console.log(JSON.stringify(data.data.id))

      copyStats[findIndex].date = data.data.date
      copyStats[findIndex].hole = data.data.hole
      copyStats[findIndex].location = data.data.location
      copyStats[findIndex].score = data.data.score
      copyStats[findIndex].putts = data.data.putts
      // alert(copyStats)
      this.setState({
        stats: copyStats,
        editForm: false
      })
    })
    .catch(error =>{
        console.error("There was an error", error)
    })
    this.refreshPage()
  }


  render(){
    if (this.state.loggedIn !== true){
      return(
        <div className="login">
          {(this.state.loginForm ? <Login handleLogin={this.handleLogin} login={this.login} state={this.state} handleChange={this.handleChange} toggleForm={this.toggleForm}/> 
          :<Register handleRegister ={this.handleRegister} register={this.register} state={this.state} handleChange={this.handleChange} toggleForm={this.toggleForm}/>)}
        </div>
      )
    }
    return(
      < >
      <div className="page">
        {/* <div className="login">
          {(this.state.loginForm ? <Login handleLogin={this.handleLogin} login={this.login} state={this.state} handleChange={this.handleChange} toggleForm={this.toggleForm}/> 
          :<Register handleRegister ={this.handleRegister} register={this.register} state={this.state} handleChange={this.handleChange} toggleForm={this.toggleForm}/>)}
        </div> */}
        
        <Logout logout={this.logout} state={this.state}/>
        <NewScore handleChange={this.handleChange} state={this.state} handleAddScore={this.handleAddScore} toggleNewForm={this.toggleNewForm}/> 
        <Scorecard state={this.state} stats={this.state.stats} deleteScore={this.deleteScore} toggleEditForm={this.toggleEditForm} handleChange={this.handleChange}/>
        <EditScore state={this.state} handleEditScore={this.handleEditScore}  handleChange={this.handleChange} toggleEditForm={this.toggleEditForm}/>
        </div>
      </>
    )
  }
}

export default App;
