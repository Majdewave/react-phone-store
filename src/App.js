import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import HomePage from './components/HomePage'
import Details from './components/Details';
import Cart from './components/Cart';
import Default from './components/Default';
import Modal from './components/Modal';
import firebase from './firebase';


import IdentityModal, { useIdentityContext, IdentityContextProvider } from 'react-netlify-identity-widget';
import 'react-netlify-identity-widget/styles.css'
const url = "https://majd-react-store.netlify.app" // supply the url of your Netlify site instance with Identity enabled. VERY IMPORTANT


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            CheckIfLoggedIn: false,
        };
    }


    render() {
        return (
            //   /* rest of your app *  /
            <div>
                <React.Fragment>
                    <Navbar />
                    <Switch>
                        <Route exact path="/" component={HomePage} />  {/* ProductList */}
                        <Route path="/Details" component={Details} />
                        <Route path="/cart" component={Cart} />
                        <Route path="/ProductList" component={ProductList} />
                        {/* <IdentityContextProvider url={url}>{ // authontication login
                            <AuthStatusView>
                                <Route path="/cart" component={Cart} />
                            </AuthStatusView>
                        }</IdentityContextProvider> */}
                        <Route component={Default} />
                    </Switch>
                    <Footer />
                    <Modal />
                    {/* <ProductList />
        <Details />
        <Cart />
        <Default />  "I moved this component inside the router for making navigation by swich and router" */}
                </React.Fragment>
            </div>
        );
    }
}

export default App;
