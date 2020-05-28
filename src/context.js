import React, { Component } from 'react';

import { storeProducts, DetailProduct, detailProduct } from "./data";
import { tsImportEqualsDeclaration } from '@babel/types';
import firebase from 'firebase';
import IdentityModal, { useIdentityContext, IdentityContextProvider } from 'react-netlify-identity-widget';

const ProductContext = React.createContext(); // context object

// Prpvider
class ProductProvider extends Component {
    state = {
        products: [],//storeProducts,
        myCartSavedItems: [],
        flashDeals: ["loading"],
        selectionTop: ["loading"],
        FeaturedBrands: ["loading"],
        MoreToLove: ["loading"],
        detailProduct: detailProduct,
        cart: [], //storeProducts,
        cartDbKeys: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0,
        itemSize: 0,
        cartItemsNum: 0,
        counter: 0,
        isLoggedIn: false,
        userName: "loading"
    }



    componentDidMount() { // life cycle method to push values from db t array "products"
        this.getProductsFromFB();
        this.getMyCartItemsFromDB();
        this.getFlashDealsFromDB();
        this.getSelectionTopFromDB();
        this.getFeaturedBrandsFromDb();
        this.getMoreToLoveProductsListFromDb();
    }


    getProductsFromFB = () => {
        const productsRef = firebase.database().ref('storeProducts');
        productsRef.on('value', (snapshot) => { // .on to listen to data changes, u can use ones to read on time on load
            let storeProducts = snapshot.val();
            let tempProducts = [];
            storeProducts.forEach(item => { // (...item : three dots means get values)
                const singleItem = { ...item };
                tempProducts = [...tempProducts, singleItem];
            })
            this.setState(() => {
                return { products: tempProducts }
            })
        });
    }

    getMyCartItemsFromDB() {
        const productsRef = firebase.database().ref('myCart');
        productsRef.on('value', (snapshot) => { // .on to listen to data changes, u can use ones to read on time on load
            let myCartProducts = snapshot.val();
            let tempProducts = [];
            var i = 0;
            if (myCartProducts != null) {
                myCartProducts.forEach(item => { // (...item : three dots means get values)
                    if (item.user === window.user) { // get cart item of the spicific user
                        tempProducts[i] = item; // myCartProducts;
                        i++;
                    }
                })
            }
            this.setState(() => {
                return {
                    cart: tempProducts,
                    cartItemsNum: i,
                    isLoggedIn: window.isUserAccountLoggedIn,
                    userName: window.userName
                }
            })
        });

    }
    getFlashDealsFromDB() {
        const productsRef = firebase.database().ref('flash-deals');
        let tempProducts = [];
        productsRef.once('value', (snapshot) => { // .on to listen to data changes, u can use ones to read on time on load
            let storeProducts = snapshot.val();

            this.setState(() => {
                return { flashDeals: storeProducts }
            })
        })
    }
    getSelectionTopFromDB() {
        const productsRef = firebase.database().ref('selectionTop');
        let tempProducts = [];
        productsRef.once('value', (snapshot) => { // .on to listen to data changes, u can use ones to read on time on load
            let storeProducts = snapshot.val();

            this.setState(() => {
                return { selectionTop: storeProducts }
            })
        })
    }
    getFeaturedBrandsFromDb() {
        const productsRef = firebase.database().ref('FeaturedBrands');
        let tempProducts = [];
        productsRef.once('value', (snapshot) => { // .on to listen to data changes, u can use ones to read on time on load
            let storeProducts = snapshot.val();

            this.setState(() => {
                return { FeaturedBrands: storeProducts }
            })
        })
    }
    getMoreToLoveProductsListFromDb() {
        const productsRef = firebase.database().ref('MoreToLoveProductsList');
        let tempProducts = [];
        productsRef.once('value', (snapshot) => { // .on to listen to data changes, u can use ones to read on time on load
            let storeProducts = snapshot.val();

            this.setState(() => {
                return { MoreToLove: storeProducts }
            })
        })
    }




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
        const TotalInMyCart = this.state.cartItemsNum + 1; // counts how many items added to your Cart


        const ItemToUpdate = firebase.database().ref('myCart/' + this.state.cartItemsNum);
        ItemToUpdate.set({
            user: window.user,
            id: id,
            price: product.price,
            category: product.category,
            company: product.company,
            img: product.img,
            title: product.title,
            total: product.total,
            count: product.count
        }).then(() => {
            console.log('Add to card Data is saved!');
        }).catch((e) => {
            console.log('Add to card Data Failed.', e);
        });

        // updating the state
        this.setState(() => {
            return {
                products: tempProducts,
                //   cart: [...this.state.cart, product],
                cartItemsNum: TotalInMyCart,

                counter: this.state.counter + 1 // index in the database 0,1,2...
            };
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

        //  const index = tempProducts.indexOf(this.getItem(id));
        // const remvedProduct = tempProducts[index];

        // remvedProduct.inCart = false;
        // remvedProduct.count = 0;
        // remvedProduct.total = 0;

        const TotalInMyCart = this.state.cartItemsNum - 1;

        const ItemToremove = firebase.database().ref('myCart');
        ItemToremove.remove();

        // and update the state
        this.setState(() => {
            return {
                cart: [...tempCart],
                products: [...tempProducts],
                cartItemsNum: TotalInMyCart
            }
        }, () => {
            this.addTotals();
        })

        const ItemToUpdate = firebase.database().ref('myCart');
        ItemToUpdate.set(tempCart).then(() => {
            console.log('Add to card Data is saved!');
        }).catch((e) => {
            console.log('Add to card Data Failed.', e);
        });
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
        this.state.cart.map(item => (subTotal += this.props.total)); // looping on the array (this.state.cart)
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
                    selectHandleChange: this.selectHandleChange,
                    getMyCartItemsFromDB: this.getMyCartItemsFromDB,
                    TotalInMyCart: this.TotalInMyCart
                }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

// consumer
const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };

