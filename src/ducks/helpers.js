import { v4 } from 'uuid'
import { List } from 'immutable'

export const sortTasksByDate = (tasks) => {
    return tasks.sort((task1, task2) => {
        if (
            task1.get('created')
            < task2.get('created')
        ) {
            return 1
        } else if (
            task1.get('created')
            > task2.get('created')
        ) {
            return -1
        }

        return 0
    })
}


export const sortTasksByGroup = (tasks) => {

    const favorite = tasks.filter(
        (task) => task.get('favorite') && !task.get('completed')
    )

    const usual = tasks.filter(
        (task) => !task.get('favorite') && !task.get('completed')
    )

    const completed = sortTasksByDate(
        tasks.filter((task) => task.get('completed'))
    )

    const sortedCompleted = [
        ...completed.sort((task1, task2) => {
            if (task1.get('favorite') && !task2.get('favorite')) {
                return -1
            } else if (!task1.get('favorite') && task2.get('favorite')) {
                return 1
            }

            return 0
        })
    ]

    return List([
        ...sortTasksByDate(favorite),
        ...sortTasksByDate(usual),
        ...sortedCompleted
    ])
}

export const createUUID = () => {
    return v4()
}
