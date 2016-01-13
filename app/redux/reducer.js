import { combineReducers } from 'redux'
import { routeReducer as routing } from 'redux-simple-router'
import { reducer as form } from 'redux-form'

export default combineReducers({
  routing,
  form
})
