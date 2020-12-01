import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteTask, editTodoText, setFavoriteTask } from '../../ducks/todo'

import { DeleteTwoTone, EditOutlined, StarFilled, StarTwoTone } from '@ant-design/icons'
import { Checkbox, Input, List } from 'antd'

import TodoActionIcon from '../../custom-components/TodoIcon'

const TodoItem = ({ task }) => {

    const taskText = task.get('text')
    const taskId = task.get('id')

    const [editMode, setEditMode] = useState(false)
    const [inputValue, setInputValue] = useState(taskText)

    const inputRef = useRef(null)

    const dispatch = useDispatch()

    const onDeleteTask = () => {
        dispatch(deleteTask(taskId))
    }

    const onSetFavoriteTask = () => {
        dispatch(setFavoriteTask(taskId))
    }

    const onEditTodo = () => {
        // ant design is crap
        setTimeout(() => {
            inputRef.current.focus()
        }, 1)
        setEditMode(true)
    }

    const onBlurInput = () => {
        dispatch(editTodoText(taskId, inputValue))
        setEditMode(false)
    }

    return (
        <List.Item
            style={{ fontSize: '18px', display: 'flex' }}
            actions={
                [
                    task.get('favorite')
                        ? <TodoActionIcon clickAction={onSetFavoriteTask}><StarFilled/></TodoActionIcon>
                        : <TodoActionIcon clickAction={onSetFavoriteTask}><StarTwoTone/></TodoActionIcon>,
                    <TodoActionIcon clickAction={onEditTodo}><EditOutlined/></TodoActionIcon>,
                    <TodoActionIcon clickAction={onDeleteTask}><DeleteTwoTone/></TodoActionIcon>
                ]
            }>
            <Checkbox style={{ marginRight: '15px' }}/>
            <Input value={inputValue}
                   disabled={!editMode}
                   ref={inputRef}
                   onChange={event => setInputValue(event.target.value)}
                   className="todo__input"
                   style={{ fontSize: '18px' }}
                   autoFocus
                   onBlur={onBlurInput}
            />
        </List.Item>
    )
}

export default TodoItem
