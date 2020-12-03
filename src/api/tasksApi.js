import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:7777/tasks'
})

export const tasksApi = {
    getAllTasks: () => instance.get(''),
    addTask: task => instance.post('', { ...task }),
    deleteTask: id => instance.delete(`/${id}`),
    setTaskFavorite: (id, favorite) => instance.put(`/${id}`, { favorite }),
    setTaskCompleted: (id, completed) => instance.put(`/${id}`, { completed }),
    editTaskText: (id, text) => instance.put(`/${id}`, { text }),
    setAllTasksCompleted: () => instance.put('')
}
