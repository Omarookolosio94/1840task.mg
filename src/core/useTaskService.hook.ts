import { useCallback, useEffect, useMemo, useState } from 'react';
import { getStoredTasks, saveTasks } from './utils';

export const useTaskService = () => {
  const [tasks, setTasks] = useState<Task[]>(getStoredTasks);

  // Memoized value to prevent unnecessary re-renders
  const memoizedTasks = useMemo(() => tasks, [tasks]);

  // Load tasks from localStorage on mount
  useEffect(() => {
    setTasks(getStoredTasks());
  }, []);

  // Add a new task
  const addTask = useCallback((task: Task) => {
    setTasks((prev) => {
      const updatedTasks = [...prev, task];
      saveTasks(updatedTasks);
      return updatedTasks;
    });
  }, []);

  // Update a task
  const updateTask = useCallback((updatedTask: Task) => {
    setTasks((prev) => {
      const updatedTasks = prev.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      saveTasks(updatedTasks);
      return updatedTasks;
    });
  }, []);

  // Delete a task
  const deleteTask = useCallback((taskId: string) => {
    setTasks((prev) => {
      const updatedTasks = prev.filter((task) => task.id !== taskId);
      saveTasks(updatedTasks);
      return updatedTasks;
    });
  }, []);

  // Get a task by ID
  const getTaskById = useCallback(
    (taskId: string): Task | undefined => {
      return memoizedTasks.find((task) => task.id === taskId);
    },
    [memoizedTasks]
  );

  return { tasks: memoizedTasks, addTask, updateTask, deleteTask, getTaskById };
};
