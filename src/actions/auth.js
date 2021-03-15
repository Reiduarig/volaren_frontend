import { types } from "../types/types"


export const login = (id, name, email, image, token) =>  {
    return{
        type: types.login,
        payload: {
            id,
            name,
            email,
            image,
            token
        }
    }
}

export const update = (id, name, email, image, token) =>  {
    return{
        type: types.update,
        payload: {
            id,
            name,
            email,
            image,
            token
        }
    }
}