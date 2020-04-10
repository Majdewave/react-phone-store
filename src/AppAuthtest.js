import React, { Component } from 'react';

import IdentityModal, { useIdentityContext, IdentityContextProvider } from 'react-netlify-identity-widget';
import 'react-netlify-identity-widget/styles.css'

const url = "https://majd-react-store.netlify.com/" // supply the url of your Netlify site instance with Identity enabled. VERY IMPORTANT
window.isUserAccountLoggedIn = "false";


function AuthStatusView() {
  const identity = useIdentityContext()
  const [dialog, setDialog] = React.useState(false)
  const name =
    (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.full_name)
    || 'NoName'
  const isLoggedIn = identity && identity.isLoggedIn
  if (isLoggedIn) {
    window.isUserAccountLoggedIn = "true";
    debugger
    return (
      <div>
        <button className="RNIW_btn userAccount" onClick={() => setDialog(true)}>
          {isLoggedIn ? `Hello ${name}, Log out here!` : 'Sign in | Join'}
        </button>


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
        <button className="RNIW_btn userAccount" onClick={() => setDialog(true)}>
          {isLoggedIn ? `Hello ${name}, Log out here!` : 'Sign in | Join'}
        </button>

        {/* <HomePage /> */}
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

export default AuthStatusView;