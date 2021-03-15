import  {useState } from 'react'

//Recibe un objeto, en el que cada una de sus propiedades es un campo de texto, selector.... los cuales queremos manipular

export const useForm = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState);

    const reset = () => {
        console.log('entra en reset')
        setValues(initialState);
    }

    const handleInputChange = ({ target }) => {

        //console.log(target);

        setValues({
            ...values,
            [target.name]: target.value
        });
    }

    //Retornamos un array con el estado del formulario los metodos para cambiar los valores del formulario y resetearlo

    return [ values, handleInputChange, reset ];
}
