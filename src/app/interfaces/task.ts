export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}
  