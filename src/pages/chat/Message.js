import React from 'react';
import Moment from 'react-moment';


export class Message extends React.Component {

    render() {
        return (
            <div className='message-item'>
                <div><span></span><b> {this.props.senderName} :</b></div>
                <span>{this.props.text}</span>
            </div>
        )
    }
}