import React, {useState} from 'react';
import { URL_API } from '../../Global';

export const PostSearch = ({setPosts}) => {

    const [search, setSearch] = useState('');
    const [error, setError] = useState(null);
    
    const handleSubmit = async(e) => {
        e.preventDefault();

        if(search.trim().length === 0){
            setError('Debe indicar al menos un Post');
        }else{
      
        const response = await fetch(`${URL_API}posts/search/${search}`);

            const respuesta = await response.json();

            if(respuesta.ok){
            
                setPosts(respuesta.data);
                setError(null);
            }else{
                setError(respuesta.message)
            }
        }

    }


    return (
      
        <div id="container-search">
            <h3>Buscar Post</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" name="search" placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} />
                <button type="submit" name="btn-search-post">Buscar</button>
            </form>
            {error && <span className="error">{error}</span>}
        </div>
        
      
    )
}
