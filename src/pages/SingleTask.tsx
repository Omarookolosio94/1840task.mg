import { useParams } from 'react-router-dom';
import TaskForm from './partials/TaskForm';
import { useTaskService } from '../core/taskContext';
import { useEffect, useState } from 'react';

export default function SingleTask() {
  const { id } = useParams();
  const { getTaskById } = useTaskService();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if ((id ?? '').length > 0) {
      const task = getTaskById(id!);
      setTask(task);
    }
  }, [id]);

  return task ? (
    <>
      <section className="task-view">
        <TaskForm id={id} task={{ ...task }} setTask={setTask} />
      </section>
    </>
  ) : (
    <>
      <section className="task-view">
        <div className="empty-state">
          <p>Resource you are looking for does not exist</p>
        </div>
      </section>
    </>
  );
}
