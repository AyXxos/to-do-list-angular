export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}
  