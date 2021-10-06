import store from '../store/index'
import actions from '../actions/storesActions'

export const getStores = () => {
    return store.getState().storesReducer.stores
}

export const setStores = (stores) => {
    store.dispatch(actions.setStores(stores))
}
