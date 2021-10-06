import {constants} from '../constants/index'

const initialState = {
    products : []
}

const productsReducer = (state = initialState,action) => {
    switch(action.type){
        case constants.SET_PRODUCTS:
            return Object.assign({},state,{products : action.payload})
        default:
            return state
    }
}

export default productsReducer