import React, { Component } from 'react';
import firebase, { firestore } from 'firebase';
import { storeProducts, DetailProduct, detailProduct } from "./data";
import { tsImportEqualsDeclaration } from '@babel/types';

import IdentityModal, { useIdentityContext, IdentityContextProvider } from 'react-netlify-identity-widget';

const ProductContext = React.createContext(); // context object


// Prpvider
class ProductProvider extends Component {
    state = {
        products: ["loading"],//storeProducts,
        myCartSavedItems: [],
        flashDeals: ["loading"],
        selectionTop: ["loading"],
        FeaturedBrands: ["loading"],
        MoreToLove: ["loading"],
        WishListSideBarObj: ["loading"],
        wishList: [],
        detailProduct: [],
        filteredProducts: [],
        cart: [], //storeProducts,
        cartDbKeys: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0,
        itemSize: 0,
        cartItemsNum: 0,
        wishListItemIndex: 0,
        wishListIndex: 0,
        counter: 0,
        isLoggedIn: false,
        userName: "loading",
    }



    componentDidMount() { // life cycle method to push values from db t array "products"
        this.getProductsFromFB();
        this.getMyCartItemsFromDB();
        this.getFlashDealsFromDB();
        this.getSelectionTopFromDB();
        this.getFeaturedBrandsFromDb();
        this.getMoreToLoveProductsListFromDb();

        this.getWishListFromFB();
    }

    getProductsFromFB = () => {
        const productsRef = firebase.database().ref('storeProducts');
        // productsRef.child('0').child('itemSize').on('value', (snapshot) => { // .on to listen to data changes, u can use ones to read on time on load
        //     let test = snapshot.val();
        // });
        productsRef.on('value', (snapshot) => { // .on to listen to data changes, u can use ones to read on time on load
            let storeProducts = snapshot.val();
            let tempProducts = [];
            storeProducts.forEach(item => { // (...item : three dots means get values)
                const singleItem = { ...item };
                tempProducts = [...tempProducts, singleItem];
            })
            this.setState(() => {
                return {
                    products: tempProducts,
                    detailProduct: tempProducts
                }
            })
        });

        // firestore db
        const db = firebase.firestore();

        db.collection('myCart')
            .add({
                created: firebase.firestore.FieldValue.serverTimestamp(),
                users: [{ name: 'majd Test new' }]
            });


        db.collection('myCart').get().then((snapshot) => {

            snapshot.docs.forEach(doc => {
                let items = doc.data();

                /* Make data suitable for rendering */
                items = JSON.stringify(items);

                /* Update the components state with query result */
                this.setState({ items: items })
            });
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
        }).then(() => {
            console.log('MoreToLoveProduct have been loaded!');
            this.setState(() => {
                return { MoreToLove: storeProducts }
            })
        }).catch((e) => {
            console.log('Error getting MoreToLoveProduct', e);
        });
    }




