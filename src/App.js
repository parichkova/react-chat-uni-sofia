import React, { Component } from 'react';
import './App.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import GoogleAuth from './containers/Auth';
import ChatScreen from './containers/ChatScreen/ChatScreen';

import { connect } from 'react-redux';

 const App = (props) =>  {

  const { auth } = props;

  return (
    <MuiThemeProvider>  
      <div className="App">
        <div className="button-holder">
          <GoogleAuth/>
        </div>
        {auth && auth.isSignedIn ?
          <ChatScreen />
          : ''
        }
      </div>
    </MuiThemeProvider>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

// function mapDispatchToProps(dispatch, props) {
//   return bindActionCreators({
//     messageReceived: messageReceived
//   }, dispatch);
// }

export default connect(mapStateToProps, null)(App);