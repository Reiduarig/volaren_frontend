import { types } from '../types/types';



export default function reservaReducer(state= {}, action) {
    switch (action.type) {
        case types.addReserva:
            console.log('nueva reserva' + JSON.stringify(action));
            return  {
                 reserva: action.payload.data
                } 
       
        default:
            return state
    }
}
