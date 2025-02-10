export {};

declare global {
  //type Priority = 'low' | 'medium' | 'high' | string;
  // type Status = 'to-do' | 'in-progress' | 'done' | string;
  interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    priority: Priority | string;
    status: Status | string;
  }
}
