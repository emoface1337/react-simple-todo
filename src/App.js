import React from 'react'
import styled from 'styled-components'
import { Checkbox, Col, Row } from 'antd'

import './theme/App.sass'
import TodoList from './componens/TodoList/TodoList'
import Header from './componens/Header/Header'
import AddTask from './componens/AddTask/AddTask'

const ContentContainer = styled.div`
    background: #F3F3F3;
    padding: 50px 75px;
    border-radius: 10px
`

const data = [
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

const App = () => {
    return (
        <section className="app">
            <main>
                <Row gutter={16}>
                    <Col span={12} offset={6}>
                        <ContentContainer>
                            <Header/>
                            <AddTask/>
                            <Col span={24}>
                                <TodoList data={data}/>
                            </Col>
                            <Col span={24}>
                                <Checkbox>Все задачи выполнены</Checkbox>
                            </Col>
                        </ContentContainer>
                    </Col>
                </Row>
            </main>
        </section>
    )
}

export default App
