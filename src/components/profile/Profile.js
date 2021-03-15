import React, { useState } from "react";
import { Link } from "react-router-dom";
import no_photo from "../../assets/no_photo.jpg";
import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { update } from "../../actions/auth";
import { Card } from 'antd';
import Meta from "antd/lib/card/Meta";
export const Profile = () => {
  
  const user = useSelector(s=>s.auth);
  const estado = useSelector(state => state.ui);
  const { msgError} = estado;
  const dispatch = useDispatch();
  
  const [textInput] = useState("Imagen");

 const [username, setUsername] = useState(user.name || '')
 const [email, setEmail] = useState(user.email || '')
 const [imagen, setImagen] = useState(user.image || null)


  //recibir aqui los nuevos datos del usuario y dispatch al reducer
  const handleSubmit = async(e) => {
    e.preventDefault();

  /* dispatch(startLoading())
   
  if(!username.trim()){  
    dispatch(setError('El nombre no puede estar vacío'))
    dispatch(finishLoading())
  }
*/
  const avatar = e.target.avatar.files[0] 
 

  let fs = new FormData();
  fs.append('username', username)
  fs.append('email', email)
  fs.append('avatar', avatar)

   await fetch(`http://localhost:3999/api/users/${user.id}`, {
      headers: { 
        'Authorization': 'Bearer ' + user.token 
      },
      body: fs,
      method: "PUT",
    }).then(response => response.json())
    .then(data => {
      if(data.ok){

      
         setUsername(data.user.username)
         setEmail(data.user.email)
         setImagen(data.user.avatar)
       
        dispatch( update(
          user.id,
          username,
          email,
          imagen,
          user.token,
        ))

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `<h2>Usuario actualizado</h2>`,
          showConfirmButton: false,
          timer: 2000
        })
       /* dispatch({
          type: types.update,
          user: data.user 
        })*/
      }
      // Todo fue bien. En este caso, actualizamos los datos del context
      // para que se vean de inmediato en el header y demás lugares
     // setMe({ token, user: data })
    })

   

  
  }
     /********************************* seguir aqui******************************************************************** */
      

   

  return (
    <div id="perfil-container">
      <div className="bannerPerfil">
        <h1>Mi Perfil</h1>
      </div>
      <div className="profile-sidebar">
        <div className="profile-userpic">
        <Card
             style={{ width: 250,  padding: 5, marginBottom: 0, border: 'none' }}
              cover={
                        
                    <img
                        alt={username}
                        src={`http://localhost:3999/api/users/image/${imagen}` || no_photo}
                    />
                    }
                  
                >
                    <Meta
                    title={<h3>{username}</h3>}
                    description={email}
                    />
                </Card>
        </div>

        <div className="edit-user-container">
          <form id="edit-userForm" onSubmit={handleSubmit}>
            <div id="form-control">
              <label htmlFor="username">
                <p className="lbl-txt">Username</p>
                <input
                  type="text"
                  className="edit-input"
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </label>
              <label htmlFor="email">
                <p className="lbl-txt">Email</p>
                <input
                  type="email"
                  name="email"
                  className="edit-input"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </label> 
            </div>
            <div id="btn-edit-perfil">
              <div id="btn-image-upload">
                  <label htmlFor="inputFileEdit">
                    <i className="fas fa-cloud-upload-alt"></i> {textInput}
                  </label>
                  <input
                    type="file"
                    name="avatar"
                    id="inputFileEdit"
                    accept="image/*"
                  />
                </div>
                <button type="submit">Actualizar</button>
                <Link id="btn-return" to="/dashboard">
                  Volver
                </Link>
              </div>
          </form>
          {msgError && <span>{msgError}</span>}
        </div>
      </div>
    </div>
  );
};
