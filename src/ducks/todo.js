import { List } from 'immutable'

const ADD_TODO = 'TODO/ADD_TODO'
const DELETE_TODO = 'TODO/DELETE_TODO'

export const addTodo = text => ({
    type: ADD_TODO,
    payload: text
})

export const deleteTodo = id => ({
    type: DELETE_TODO,
    payload: id
})

const initialState = {
    data: List([
        {
            id: 1,
            text: 'Взять автограф у Джареда Лето',
            created: Date.now(),
            completed: false,
            favorite: false
        }, {
            id: 2,
            text: 'Зарегистрировать бабушку в Твиче',
            created: Date.now(),
            completed: true,
            favorite: false
        }, {
            id: 3,
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
            const newItem = {
                id: Date.now(),
                text: action.payload,
                created: Date.now(),
                completed: false,
                favorite: false
            }
            return {
                data: state.data.unshift(newItem)
            }
        }

        case DELETE_TODO: {
            const itemIndex = state.data.findIndex(item => item.id === action.payload)
            return {
                data: state.data.delete(itemIndex)
            }
        }

        default:
            return state
    }
}
