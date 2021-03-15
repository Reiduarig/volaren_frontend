import React, {useState} from 'react';
import Swal from 'sweetalert2';

export const Subscribe = () => {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            position: 'top',
            icon: 'success',
            title: `¡Te acabas de subscribir a nuestro blog!`,
            text:'A partir de este momento recibirás nuestra publicaciones en tu correo',
            showConfirmButton: false,
            timer: 3000
          })


    }

    return (
        <div className="container-subscribe">
            <h4>Email Newsletter</h4>
            <p>Subscríbete para recibir noticias sobre nuestra plataforma</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nombre">
                    <input type="nombre" name="nombre" value={nombre} placeholder="Introduce tu nombre" onChange={(e)=>{
                        setNombre(e.target.value)
                    }}/>
                </label>
                <label htmlFor="email">
                    <input type="email" name="email" value={email} placeholder="Introduce tu email" onChange={(e)=>{
                        setEmail(e.target.value)
                    }}/>
                </label>
                <button>Suscríbete</button>
            </form>
        </div>
    )
}
