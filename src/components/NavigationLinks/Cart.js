import React, {useContext} from 'react';
import cartimg from '../../images/cart.png';
import MyContext from '../../MyContext';
import MyProvider from '../../MyProvider';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const Cart = (props) => {
    const {cartItems} = useContext(MyContext);
    let noOfItems = 0; 
    cartItems.map((item)=> {
        noOfItems += (item.qty)*1;       
    });
    return (
        <React.Fragment>
            <div id="cartContainer">
                <Link to="/myCart"><button><ShoppingCartIcon color="primary" fontSize="large" /></button></Link>
                <span>{noOfItems}</span>
            </div>
        </React.Fragment>
    )
}

export default Cart;