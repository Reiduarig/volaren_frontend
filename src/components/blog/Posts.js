import React from 'react';

import no_photo from '../../assets/no_photo.jpg';
import { NavLink } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment/locale/es';
import { Card } from 'antd';


const { Meta } = Card;
export const Posts = ({posts}) => {

    return (
        <div className="card-post">
            {posts.map(post => (
                
                <Card key={post.id}
                    style={{ width: '100%',height: 550, padding: 5, marginBottom: 50 }}
                    cover={
                        
                    <img
                        alt={post.id}
                        src={`http://localhost:3999/api/posts/image/${post.image}` || no_photo}
                    />
                    }
                  
                >
                    <Meta
                    title={<h2>{post.title}</h2>}
                    description={<><p><Moment locale="es" fromNow>{post.fecha}</Moment></p><h4 style={{textTransform:"capitalize", color:"gray"}}>Creado por {post.username}</h4><br/></>}
                    />
                    <NavLink to={`/post/${post.id}`}>Leer más</NavLink>
                </Card>

             )) }

        </div>
    )
 }

