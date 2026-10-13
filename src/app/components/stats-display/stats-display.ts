import { Component, inject } from '@angular/core';
import { TaskStorage } from '../../services/task-storage';
import { Task } from '../../interfaces/task';

@Component({
    selector: 'app-stats-display',
    standalone: true,
    imports: [],
    styleUrl: './stats-display.css',
    templateUrl: './stats-display.html',
})
export class StatsDisplay {
    private readonly taskStorage = inject(TaskStorage);
    readonly tasks = this.taskStorage.getTasks();

    get totalTasks(): number {
        return this.tasks().length;
    }

    get completedTasks(): number {
        return this.tasks().filter((task) => task.done).length;
    }

    get pendingTasks(): number {
        return this.tasks().filter((task) => !task.done).length;
    }

}
