import { Component, signal, inject } from '@angular/core';
import { TaskList } from './interfaces/taskList';
import { TaskStorage } from './services/task-storage';
import { TaskListComponent } from './components/task-list/task-list';
import { TaskForm } from './components/task-form/task-form';

@Component({
  imports: [TaskListComponent, TaskForm],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})

export class App {
  private readonly taskStorage = inject(TaskStorage);

  readonly taskList = signal<TaskList>({
    tasks: this.taskStorage.getTasks(),
  });

  onTaskToggled(taskId: string): void {
    this.taskStorage.toggleTaskDone(taskId);
  }

  onTaskDeleted(taskId: string): void {
    this.taskStorage.deleteTask(taskId);
  }
}
