/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
import { cx } from '../utils';
import { Status } from '../defaults';

interface Props {
  task: Task | null;
  onUpdate?: any;
}

export default function TaskBox({ task = null, onUpdate = () => {} }: Props) {
  const updateStatus = () => {
    if (task?.status !== 'completed' || task !== null) {
      task!.status = Status.COMPLETED;
      onUpdate(task);
    }
  };

  return (
    <div className="task">
      {task !== null && (
        <input
          type="checkbox"
          checked={task?.status === 'completed'}
          disabled={task?.status === 'completed' || task == null}
          onChange={updateStatus}
        />
      )}
      <Link
        to={`/${task?.id}`}
        onClick={(e) => {
          if (task == null) e.preventDefault();
        }}
        className={cx(
          'task-text',
          task?.status === 'completed' ? 'completed' : ''
        )}
      >
        {task == null ? 'no tasks' : task?.title}
      </Link>
    </div>
  );
}
