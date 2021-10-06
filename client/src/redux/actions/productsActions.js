import {constants} from '../constants/index'

const actions = {
    setProducts : (payload) => {
        return {type : constants.SET_PRODUCTS, payload}
    }
}

export default actions
