import { Component } from '@angular/core';
import { StatsDisplay } from '../../components/stats-display/stats-display';
@Component({
  selector: 'app-stats-page',
  imports: [StatsDisplay],
  templateUrl: './stats-page.html',
  styleUrl: './stats-page.css',
})
export class StatsPage {}
