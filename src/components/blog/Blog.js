import React, { useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { finishLoading, removeError, setError, startLoading } from '../../reducers/uiReducer';
import { Posts } from './Posts'
import { PostSearch } from './PostSearch';
import { Subscribe } from './Subscribe';
import { getPosts } from '../../helpers/Http';
import './Blog.css';



export const Blog = () => {

  
    const user = useSelector(s => s.auth);
    const estado = useSelector(s => s.ui);
    const {msgError} = estado;
    const dispatch = useDispatch();
    
    const [posts, setPosts] = useState([]);
    


    useEffect(() => {
        getPosts().then(respuesta => {
            dispatch( startLoading() )
            if(!respuesta.ok){
                dispatch( finishLoading() )
                setPosts([]);
                dispatch( setError(respuesta.message) );
            }else{
                dispatch( finishLoading() )
                setPosts(respuesta.data);
                dispatch( removeError());
            }
        }).catch(e => {
            console.log(e);
            dispatch( finishLoading() )
        })
    },[setPosts])
    

    
    const handleMisPosts = (e) => {
        e.preventDefault();
       const misPosts = posts.filter(post => post.user_id === user.id);
       setPosts(misPosts);
       
    }
   
    return (
        <div id="container-blog">
            <div id="blog-body">
                <div id="lista-posts">
                    <Posts posts={posts} setPosts={setPosts}/>
                    {!posts.length && <span className="errorMessages">Todavía no hay posts publicados</span>}
                    {msgError && <span className="errorMessages">{msgError}</span>}
                </div>
                <div className="action-post-container">
                    <div id="actions-posts">
                        <Subscribe />
                        <PostSearch posts={posts} setPosts={setPosts} />
                        {user &&
                            <div id="blog-post-create">
                                <button onClick={handleMisPosts}>Mis Posts</button>
                                <NavLink to="/posts/post/create">Nuevo Post</NavLink> 
                                <NavLink to="/">Volver</NavLink>
                            </div>
                        }   
                    </div>
                </div>
            </div>
            
        </div>
    )
}
