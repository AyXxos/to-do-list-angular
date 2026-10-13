import { Component, input, output } from '@angular/core';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-task-item',
  standalone: true,
  template: `
    <label>
      <input
        type="checkbox"
        [checked]="task().done"
        (change)="toggled.emit(task().id)"
      />
      {{ task().title }}
      <button (click)="toggled.emit(task().id)">Toggle</button>
      <button (click)="deleted.emit(task().id)">Delete</button>
    </label>
  `,
})
export class TaskItem {
  readonly task = input.required<Task>();
  readonly toggled = output<string>();
  readonly deleted = output<string>();
}
