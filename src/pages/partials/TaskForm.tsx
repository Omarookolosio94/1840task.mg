import { Link, useNavigate } from 'react-router-dom';
import { Priority, Status } from '../../core/defaults';
import { useState } from 'react';
import { useTaskService } from '../../core/taskContext';
import { generateRandomId } from '../../core/utils';
import Select from '../../core/components/Select';
import Input from '../../core/components/Input';
import TextArea from '../../core/components/TextArea';

interface Props {
  task?: Task;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setTask?: any;
  id?: string;
  onSuccess?: () => void;
}

export default function TaskForm({
  task = {
    id: '',
    title: '',
    description: '',
    dueDate: '',
    priority: Priority.LOW,
    status: Status.PENDING,
    dateAdded: '',
  },
  id = '',
  setTask,
}: Props) {
  const { addTask, updateTask, deleteTask } = useTaskService();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const priorityOptions = Object.values(Priority).map((priority) => ({
    name: priority.charAt(0).toUpperCase() + priority.slice(1),
    value: priority,
  }));

  const statusOptions = Object.values(Status).map((status) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: status,
  }));

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setTask((state: any) => ({
      ...state,
      [name]: value,
    }));

    // Clear error when user types
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateTask = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!task.title.trim()) newErrors.title = 'Title is required';
    /*
    if (!task.description.trim())
      newErrors.description = 'Description is required';
      */
    if (!task.priority.trim()) newErrors.priority = 'Priority is required';
    if (!task.status.trim()) newErrors.status = 'Status is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateTask()) {
      return;
    }

    if (id?.length > 0) {
      updateTask(task);

      window.alert('Task updated');
    } else {
      addTask({
        ...task,
        id: generateRandomId(),
      });
      setTask({
        id: '',
        title: '',
        description: '',
        dueDate: '',
        priority: Priority.LOW,
        status: Status.PENDING,
        dateAdded: '',
      });

      window.alert('New task added');
    }
  };

  const onDelete = (taskId: string) => {
    deleteTask(taskId);
    navigate('/');
  };

  return (
    <>
      <div className="main-header">
        <h5 className="title">
          {id?.length < 1 ? 'Add New Task' : `View Task - ${id}`}
        </h5>

        <Link to="/" className="btn">
          Close
        </Link>
      </div>

      <form onSubmit={onAddTask}>
        <Input
          label="Title"
          name="title"
          onChange={onChange}
          value={task?.title}
          error={errors.title}
        />

        <TextArea
          label="Description"
          name="description"
          onChange={onChange}
          value={task?.description}
          error={errors.description}
        />

        <Input
          label="Due date"
          name="dueDate"
          onChange={onChange}
          value={task?.dueDate}
          type="date"
          error={errors.dueDate}
        />

        <Select
          label="Priority"
          name="priority"
          onChange={onChange}
          value={task?.priority}
          options={priorityOptions}
          error={errors.priority}
        />

        <Select
          label="Status"
          name="status"
          onChange={onChange}
          value={task?.status}
          options={statusOptions}
          error={errors.status}
          disabled={id?.length > 0 && task?.status === Status.COMPLETED}
        />

        <div className="submit-box">
          {id?.length > 0 && (
            <button
              onClick={() => onDelete(id)}
              type="button"
              className="btn danger"
            >
              Delete Task
            </button>
          )}

          <button type="submit" className="btn">
            {id?.length > 0 ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </form>
    </>
  );
}
