import React from 'react'
import { Checkbox, List } from 'antd'
import { DeleteTwoTone, EditOutlined, StarFilled, StarTwoTone } from '@ant-design/icons'

const TodoList = ({ data }) => {
    return (
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
    )
}

export default TodoList
