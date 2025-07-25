import React from 'react';

interface TaskItemProps {
    title: string;
    status: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ title, status }) => {
    return (
        <div className="task-item">
            <h3>{title}</h3>
            <p>Status: {status}</p>
        </div>
    );
};

export default TaskItem;