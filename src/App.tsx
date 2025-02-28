import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {

    let [tasks, setTasks] = useState<TaskType[]>(
        [
            {
                id: 1,
                title: 'CSS&HTML',
                isDone: true,
            },
            {
                id: 2,
                title: 'JS',
                isDone: true,
            },
            {
                id: 3,
                title: 'ReactJS',
                isDone: false,
            },
            {
                id: 4,
                title: 'Redux',
                isDone: false,
            }
        ]
    )
    let [filter, setFilter] = useState<FilterValuesType>('all');

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(t => t.id !== taskId));
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
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
