import React, { Component } from 'react';

import HomePage from './HomePage.js';

import IdentityModal, { useIdentityContext, IdentityContextProvider } from 'react-netlify-identity-widget';
import 'react-netlify-identity-widget/styles.css'
const url = "https://majd-react-store.netlify.com/" // supply the url of your Netlify site instance with Identity enabled. VERY IMPORTANT

class App extends Component {
  render() {
    return (
      <IdentityContextProvider url={url}>{ // authontication login
        <div>
          <AuthStatusView>
            <HomePage />
          </AuthStatusView>
        </div>
      }</IdentityContextProvider>
    );
  }
}

export default App;


function AuthStatusView() {
  const identity = useIdentityContext()
  const [dialog, setDialog] = React.useState(false)
  const name =
    (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.name) || 'NoName'
  const isLoggedIn = identity && identity.isLoggedIn
  return (
    <div>
      <div>
        <button className="RNIW_btn" onClick={() => setDialog(true)}>
          {isLoggedIn ? `Hello ${name}, Log out here!` : 'Log In'}
        </button>
      </div>
      <IdentityModal
        showDialog={dialog}
        onCloseDialog={() => setDialog(false)}
        onLogin={(user) => console.log('hello ', user.user_metadata)}
        onSignup={(user) => console.log('welcome ', user.user_metadata)}
        onLogout={() => console.log('bye ', name)}
      />
    </div>
  )
}