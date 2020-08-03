import React, { useContext } from 'react';
import MyContext from '../../MyContext';
import ItemCard from './ItemCard';
import Filter from './Filter';
import MyCart from './MyCart';
import Checkout from './Checkout';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import AddItem from './AddItem';
import EditItem from './EditItem';
import DeleteItem from './DeleteItem';
const Body = (props) => {
    const {items, cartItems, userLoggedIn, deleteBtnHandler, doneBtnHandler} = useContext(MyContext);
    const allItems = items.map((item)=> {
        return (
            <ItemCard item={item}/>
        )
    })
    return (
        <React.Fragment>
            {
            (userLoggedIn === '')?
            <div></div>
            :
            <div id="bodyContainer">
                    <Route path="(/|/items)" exact>
                        <Filter />
                        <div id="itemCardContainer">
                            {allItems}
                        </div>
                    </Route>
                    <Route path="/mycart" exact>
                        <MyCart cartItems={cartItems}/>
                    </Route>
                    <Route path="/checkout" exact>
                        <Checkout />
                    </Route>
                    <Route path="/addItems" exact>
                        <Filter />
                        <AddItem addItem={props.addItem} />
                    </Route>
                    <Route path="/editItems" exact>
                        <Filter />
                        <EditItem  items={items} doneBtnHandler={doneBtnHandler}/>
                    </Route>
                    <Route path="/deleteItems" exact>
                        <Filter />
                        <DeleteItem  items={items} deleteBtnHandler={deleteBtnHandler}/>
                    </Route>
            </div>
            }
        </React.Fragment>
    )
}

export default Body;