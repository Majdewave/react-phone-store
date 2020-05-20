import React, { Component } from 'react';

import IdentityModal, { useIdentityContext, IdentityContextProvider } from 'react-netlify-identity-widget';
import 'react-netlify-identity-widget/styles.css'
import { ProductConsumer } from './context';
const url = "https://majd-react-store.netlify.app" // supply the url of your Netlify site instance with Identity enabled. VERY IMPORTANT
window.isUserAccountLoggedIn = false;
window.userName = "";


function AuthStatusView() {
  const identity = useIdentityContext()
  const [dialog, setDialog] = React.useState(false)
  const name =
    (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.full_name)
    || 'NoName'
  const isLoggedIn = identity && identity.isLoggedIn
  if (isLoggedIn) {
    debugger;
    window.isUserAccountLoggedIn = true;
    window.user = identity.user.email;
    window.userName = name;

    return (
      <React.Fragment>
        <button className="RNIW_btn userAccount loggedIn" onClick={() => setDialog(true)}>
          {/* {isLoggedIn ? `Hi, ${name}` : 'Sign in | Join'} */}
          {isLoggedIn ? `LogOut!` : 'Sign in | Join'}
        </button>

        <IdentityModal
          showDialog={dialog}
          onCloseDialog={() => setDialog(false)}
          onLogin={(user) => console.log('hello ', user.user_metadata)}
          onSignup={(user) => console.log('welcome ', user.user_metadata)}
          onLogout={() => console.log('bye ', name)}
        />
      </React.Fragment>
    )
  }
  else {
    return (
      <React.Fragment>
        <button className="RNIW_btn userAccount loggedOut" onClick={() => setDialog(true)}>
          {isLoggedIn ? `Hello ${name}, Log out here!` : 'Sign in | Join'}
        </button>

        {/* <HomePage /> */}
        <IdentityModal
          showDialog={dialog}
          onCloseDialog={() => setDialog(false)}
          onLogin={() => { setDialog(false); window.location.reload() }} // true
          // onLogin={(user) => console.log('hi ', user.user_metadata)
          onSignup={(user) => console.log('welcome ', user.user_metadata)}
          onLogout={() => console.log('bye ', name)}
        />
      </React.Fragment>
    )
  }
}


export default AuthStatusView;