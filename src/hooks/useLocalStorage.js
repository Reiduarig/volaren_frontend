import { useState } from 'react';

export const useLocalStorage = (key, initialValue) => {

    /*leer localStorage desde dentro, actualizamos el useState pasandole una funcion inicial que devuelva el valor que tiene el estado inicial, se recupera el elemento que se le ha pasado como parametro, 
      en el caso de que haya item se parsea el contenido, en el caso de que no haya item se devuelve el valor inicial del parametro que recibido*/

    const [storedValue, setStoredValue] = useState(() => {

        try{

            const item = localStorage.getItem(key)

            return item ? JSON.parse(item) : initialValue

        }catch(error){
            return initialValue;
        }

    });

    //actualizar localStorage desde fuera

    const setValue = (value) => {

        try{

            setStoredValue(value);
            localStorage.setItem(key, JSON.stringify(value));

        }catch(error){

            console.log(error);

        }
    }

    return [storedValue, setValue];
}