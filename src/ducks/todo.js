const ADD_TODO = 'TODO/ADD_TODO'
// const DELETE_TODO = 'TODO/DELETE_TODO'

export const addTodo = text => ({
    type: ADD_TODO,
    payload: text
})

const initialState = {
    data: [
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
    ]
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
                ...state,
                data: [newItem, ...state.data]
            }
        }

        default:
            return state
    }
}
