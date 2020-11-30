import { applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
const composeEnhancers = devtools || compose
const enhancedStore = composeEnhancers(applyMiddleware(thunk))

export { enhancedStore }
