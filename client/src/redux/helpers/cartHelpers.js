import store from '../store/index'
import actions from '../actions/cartActions'
import {saveState} from '../../utils/storageUtils'

export const getCart = () => {
    return store.getState().cartReducer
}

export const saveCart = () => {
    saveState('cartState',getCart())
}

export const getCartLength = () => {
    return store.getState().cartReducer.cart.length
}

export const addToCart = (product,quantity) => {
    let existingProduct = getCart().cart.find(p => p._id === product._id)
    if(existingProduct !== undefined) return
    product.quantity = quantity
    let payload = {
        product,
        amount : product.price*quantity
    }
    store.dispatch(actions.addToCart(payload))
    saveCart()
}

export const removeFromCart = (productId) => {
    let product = getCart().cart.find(product => product._id === productId._id)
    if(product === undefined) return
    let payload = {
        id : productId._id,
        amount : (product.price)*(product.quantity)
    }
    store.dispatch(actions.removeFromCart(payload))
    saveCart()
}

export const updateCart = (productId,quantity) => {
    let product = getCart().cart.find(product => product._id === productId)
    if(product === undefined) return
    let payload = {
        id : productId,
        quantity,
        amount: (quantity - product.quantity)*product.price
    }
    store.dispatch(actions.updateCart(payload))
    saveCart()
}

export const clearCart = () => {
    store.dispatch(actions.clearCart())
    saveCart()
}