import React, {useContext} from 'react'
import MyContext from '../../MyContext';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { Button } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const MyCart = ()=> {
    const {cartItems, total, qtyChangeHandler,removeItemHandler} = useContext(MyContext);
    let noOfItems = 0; 
    cartItems.map((item)=> {
        noOfItems += item.qty;       
    });
    const items = cartItems.map((item)=> {
        return (
            <tr>
                <td><img src={item.image} /></td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td><input type="number" value={item.qty} min="1" max="10" onChange={(event)=> {qtyChangeHandler(event,item)}} /></td>
                <td>{item.subTotal}</td>
                <td><Button variant="contained" color="secondary" onClick={()=> {removeItemHandler(item)}}><DeleteForeverIcon /></Button></td>
            </tr>
        )
    })
    return (
        <div id="myCartContainer">
            <h1>My Cart</h1>
            {
                (cartItems.length === 0)?
                <h3>There are no Items in Cart</h3>
                :
                <table id="cartItemsTable">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Sub Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>No. of Items</th>
                            <th>TOTAL</th>
                        </tr>
                        <tr>
                            <td>{noOfItems}</td>
                            <td>P {total}</td>
                            <Link to='/checkout'><td><Button variant="contained" color="primary">Proceed to Checkout</Button></td></Link>
                            
                        </tr> 
                       
                    </tfoot>
                </table>
            }
            
            <Link to='/items'><td><Button variant="outlined" color="primary">Continue Shopping</Button></td></Link>  
        </div>
    )
}

export default MyCart;
