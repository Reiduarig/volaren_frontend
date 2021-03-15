import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { uiReducer } from "../reducers/uiReducer";
import { fetchReducer } from 'ruse-fetch'
import authReducer from "../reducers/authReducer";

const localStorageMiddleware = store => next => action => {
    let result = next(action)
    localStorage.setItem("session", JSON.stringify(store.getState()))
    return result
  }
  const saved = localStorage.getItem("session")
  const initialStore = saved ? JSON.parse(saved) : undefined

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    useFetch: fetchReducer
 });


export const store = createStore(
    reducers,
    initialStore,
    compose(applyMiddleware(localStorageMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
 );