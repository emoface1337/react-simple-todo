import { combineReducers, createStore } from 'redux'
import { taskReducer as task } from './tasks'
import { enhancedStore } from './middleware'

const rootReducer = combineReducers({
    task
})

const store = createStore(rootReducer, enhancedStore)

export default store
