import { combineReducers} from 'redux'

export const getUserQuery = (state = '', action) => {
  switch (action.type) {
    case 'GET_USER_QUERY':
      return action.userQuery
    default:
      return state
  }
}

export const rootReducer = combineReducers(
  {
    getUserQuery
  } 
)