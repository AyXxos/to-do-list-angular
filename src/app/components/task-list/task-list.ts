import { Component, input, output } from '@angular/core';
import { Task } from '../../interfaces/task';
import { TaskItem } from '../task-item/task-item';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItem],
  template: `
    <ul>
      @for (task of tasks(); track task.id) {
        <li>
          <app-task-item
            [task]="task"
            (toggled)="toggled.emit($event)"
            (deleted)="deleted.emit($event)"
          />
        </li>
      }
    </ul>
  `,
})
export class TaskListComponent {
  readonly tasks = input.required<Task[]>();
  readonly toggled = output<string>();
  readonly deleted = output<string>();
}
