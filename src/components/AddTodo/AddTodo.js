import React, { useState } from 'react'
import { Button, Col, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'

import styled from 'styled-components'
import { addTask } from '../../ducks/todo'

const AddTaskContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 13px
`

const AddTodo = () => {

    const [inputValue, setInputValue] = useState('')

    const dispatch = useDispatch()

    const onAddTodo = () => {
        const text = inputValue
        if (text !== '') {
            dispatch(addTask(text))
            setInputValue('')
        }
    }

    return (
        <AddTaskContainer>
            <Col span={18}>
                <Input className="app-add__input" size="large" value={inputValue}
                       placeholder="Описание новой задачи" onChange={event => setInputValue(event.target.value)}/>
            </Col>
            <Col span={6}>
                <Button type="primary" icon={<PlusOutlined/>} size="large"
                        onClick={() => onAddTodo()}
                >
                    Добавить задачу
                </Button>
            </Col>
        </AddTaskContainer>
    )
}

export default AddTodo
