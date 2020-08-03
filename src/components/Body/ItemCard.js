import React, { useContext } from 'react';
import MyContext from '../../MyContext';
import { Button, MenuItem } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';


const ItemCard = (props) => {
    const {addToCartHandler} = useContext(MyContext);
    return (
        <div className="itemCard">
            <div className="itemCardImageContainer">
                <img src={props.item.image} />
            </div>
            <div className="itemCardDetailsContainer">
                <div>{props.item.name}</div>
                <div>P {props.item.price}</div>
                <Button onClick={()=> {addToCartHandler(props.item)}} variant="contained" color="primary" aria-label="add to shopping cart">
                    <AddShoppingCartIcon />
                </Button>
                {/* <button className="btn" onClick={()=> {addToCartHandler(props.item)}}>Add to Cart</button> */}
            </div>
        </div>
    )
}


export default ItemCard;