import { createAction } from 'redux-actions'

const SEARCH_REQUEST = 'SEARCH_REQUEST'
const WEATHER_REQUEST = 'WEATHER_REQUEST'
const END_LOADING = 'END_LOADING'
const SET_WEATHER = 'SET_WEATHER'

export const types = {
  SEARCH_REQUEST,
  WEATHER_REQUEST,
  END_LOADING,
  SET_WEATHER
}

export const searchRequest = createAction(SEARCH_REQUEST)
export const weatherRequest = createAction(WEATHER_REQUEST)
export const endLoading = createAction(END_LOADING)
export const setWeather = createAction(SET_WEATHER)
