/* eslint-disable @typescript-eslint/no-explicit-any */
export const isNumeric = (str: string) => {
  return /^\d+$/.test(str);
};

export const cx = (...classNames: (string | (() => string))[]): string =>
  classNames
    .map((className) =>
      typeof className === 'function' ? className() : className
    )
    .filter(Boolean)
    .join(' ');

export const numbersOnly = (e: any) => {
  if (isNaN(e?.key) && e?.key !== 'Backspace') {
    e.preventDefault();
  }
};

export const formatNumber = (value: string | number | any) => {
  if (value === null || value === undefined || isNaN(+value)) {
    return '0';
  }

  let val: string | number = parseFloat(value);
  if (isNaN(val)) {
    return '0';
  }

  if (!String(value).includes('.')) {
    return `${Number(val).toLocaleString('en-US')}`;
  }

  val = val.toFixed(2);
  return `${Number(val).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) {
    return 'N/A';
  }

  const date = new Date(dateString);
  const monthName = date.toLocaleString('default', { month: 'short' });

  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  return `${monthName} ${day}, ${year}`;
};

export const isObjectEmpty = (obj: any) => {
  if (obj === null) return true;
  return Object.keys(obj).length === 0;
};

// Main section

// Local storage key
const TASKS_STORAGE_KEY = '1840tasks';

export const getStoredTasks = (): Task[] => {
  const tasks = localStorage.getItem(TASKS_STORAGE_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

// Function to save tasks to local storage
export const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
};
