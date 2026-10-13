import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    ViewChild,
    effect,
    inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import Chart from 'chart.js/auto';
import { TaskStorage } from '../../services/task-storage';

@Component({
    selector: 'app-stats-display',
    standalone: true,
    imports: [],
    styleUrl: './stats-display.css',
    templateUrl: './stats-display.html',
})
export class StatsDisplay implements AfterViewInit, OnDestroy {
    private readonly taskStorage = inject(TaskStorage);
    private readonly platformId = inject(PLATFORM_ID);
    @ViewChild('tasksChart') private readonly chartCanvas?: ElementRef<HTMLCanvasElement>;
    private chart?: Chart;
    readonly tasks = this.taskStorage.getTasks();

    constructor() {
        effect(() => {
            this.tasks();
            this.updateChart();
        });
    }

    get totalTasks(): number {
        return this.tasks().length;
    }

    get completedTasks(): number {
        return this.tasks().filter((task) => task.done).length;
    }

    get pendingTasks(): number {
        return this.tasks().filter((task) => !task.done).length;
    }

    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId) && this.chartCanvas) {
            this.chart = new Chart(this.chartCanvas.nativeElement, {
                type: 'pie',
                data: {
                    labels: ['Completed', 'Pending'],
                    datasets: [{
                        data: [this.completedTasks, this.pendingTasks],
                        backgroundColor: ['#4caf50', '#3f51b5'],
                        borderColor: '#ffffff',
                        borderWidth: 3,
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            });
        }
    }

    private updateChart(): void {
        if (!this.chart) {
            return;
        }

        this.chart.data.datasets[0].data = [
            this.completedTasks,
            this.pendingTasks,
        ];
        this.chart.update();
    }

    ngOnDestroy(): void {
        this.chart?.destroy();
    }
}
