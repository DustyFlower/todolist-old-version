import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {Button, Checkbox} from '@mui/material';
import {pink} from '@mui/material/colors';

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
            return <div className={t.isDone ? 'is-done' : ''} key={t.id}>
                <Checkbox checked={t.isDone} onChange={onChangeStatusHandler} sx={{
                    color: pink[800],
                    '&.Mui-checked': {
                        color: pink[600],
                    },
                }}/>
                <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                <IconButton aria-label="delete" onClick={onRemoveHandler} size={'small'}>
                    <DeleteIcon fontSize={'inherit'}/>
                </IconButton>
            </div>
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
                <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div className={'mappedTasks'}>
                {mappedTasks}
            </div>
            <div>
                <Button color={'inherit'} variant={props.filter === 'all' ? 'contained' : 'text'}
                        onClick={() => FilterHandler('all')}>All
                </Button>
                <Button color={'primary'} variant={props.filter === 'active' ? 'contained' : 'text'}
                        onClick={() => FilterHandler('active')}>Active
                </Button>
                <Button color={'secondary'} variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={() => FilterHandler('completed')}>Completed
                </Button>
            </div>
        </div>
    )
}

