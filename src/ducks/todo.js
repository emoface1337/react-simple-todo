import { fromJS, Map } from 'immutable'
import { createUUID } from './helpers'

const ADD_TODO = 'TODO/ADD_TODO'
const DELETE_TODO = 'TODO/DELETE_TODO'
const SET_FAVORITE_TODO = 'TODO/SET_FAVORITE_TODO'
const EDIT_TODO_TEXT = 'TODO/EDIT_TODO_TEXT'

export const addTask = text => ({
    type: ADD_TODO,
    payload: text
})

export const deleteTask = id => ({
    type: DELETE_TODO,
    payload: id
})

export const setFavoriteTask = id => ({
    type: SET_FAVORITE_TODO,
    payload: id
})

export const editTodoText = (id,text) => ({
    type: EDIT_TODO_TEXT,
    payload: {
        id,
        text
    }
})

const initialState = {
    data: fromJS([
        {
            id: '1',
            text: 'Взять автограф у Джареда Лето',
            created: Date.now(),
            completed: false,
            favorite: false
        }, {
            id: '2',
            text: 'Зарегистрировать бабушку в Твиче',
            created: Date.now(),
            completed: true,
            favorite: false
        }, {
            id: '3',
            text: 'Научиться играть на барабанах',
            created: Date.now(),
            completed: false,
            favorite: true
        }
    ])
}


export const todoReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_TODO: {
            const newTask = Map({
                id: createUUID(),
                text: action.payload,
                created: Date.now(),
                completed: false,
                favorite: false
            })
            return {
                data: state.data.unshift(newTask)
            }
        }

        case DELETE_TODO: {
            return {
                data: state.data.filter(task => task.get('id') !== action.payload)
            }
        }

        case SET_FAVORITE_TODO: {
            const taskIndex = state.data.findIndex(task => task.get('id') === action.payload)
            return {
                data: state.data.update(taskIndex, task => task.set('favorite', !task.get('favorite')))
            }
        }

        case EDIT_TODO_TEXT: {
            const taskIndex = state.data.findIndex(task => task.get('id') === action.payload.id)
            return {
                data: state.data.update(taskIndex, task => task.set('text', action.payload.text))
            }
        }

        default:
            return state
    }
}
