import React from 'react';
import TaskList from '../components/TaskList';
import { Task } from '../types';

const Home: React.FC = () => {
    const tasks: Task[] = [
        { id: 1, title: 'Task 1', status: 'Completed' },
        { id: 2, title: 'Task 2', status: 'In Progress' },
        { id: 3, title: 'Task 3', status: 'Pending' },
    ];

    return (
        <div>
            <h1>Task List</h1>
            <TaskList tasks={tasks} />
        </div>
    );
};

export default Home;