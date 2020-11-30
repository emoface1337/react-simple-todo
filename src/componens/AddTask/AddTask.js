import React from 'react'
import { Button, Col, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const AddTaskContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 13px
`

const AddTask = () => {
    return (
        <AddTaskContainer>
            <Col span={18}>
                <Input className="app-add__input" size="large"
                       placeholder="Описание новой задачи"/>
            </Col>
            <Col span={6}>
                <Button type="primary" icon={<PlusOutlined/>} style={{
                    width: '100%',
                    height: '40px',
                    minHeight: '100%'
                }}>
                    Добавить задачу
                </Button>
            </Col>
        </AddTaskContainer>
    )
}

export default AddTask
