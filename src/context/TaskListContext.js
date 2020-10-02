import React, { createContext, useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid';
export const TaskListContext = createContext();
// {
//     title: 'Read the book', id: 1
// },
// {
//     title: 'Teach the students', id: 2
// },
// {
//     title: 'Write some code', id: 3
// }
const TaskListContextProvider = ({ children }) => {
    const initialState = JSON.parse(localStorage.getItem('tasks')) || []

    const [editItem, setEditItem] = useState(null)
    const [tasks, setTasks] = useState([
    ]);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    // Add tasks
    const addTask = title => {
        setTasks([...tasks, { title, id: uuid() }])
    }

    // Remove tasks
    const removeTask = id => {
        setTasks(tasks.filter(task => task.id !== id))
    }

    // Clear tasks
    const clearList = () => {
        setTasks([])
    }

    // Find task
    const findItem = id => {
        const item = tasks.find(task => task.id === id)
        setEditItem(item)
    }

    // Edit task
    const editTask = (title, id) => {
        const newTasks = tasks.map(task => (task.id === id ? { title, id } : task))
        console.log(newTasks)
        setTasks(newTasks)
        setEditItem(null)
    }
    return (
        <TaskListContext.Provider value={{
            tasks, addTask, removeTask,
            clearList,
            findItem,
            editTask,
            editItem
        }}>
            {children}
        </TaskListContext.Provider>
    )
}

export default TaskListContextProvider