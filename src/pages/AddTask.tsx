import { useState } from 'react';
import TaskForm from './partials/TaskForm';
import { Priority, Status } from '../core/defaults';

export default function AddTask() {
  const [task, setTask] = useState({
    id: '',
    title: '',
    description: '',
    dueDate: '',
    priority: Priority.LOW,
    status: Status.PENDING,
    dateAdded: '',
  });

  return (
    <section className="task-view">
      <TaskForm task={task} setTask={setTask} />
    </section>
  );
}
