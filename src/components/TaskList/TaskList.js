import React from 'react'
import { Checkbox, Col, List as TodoListComponent, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import TaskItem from '../TaskItem/TaskItem'
import { filteredTodos, isAllCompleted, setAllTasksCompleted } from '../../ducks/task'

const TaskList = () => {

    const tasks = useSelector(state => filteredTodos(state))
    const isAllTasksCompleted = useSelector(state => isAllCompleted(state))

    const dispatch = useDispatch()

    const onCheckCompletedAllTasks = () => {
        dispatch(setAllTasksCompleted())
    }

    return (
        <Row>
            <Col span={24}>
                <TodoListComponent
                    bordered={true}
                    style={{ marginBottom: '25px' }}
                    itemLayout="horizontal"
                    dataSource={tasks}
                    locale={{ emptyText: 'Ничего нет :)' }}
                    renderItem={
                        task => (
                            <TaskItem task={task} key={task.get('id')}/>
                        )
                    }
                />
                <Checkbox onClick={onCheckCompletedAllTasks} checked={isAllTasksCompleted}>Все задачи выполнены</Checkbox>
            </Col>
        </Row>
    )
}

export default TaskList
