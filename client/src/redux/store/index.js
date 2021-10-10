import {createStore} from 'redux'
import { loadState } from '../../utils/storageUtils'
import rootReducer from '../reducers/index'

const preloadedState = {
    authReducer : loadState('authState'),
    cartReducer : loadState('cartState')
}

const store = createStore(rootReducer,preloadedState)

export default store