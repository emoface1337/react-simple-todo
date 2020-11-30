import React from 'react'
import { Checkbox, List } from 'antd'

import TodoItem from '../TodoItem/TodoItem'
import { useSelector } from 'react-redux'

const TodoList = () => {

    const todoItems = useSelector(state => state.todo.data)

    return (
        <>
            <List
                style={{ marginBottom: '25px' }}
                itemLayout="horizontal"
                dataSource={todoItems}
                locale={{ emptyText: 'Ничего нет :)' }}
                renderItem={
                    item => (
                        <TodoItem item={item}/>
                    )
                }
            />
            <Checkbox>Все задачи выполнены</Checkbox>
        </>
    )
}

export default TodoList
