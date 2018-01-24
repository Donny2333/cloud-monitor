export const GET_COUNTER = 'GET_COUNTER'
export const SET_COUNTER = 'SET_COUNTER'

export const get = () => {
  return {
    type: GET_COUNTER
  }
}

export const set = obj => {
  return {
    type: SET_COUNTER,
    obj
  }
}

export const setAsync = (obj, delay = 1000) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(set(obj))
    }, delay)
  }
}
