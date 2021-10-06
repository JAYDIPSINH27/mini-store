import store from '../store/index'
import actions from '../actions/cartActions'

export const getCart = () => {
    return store.getState().cartReducer.cart
}

export const addToCart = (product,quantity) => {
    product.quantity = quantity
    store.dispatch(actions.addToCart(product))
}

export const removeFromCart = (productId) => {
    store.dispatch(actions.removeFromCart(productId))
}

export const updateCart = (productId,quantity) => {
    let payload = {
        id : productId,
        quantity
    }
    store.dispatch(actions.updateCart(payload))
}

export const clearCart = () => {
    store.dispatch(actions.clearCart())
}