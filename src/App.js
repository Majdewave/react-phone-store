import React, { Component } from 'react';
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
import firebase from './firebase';

import IdentityModal, { useIdentityContext, IdentityContextProvider } from 'react-netlify-identity-widget';
import 'react-netlify-identity-widget/styles.css'
const url = "https://majd-react-store.netlify.com/" // supply the url of your Netlify site instance with Identity enabled. VERY IMPORTANT


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            words: [],
            powers: []
        };
    }

    componentDidMount() {
        const wordRef = firebase.database().ref('storeProducts');
        wordRef.on('value', (snapshot) => {
            let words = snapshot.val();
            let newState = [];
            for (let word in words) {
                newState.push({
                    id: word,
                    word: words[word].word
                });
            }
            this.setState({
                words: newState
            });
        });
    }


    render() {

        return (
            //   /* rest of your app *  /
            <div>
                <React.Fragment>
                    <Navbar />
                    <Switch>
                        <Route exact path="/" component={ProductList} />
                        <Route path="/Details" component={Details} />
                        <IdentityContextProvider url={url}>{ // authontication login
                            <AuthStatusView>
                                <Route path="/cart" component={Cart} />
                            </AuthStatusView>
                        }</IdentityContextProvider>
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



function AuthStatusView() {
    const identity = useIdentityContext()
    const [dialog, setDialog] = React.useState(false)
    const name =
        (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.full_name)
        || 'NoName'
    const isLoggedIn = identity && identity.isLoggedIn
    if (isLoggedIn) {
        return (
            <div>

                <button className="RNIW_btn" onClick={() => setDialog(true)}>
                    {isLoggedIn ? `Hello ${name}, Log out here!` : 'Log In'}
                </button>
                <Cart />

                <IdentityModal
                    showDialog={dialog}
                    onCloseDialog={() => setDialog(false)}
                    onLogin={(user) => console.log('hello ', user.user_metadata)} //this.props.history.push("/Cart")}
                    onSignup={(user) => console.log('welcome ', user.user_metadata)}
                    onLogout={() => console.log('bye ', name)}
                />

            </div >
        )
    }
    else {
        return (
            <div>
                <div>
                    <button className="RNIW_btn" onClick={() => setDialog(true)}>
                        {isLoggedIn ? `Hello ${name}, Log out here!` : 'Log In'}
                    </button>

                    {/* <HomePage /> */}
                </div>
                <IdentityModal
                    showDialog={dialog}
                    onCloseDialog={() => setDialog(false)}
                    onLogin={(user) => this.props.history.push("/Cart")}
                    onSignup={(user) => console.log('welcome ', user.user_metadata)}
                    onLogout={() => console.log('bye ', name)}
                />
            </div>
        )
    }
}


export default App;

