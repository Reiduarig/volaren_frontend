import { types } from "../types/types";

/*acciones que modifican el estado del reducer pasandoles el tipo, y el argumento si es necesario ,
como lo es en el caso del error porque le pasamos el mensaje en concreto que ha de devolver*/
//Estas acciones serán despachadas en el switch

export const setError = ( error ) => ({
    type: types.uiSetError,
    payload: error
})

export const removeError = ( error ) => ({
    type: types.uiRemoveError,
    payload: error
})

export const startLoading = () => ({
    type: types.uiStartLoading

})

export const finishLoading = () => ({
    type: types.uiFinishLoading
})

//estado inicial
const initialState = {
    loading: false,
    msgError: null
}

export const uiReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.uiSetError:
            return{
                ...state,
                msgError: action.payload
            }
        case types.uiRemoveError:
            return{
                ...state,
                msgError: null
            }
        case types.uiStartLoading:
            return{
                ...state,
                loading: true
            }  
        case types.uiFinishLoading:
            return{
                ...state,
                loading: false
            }        
        default:
          return state;

    }
}