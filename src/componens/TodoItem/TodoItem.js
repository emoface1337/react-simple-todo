import React from 'react'
import { DeleteTwoTone, EditOutlined, StarFilled, StarTwoTone } from '@ant-design/icons'
import { Checkbox, List } from 'antd'
import { useDispatch } from 'react-redux'
import { deleteTodo } from '../../ducks/todo'

const TodoItem = ({ item }) => {

    const dispatch = useDispatch()

    const onDeleteTodo = () => {
        dispatch(deleteTodo(item.id))
    }

    return (
        <List.Item
            style={{ fontSize: '18px', display: 'flex' }}
            actions={
                [
                    item.favorite
                        ? <StarFilled style={{ color: '#1890ff' }}/>
                        : <StarTwoTone/>,
                    <EditOutlined/>,
                    <DeleteTwoTone style={{ cursor: 'pointer'}}
                    onClick={() => onDeleteTodo()}/>
                ]
            }>
            <Checkbox style={{ marginRight: '15px' }}/>
            <div style={{ width: '100%' }}>{item.text}</div>
        </List.Item>
    )
}

export default TodoItem
