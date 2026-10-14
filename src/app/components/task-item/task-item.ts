import { Component, input, output } from '@angular/core';
import { Task } from '../../interfaces/task';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatCheckboxModule],
  styleUrl: './task-item.css',
  template: `
    <mat-card [class.task--done]="task().done">
      <mat-card-content class="task-item">
        <mat-checkbox
          [checked]="task().done"
          (change)="toggled.emit(task().id)"
          [aria-label]="'Marquer « ' + task().title + ' » comme terminée'"
        />
        <div class="task-item__content">
          <strong>{{ task().title }}</strong>
          @if (task().description) {
            <span>{{ task().description }}</span>
          }
          @if (task().dueDate) {
            <small>Échéance : {{ task().dueDate }}</small>
          }
        </div>
        <div class="task-item__actions">
          <button mat-icon-button type="button" (click)="toggled.emit(task().id)" aria-label="Changer le statut">
            {{ task().done ? '↩' : '✓' }}
          </button>
          <button mat-icon-button type="button" (click)="edited.emit(task())" aria-label="Modifier la tâche">
            ✎
          </button>
          <button mat-icon-button type="button" (click)="deleted.emit(task().id)" aria-label="Supprimer la tâche">
            ×
          </button>
        </div>
      </mat-card-content>
    </mat-card>
  `,
})
export class TaskItem {
  readonly task = input.required<Task>();
  readonly toggled = output<string>();
  readonly edited = output<Task>();
  readonly deleted = output<string>();
}
