import React, { Component } from 'react';

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
           username : '',
           password: ''
        }
    }

    handleChange = (e) =>{
        const {name,value} = e.target
        this.setState({[name]:value})
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        this.login()
    }

    login = () =>{
        console.log(this.baseURL)
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
            if (res.status === 200) return res.json()
            else alert("There has been some error")
        })
        .then(data =>{
            console.log(data)
            this.props.getStats()
        })
        .catch(error =>{
            console.error("There was an error", error)
        })
      }
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit} action='http://localhost:3000/user/login' method="POST">
                <input type="username" name="username" placeholder="username" required onChange={this.handleChange}></input>
                <input type="password" name="password" placeholder="password" required onChange={this.handleChange}></input>
                <button onSubmit={this.handleSubmit} type="submit">Login</button>
                </form>
            </div>
        )
    }
}


// "data": [
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