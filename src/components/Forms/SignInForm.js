import React from 'react';
import Axios from'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class SignInForm extends React.Component {

    state = {
        username: '',
        password: '',
    }

    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    signIn = (userDetails) => {

        if(this.state.username.trim() === '' || this.state.password.trim() === ''){
            alert("please fill up the form");
        }else {

            Axios.post('https://reactecommserver.herokuapp.com/users/signIn', userDetails)
            .then(res => {
                if(res.data.error){
                    alert("Invalid username/password")
                    alert(res.data.error);
                }else {
                    alert(`Welcome ${res.data.username}`);
                    this.props.userLoggedInHandler(res.data);
                    localStorage.setItem("user", res.data);
                }
                this.setState({
                    username: '',
                    password: '',
                })
            })
        }
    }

    render() {
        const userDetails = {
            username: this.state.username,
            password: this.state.password,
        }
        return (
            <React.Fragment>
                <div className="form">
                    <h2 className="title">Sign In</h2>
                    Username: <input type="text" value={this.state.username} name="username" onChange={this.inputChangeHandler} />
                    Password: <input type="password" value={this.state.password} name="password" onChange={this.inputChangeHandler} />
                    <button onClick={(e)=>{this.signIn(userDetails)}} className="formBtn">Sign In</button>
                    <Link to="/signUp">Sign up</Link>
                </div>
            </React.Fragment>
        )
    }
}

export default SignInForm;