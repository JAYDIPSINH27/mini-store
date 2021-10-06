import {constants} from '../constants/index'

const actions = {
    addToCart : (payload) => {
        return {type : constants.ADD_TO_CART, payload}
    },

    removeFromCart : (payload) => {
        return {type : constants.REMOVE_FROM_CART, payload}
    },
    
    updateCart : (payload) => {
        return {type : constants.UPDATE_CART, payload}
    },

    clearCart : (payload=null) => {
        return {type : constants.CLEAR_CART, payload}
    }
}

export default actions
