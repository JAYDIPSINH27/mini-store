import {constants} from '../constants/index'

const initialState = {
    stores : []
}

const storesReducer = (state = initialState,action) => {
    switch(action.type){
        case constants.SET_STORES:
            return Object.assign({},state,{stores : action.payload})
        default:
            return state
    }
}

export default storesReducer