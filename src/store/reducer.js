import { LOGIN } from './actions'

const defaultState = {
  login: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, login: action.status }
    default:
      return state
  }
}