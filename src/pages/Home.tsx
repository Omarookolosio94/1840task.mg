import { Link, Outlet } from 'react-router-dom';
import Accordion from '../core/components/Accordion';
import TaskBox from '../core/components/TaskBox';
import { useTaskService } from '../core/taskContext';
import { generateRandomId } from '../core/utils';
import { useMemo } from 'react';
import { Status } from '../core/defaults';

export default function Home() {
  const { tasks, updateTask } = useTaskService();

  // Ensure all statuses exist in groupedTasks
  const groupedTasks = useMemo(() => {
    return Object.values(Status).reduce((acc, status) => {
      acc[status] = tasks.filter((task) => task.status === status);
      return acc;
    }, {} as Record<Status, typeof tasks>);
  }, [tasks]);

  const isEmpty = Object.values(groupedTasks).every(
    (tasks) => tasks.length === 0
  );

  return (
    <main className="app-view">
      <section className="home">
        <div className="main-header">
          <h5 className="title">List of Tasks</h5>

          <Link to="/new" className="btn">
            Add Task
          </Link>
        </div>

        {isEmpty ? (
          // Empty state message
          <div className="empty-state">
            <p>No tasks available.</p>

            <div className="submit-box">
              <Link to="/new" className="btn">
                Add Task
              </Link>
            </div>
          </div>
        ) : (
          // Dynamically render tasks grouped by status
          Object.entries(groupedTasks).map(([status, tasks]) => (
            <Accordion key={status} status={status} count={tasks.length}>
              {tasks?.length > 0 ? (
                tasks.map((task) => (
                  <TaskBox key={task.id} task={task} onUpdate={updateTask} />
                ))
              ) : (
                <TaskBox
                  key={generateRandomId()}
                  task={null}
                  onUpdate={updateTask}
                />
              )}
            </Accordion>
          ))
        )}
      </section>

      <Outlet />
    </main>
  );
}
