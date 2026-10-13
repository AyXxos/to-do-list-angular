import { Injectable, signal, effect } from '@angular/core';
import { Task } from '../interfaces/task';
@Injectable({
    providedIn: 'root',
})

export class TaskStorage {
    private tasks = signal<Task[]>([]);

    private readonly defaultTasks: Task[] = [
        {
            id: crypto.randomUUID(),
            title: 'Préparer la présentation',
            description: 'Finaliser les diapositives et vérifier les exemples.',
            dueDate: '2026-10-15',
            done: false,
            createdAt: new Date('2026-10-10'),
            updatedAt: new Date('2026-10-10'),
        },
        {
            id: crypto.randomUUID(),
            title: 'Répondre aux e-mails',
            description: 'Traiter les messages en attente et archiver les anciens.',
            dueDate: '2026-10-13',
            done: true,
            createdAt: new Date('2026-10-09'),
            updatedAt: new Date('2026-10-13'),
        },
    ];

    getTasks() {
        return this.tasks.asReadonly();
    }

    addTask(data: { title: string; description?: string; dueDate?: string }) {
        const task: Task = {
            id: crypto.randomUUID(),
            title: data.title,
            description: data.description,
            dueDate: data.dueDate,
            done: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.tasks.update((tasks) => [...tasks, task]);
    }

    toggleTaskDone(taskId: string) {
        this.tasks.update((tasks) =>
            tasks.map((task) =>
                task.id === taskId
                    ? { ...task, done: !task.done, updatedAt: new Date() }
                    : task,
            ),
        );
    }

    deleteTask(taskId: string) {
        this.tasks.update((tasks) => tasks.filter((task) => task.id !== taskId));
    }


    private saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks()));
    }

    private loadTasksFromLocalStorage() {
        if (typeof window === 'undefined') {
            return;
        }

        const tasksJson = localStorage.getItem('tasks');
        if (tasksJson) {
            const tasksArray = JSON.parse(tasksJson) as Task[];
            this.tasks.set(
                tasksArray.map((task) => ({
                    ...task,
                    createdAt: new Date(task.createdAt),
                    updatedAt: new Date(task.updatedAt),
                })),
            );
        } else {
            this.tasks.set(this.defaultTasks);
        }
    }
    
    constructor() {
        this.loadTasksFromLocalStorage();
        effect(() => {
            const tasks = this.tasks();
            if (typeof window === 'undefined') return;
            try {
                localStorage.setItem('tasks',
                    JSON.stringify(tasks));
            } catch {
                console.warn('Sauvegarde locale impossible');
            }
        });
    }
}
