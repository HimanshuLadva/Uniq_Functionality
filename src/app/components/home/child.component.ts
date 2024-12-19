import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { TimerService } from "src/app/services/timer.service";

@Component({
    selector: 'child',
    template: `<button (click)="resetTimer()">Reset Timer</button>`,
    standalone: true,
    imports: [CommonModule]
})
export class ChildComponent {
    constructor(private timeService: TimerService) {}
    resetTimer() {
         this.timeService.resetTimer();
    }
}