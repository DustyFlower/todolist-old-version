import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: TaskType[]
}

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'start',
    color: (theme.vars ?? theme).palette.text.secondary,
    '& h3': {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    '& .mappedTasks': {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
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

    const addTodolist = (title: string) => {
        let todolist: TodolistType = {id: v1(), title, filter: 'all'}
        setTodolists([todolist, ...todolists])
        setTasks({...tasks, [todolist.id]: []})
    }

    const changeTaskTitle = (payload: { taskId: string, title: string, todolistId: string }) => {
        const {taskId, title, todolistId} = payload
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)})
    }

    const onChangeTodolistTitle = (payload: { todolistId: string, title: string }) => {
        const {todolistId, title} = payload
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
    }

    return (
        <div className="App">
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container fixed>
                <Grid container sx={{p: 2}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3} sx={{alignItems: 'flex-start'}}>
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

                        return <Item elevation={2} color={'black'}>
                            <Todolist key={tl.id}
                                      todolistId={tl.id}
                                      title={tl.title}
                                      removeTodolist={removeTodolist}
                                      tasks={tasksForTodolistFoo()}
                                      removeTask={removeTask}
                                      changeFilter={changeFilter}
                                      addTask={addTask}
                                      changeTaskStatus={changeStatus}
                                      changeTaskTitle={changeTaskTitle}
                                      onChangeTodolistTitle={onChangeTodolistTitle}
                                      filter={tl.filter}/>
                        </Item>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
