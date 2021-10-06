import store from '../store/index'
import actions from '../actions/productsActions'

export const getProducts = () => {
    return store.getState().productsReducer.products
}

export const setProducts = (products) => {
    store.dispatch(actions.setProducts(products))
}
