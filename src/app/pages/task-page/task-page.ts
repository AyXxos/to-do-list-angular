import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskList } from '../../interfaces/taskList';
import { TaskStorage } from '../../services/task-storage';
import { TaskForm } from '../../components/task-form/task-form';
import { TaskListComponent } from '../../components/task-list/task-list';

@Component({
  selector: 'app-task-page',
  imports: [TaskListComponent, MatDialogModule, MatButtonModule],
  templateUrl: './task-page.html',
  styleUrl: './task-page.css',
})
export class TaskPage {
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
