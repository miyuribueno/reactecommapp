import React, {useContext} from 'react';
import MyContext from '../../MyContext';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import { Button } from '@material-ui/core';
  import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
function Checkout() {
    const {cartItems, total, shippingFee, removeItemHandler, placeOrderHandler} = useContext(MyContext);
    let noOfItems = 0; 
    cartItems.map((item)=> {
        noOfItems += item.qty;       
    });
    let subTotal = 0;
    cartItems.map((item)=> {
        subTotal += item.subTotal;
    })

    let checkOutTotal = subTotal + shippingFee;

    const items = cartItems.map((item)=> {
        return (
            <tr>
                <td><img src={item.image} /></td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.qty}</td>
                <td><Button variant="contained" color="secondary" onClick={()=> {removeItemHandler(item)}}><DeleteForeverIcon /></Button></td>
            </tr>
        )
    })
    return (
        <div id="checkOutContainer">
            
            <h1>Checkout</h1>
            {
            (cartItems.length === 0)?
                <h3>There are no Items in Cart</h3>
            :
            <div id="checkOutTableContainer">
                <table id="checkOutTable">
                    <thead>
                        <tr>
                            <th>{noOfItems} Items</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Qty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </table>
                <table id="orderSummaryTable">
                    <tbody>
                        <tr>
                            <th><h2>Order Summary</h2></th>
                        </tr>
                        <tr>
                            <td>Subtotal</td>
                            <td>P {subTotal}</td>
                        </tr>
                        <tr>
                            <td>Shipping fee</td>
                            <td>P {shippingFee}</td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td>P {checkOutTotal}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <Button variant="contained" color="secondary" onClick={()=> {placeOrderHandler(checkOutTotal)}}>Place Order</Button>
                    </tfoot>
                    <Link to='/myCart'><td><Button variant="contained" color="primary">Back to Cart</Button></td></Link>
                    <Link to='/items'><td><Button variant="contained" color="primary">Continue Shopping</Button></td></Link>
                </table>
            </div>
            }
        </div>
    )
}

export default Checkout;
