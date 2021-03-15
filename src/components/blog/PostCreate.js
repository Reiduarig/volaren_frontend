import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import {URL_API} from '../../Global';
import { NavLink, Redirect } from 'react-router-dom';
import { finishLoading, removeError, setError, startLoading } from '../../reducers/uiReducer';
import no_photo from '../../assets/no_photo.jpg';
import Swal from 'sweetalert2';
import { uploadImagePost } from '../../helpers/Http';

export const PostCreate = () => {

    const estado = useSelector(s => s.ui);
    const user = useSelector(s => s.auth);
    const {msgError} = estado;
    const dispatch = useDispatch();

    
    const [textInput, setTexInput] = useState('Subir archivo');
    const [setArchivo] = useState(null);

    const [formValues, handleInputChange, reset] = useForm({
        title: '',
        description: ''
    });

    const {title, description} = formValues

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(title.trim().length === 0 || description.trim().length === 0){
            dispatch(setError('Asegúrese de completar todos los campos'))
        }else{

           // dispatch( startLoading() );
           const avatar = e.target.avatar.files[0] 
            let id = user.id;

            let fs = new FormData();
                fs.append('title', title)
                fs.append('description', description)
                fs.append('id', user.id)
                fs.append('avatar', avatar)

           const peticion = await fetch(`${URL_API}posts/create`,{
                                headers:{
                                    'Authorization': 'Bearer ' + user.token 
                                },
                                body: fs,
                                method: 'POST'
                            })

            const respuestaJson = await peticion.json();

            dispatch( finishLoading() );
            if(!respuestaJson.ok || respuestaJson.errors){
                if(respuestaJson.errors){
                    dispatch( finishLoading() );
                    console.log('Faltan datos')
                    dispatch(setError('Error del servidor'))
                }else{
                    dispatch( finishLoading() );
                    dispatch(setError(respuestaJson.message));
                }
            }else{
                dispatch( finishLoading() );
                dispatch( removeError() );
                reset();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `Post creado exitosamente`,
                    showConfirmButton: false,
                    timer: 2000
                  })
            }
        }  
    }

   
   if(!user){
       <Redirect to="/"/>
   }

    return (
        <div id="container-create-post">
            <h2>Nuevo Post</h2>
            <hr/>
            <div id="container-create-post-body">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">
                        <h2>Título</h2>
                        <input type="text" name="title" value={title} onChange={handleInputChange} placeholder="Introduce un título"/>
                    </label>
                    <label htmlFor="description">
                        <h2>Descripción</h2>
                        <textarea rows="12" cols="100" name="description" value={description} onChange={handleInputChange} placeholder="Introduce una descripción"/>
                    </label>
                    <label htmlFor="inputFileDoc">
                            <i className="fas fa-cloud-upload-alt"></i> {textInput} 
                    </label>
                    <div className="post-create-btn">
                        <NavLink className="btn-post-return" to="/blog">Volver</NavLink>
                        <input type="file" id="inputFileDoc" name="avatar" accept="image/*" />
                        <button type="submit" className="btn-Formcreate-post">Crear</button>
                    </div>
                </form>
                {msgError && <span className="errorMessages">{msgError}</span>}
                
            </div>
        </div>
    )
}
