import React, {useState} from 'react'
import { useParams } from 'react-router-dom';

//coger el codigo de la url
//la api comprobará el codigo de validacion
export const ResetPassword = () => {

    const {code} = useParams();
    const [password, setPassword] = useState('');
    const [sent, setSent] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        await fetch(`http://localhost:3999/auth/reset`, {
        headers: {'Content-Type': 'application/json'},    
        method: 'POST',
        body: JSON.stringify({password, code})
        })
        setSent(true);
    }

    if(sent){
        return (
            <div>¡Password actualizada!</div>
        )
    }
    return (
        <form action="" onSubmit={handleSubmit}>
            <div>
                <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
            <div>
               <button>Iniciar sesión</button>
            </div>
        </form>
    )
}