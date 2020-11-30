import React from 'react'
import styled from 'styled-components'
import { Col, Row } from 'antd'

import './theme/App.sass'

import TodoList from './componens/TodoList/TodoList'
import Header from './componens/Header/Header'
import AddTodo from './componens/AddTodo/AddTodo'

const ContentContainer = styled.div`
    background: #F3F3F3;
    padding: 50px 75px;
    border-radius: 10px
`

const App = () => {
    return (
        <section className="app">
            <main>
                <Row gutter={16}>
                    <Col span={12} offset={6}>
                        <ContentContainer>
                            <Header/>
                            <AddTodo/>
                            <Col span={24}>
                                <TodoList/>
                            </Col>
                        </ContentContainer>
                    </Col>
                </Row>
            </main>
        </section>
    )
}

export default App
