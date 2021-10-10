import store from '../store/index'
import actions from '../actions/cartActions'

export const getCart = () => {
    return store.getState().cartReducer
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
}

export const removeFromCart = (productId) => {
    let product = getCart().cart.find(product => product._id === productId)
    if(product === undefined) return
    let payload = {
        id : productId,
        amount : (product.price)*(product.quantity)
    }
    store.dispatch(actions.removeFromCart(payload))
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
}

export const clearCart = () => {
    store.dispatch(actions.clearCart())
}