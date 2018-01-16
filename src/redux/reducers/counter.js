import { GET_COUNTER, SET_COUNTER } from '../actions/counter'

export default function counter(state = {}, action) {
  switch (action.type) {
    case GET_COUNTER:
      return state
    case SET_COUNTER:
      return action.obj
    default:
      return state
  }
}
