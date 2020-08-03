import React from 'react';
import Logo from './Logo';
import NavigationLinks from '../NavigationLinks/NavigationLinks';
import {Link} from 'react-router-dom';


const NavBar = (props) => {
    return (
        <React.Fragment>
            <div id="navbarContainer">
                <Link to ="/items"><Logo /></Link>
                <NavigationLinks />
            </div>
        </React.Fragment>
    )
}

export default NavBar;