import React, {useState, useEffect} from 'react';
import {NavLink, Redirect, useHistory, useParams} from 'react-router-dom';
import no_photo from '../../assets/no_photo.jpg';
import Moment from 'react-moment';
import 'moment/locale/es';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, deletePost } from '../../helpers/Http';
import { finishLoading, removeError, setError, startLoading } from '../../reducers/uiReducer';
import { URL_API } from '../../Global';
import Swal from 'sweetalert2';
export const Post = () => {

    const history = useHistory();
    const {id} = useParams(); 

    const user = useSelector((state) => state.auth);
    const estado = useSelector(s => s.ui);
    const {msgError} = estado;
    const dispatch = useDispatch();
    const [deleted, setDeleted] = useState(false);
    const [post, setPost] = useState({});

    
    useEffect(() => {
        getPost(id).then(respuesta => {
            dispatch(startLoading());
            if(!respuesta.ok){
                dispatch(finishLoading());
                dispatch(setError(respuesta.message));
                setPost({});
            }else{
                dispatch(finishLoading());
                dispatch(removeError());
                setPost(respuesta.data[0]);
            }
        }).catch(error => {
            dispatch(finishLoading());
            console.log(error)
        })
    },[setPost]);
    

    const eliminarPost = async() => {
      
        deletePost(user, id).then(response => {
            if(!response.ok){
                dispatch(finishLoading());
                dispatch(setError(response.message));
                setDeleted(false);
            }else{
               
                dispatch(finishLoading());
                dispatch(removeError());
                setDeleted(true);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `Post eliminado correctamente`,
                    showConfirmButton: false,
                    timer: 2000
                  })

                  history.push('/blog');
            }    
        }).catch(error=> {
            dispatch(finishLoading());
            console.log(error)
        })
        


      /*  if(!respuestaJson.ok){
            dispatch(setError(respuesta.message));
        }else{
            setDeleted(true);
            dispatch(removeError());
        }*/
    }

    if(deleted){
        return <Redirect to="/blog"/>
    }

    return (
        <div id="profile-post">
            <div id="profile-post-body">
                {post.image ? (
                            <img src={`${URL_API}posts/image/${post.image}`} alt={post.title}/>
                        ) : (
                            <img src={no_photo} alt={post.title}/>
                        )
                }
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                {post.fecha &&
                    <p>Creado el <Moment format="DD-MM-YYYY HH:mm">{post.fecha}</Moment></p>
                }
            </div>
            <div className="postButtons">
                <NavLink to="/blog">Volver</NavLink>
                {user && user.id === post.user_id &&
                    <button onClick={eliminarPost}>Eliminar</button>
                }
            </div>  
            {msgError && <span className="errorMessages">{msgError}</span>}  
        </div>
    )
}
