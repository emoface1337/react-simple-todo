import { fromJS, Map } from 'immutable'
import { createUUID, sortTasksByGroup } from './helpers'
import { createSelector } from 'reselect'

const ADD_TASK = 'TODO/ADD_TASK'
const DELETE_TASK = 'TODO/DELETE_TASK'
const SET_TASK_FAVORITE = 'TODO/SET_TASK_FAVORITE'
const EDIT_TASK_TEXT = 'TODO/EDIT_TASK_TEXT'
const SET_TASK_COMPLETED = 'TODO/SET_TASK_COMPLETED'
const SET_SEARCH_TERM = 'TODO/SET_SEARCH_TERM'
const SET_ALL_TASKS_COMPLETED = 'TODO/SET_ALL_TASKS_COMPLETED'

export const addTask = text => ({
    type: ADD_TASK,
    payload: text
})

export const deleteTask = id => ({
    type: DELETE_TASK,
    payload: id
})

export const setFavoriteTask = id => ({
    type: SET_TASK_FAVORITE,
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


export const setTaskCompleted = id => ({
    type: SET_TASK_COMPLETED,
    payload: id
})

export const setAllTasksCompleted = () => ({
    type: SET_ALL_TASKS_COMPLETED
})

const initialState = Map({
    data: fromJS([
        {
            id: '112b695b',
            text: 'Взять автограф у Джареда Лето',
            created: 1606820993936,
            completed: false,
            favorite: false
        }, {
            id: '4185e3af4a63',
            text: 'Зарегистрировать бабушку в Твиче',
            created: 1606820993931,
            completed: true,
            favorite: false
        }, {
            id: '6da3',
            text: 'Научиться играть на барабанах',
            created: 1606820993940,
            completed: false,
            favorite: true
        }
    ]),
    searchTerm: ''
})

const getTaskIndex = (state, id) => {
    return state.get('data').findIndex(task => task.get('id') === id)
}

export const taskReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_TASK: {
            const newTask = Map({
                id: createUUID(),
                text: action.payload,
                created: Date.now(),
                completed: false,
                favorite: false
            })
            return state.set('data', sortTasksByGroup(state.get('data').unshift(newTask)))
        }

        case DELETE_TASK:
            return state.set('data', state.get('data').filter(task => task.get('id') !== action.payload))


        case SET_TASK_FAVORITE: {
            const taskIndex = getTaskIndex(state, action.payload)
            return state.set('data', sortTasksByGroup(state.get('data').update(taskIndex, task => task.set('favorite', !task.get('favorite')))))
        }

        case EDIT_TASK_TEXT: {
            const taskIndex = getTaskIndex(state, action.payload.id)
            return state.set('data', state.get('data').update(taskIndex, task => task.set('text', action.payload.text)))
        }

        case SET_TASK_COMPLETED: {
            const taskIndex = getTaskIndex(state, action.payload)
            return state.set('data', sortTasksByGroup(state.get('data').update(taskIndex, task => task.set('completed', !task.get('completed')))))
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
