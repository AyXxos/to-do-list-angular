import { Component, inject } from '@angular/core';
import { FormControl, FormGroup,
  ReactiveFormsModule, Validators }
  from '@angular/forms';
import { TaskStorage } from '../../services/task-storage';
@Component({
  selector: 'app-task-form', standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html'
})
export class TaskForm {
  private readonly taskStorage = inject(TaskStorage);
  readonly form = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required,
        Validators.minLength(3)]
    }),
    description: new FormControl('', { nonNullable: true }),
    dueDate: new FormControl('', { nonNullable: true }),
    done: new FormControl(false, { nonNullable: true }),
    createdAt: new FormControl(new Date(), { nonNullable: true }),
    updatedAt: new FormControl(new Date(), { nonNullable: true })
  });
  submit() {
    if (this.form.valid) {
      const taskData = this.form.getRawValue();
      this.taskStorage.addTask({
        title: taskData.title,
        description: taskData.description,
        dueDate: taskData.dueDate || undefined,
      });
    }
  }
}
