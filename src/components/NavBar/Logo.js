import React from 'react';
import logo from '../../images/logo.png';


const Logo = (props) => {
    return (
        <React.Fragment>
            <div id="logoContainer">
                <img src={logo} alt="company logo" />
                <span>COLLECTICLES</span>
            </div>
        </React.Fragment>
    )
}

export default Logo;