import { Component, signal, inject } from '@angular/core';
import { TaskList } from './interfaces/taskList';
import { TaskStorage } from './services/task-storage';
import { TaskListComponent } from './components/task-list/task-list';
import { TaskForm } from './components/task-form/task-form';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [TaskListComponent, MatDialogModule, MatButtonModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})

export class App {
  private readonly taskStorage = inject(TaskStorage);
  private readonly dialog = inject(MatDialog);

  readonly taskList = signal<TaskList>({
    tasks: this.taskStorage.getTasks(),
  });

  onTaskToggled(taskId: string): void {
    this.taskStorage.toggleTaskDone(taskId);
  }

  onTaskDeleted(taskId: string): void {
    this.taskStorage.deleteTask(taskId);
  }

  openTaskForm(): void {
    this.dialog.open(TaskForm, {
      width: 'min(560px, calc(100vw - 2rem))',
      maxWidth: '100vw',
      autoFocus: 'first-tabbable',
    });
  }
}
