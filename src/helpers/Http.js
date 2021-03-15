import axios from "axios";
import { format } from "date-fns";
import { URL_API, API_WEATHER, API_KEY_WEATHER } from '../Global';
//const { REACT_APP_API_URL } = process.env;

/****************************** login / registro ***************************************/



export const envioLogin = async (email, password) => {

  const respuesta = await fetch(URL_API + "auth/login",{
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({email, password}),
    method: 'POST'
  })

  return await respuesta.json();
 
};
export const envioRegistro = async (username, email, password) => {
  
  let registro = await fetch(URL_API + "auth/register", {
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify({username, email, password}),
    method: 'POST'
  });

 const data =  await registro.json();

 return data;
};


/******************************* usuario  **********************************************/

export const getUserById = async (id) => {
  const response = await axios.get(URL_API + `users/${id}`);

  return response;
};
export const getImageUser = async (filename) => {
  const response = await axios.get(`${URL_API}users/image/${filename}`);
  return response;
};
export const getUserAllById = async (id) => {
 
    const respuesta = await fetch(URL_API + `users/all/${id}`);

    const data = await respuesta.json();

    return data;
  
};
export const editUser = async (userId, state) => {
  
  const respuesta = await fetch(URL_API + "users/",{
    body: JSON.stringify({userId, state}),
    method:'PUT'
  })
  const data = await respuesta.json();

  return data;
};
export const uploadImage = async (userId, formData) => {
  let response = await axios.post(URL_API + "upload-image/", { userId, formData });

  return response;
};

export const updateFacturacion = async(user_id, nombre, apellido1, apellido2, dni, telefono, direccion, ciudad, cod_postal, provincia, pais, fecha_caducidad, numero_tarjeta, cod_seguridad) => {

  try{
    const respuesta = await fetch(URL_API + `facturacion/${user_id}`, {
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({nombre, apellido1, apellido2, dni, telefono, direccion, ciudad, cod_postal, provincia, pais, fecha_caducidad, numero_tarjeta, cod_seguridad}),
      method: 'PUT'
    })

    const data = await respuesta.json();

    return data;

  }catch(e){
    console.log(e)
  }
}


/********************************  vuelos   ************************************************ */

export const getVueloById = async (idVuelo) => {
  
  const response = await fetch(`${URL_API}vuelos/${idVuelo}`);
  const respuesta = await response.json();

  return respuesta;
};

/********************************  reservas  *********************************************** */
export const getHistorico = async (id) => {
  const respuesta = await fetch(URL_API + `reserva/historicos/${id}`);
  const data = await respuesta.json();
  return data;
};
export const getReservaById = async (id) => {
  
  const respuesta = await fetch(URL_API + `reserva/${id}`);

  const data = await respuesta.json();
  
  return data;
};
export const cancelarReserva = async(id) => {
  const peticion = await fetch(`${URL_API}reserva/cancelar/${id}`,{
    method: 'PUT'
  });

  const respuesta = peticion.json();

  return respuesta
}
export const getDocumentsReserve = async (id) => {
  const response = await axios.get(URL_API + `reserva/documents/${id}`);

  return response;
};
export const getDocumentsByName = async (id) => {
  const response = await axios.get(URL_API + `reserva/pdf/${id}`);

  return response;
};
export const postDocuments = async (documentos) => {
  let respuesta = await axios.post(URL_API + "reserva/documents", documentos, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return respuesta;
};
export const postPago = async (
  user_id,
  vuelo_id,
  n_personas,
  n_maletas,
  precio,
  seguro_viaje,
  transporte,
  datos_contacto,
  datos_pasajeros,
  tarifa
) => {
 
    let respuesta = await fetch(URL_API + "reserva/create", {

      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id,
        vuelo_id,
        n_personas,
        n_maletas,
        precio,
        seguro_viaje,
        transporte,
        datos_contacto,
        datos_pasajeros,
        tarifa}),
        
      method:'POST'
        
      
    });

    const data = await respuesta.json();
    return data;
  
};


/********h************************** blog *********************************************************/

export const getPosts = async() => {

  const response = await fetch(URL_API+"posts");

  const respuesta = await response.json();

  return respuesta;

}  

export const getPost = async(id) => {
       
  const response = await fetch(`${URL_API}posts/${id}`);
  const respuesta = await response.json();
  
  return respuesta;
}

export const deletePost = async(user,id) => {
  const response = await fetch(`${URL_API}posts/${id}`,{
    headers: { 
        'Authorization': 'Bearer ' + user.token, 
        'Content-Type': 'application/json'
    },
    method: 'DELETE'
  })
  const respuesta = response.json();

  return respuesta;
}

export const uploadImagePost = async( file ) =>{
  
  const formData = new FormData();
  
    formData.append('file0', file );
    
  try {
        const resp = await fetch( URL_API + "posts/upload", {
          method: 'POST',
          body: formData
      });

      if ( resp.ok ) {
          const response = await resp.json();
          return response;
      } else {
          throw await resp.json();
      }

  } catch (err) {
    throw err;
  }

 
}

/********************************** mail *********************************************************/

export const envioMail = async (username, email) => {
  const title = "Bienvenido a tu app de viajes";

  const content = `Te damos las bienvenida ${username}. Ya puedes loguearte con tu nueva cuenta`;

  const response = await axios.post(URL_API + "email", {
    email: email,
    asunto: title,
    contenido: content,
  });

  return response;
};
/************************************** geolocalizacion ********************************************/
export const getPosition = async () => {
  await navigator.geolocation.getCurrentPosition(async (position) => {
    let response = await axios.get(
      `https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?json=1`
    );

    return response;
    /*if(response){
         if(response.status === 200){
            
             const add = {
                 country: response.data.country,
                 city: response.data.city
             }

             localStorage.setItem('geo', JSON.stringify(add));
         
         }else{
             console.log(response.statusText);
         }
     }*/
  });
};

/************************************** api clima **************************************************/
export const getWeather = async (lat, lon) => {
  const response = await fetch(
    API_WEATHER + `?lat=${lat}&lon=${lon}&appid=${API_KEY_WEATHER}&units=metric`
  );
  const data = await response.json();

  return data;
};

export const getCovidComunidades = async () => {
  try {
    let response = await axios.get(
      "https://covid19.secuoyas.io/api/v1/es/ccaa/"
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const formatDateShort = (date) => {
  return format(date, "yyyy-MM-dd");
};
export const formatPrintDateShort = (date) => {
  return format(date, "dd-MM-yyyy");
};