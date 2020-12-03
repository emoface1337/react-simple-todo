import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Checkbox, Col, List as TodoListComponent, Row, Spin, Typography } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import TaskItem from '../TaskItem/TaskItem'

import {
    errorSelector,
    filteredTodos,
    getAllTasksThunk,
    isAllCompleted,
    isLoadingSelector,
    setAllTasksCompletedThunk
} from '../../ducks/tasks'

const TaskList = () => {

    const tasks = useSelector(state => filteredTodos(state))
    const isAllTasksCompleted = useSelector(state => isAllCompleted(state))

    const { error, errorMessage } = useSelector(state => errorSelector(state))
    const isLoading = useSelector(state => isLoadingSelector(state))
    const dispatch = useDispatch()

    const onCheckCompletedAllTasks = () => {
        if (!isAllTasksCompleted)
            dispatch(setAllTasksCompletedThunk())
    }

    useEffect(() => {
        dispatch(getAllTasksThunk())
    }, [dispatch])

    if (isLoading)
        return <div style={{ textAlign: 'center' }}><Spin indicator={<LoadingOutlined style={{ fontSize: 54 }}/>}/>
        </div>

    if (error) {
        return (
            <Typography.Title level={4} style={{ textAlign: 'center' }}
                              type={'danger'}>{errorMessage}</Typography.Title>
        )
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
                {
                    tasks.size !== 0 ?
                        <Checkbox onClick={onCheckCompletedAllTasks} checked={isAllTasksCompleted}>Все задачи
                            выполнены</Checkbox> : null
                }
            </Col>
        </Row>
    )
}

export default TaskList
