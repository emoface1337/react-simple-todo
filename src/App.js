import React from 'react'
import styled from 'styled-components'
import { Button, Checkbox, Col, Input, List, Row, Typography } from 'antd'
import { DeleteTwoTone, EditOutlined, PlusOutlined, SearchOutlined, StarFilled, StarTwoTone } from '@ant-design/icons'

import './theme/App.sass'

const AppHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 25px
`

const AppContent = styled.div`
    background: #F3F3F3;
    padding: 50px 75px;
    border-radius: 10px
`

const AppTaskAdd = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 13px
`

const { Title } = Typography

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
                        <AppContent>
                            <AppHeader className="app-header">
                                <Col span={18}>
                                    <Title className="app-header__title" level={3}>Планировщик задач</Title>
                                </Col>
                                <Col span={6}>
                                    <Input className="app-header__input" size="large" placeholder="Поиск"
                                           suffix={<SearchOutlined/>}/>
                                </Col>
                            </AppHeader>
                            <AppTaskAdd>
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
                            </AppTaskAdd>
                            <Col span={24}>
                                <List
                                    style={{ marginBottom: '25px' }}
                                    itemLayout="horizontal"
                                    dataSource={data}
                                    renderItem={item => (
                                        <List.Item
                                            style={{ fontSize: '18px', display: 'flex' }}
                                            actions={
                                                [
                                                    item.favorite
                                                        ? <StarFilled style={{ color: '#1890ff' }}/>
                                                        : <StarTwoTone/>,
                                                    <EditOutlined/>,
                                                    <DeleteTwoTone/>
                                                ]
                                            }>
                                            <Checkbox style={{ marginRight: '15px' }}/>
                                            <div style={{ width: '100%' }}>{item.text}</div>
                                        </List.Item>
                                    )}
                                />
                            </Col>
                            <Col span={24}>
                                <Checkbox>Все задачи выполнены</Checkbox>
                            </Col>
                        </AppContent>
                    </Col>
                </Row>
            </main>
        </section>
    )
}

export default App
