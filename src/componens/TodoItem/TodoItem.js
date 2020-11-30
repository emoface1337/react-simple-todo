import React from 'react'
import { DeleteTwoTone, EditOutlined, StarFilled, StarTwoTone } from '@ant-design/icons'
import { Checkbox, List } from 'antd'

const TodoItem = ({ item }) => {
    return (
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
    )
}

export default TodoItem
