import { Link, Outlet } from 'react-router-dom';
import Accordion from '../core/components/Accordion';
import { Priority, Status } from '../core/defaults';
import TaskBox from '../core/components/TaskBox';
import { useTaskService } from '../core/useTaskService.hook';
import { useEffect } from 'react';

export default function Home() {
  const { tasks, addTask, updateTask } = useTaskService();

  useEffect(() => {
    localStorage.clear();

    const seedTask: Task[] = [
      {
        id: '1',
        title: 'Complete Project Proposal',
        description: 'Draft and finalize the project proposal document.',
        dueDate: '2025-02-15',
        priority: Priority.HIGH,
        status: Status.IN_PROGRESS,
      },
      {
        id: '2',
        title: 'Team Meeting',
        description: 'Discuss project milestones and deadlines with the team.',
        dueDate: '2025-02-18',
        priority: Priority.MEDIUM,
        status: Status.PENDING,
      },
      {
        id: '3',
        title: 'Code Review',
        description: 'Review PRs and suggest improvements.',
        dueDate: '2025-02-20',
        priority: Priority.LOW,
        status: Status.COMPLETED,
      },
    ];

    console.log(tasks);

    if (tasks?.length < 1) {
      seedTask.forEach((task) => {
        addTask(task);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="app-view">
      <section className="home">
        <div className="main-header">
          <h5 className="title">List of Task</h5>

          <Link to="/new" className="btn">
            Add Task
          </Link>
        </div>
        {/* 
            TODO: Filter tasks
            */}

        <Accordion
          status={Status.COMPLETED}
          count={
            tasks.filter((task) => task.status === Status.COMPLETED).length
          }
        >
          {tasks.map((task) => (
            <TaskBox key={task.id} task={task} onUpdate={updateTask} />
          ))}
        </Accordion>
      </section>

      <Outlet></Outlet>
    </main>
  );
}
