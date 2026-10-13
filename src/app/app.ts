import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatButtonModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})

export class App {
}
