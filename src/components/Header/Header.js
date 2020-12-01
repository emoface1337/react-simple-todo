import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { Col, Input, Row, Typography } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import { setSearchTerm } from '../../ducks/task'

const HeaderContainer = styled.header`
  margin-bottom: 25px
`

const Header = () => {

    const dispatch = useDispatch()

    const onSearch = event => {
        dispatch(setSearchTerm(event.target.value))
    }

    return (
        <HeaderContainer className="app-header">
            <Row align={'top'}>
                <Col span={16}>
                    <Typography.Title className="app-header__title" level={3}>Планировщик задач</Typography.Title>
                </Col>
                <Col span={8}>
                    <Input className="app-header__input" size="large" placeholder="Поиск" suffix={<SearchOutlined/>}
                           onChange={event => onSearch(event)}/>
                </Col>
            </Row>
        </HeaderContainer>
    )
}

export default Header
