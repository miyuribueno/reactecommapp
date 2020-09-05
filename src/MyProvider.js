import React from 'react';
import MyContext from './MyContext';
import NavBar from './components/NavBar/NavBar';
import Forms from './components/Forms/Forms';
import Body from './components/Body/Body';
import Axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
// import Axios from 'axios';
class MyProvider extends React.Component {
    userLoggedInHandler = (user)=> {
      console.log(user._id,user.role)
      localStorage.setItem("role", user.role);
        this.setState({
            userLoggedIn: user._id,
            userRole: user.role
        })
        console.log(this.state.userRole)
    }

    updateItems = (items)=> {
      this.setState({
        items: items
      })
    }

    filterQueryHandler = (event)=> {
        console.log(event.target.name);
        console.log(event.target.value);
        let details = {
            [event.target.name]: event.target.value
        }
        // console.log(event.target.value);
        // console.log(event.target.name);
        Axios.post('https://reactecommserver.herokuapp.com/items/filter, details)
        .then(res => {
          let items = [...res.data];
          this.setState({
            items: items
          });
        });
      }

    updateTotal = (cartItems)=> {
      let newTotal = 0;
      cartItems.map((item)=> {
        newTotal += item.subTotal 
      })
  
      this.setState({
        total: newTotal
      })
    }

    deleteBtnHandler = (item)=> {
      let id = item._id;
      Axios.delete(`https://reactecommserver.herokuapp.com/items/deleteItem/${id}`)
      .then(res => {
        console.log(res.data._id)
        const items = [...this.state.items];
        items.map((item,i)=> {
          if(item._id === res.data._id){
            items.splice(i,1);
          }
        })
        this.setState({
          items: items
        })
      })

    }
    
    doneBtnHandler = (item)=> {
      let id = item._id;
      console.log(item)
      alert("Successfully edited an item")
      Axios.put(`https://reactecommserver.herokuapp.com/items/editItem/${id}`, {
        name: item.name,
        price: item.price,
        image: item.image,
        description: item.description,
        anime: item.anime
      })
      Axios('https://reactecommserver.herokuapp.com/items/all')
        .then(res => {
          let items = [...res.data];
          this.setState({
            items: items,
          });
        });
    }

    logOutHandler = ()=> {
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      localStorage.removeItem("cartItems");
      this.setState({
        userLoggedIn: localStorage.getItem("user")? localStorage.getItem("user"): ''
      })
    }

    removeItemHandler = (itemClicked)=> {
      let items = [...this.state.cartItems];
      const itemIndex = this.state.cartItems.findIndex((item) => {
        return item._id === itemClicked._id;
      });

      items.splice(itemIndex,1);
      this.setState({
        cartItems: items
      })
    }

    qtyChangeHandler = (event, itemClicked)=> {
      let cartItems = [...this.state.cartItems];
      cartItems.map((item)=> {
        if (itemClicked._id === item._id) {
          item.qty = event.target.value;
          item.subTotal = item.price * item.qty;
        }
      })
      this.setState({
        cartItems: cartItems
      })
      this.updateTotal(cartItems);
  }

    addToCartHandler = (itemClicked)=> {
      console.log(this.state.cartItems)
      console.log(itemClicked._id)

      const newCartItem = {
        ...itemClicked,
      }
      let newTotal = 0;
      let cartItems = [...this.state.cartItems];
      const itemIndex = this.state.cartItems.findIndex((item) => {
        return item._id === itemClicked._id;
      });
      console.log(itemIndex)

        if (itemIndex > -1) {
          cartItems[itemIndex].qty = (cartItems[itemIndex].qty)*1 + 1;
          cartItems[itemIndex].subTotal += newCartItem.price;
          newTotal = cartItems[itemIndex].qty * newCartItem.price;
        } else {
          newCartItem.qty = 1;
          newCartItem.subTotal = newCartItem.price;
          cartItems = [...this.state.cartItems, newCartItem];
        };
        this.setState({
          cartItems: cartItems 
        });

        this.updateTotal(cartItems)
        let storeCartItems = JSON.stringify(cartItems);
        localStorage.setItem("cartItems", storeCartItems );
      };

      resetState = ()=> {
        this.setState({
          total: 0,
          checkOutTotal: 0,
          cartItems: [],
          noOfItems: 0
        })
      }

      addItem = (newItem)=> {
        this.setState({
          items: [...this.state.items, newItem]
        })
      }

      placeOrderHandler = (total)=> {
        Axios.post('https://reactecommserver.herokuapp.com/orders', {
          user: this.state.userLoggedIn,
          total: total,
          items: this.state.cartItems
        })
        alert("Order has been placed Successfuly")
        this.resetState();
      }
    getCartItems = ()=> {
     let cartItems = localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")): [];
     let userRole = localStorage.getItem("role")? localStorage.getItem("role"): '';
     console.log(userRole)
      this.setState({
        cartItems: cartItems,
        userRole: userRole
      })
    }

    state = {
      userLoggedIn: localStorage.getItem("user")? localStorage.getItem("user"): '',
      userRole: '',
      total: 0,
      checkOutTotal: 0,
      shippingFee: 150,
      items: [],
      cartItems: [],
      noOfItems: 0,
      removeItemHandler: this.removeItemHandler,
      logOutHandler: this.logOutHandler,
      filterQueryHandler: this.filterQueryHandler,
      addToCartHandler: this.addToCartHandler,
      userLoggedInHandler: this.userLoggedInHandler,
      qtyChangeHandler: this.qtyChangeHandler,
      placeOrderHandler: this.placeOrderHandler,
      deleteBtnHandler: this.deleteBtnHandler,
      doneBtnHandler: this.doneBtnHandler
      
    }

    updateCheckOutTotal = ()=> {
      let checkOutTotal = this.state.total + this.state.shippingFee;
      this.setState({
        checkOutTotal: checkOutTotal
      })
    }
 
    componentDidMount(){
            console.log("component did mount")
        this.getCartItems();
        Axios('https://reactecommserver.herokuapp.com/items/all')
        .then(res => {
          let items = [...res.data];
          this.setState({
            items: items,
          });
        });
      }  

      render() {
          console.log(this.state.userLoggedIn, this.state.userRole)
        return (
            <MyContext.Provider value={this.state}>
                    {
                    (this.state.userLoggedIn === '')?
                    <React.Fragment>
                      <NavBar />
                      <Forms userLoggedInHandler={this.userLoggedInHandler}/>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <NavBar />
                        <Body addItem={this.addItem} updateItems={this.updateItems} deleteBtnHandler={this.deleteBtnHandler}/>
                    </React.Fragment>
                    }
            </MyContext.Provider>
        )
    }
}

export default MyProvider;

// [
//     {
//         name: 'One Piece Battle Record Collection Sanji',
//         price: 880,
//         image: "https://ph-test-11.slatic.net/shop/ad78c03b0fbef0b557673a9e727621ef.jpeg",
//         description: "asdasdaasdvasdvasdvasvd asdasdaasdvasdvasdvasvd",
//         anime: "One Piece"
//     },
//     {
//         name: 'Bandai [015] Rg 1/144 Gundam Exia',
//         price: 1808,
//         image: "https://my-live-01.slatic.net/p/42facfb0f84afddb004be1b0d504d6e1.jpg",
//         description: "asdasdaasdvasdvasdvasvd",
//         anime: "Gundam"
//     },
//     {
//         name: 'Bandai [022] Hgbd 1/144 Gundam Shining Break',
//         price: 2031,
//         image: "https://my-live-01.slatic.net/p/93afaf15194ed561df0b685248a55411.jpg",
//         description: "asdasdaasdvasdvasdvasvd",
//         anime: "Gundam"
//     },
//     {
//         name: 'Bandai [028] Hgibo 1/144 Gundam Flauros (Ryusei-Go)',
//         price: 1741,
//         image: "https://my-live-01.slatic.net/p/bac9e3158a86841ffbe55a3b336f39ec.jpg",
//         description: "asdasdaasdvasdvasdvasvd",
//         anime: "Gundam"
//     },
//     {
//         name: '',
//         price: 567,
//         image: "",
//         description: "asdasdaasdvasdvasdvasvd",
//         anime: "One Piece"
//     },
//     {
//         name: 'Bandai [019] Hgbd 1/144 Gundam Love Phantom ',
//         price: 1988,
//         image: "https://my-live-01.slatic.net/p/774c15cd1cda4ba7407480d11ea7ba42.jpg",
//         description: "asdasdaasdvasdvasdvasvd",
//         anime: "Gundam"
//     },
//     {
//         name: 'One Piece Grandship Grand ship Assembled DIY Model Toy Collection',
//         price: 567,
//         image: "https://ph-live-01.slatic.net/p/859d1df078c89e7f9201a69ed22a2800.jpg",
//         description: "asdasdaasdvasdvasdvasvd",
//         anime: "One Piece"
//     },
//     {
//         name: 'One Piece Portgas D. Ace Battle Version Collectible Figure',
//         price: 550,
//         image: "https://ph-live-01.slatic.net/p/d0e1bfc7039491d64d93dda00a7a21e4.jpg",
//         description: "asdasdaasdvasdvasdvasvd",
//         anime: "One Piece"
//     },
//     {
//         name: 'One Piece King of Artist Bound Man Gear Fourth KO PVC Action Figure',
//         price: 600,
//         image: "https://ph-live-01.slatic.net/p/a1f40d8f338fca5b2576cd3283943e24.jpg",
//         description: "asdasdaasdvasdvasdvasvd",
//         anime: "One Piece"
//     },
//     {
//         name: 'One Piece Monkey D Luffy King Of Artist KO Action Figure',
//         price: 650,
//         image: "https://ph-live-01.slatic.net/p/3ff16fff58aaec25d59ea9ce11cd769b.jpg",
//         description: "asdasdaasdvasdvasdvasvd",
//         anime: "One Piece"
//     },
//     {
//         name: '',
//         price: 567,
//         image: "",
//         description: "asdasdaasdvasdvasdvasvd",
//         anime: "One Piece"
//     },
//     {
//         name: 'Black One Piece Film Gold High Quality Collectibles Action Figures Perfect for Gifts (Set of 3)',
//         price: 759,
//         image: "https://ph-test-11.slatic.net/shop/bce358a01a0e66491d5ba74df8308595.png",
//         description: "asdasdaasdvasdvasdvasvd",
//         anime: "One Piece"
//     },
//     {
//         name: 'Bandai [032] Rg 1/144 V Gundam / Nu Gundam',
//         price: 2455,
//         image: "https://my-live-01.slatic.net/p/482d32fa80b54a6abf22f354a7d1d94a.jpg",
//         description: "asdasdaasdvasdvasdvasvd",
//         anime: "Gundam"
//     },
//     {
//         name: 'Bandai Mg 1/100 Gundam Astray Red Frame Kai',
//         price: 3232,
//         image: "https://my-live-02.slatic.net/p/4a3fbff2d87da64eb9efffa0f498f0a2.jpg",
//         description: "asdasdaasdvasdvasdvasvd",
//         anime: "Gundam"
//     },
//     {
//         name: 'Bandai Gundam Mg 1/100 Mk-2 Mk2 Mkii Mobile Suit Assemble Model Kits Action Figures Plastic Model',
//         price: 3465,
//         image: "https://my-live-01.slatic.net/p/7115d9e316389e68f01bc51727e19f56.jpg",
//         description: "asdasdaasdvasdvasdvasvd",
//         anime: "Gundam"
//     },
// ]
