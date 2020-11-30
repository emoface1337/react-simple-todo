import React from 'react'
import { Col, Input, Typography } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 25px
`

const Header = () => {
    return (
        <HeaderContainer className="app-header">
            <Col span={18}>
                <Typography.Title className="app-header__title" level={3}>Планировщик задач</Typography.Title>
            </Col>
            <Col span={6}>
                <Input className="app-header__input" size="large" placeholder="Поиск"
                       suffix={<SearchOutlined/>}/>
            </Col>
        </HeaderContainer>
    )
}

export default Header
