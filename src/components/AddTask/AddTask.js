import React, { useState } from 'react'
import { Button, Col, Input, Row } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'

import styled from 'styled-components'
import { addTask } from '../../ducks/task'

const AddTaskContainer = styled.div`
  margin-bottom: 25px
`

const AddTask = () => {

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
            <Row gutter={5}>
                <Col span={17}>
                    <Input className="app-add__input" size="large" value={inputValue}
                           placeholder="Описание новой задачи" onChange={event => setInputValue(event.target.value)}/>
                </Col>
                <Col span={7}>
                    <Button type="primary" icon={<PlusOutlined/>} style={{ width: '100%', height: '100%'}} onClick={() => onAddTodo()}>
                        Добавить задачу
                    </Button>
                </Col>
            </Row>
        </AddTaskContainer>
    )
}

export default AddTask
