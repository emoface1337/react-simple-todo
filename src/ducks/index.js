import { combineReducers, createStore } from 'redux'
import { todoReducer as todo } from './todo'
import { enhancedStore } from './middleware'

const rootReducer = combineReducers({
    todo
})

const store = createStore(rootReducer, enhancedStore)

export default store
