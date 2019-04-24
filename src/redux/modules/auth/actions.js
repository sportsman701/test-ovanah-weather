import { createAction } from 'redux-actions'

const TRY_AUTH = 'TRY_AUTH'
const SET_AUTH = 'SET_AUTH'

export const types = {
  TRY_AUTH,
  SET_AUTH
}

export const tryAuth = createAction(TRY_AUTH)
export const setAuth = createAction(SET_AUTH)
