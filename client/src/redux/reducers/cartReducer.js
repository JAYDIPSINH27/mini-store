import {constants} from '../constants/index'

const initialState = {
    cart : []
}

const cartReducer = (state = initialState,action) => {
    switch(action.type){
        case constants.ADD_TO_CART:
            return Object.assign({},state,{
                cart : [...state.cart,action.payload]
            })
        case constants.REMOVE_FROM_CART:
            return Object.assign({},state,{
                cart : state.cart.filter(product => product.id !== action.payload)
            })
        case constants.UPDATE_CART:
            return Object.assign({},state,{
                cart : state.cart.map(product => {
                    if(product.id === action.payload.id){
                        product.quantity = action.payload.quantity
                    }
                    return product
                })
            })
        case constants.CLEAR_CART:
            return Object.assign({},initialState)
        default:
            return state
    }
}

export default cartReducer