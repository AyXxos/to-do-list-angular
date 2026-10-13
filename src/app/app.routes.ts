import { Routes } from '@angular/router';
import { TaskPage } from './pages/task-page/task-page';
import { StatsPage } from './pages/stats-page/stats-page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tasks' },
  { path: 'tasks', component: TaskPage },
  { path: 'stats', component: StatsPage },
  { path: '**', redirectTo: 'tasks' },
];
