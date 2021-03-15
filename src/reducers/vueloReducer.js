export const addVuelo = (vuelo) => ({ type: '/vuelo/add', vuelo})
export const deleteVuelo = (vuelo) => ({ type: '/vuelo/remove', vuelo})
export const resetVuelo = () => ({ type: '/vuelo/reset'})

export default function vueloReducer(state={}, action) {
    switch (action.type) {
        case '/vuelo/add':
            return [...state, action.data]
        case '/vuelo/remove':
            return state.filter(t=> t !== action.id)    
        case '/vuelo/reset':
            return []
        default:
            return state
    }
}
