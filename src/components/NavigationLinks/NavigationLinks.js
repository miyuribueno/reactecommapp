import React, {useContext} from 'react';
import Cart from './Cart';
import Logout from './Logout';
import MyContext from '../../MyContext';



const Navigation = (props) => {
    const {userLoggedIn} = useContext(MyContext);
    return (
        <React.Fragment>
            <div id="navigationLinksContainer">
                <ul>
                    {
                        (userLoggedIn === '')?
                            <React.Fragment>
                                <div></div>
                            </React.Fragment>
                        :
                            <React.Fragment>
                                <li id="cart"><Cart /></li>
                                <li id="logOut"><Logout /></li>
                            </React.Fragment>
                    }
                </ul>
            </div>
        </React.Fragment>
    )
}

export default Navigation;