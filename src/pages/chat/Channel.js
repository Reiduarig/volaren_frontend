import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';


export class Channel extends React.Component {

    click = () => {
        this.props.onClick(this.props.id);
    }
    

    render() {
      
        return (
            <div className='channel-item' onClick={this.click}>
                <div>{this.props.name}</div>
                <span><FontAwesomeIcon icon={faUser}/> {this.props.participants}</span>
            </div>
        )
    }
}