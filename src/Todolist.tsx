import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filterValues: FilterValuesType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function Todolist(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('')

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => (e.key === 'Enter') && addTask()

    const addTask = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle('')
    }
    const FilterHandler = (filterValue: FilterValuesType) => {
        props.changeFilter(filterValue)
    }

    const mappedTasks = props.tasks.map(t => {

            const onRemoveHandler = () => {
                props.removeTask(t.id);
            }

            return <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={onRemoveHandler}>x</button>
            </li>
        }
    )
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyDown={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {mappedTasks}
            </ul>
            <div>
                <button onClick={() => FilterHandler('all')}>All</button>
                <button onClick={() => FilterHandler('active')}>Active</button>
                <button onClick={() => FilterHandler('completed')}>Completed</button>
            </div>
        </div>
    )
}