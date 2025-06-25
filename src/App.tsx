import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {

    const changeStatus = (payload: { taskId: string, isDone: boolean, todolistId: string }) => {
        const {taskId, isDone, todolistId} = payload;
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)})
    }

    const removeTask = (payload: { taskId: string, todolistId: string }) => {
        const {taskId, todolistId} = payload
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)});
    }

    const addTask = (payload: { title: string, todolistId: string }) => {
        const {title, todolistId} = payload
        let newTask: TaskType = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeFilter = (payload: { filter: FilterValuesType, todolistId: string }) => {
        const {filter, todolistId} = payload
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'active'},
        {id: todolistId2, title: 'What to buy', filter: 'completed'},
    ])

    let [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'CSS&HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Book', isDone: false},
            {id: v1(), title: 'Milk', isDone: false}
        ]
    })

    return (
        <div className="App">
            {todolists.map((tl) => {

                const tasksForTodolistFoo = () => {
                    let tasksForTodolist = tasks[tl.id]

                    if (tl.filter === 'completed') {
                        return tasksForTodolist.filter((t) => t.isDone)
                    }
                    if (tl.filter === 'active') {
                        return tasksForTodolist.filter((t) => !t.isDone)
                    } else {
                        return tasksForTodolist
                    }
                }

                return <Todolist key={tl.id}
                                 todolistId={tl.id}
                                 title={tl.title}
                                 removeTodolist={removeTodolist}
                                 tasks={tasksForTodolistFoo()}
                                 removeTask={removeTask}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 changeTaskStatus={changeStatus}
                                 filter={tl.filter}/>
            })}

        </div>
    );
}

export default App;
