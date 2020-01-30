import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import Details from './components/Details';
import Cart from './components/Cart';
import Default from './components/Default';
import Modal from './components/Modal';

class HomePage extends Component {
    render() {
        return (
            //   /* rest of your app *  /
            <div>
                <React.Fragment>
                    <Navbar />
                    <Switch>
                        <Route exact path="/" component={ProductList} />
                        <Route path="/Details" component={Details} />
                        <Route path="/cart" component={Cart} />
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

export default HomePage;

