import React, { Component } from 'react';

import { storeProducts, DetailProduct, detailProduct } from "./data";
import { tsImportEqualsDeclaration } from '@babel/types';


const ProductContext = React.createContext(); // context object


// Prpvider
class ProductProvider extends Component {
    state = {
        products: [],//storeProducts,
        detailProduct: detailProduct,
        cart: [], //storeProducts,
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0,
        itemSize: 0
    }

    componentDidMount() { // life cycle method to push vlues from db t array "products"
        this.setProducts(); //calling setProducts method to getting the copy of the values not the reference
    }
    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item => { // (...item : three dots means get values)
            const singleItem = { ...item };
            tempProducts = [...tempProducts, singleItem];
        })
        this.setState(() => {
            return { products: tempProducts }
        })
    };


    // find the exact item/[roduct] by ID , search in Products array in the state. 
    getItem = (id) => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    }

    handleDetail = (id) => {
        const product = this.getItem(id); // get the spicific Item which you clicked and update the detailProduct object in data.js with the new product details.
        this.setState(() => {
            return { detailProduct: product }
        })
    }
    addToCart = (id) => {
        let tempProducts = [...this.state.products]; // this gonna give ass the access to all the products
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        // updating detild in the product array
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        product.itemSize = this.state.products.itemSize;
        // updating the state
        this.setState(() => {
            return { products: tempProducts, cart: [...this.state.cart, product] };
        },
            () => {
                this.addTotals();
            }
        );
    };

    openModal = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return { modalProduct: product, modalOpen: true }
        })
    }

    closeModal = () => {
        this.setState(() => {
            return { modalOpen: false }
        })
    }

    increment = (id) => {
        // first : get the cartItems from the state
        let tempCart = [...this.state.cart]
        const selectedProduct = tempCart.find(item => item.id === id); // get the spicific item by id
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index]; // get the product in the spicific index
        product.count += 1;
        product.total = product.total + product.price;

        // and update the state
        this.setState(() => { return { cart: [...tempCart] } }, () => { this.addTotals() });

    }
    decrement = (id) => {
        // first : get the cartItems from the state
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id); // get the spicific item by id
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index]; // get the product in the spicific index
        product.count = product.count - 1;

        if (product.count === 0) {
            this.removeItem(id)
        }
        else {
            product.total = product.count * product.price;
            // and update the state
            this.setState(() => { return { cart: [...tempCart] } }, () => { this.addTotals() });
        }
    }

    removeItem = (id) => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !== id); //filter items in the cart object and return the items that do not match the current id
        const index = tempProducts.indexOf(this.getItem(id));
        const remvedProduct = tempProducts[index];

        remvedProduct.inCart = false;
        remvedProduct.count = 0;
        remvedProduct.total = 0;

        // and update the state
        this.setState(() => {
            return {
                cart: [...tempCart],
                products: [...tempProducts]
            }
        }, () => {
            this.addTotals();
        })
    }
    clearCart = () => {
        this.setState(() => {
            return { cart: [] }
        }, () => {
            this.setProducts(); // get the new fresh copy values from the objects from db
            this.addTotals();
        });
    }

    addTotals = () => {
        let subTotal = 0;
        this.state.cart.map(item => (subTotal += item.total)); // looping on the array (this.state.cart)
        const tempTax = subTotal * 0.1;  // i chosed tax= 0.1 
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        // now we want to have them in the state
        this.setState(() => {
            return {
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })
    }

    selectHandleChange = (selectedValue) => {
        console.log("select size changed", selectedValue);

        // update the value in the state
        this.setState(() => {
            return { itemSize: selectedValue }
        })
    }
    render() {
        return ( // method available in the consumer
            <ProductContext.Provider
                value={{
                    ...this.state,
                    handleDetail: this.handleDetail,
                    addToCart: this.addToCart,
                    openModal: this.openModal,
                    closeModal: this.closeModal,
                    increment: this.increment,
                    decrement: this.decrement,
                    removeItem: this.removeItem,
                    clearCart: this.clearCart,
                    selectHandleChange: this.selectHandleChange
                }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

// consumer
const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };

