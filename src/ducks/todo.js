const initialState = {
    data: [
        {
            text: 'Взять автограф у Джареда Лето',
            id: 1,
            created: Date.now(),
            completed: false,
            favorite: false
        }, {
            text: 'Зарегистрировать бабушку в Твиче',
            id: 2,
            created: Date.now(),
            completed: true,
            favorite: false
        }, {
            text: 'Научиться играть на барабанах',
            id: 3,
            created: Date.now(),
            completed: false,
            favorite: true
        }
    ]
}

export const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
}
