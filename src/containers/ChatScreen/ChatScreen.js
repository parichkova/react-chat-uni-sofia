import React, { Component } from 'react';
import './../../App.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import UserList from './../UserList/UserList';
import Chat from './../Chat/Chat';
import Singleton from './../../socket';
import MessageType from './../Chat/SendMessage/MessageType';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { connect } from 'react-redux';
import { userJoined, userJoinedAck, userLeft, messageReceived } from './../../actions/index';
import { bindActionCreators } from 'redux';

class ChatScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: true,
      usernameInput: this.props.name,
    }
  }

  render() {
    const modalActions = [ 
      <RaisedButton
        label="Choose Name"
        primary={true}
        onClick={() => this.onChooseName()}
      />,
    ];

    const modalStyle = {
      width: '600px'
    };

    const chat = this.state.modalOpen ? '' : <Chat />

    return (
      <MuiThemeProvider>
            <div>
            <UserList users={this.state.users} />
                {chat}
                <Dialog
                    title="Choose your name"
                    actions={modalActions}
                    modal={true}
                    open={this.state.modalOpen}
                    contentStyle={modalStyle}>
                    <TextField
                    autoFocus
                    hintText={this.state.name ? this.state.name : 'Write your text here'}
                    value={this.state.usernameInput}
                    onChange={(event) => this.updateInputValue(event.target.value)}
                    onKeyPress={this.handleKeyPress}
                    />
                </Dialog>
            </div>
      </MuiThemeProvider>
    );
  }

  registerSocket() {
    let self = this;
    this.socket = Singleton.getInstance();

    this.socket.onmessage = (response) => {
      let message = JSON.parse(response.data);
      let users;

      switch (message.type) {
        case MessageType.TEXT_MESSAGE:
          self.props.messageReceived(message);
          break;
        case MessageType.USER_JOINED:
          users = JSON.parse(message.data);
          self.props.userJoined(users);
          break;
        case MessageType.USER_LEFT:
          users = JSON.parse(message.data);
          self.props.userLeft(users);
          break;
        case MessageType.USER_JOINED_ACK:
          let thisUser = message.user;
          self.props.userJoinedAck(thisUser);
          break;
        default:
      }
    }

    this.socket.onopen = () => {
      this.sendJoinedMessage();
    }

    window.onbeforeunload = () => {
      let messageDto = JSON.stringify({ user: this.props.thisUser, type: MessageType.USER_LEFT });
      this.socket.send(messageDto);
    }
  }

  sendJoinedMessage() {
    let messageDto = JSON.stringify({ user: this.state.usernameInput, type: MessageType.USER_JOINED });
    this.socket.send(messageDto);
  }

  onChooseName() {
    this.registerSocket();
    this.setState({ modalOpen: false });
  }

  updateInputValue(value) {
    this.setState({ usernameInput: value.trim() });
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.onChooseName();
    }
  }
}

function mapStateToProps(state) {
  return {
    messages: state.message,
    users: state.users,
    thisUser: state.thisUser,
    name: state.auth.suggestedName,
  }
}

function mapDispatchToProps(dispatch, props) {
  return bindActionCreators({
    userJoined: userJoined,
    userJoinedAck: userJoinedAck,
    userLeft: userLeft,
    messageReceived: messageReceived
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);