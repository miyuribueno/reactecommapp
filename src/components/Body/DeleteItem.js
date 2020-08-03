import React, { useContext } from 'react';
import MyContext from '../../MyContext';
import { Button } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


const DeleteItem = (props)=> {
    const { deleteBtnHandler, items } = useContext(MyContext);
    const allItems = items.map((item)=> {
        return (
            <React.Fragment>
                <tr>
                    <td><img src={item.image} /></td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td><Button variant="contained" color="secondary" onClick={()=> {deleteBtnHandler(item)}} name={JSON.stringify(item)}><DeleteForeverIcon /></Button></td>
                </tr>
            </React.Fragment>
        )
    })
        
    return (
        <div id="editItemContainer">
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    allItems
                    }
                </tbody>
            </table>
        </div>
    )
}

export default DeleteItem;