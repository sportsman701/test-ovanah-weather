import { handleActions } from 'redux-actions'
import { types } from './actions'

export default handleActions({
  [types.SEARCH_REQUEST]:
    state => ({ ...state, location: false, 'loading': true }),

  [types.WEATHER_REQUEST]:
    state => ({ ...state, 'loading': true }),

  [types.END_LOADING]:
    state => ({ ...state, 'loading': false }),

  [types.SET_WEATHER]:
    (state, { payload: { location, weather } }) => ({ ...state, location, weather, 'loading': false}),
}, {})