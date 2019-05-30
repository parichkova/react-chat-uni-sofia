import React, { Component } from 'react';
import Singleton from '../../socket';
import MessageType from './SendMessage/MessageType';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import ChatHistory from './ChatHistory/ChatHistory';
import SendMessage from './SendMessage/SendMessage';
import Divider from 'material-ui/Divider';

class Chat extends Component {
    render() {
        const styles = {
            height: 450,
            width: 450,
            textAlign: 'center',
            margin: '20px auto',
            position: 'relative'
        };

        const style= {
            height: 525,
            backgroundColor: 'white',
        };

        return (
            <div style={style} className="test-tish">
                <Paper style={styles} zDepth={2} >
                    <ChatHistory />
                    <Divider />
                    <SendMessage />
                </Paper>
                
                <RaisedButton
                    label="History"
                    primary={true}
                    onClick={this.loadHistory.bind(this)} />
                <FilePond />
            </div>
        );
    }

    loadHistory() {
        const socket = Singleton.getInstance();
        let messageDto = JSON.stringify({ user: this.props.thisUser, data: '', type: MessageType.GET_HISTORY });

        socket.send(messageDto);
    }


}

export default Chat;

