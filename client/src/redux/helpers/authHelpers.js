import store from '../store/index'
import actions from '../actions/authActions'
import {saveState} from '../../utils/storageUtils'

export const getUser = () => {
    return store.getState().authReducer.user
}

export const getJWT = () => {
    return store.getState().authReducer.jwtToken
}

export const getAuthDetails = () => {
    return store.getState().authReducer
}

export const saveAuthDetails = () => {
    saveState('authState',getAuthDetails())
}

export const setAuthDetails = (data) => {
    store.dispatch(actions.setJWT(data.token))
    store.dispatch(actions.setUser(data.data))
    saveAuthDetails()
}

export const logOut = () => {
    store.dispatch(actions.logOut())
    saveAuthDetails()
}