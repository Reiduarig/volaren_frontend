import React, {useState} from 'react'


//se envia el formulario
//desde la api se busca el mail, se envia un nuevo codigo de validacion
export const Recovery = () => {


    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        await fetch(`http://localhost:3999/auth/recovery`, {
        headers: {'Content-Type': 'application/json'},    
        method: 'POST',
        body: JSON.stringify({email})
        })
        setSent(true);
    }

    if(sent){
        return (
            <div>te hemos enviado un correo. Revisa tu bandeja de entrada</div>
        )
    }
    return (
        <form action="" onSubmit={handleSubmit}>
            <div>
                <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)}/>
            </div>
            <div>
               <button>Iniciar sesión</button>
            </div>
        </form>
    )
}
