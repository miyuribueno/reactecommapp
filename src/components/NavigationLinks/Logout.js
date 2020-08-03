import React, { useContext } from 'react'
import MyContext from'../../MyContext';
import { Button } from '@material-ui/core';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const Logout = ()=> {
    const {logOutHandler} = useContext(MyContext);
    return (
        <div id="logOutContainer">
            <Link to="/">
                <Button onClick={logOutHandler} color="secondary" variant="contained"> 
                Log Out
                </Button>
            </Link>
        </div>
    )
}

export default Logout;