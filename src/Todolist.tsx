import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

type TodolistPropsType = {
    todolistId: string
    title: string
    removeTodolist: (todolistId: string) => void
    tasks: TaskType[]
    removeTask: (payload: { taskId: string, todolistId: string }) => void
    changeFilter: (payload: { filter: FilterValuesType, todolistId: string }) => void
    addTask: (payload: { title: string, todolistId: string }) => void
    changeTaskStatus: (payload: { taskId: string, isDone: boolean, todolistId: string }) => void
    changeTaskTitle: (payload: { taskId: string, todolistId: string, title: string }) => void
    onChangeTodolistTitle: (payload: { todolistId: string, title: string }) => void
    filter: FilterValuesType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function Todolist(props: TodolistPropsType) {

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
            const onChangeTitleHandler = (title: string) => {
                props.changeTaskTitle({taskId: t.id, todolistId: props.todolistId, title})
            }
            return <li className={t.isDone ? 'is-done' : ''} key={t.id}>
                <input type="checkbox" checked={t.isDone} onChange={onChangeStatusHandler}/>
                <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                <button onClick={onRemoveHandler}>x</button>
            </li>
        }
    )

    const addTask = (title: string) => {
        props.addTask({title: title, todolistId: props.todolistId})
    }

    const onChangeTodolistTitleHandler = (title: string) => {
        props.onChangeTodolistTitle({title: title, todolistId: props.todolistId})
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={onChangeTodolistTitleHandler}/>
                <button onClick={removeTodolistHandler}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
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

