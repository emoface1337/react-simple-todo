import React from 'react'
import styled from 'styled-components'
import { Col, Row } from 'antd'

import './theme/App.sass'

import TaskList from './components/TaskList/TaskList'
import Header from './components/Header/Header'
import AddTask from './components/AddTask/AddTask'

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
                            <AddTask/>
                            <TaskList/>
                        </ContentContainer>
                    </Col>
                </Row>
            </main>
        </section>
    )
}

export default App
