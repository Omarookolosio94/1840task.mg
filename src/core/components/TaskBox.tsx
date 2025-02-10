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
    if (task?.status !== 'completed') {
      task!.status = Status.COMPLETED;
      onUpdate(task);

      console.log(task);
    }
  };

  return (
    <div className="task">
      <input
        type="checkbox"
        checked={task?.status === 'completed'}
        disabled={task?.status === 'completed'}
        onChange={updateStatus}
      />
      <Link
        to={`/${task?.id}`}
        className={cx(
          'task-text',
          task?.status === 'completed' ? 'completed' : ''
        )}
      >
        {task?.description}
      </Link>
    </div>
  );
}
