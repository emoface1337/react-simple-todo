import { fromJS, Map } from 'immutable'
import { createUUID, sortTasksByGroup } from './helpers'
import { createSelector } from 'reselect'
import { tasksApi } from '../api/tasksApi'

const GET_TASKS_COMPLETED = 'TASKS/GET_TASKS_COMPLETED'
const GET_TASKS_FAILED = 'TASKS/GET_TASKS_FAILED'
const SET_IS_LOADING = 'TASKS/SET_IS_LOADING'

const ADD_TASK = 'TASKS/ADD_TASK'
const DELETE_TASK = 'TASKS/DELETE_TASK'

const SET_TASK_FAVORITE = 'TASKS/SET_TASK_FAVORITE'
const SET_TASK_COMPLETED = 'TASKS/SET_TASK_COMPLETED'
const SET_ALL_TASKS_COMPLETED = 'TASKS/SET_ALL_TASKS_COMPLETED'

const EDIT_TASK_TEXT = 'TASKS/EDIT_TASK_TEXT'

const SET_SEARCH_TERM = 'TASKS/SET_SEARCH_TERM'

const getAllTasksCompleted = tasks => ({
    type: GET_TASKS_COMPLETED,
    payload: tasks
})

const getAllTasksFailed = message => ({
    type: GET_TASKS_FAILED,
    payload: message
})

const setIsLoading = () => ({
    type: SET_IS_LOADING
})

export const addTask = task => ({
    type: ADD_TASK,
    payload: task
})

export const deleteTask = id => ({
    type: DELETE_TASK,
    payload: id
})

export const setTaskFavorite = id => ({
    type: SET_TASK_FAVORITE,
    payload: id
})

export const setTaskCompleted = id => ({
    type: SET_TASK_COMPLETED,
    payload: id
})

export const editTaskText = (id, text) => ({
    type: EDIT_TASK_TEXT,
    payload: {
        id,
        text
    }
})

export const setSearchTerm = term => ({
    type: SET_SEARCH_TERM,
    payload: term
})

export const setAllTasksCompleted = () => ({
    type: SET_ALL_TASKS_COMPLETED
})

export const getAllTasksThunk = () => dispatch => {
    dispatch(setIsLoading())
    tasksApi.getAllTasks()
        .then(({ data }) => {
            if (data.statusCode === 0) {
                dispatch(getAllTasksCompleted(data.tasks))
            }
        })
        .catch((r) => {
            dispatch(getAllTasksFailed(r.message))
        })
}

export const addTaskThunk = text => dispatch => {

    const newTask = {
        id: createUUID(),
        text,
        created: Date.now(),
        completed: false,
        favorite: false
    }

    tasksApi.addTask(newTask).then(({ data }) => {
        if (data.statusCode === 0) {
            dispatch(addTask({ ...data.result }))
        } else {
            console.log('add failed')
        }
    })

}

export const deleteTaskThunk = id => dispatch => {
    tasksApi.deleteTask(id)
        .then(({ data }) => {
            if (data.statusCode === 0) {
                dispatch(deleteTask(id))
            }
        })
}

export const setTaskFavoriteThunk = (id, favorite) => dispatch => {
    tasksApi.setTaskFavorite(id, favorite)
        .then(({ data }) => {
            if (data.statusCode === 0) {
                dispatch(setTaskFavorite(id))
            }
        })
}

export const setTaskCompletedThunk = (id, completed) => dispatch => {
    tasksApi.setTaskCompleted(id, completed)
        .then(({ data }) => {
            if (data.statusCode === 0) {
                dispatch(setTaskCompleted(id))
            }
        })
}

export const editTaskTextThunk = (id, text) => dispatch => {
    tasksApi.editTaskText(id, text)
        .then(({ data }) => {
            if (data.statusCode === 0) {
                dispatch(editTaskText(id, text))
            }
        })
}

export const setAllTasksCompletedThunk = () => dispatch => {
    tasksApi.setAllTasksCompleted()
        .then(({ data }) => {
            if (data.statusCode === 0) {
                dispatch(setAllTasksCompleted())
            }
        })
}

const initialState = Map({
    data: fromJS([]),
    searchTerm: '',
    isLoading: false,
    error: false,
    errorMessage: ''
})

const getTaskIndex = (state, id) => {
    return state.get('data').findIndex(task => task.get('id') === id)
}

export const taskReducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_TASKS_COMPLETED:
            return state.set('data', sortTasksByGroup(fromJS(action.payload))).set('error', false).set('errorMessage', '').set('isLoading', false)

        case GET_TASKS_FAILED:
            return state.set('error', true).set('errorMessage', action.payload).set('isLoading', false)

        case SET_IS_LOADING:
            return state.set('isLoading', true)

        case ADD_TASK: {
            return state.set('data', sortTasksByGroup(state.get('data').unshift(fromJS(action.payload))))
        }

        case DELETE_TASK:
            return state.set('data', sortTasksByGroup(state.get('data').filter(task => task.get('id') !== action.payload)))

        case SET_TASK_FAVORITE: {
            const taskIndex = getTaskIndex(state, action.payload)
            return state.set('data', sortTasksByGroup(state.get('data').update(taskIndex, task => task.set('favorite', !task.get('favorite')))))
        }

        case SET_TASK_COMPLETED: {
            const taskIndex = getTaskIndex(state, action.payload)
            return state.set('data', sortTasksByGroup(state.get('data').update(taskIndex, task => task.set('completed', !task.get('completed')))))
        }

        case EDIT_TASK_TEXT: {
            const taskIndex = getTaskIndex(state, action.payload.id)
            return state.set('data', state.get('data').update(taskIndex, task => task.set('text', action.payload.text)))
        }

        case SET_SEARCH_TERM:
            return state.set('searchTerm', action.payload)

        case SET_ALL_TASKS_COMPLETED:
            return state.set('data', state.get('data').map(task => task.set('completed', true)))

        default:
            return state
    }
}

// selectors
const taskSelector = state => state.task.get('data')
const searchTermSelector = state => state.task.get('searchTerm')

export const filteredTodos = createSelector(
    [taskSelector, searchTermSelector],
    (tasks, searchTerm) => tasks.filter(task => task.get('text').toLowerCase().includes(searchTerm))
)

export const isAllCompleted = createSelector(
    [taskSelector],
    (tasks) => tasks.every(task => task.get('completed') === true)
)

export const errorSelector = state => {
    return {
        error: state.task.get('error'),
        errorMessage: state.task.get('errorMessage')
    }
}

export const isLoadingSelector = state => state.task.get('isLoading')
