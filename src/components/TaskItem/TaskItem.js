import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteTask, editTaskText, setFavoriteTask, setTaskCompleted } from '../../ducks/task'

import { DeleteTwoTone, EditOutlined, StarFilled, StarTwoTone } from '@ant-design/icons'
import { Checkbox, Input, List } from 'antd'

import TodoActionIcon from '../../custom-components/TodoIcon'

const defaultListStyles = {
    fontSize: '18px',
    display: 'flex'
}

const TaskItem = ({ task }) => {

    const taskText = task.get('text')
    const taskId = task.get('id')
    const taskCompleted = task.get('completed')

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

    const onEditTask = () => {
        // ant design is crap
        setTimeout(() => {
            inputRef.current.focus()
        }, 1)
        setEditMode(true)
    }

    const onSetTaskCompleted = () => {
        dispatch(setTaskCompleted(taskId))
    }

    const onBlurInput = () => {
        if (inputValue !== taskText) {
            dispatch(editTaskText(taskId, inputValue))
        }
        setEditMode(false)
    }

    return (
        <List.Item
            style={taskCompleted ? { background: '#E9E9E9', ...defaultListStyles } : { background: 'white', ...defaultListStyles }}
            actions={
                [
                    task.get('favorite')
                        ? <TodoActionIcon clickAction={onSetFavoriteTask}><StarFilled/></TodoActionIcon>
                        : <TodoActionIcon clickAction={onSetFavoriteTask}><StarTwoTone
                            twoToneColor="#eb2f96"/></TodoActionIcon>,
                    <TodoActionIcon clickAction={onEditTask}><EditOutlined/></TodoActionIcon>,
                    <TodoActionIcon clickAction={onDeleteTask}><DeleteTwoTone/></TodoActionIcon>
                ]
            }>
            <Checkbox onClick={onSetTaskCompleted} style={{ marginRight: '15px' }} checked={taskCompleted}/>
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

export default TaskItem
