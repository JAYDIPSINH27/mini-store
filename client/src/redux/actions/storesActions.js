import {constants} from '../constants/index'

const actions = {
    setStores : (payload) => {
        return {type : constants.SET_STORES, payload}
    }
}

export default actions
