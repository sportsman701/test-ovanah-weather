import { all, call } from 'redux-saga/effects';
import { sagas as auth } from './auth';
import { sagas as weather } from './weather';

export default function* rootSaga() {
  yield all([
    call(auth),
    call(weather)
  ])
}
