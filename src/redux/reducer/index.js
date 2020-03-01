import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import loadingReducer from './loading'
import itemsReducer from './items'

const rootReducer = combineReducers({
  loadingReducer,
  itemsReducer,
  form: formReducer
})

export default rootReducer
