import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type PropsType = {
    todolistId: string
    title: string
    removeTodolist: (todolistId: string) => void
    tasks: TaskType[]
    removeTask: (payload: { taskId: string, todolistId: string }) => void
    changeFilter: (payload: { filter: FilterValuesType, todolistId: string }) => void
    addTask: (payload: { title: string, todolistId: string }) => void
    changeTaskStatus: (payload: { taskId: string, isDone: boolean, todolistId: string }) => void
    filter: FilterValuesType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function Todolist(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)


    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const addTask = () => {
        if (newTaskTitle.trim() !== '' && newTaskTitle.trim() !== 'rude task title') {
            props.addTask({title: newTaskTitle.trim(), todolistId: props.todolistId});
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }
    const FilterHandler = (filterValue: FilterValuesType) => {
        props.changeFilter({filter: filterValue, todolistId: props.todolistId})
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    const mappedTasks = props.tasks.map(t => {

            const onRemoveHandler = () => {
                props.removeTask({taskId: t.id, todolistId: props.todolistId});
            }
            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus({taskId: t.id, isDone: e.currentTarget.checked, todolistId: props.todolistId});
            }
            return <li className={t.isDone ? 'is-done' : ''} key={t.id}>
                <input type="checkbox" checked={t.isDone} onChange={onChangeStatusHandler}/>
                <span>{t.title}</span>
                <button onClick={onRemoveHandler}>x</button>
            </li>
        }
    )
    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodolistHandler}>x</button>
            </h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       className={error ? 'error' : ''}/>
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {mappedTasks}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={() => FilterHandler('all')}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={() => FilterHandler('active')}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={() => FilterHandler('completed')}>Completed
                </button>
            </div>
        </div>
    )
}