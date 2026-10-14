import { Component, inject } from '@angular/core';
import { FormControl, FormGroup,
  ReactiveFormsModule, Validators }
  from '@angular/forms';
import { TaskStorage } from '../../services/task-storage';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task-form', standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
  ],
  styleUrl: './task-form.css',
  templateUrl: './task-form.html'
})
export class TaskForm {
  private readonly taskStorage = inject(TaskStorage);
  private readonly dialogRef = inject(MatDialogRef<TaskForm>, { optional: true });
  readonly form = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required,
        Validators.minLength(3)]
    }),
    description: new FormControl('', { nonNullable: true }),
    dueDate: new FormControl<Date | null>(null),
    done: new FormControl(false, { nonNullable: true }),
    createdAt: new FormControl(new Date(), { nonNullable: true }),
    updatedAt: new FormControl(new Date(), { nonNullable: true })
  });
  constructor() {
    this.form.controls.title.valueChanges.subscribe(() => {
      const titleControl = this.form.controls.title;
      if (titleControl.hasError('duplicate')) {
        const errors = { ...titleControl.errors };
        delete errors['duplicate'];
        titleControl.setErrors(Object.keys(errors).length > 0 ? errors : null);
      }
    });
  }

  submit(): void {
    if (this.form.valid) {
      const taskData = this.form.getRawValue();
      const taskAdded = this.taskStorage.addTask({
        title: taskData.title,
        description: taskData.description,
        dueDate: taskData.dueDate
          ? this.formatDate(taskData.dueDate)
          : undefined,
      });

      if (taskAdded) {
        this.dialogRef?.close();
      } else {
        this.form.controls.title.setErrors({
          ...this.form.controls.title.errors,
          duplicate: true,
        });
        this.form.controls.title.markAsTouched();
      }
    }
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
