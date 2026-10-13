import { Signal } from '@angular/core';
import { Task } from './task';

export interface TaskList {
  tasks: Signal<Task[]>;
}
