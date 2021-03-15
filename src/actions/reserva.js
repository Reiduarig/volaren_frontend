import { types } from "../types/types"


export const addReserva = (reserva) =>  {
    return{
        type: types.addReserva,
        payload: {
            reserva
        }
    }
}