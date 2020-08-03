import React from 'react';
import Axios from 'axios';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

class EditItem extends React.Component {
    state = {
        name: '',
        price: 0,
        image: '',
        description: '',
        anime: '',
        _id: '',
        isEditClicked: false
    }
    inputChangeHandler = (event)=> {
        console.log(event.target.value)
        this.setState({

            [event.target.name]: event.target.value

        })
    }

    editBtnHandler = (e)=> {
       let item = JSON.parse(e.target.name);
       this.setState({
           name: item.name,
           price: item.price,
           image: item.image,
           description: item.description,
           anime: item.anime,
           _id: item._id,
           isEditClicked: true
       })
    }

    doneBtn = ()=> {
        let updatedItems = {
            name: this.state.name,
            price: this.state.price,
            image: this.state.image,
            description: this.state.description,
            anime: this.state.anime,
            _id: this.state._id
        }
        this.props.doneBtnHandler(updatedItems);
        this.setState({
            isEditClicked: false
        })

    }

    // deleteBtnHandler = ()=> {
    //     alert("Successfully deleted an item")
    //     Axios.delete(`http://localhost:8080/items/deleteItem`, 
    //       {
    //         name: this.state.name,
    //        }
    //     )
    //     .then(res => {
    //       let items = this.props.items.filter((item)=>{
    //           return (item.name !== res.data.name)
    //       })
    //       this.props.updateItems(items);
    //     });
    //     this.setState({
    //         isEditClicked: false
    //     })
    // }
    
    render(){
        console.log(this.state.itemSelected); 
        const allItems = this.props.items.map((item)=> {
            return (
                <React.Fragment>
                    <tr>
                        <td><img src={item.image} /></td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td><Button variant="contained" color="primary" onClick={this.editBtnHandler} name={JSON.stringify(item)}><EditIcon /></Button></td>
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
                            (this.state.isEditClicked === false)?
                            allItems
                            :
                            <tr>
                                <td><input type="text" name="image" value={this.state.image} onChange={this.inputChangeHandler} /></td>
                                <td><input type="text" name="name" value={this.state.name} onChange={this.inputChangeHandler} /></td>
                                <td><input type="text" name="price" value={this.state.price} onChange={this.inputChangeHandler} /></td>
                                <td><input type="text" name="description" value={this.state.description} onChange={this.inputChangeHandler} /></td>
                                <td><input type="text" name="anime" value={this.state.anime} onChange={this.inputChangeHandler} /></td>
                                <td><button onClick={this.doneBtn}>Done</button></td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default EditItem;