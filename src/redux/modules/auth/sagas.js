import { takeLatest, put, call } from 'redux-saga/effects'
import * as actions from './actions'

const tryAuth = function* ({ payload }) {
  const { password, authFailCallback } = payload
  if (password === process.env.REACT_APP_PASSWORD) {
    yield put(actions.setAuth())
  } else {
    yield call(authFailCallback)
  }
}

export default function* rootSaga() {
  yield takeLatest(actions.types.TRY_AUTH, tryAuth)
}
