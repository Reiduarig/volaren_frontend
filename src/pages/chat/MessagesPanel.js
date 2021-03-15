import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { Message } from './Message';

export const MessagesPanel = ({onSendMessage, channel}) => {
    
    const  [input_value, setInputValue] = useState('');
    const user = useSelector(s=> s.auth);
    
    const send = () => {
        if (input_value && input_value != '') {
            onSendMessage(channel.id, input_value);
            setInputValue('');
        }
    }

    const handleInput = e => {
        setInputValue(e.target.value);
    }

    let list = <div className="no-content-message">No hay mensajes que mostrar</div>;
    if (channel && channel.messages) {
        list = channel.messages.map(m => <Message key={m.id} id={m.id} senderName={user.name} text={m.text} />);
    }
    return (
        <div className='messages-panel'>
            <div className="meesages-list">
                {list}
            </div>
            {channel &&
                <div className="messages-input">
                    <input type="text" onChange={handleInput} value={input_value} />
                    <button onClick={send}><FontAwesomeIcon icon={faPaperPlane}/> </button>
                </div>
            }
        </div>);
    }

