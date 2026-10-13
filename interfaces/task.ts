import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})

export class Task {
    private id!: string; //uuid
    private title!: string;
    private description!: string;
    private dueDate!: Date;
    private done!: boolean;
    private createdAt!: Date;
    private updatedAt!: Date;

    constructor(title: string, description: string, dueDate: Date) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.done = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    
}
