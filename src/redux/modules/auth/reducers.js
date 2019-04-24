import { handleActions } from 'redux-actions'
import { types } from './actions'


export default handleActions({
  [types.SET_AUTH]:
    state => true
}, false)