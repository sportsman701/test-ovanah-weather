import { takeLatest, put, call } from 'redux-saga/effects'
import axios from 'axios'
import * as actions from './actions'

const proxy = 'https://cors-anywhere.herokuapp.com/'
const woeidByNameUrl = proxy + 'https://www.metaweather.com/api/location/search/?query='
const woeidBySpotUrl = proxy + 'https://www.metaweather.com/api/location/search/?lattlong='
const weatherUrl = proxy + 'https://www.metaweather.com/api/location/'

const searchRequest = function* ({ payload }) {
  const { search, noCityCallback, manyCityCallback } = payload
  if (search) {
    const { data } = yield call([axios, 'get'], woeidByNameUrl + search)

    if (data.length > 1) {
      yield call(manyCityCallback, data.map(({ title, woeid }) => ({ title, woeid })))
      yield put(actions.endLoading())
    } else if (data.length === 1) {
      const { woeid } = data[0]
      yield put(actions.weatherRequest({ woeid }))
    } else {
      yield call(noCityCallback)
      yield put(actions.endLoading())
    }
  } else {
    const { coords } = yield call(getUserLocation)
    const { data } = yield call([axios, 'get'], woeidBySpotUrl + coords.latitude + ',' + coords.longitude)

    if (data.length > 0) {
      const { woeid } = data[0]
      yield put(actions.weatherRequest({ woeid }))
    } else {
      yield put(actions.endLoading())
    }
  }
}

const getUserLocation = () => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(
    location => resolve(location),
    error => reject(error),
  )
})

const weatherRequest = function* ({ payload }) {
  const { woeid } = payload
  const { data } = yield call([axios, 'get'], weatherUrl + woeid)
  const { title, consolidated_weather } = data

  yield put(actions.setWeather({
    location: title,
    weather: consolidated_weather.slice(0, 5)
  }))
}

const geolocationRequest = function* () {

}

export default function* rootSaga() {
  yield takeLatest(actions.types.SEARCH_REQUEST, searchRequest)
  yield takeLatest(actions.types.WEATHER_REQUEST, weatherRequest)
}