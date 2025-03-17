import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {

    let [tasks, setTasks] = useState<TaskType[]>(
        [
            {
                id: v1(),
                title: 'CSS&HTML',
                isDone: true,
            },
            {
                id: v1(),
                title: 'JS',
                isDone: true,
            },
            {
                id: v1(),
                title: 'ReactJS',
                isDone: false,
            },
            {
                id: v1(),
                title: 'Rest API',
                isDone: false,
            },
            {
                id: v1(),
                title: 'GraphQL',
                isDone: false,
            }
        ]
    )

    let [filter, setFilter] = useState<FilterValuesType>('all');

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId));
    }

    const addTask = (title: string) => {
        let newTask: TaskType = {id: v1(), title: title, isDone: false};
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks)
    }

    const changeFilter = (filterValues: FilterValuesType) => {
        setFilter(filterValues);
    }

    const tasksForTodolistFoo = () => {
        if (filter === 'completed') {
           return tasks.filter((t) => t.isDone)
        }
        if (filter === 'active') {
            return tasks.filter((t) => !t.isDone)
        } else {
            return tasks
        }
    }

    let tasksForTodolist = tasksForTodolistFoo()

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}/>
        </div>
    );
}

export default App;
