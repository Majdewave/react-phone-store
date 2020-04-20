import React, { Component } from 'react';
import CartItem from './CartItem';

import firebase from 'firebase';

function CartList({ value }) {
    var { cart } = value;
    // const { products } = value;

    const myCartItemIdFromDB = "";

    const productsRef = firebase.database().ref('myCart');
    productsRef.on('value', (snapshot) => { // .on to listen to data changes, u can use ones to read on time on load
        let myCartProducts = snapshot.val();
        let tempProducts = [];
        myCartProducts.forEach(item => { // (...item : three dots means get values)
            if (item.user === window.user) { // get cart item of the spicific user
                cart = myCartProducts;
                debugger;
            }
        })
    });

    return (
        <div className="container-fluid">
            {cart.map(item => {
                return <CartItem key={item.id} item={item} value={value} />
            })}
        </div>

    );
}

export default CartList;