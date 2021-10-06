import { combineReducers } from 'redux'
import authReducer from './authReducer'
import storesReducer from './storesReducer'
import productsReducer from './productsReducer'
import cartReducer from './cartReducer'

export default combineReducers({
  authReducer,
  storesReducer,
  productsReducer,
  cartReducer
})