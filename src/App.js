import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

firebase.initializeApp({
  apiKey: "AIzaSyA7t3durYhnU8ZSKeFyIaOU_5M22nzyA3s",
  authDomain: "signup-auth-example.firebaseapp.com"
})

class App extends Component {
  state = {
    isSignedIn: false
  }
  uiCongig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ], 
    callback: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({isSignedIn:!! user})
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <div>
          <div>Signed In</div>
          <button onClick={()=> firebase.auth().signOut()}>Sign out</button> 
          </div>
          )
            :
          (
          <StyledFirebaseAuth 
            uiConfig={this.uiCongig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    );
  }
}

export default App;