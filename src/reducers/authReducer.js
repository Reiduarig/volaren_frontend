import { types } from '../types/types';

/* El state estará vacio cuando no se esté autenticado, de lo contrario tendrá los datos del usuario*/

export default function authReducer(state=null, action) {
    switch (action.type) {
        case types.login:
            return {
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email,
                image: action.payload.image,
                token: action.payload.token
            }
        case types.logout:
            return null

            //estos datos deben recibirse desde el update de la base de datos
        case types.update:
            return {
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email,
                image: action.payload.image,
                token: action.payload.token
                }
              
        default:
            return state
    }
}
