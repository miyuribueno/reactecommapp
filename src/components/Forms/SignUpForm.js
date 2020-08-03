import React from 'react';
import Axios from'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


class SignUpForm extends React.Component {

    state = {
        username: '',
        password: '',
        confirmPassword: ''
    }

    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    register = () => {
        if(this.state.username.trim() === '' || this.state.password.trim() === '' || this.state.confirmPassword.trim() === ''){
            alert("please fill up the form");
        }else {

            Axios.post('https://reactecommserver.herokuapp.com/users/signUp',{
            username: this.state.username,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            }).then(res => {
                if(res.data.error){
                    alert(res.data.error);
                }else {
                    alert("Registered!");
                }
                this.setState({
                    username: '',
                    password: '',
                    confirmPassword: ''
                })
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="form">
                    <h2 className="title">Sign Up</h2>
                    Username: <input type="text" value={this.state.username} name="username" onChange={this.inputChangeHandler} />
                    Password: <input type="password" value={this.state.password} name="password" onChange={this.inputChangeHandler} />
                    Password: <input type="password" value={this.state.confirmPassword} name="confirmPassword" onChange={this.inputChangeHandler} />
                    <button onClick={this.register} className="formBtn">Register</button>
                    <Link to="/signIn">Sign In</Link>
                </div>
            </React.Fragment>
        )
    }
}

export default SignUpForm;