    // find the exact item/[roduct] by ID , search in Products array in the state.
    getItem = (id) => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    }

    handleDetail = (id) => {
        const product = this.getItem(id); // get the spicific Item which you clicked and update the detailProduct object in data.js with the new product details.
        return product;
    }

    addToWishList = (ID) => {
        if (window.user !== undefined) {
            let tempProducts = [...this.state.products];
            const index = tempProducts.indexOf(this.getItem(ID));
            const product = tempProducts[index];

            if (product.wishListActive == true) {
                product.wishListActive = false;
            }
            else {
                product.wishListActive = true;
            }

            var wishListItemIndex = index;
            var filteredWishList;
            var IswishListItemExist = false;
            var itemIndexToRemove = 0;
            if (this.state.wishList["length"] > 0) {
                this.state.wishList.forEach(item => {
                    if (item.id === ID) {
                        IswishListItemExist = true;
                        filteredWishList = this.state.wishList.filter(item => item.id !== ID);
                    }
                });
            }
            if (!IswishListItemExist) {
                const ItemToUpdate = firebase.database().ref('wishList/' + this.state.wishListIndex);
                ItemToUpdate.set({
                    id: product.id,
                    user: window.user

                }).then(() => {
                    console.log('Add to wishList is saved!');
                }).catch((e) => {
                    console.log('Add to wishList Failed.', e);
                });

                // updating the state
                this.setState(() => {
                    return {
                        // products: tempProducts
                        wishListIndex: this.state.wishListIndex + 1,
                    };
                });
            }
            else {
                const ItemToremove = firebase.database().ref('wishList');
                ItemToremove.remove();

                const ItemToUpdate = firebase.database().ref('wishList');
                ItemToUpdate.set(filteredWishList).then(() => {
                    console.log('remove from wishList Data is saved!');
                }).catch((e) => {
                    console.log('remove from wishList Data Failed.', e);
                });

                this.setState(() => {
                    return {
                        // products: tempProducts
                        wishList: filteredWishList,
                    };
                });

            }
        }
    }

    getWishListFromFB = () => {
        if (window.user !== undefined) {
            const productsRef = firebase.database().ref('wishList').orderByChild("user").equalTo(window.user)
            productsRef.on('value', (snapshot) => { // .on to listen to data changes, u can use ones to read on time on load
                let storeProducts = snapshot.val();
                let tempProducts = [];
                if (storeProducts) {
                    storeProducts.forEach(item => { // (...item : three dots means get values)
                        const singleItem = { ...item };
                        tempProducts = [...tempProducts, singleItem];
                    })
                    this.setState(() => {
                        return {
                            wishList: tempProducts,
                            wishListIndex: tempProducts.length
                        }
                    })
                }
            });
        }
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

        this.removeItem(id, true)

        // and update the state
        this.setState(() => { return { cart: [...tempCart] } }, () => { this.addTotals() });

    }
    decrement = (id) => {
        // first : get the cartItems from the state
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id); // get the spicific item by id
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index]; // get the product in the spicific index

        if (product.count !== 1) {
            product.count = product.count - 1;
            this.removeItem(id, true)
        }
        else {
            product.total = product.count * product.price;
            // and update the state
            this.setState(() => { return { cart: [...tempCart] } }, () => { this.addTotals() });
        }
    }

    removeItem = (id, FromDrecrement) => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        if (FromDrecrement) {
        }
        else {
            tempCart = tempCart.filter(item => item.id !== id); //filter items in the cart object and return the items that do not match the current id

        }
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

        const ItemToremove = firebase.database().ref('myCart');
        ItemToremove.remove();

        this.setState(() => {
            return { cart: [] }
        }, () => {
            //this.setProducts(); // get the new fresh copy values from the objects from db
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

    filteredItems = (chosenSize) => {
        const productsRef = firebase.database().ref('storeProducts');
        let tempProducts = [];
        productsRef.on('value', (snapshot) => {
            let storeProducts = snapshot.val();
            storeProducts.forEach(item => {
                item.itemSize.forEach(size => {
                    if (size == chosenSize) {
                        const singleItem = { ...item };
                        tempProducts = [...tempProducts, singleItem];
                    }
                })
            })
        });
        return tempProducts;
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
                    addToWishList: this.addToWishList,
                    addToCart: this.addToCart,
                    openModal: this.openModal,
                    closeModal: this.closeModal,
                    increment: this.increment,
                    decrement: this.decrement,
                    removeItem: this.removeItem,
                    clearCart: this.clearCart,
                    selectHandleChange: this.selectHandleChange,
                    getMyCartItemsFromDB: this.getMyCartItemsFromDB,
                    getWishListFromFB: this.getWishListFromFB,
                    getProductsFromFB: this.getProductsFromFB,
                    filteredItems: this.filteredItems,
                    getFilteredProductsFromFB: this.getFilteredProductsFromFB,

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

