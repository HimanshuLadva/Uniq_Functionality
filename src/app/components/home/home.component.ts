import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { TimerService } from 'src/app/services/timer.service';
import { ChildComponent } from "./child.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ChildComponent
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  remainningTime:any; 

  constructor(private timerService: TimerService) { }

  ngOnInit() {
    // this.timerService.countdownTimerObservable.subscribe(time => {
    this.timerService.timer$.subscribe(time => {
        console.log('thimerrererere', time);
        this.remainningTime = time;
    })
  }

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}m ${seconds}s`;
  }
}
