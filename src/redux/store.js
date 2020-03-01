import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootsaga from './sagas'
import rootReducer from './reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware()
// create store
/* eslint-disable no-underscore-dangle */
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))
/* eslint-enable */

sagaMiddleware.run(rootsaga)

export default store
