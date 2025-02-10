import { createContext, useContext, useEffect, useState } from 'react';
import { getStoredTasks, saveTasks } from './utils';

// Context type
interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'dateAdded'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  getTasksByDate: (date: string) => Task[];
  getTaskById: (id: string) => Task | null;
}

// Create context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = getStoredTasks();
    return storedTasks.sort(
      (a, b) =>
        new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    );
  });

  useEffect(() => {
    const syncTasks = () => {
      const storedTasks = getStoredTasks().sort(
        (a, b) =>
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      );
      setTasks(storedTasks);
    };
    window.addEventListener('storage', syncTasks);
    return () => window.removeEventListener('storage', syncTasks);
  }, []);

  const addTask = (task: Omit<Task, 'dateAdded'>) => {
    const newTask = { ...task, dateAdded: new Date().toISOString() };
    setTasks((prev) => {
      const updatedTasks = [...prev, newTask].sort(
        (a, b) =>
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      );
      saveTasks(updatedTasks);
      return updatedTasks;
    });
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prev) => {
      const updatedTasks = prev
        .map((task) => (task.id === updatedTask.id ? updatedTask : task))
        .sort(
          (a, b) =>
            new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        );
      saveTasks(updatedTasks);
      return updatedTasks;
    });
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => {
      const updatedTasks = prev.filter((task) => task.id !== taskId);
      saveTasks(updatedTasks);
      return updatedTasks;
    });
  };

  // Get tasks for a specific date (YYYY-MM-DD)
  const getTasksByDate = (date: string): Task[] => {
    return tasks.filter((task) => task.dateAdded.startsWith(date));
  };

  // Get task by ID
  const getTaskById = (id: string): Task | null => {
    return tasks.find((task) => task.id === id) || null;
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        getTasksByDate,
        getTaskById,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook for consuming context
export const useTaskService = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskService must be used within a TaskProvider');
  }
  return context;
};
