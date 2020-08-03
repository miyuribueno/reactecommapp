import React, { useContext } from 'react';
import Axios from 'axios';
class AddItem extends React.Component {

    state = {

            name: '',
            price: 0,
            image: '',
            description: '',
            anime: ''

    }

    inputChangeHandler = (event)=> {
        console.log(event.target.value)
        this.setState({

                [event.target.name]: event.target.value

        })
    }

    addItemClickHandler = ()=> {
        if(
            this.state.name === '' || 
            this.state.image === '' ||
            this.state.anime === ''
        ){
            alert("please fill up the form");
        }else {
            Axios.post('https://reactecommserver.herokuapp.com/items/addItem', {
                name: this.state.name,
                price: this.state.price,
                image: this.state.image,
                description: this.state.description,
                anime: this.state.anime
            })
            .then(res => {
                if(res.data.error){
                    alert(res.data.error);
                }else {
                    alert("Successfuly added an item!");
                    this.props.addItem(res.data)
                }
                this.setState({
                    item: {
                        name: '',
                        price: 0,
                        image: '',
                        description: '',
                        anime: ''
                    }
                })
            })
        }
    }
    render(){
            return (
            <div id="addItemContainer">
                <form id="addItemForm">
                    <label>Item Name:</label><input type="text" value={this.state.name} name="name" onChange={this.inputChangeHandler} placeholder="Enter item name" />
                    <label>Item Price:</label><input type="number" value={this.state.price} name="price" placeholder="Enter item price" onChange={this.inputChangeHandler} />
                    <label>Item Image:</label><input type="text" value={this.state.image} name="image" placeholder="Enter item image url" onChange={this.inputChangeHandler} />
                    <label>Item Description:</label><input type="text" value={this.state.description} name="description" placeholder="Enter item image url" onChange={this.inputChangeHandler} />
                    <label>Item Anime:</label><input type="text" value={this.state.anime} name="anime" placeholder="Enter item image url" onChange={this.inputChangeHandler} />
                </form>
                <button onClick={this.addItemClickHandler}>Add Item</button>
            </div>
        )
    }
}

export default AddItem;