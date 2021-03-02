import { createStore } from 'redux';

const INITIAL_STATE = {
  isAuthenticated: false
}

function login(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true}
    case 'LOGOUT':
      return { ...state, isAuthenticated: false}
    default:
      return state; 
  }
}

const store = createStore(login)

export default store;