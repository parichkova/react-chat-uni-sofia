import React from 'react';
import { connect } from 'react-redux';

import {signIn, signOut,  } from '../actions';

import RaisedButton from 'material-ui/RaisedButton';
import GitHubLogin from 'react-github-login';

class GoogleAuth extends React.Component {    
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: "274630839429-1nfj8spev5aj9vpbmj0vmpa2dt2k43c0.apps.googleusercontent.com",
                scope: 'email',
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.auth.isSignedIn.listen(this.onAuthChange)
                
                this.onAuthChange(this.auth.isSignedIn.get())
            })
        });

    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getBasicProfile().getName())
        } else {
            this.props.signOut()
        }
    }

    signInClick = () => {
        this.auth.signIn();
    }

    signOutClick = () => {
        this.auth.signOut();
    }
    

    renderAuthButton() {
        let result = <div> You are now signed in.</div>;

        if (this.props.isSignedIn === null) {
            result = null;
        } else if (this.props.isSignedIn) {
            return (
                <RaisedButton
                    label="Sign Out"
                    secondary={true}
                    onClick={() => this.signOutClick()}
                />
            )
        } else {
            return (
                <div>
                    <RaisedButton
                        label="Sign In With Google"
                        primary={true}
                        onClick={() => this.signInClick()}
                    />
                </div>
            )
        }

        return result;
    }

    render() {
        return (
            <div> {this.renderAuthButton()}</div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(
    mapStateToProps,
    {
        signIn,
        signOut,
    }
)(GoogleAuth);