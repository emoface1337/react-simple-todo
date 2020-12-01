import React from 'react'
import { Checkbox, List as TodoListComponent } from 'antd'
import { useSelector } from 'react-redux'

import TodoItem from '../TodoItem/TodoItem'


const TodoList = () => {

    const todoItems = useSelector(state => state.todo.data)

    return (
        <>
            <TodoListComponent
                style={{ marginBottom: '25px' }}
                itemLayout="horizontal"
                dataSource={todoItems}
                locale={{ emptyText: 'Ничего нет :)' }}
                renderItem={
                    item => (
                        <TodoItem task={item} key={item.id}/>
                    )
                }
            />
            <Checkbox>Все задачи выполнены</Checkbox>
        </>
    )
}

export default TodoList
