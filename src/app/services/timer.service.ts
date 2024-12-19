import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TimerService {
    private timerInterval: any;
    private startTimeKey = 'startTime';
    private resetTriggeredKey = 'resetTriggered';
    private countdownDurationKey = 'countdownDuration';
    private timerSubject = new BehaviorSubject<string>('00:00');
    private countdownDuration = 360; // Set default countdown duration (e.g., 300 seconds = 5 minutes)

    constructor() {
        this.listenForReset();
        this.initializeTimer();
    }

    // Observable to allow the component to subscribe and get the timer updates
    get timer$() {
        return this.timerSubject.asObservable();
    }

    // Format the remaining time into MM:SS
    private formatTime(remainingTime: number): string {
        const minutes = Math.floor(remainingTime / 60).toString().padStart(2, '0');
        const seconds = (remainingTime % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    }

    // Function to start the countdown based on the stored startTime and duration
    private startCountdown(startTime: number, duration: number) {
        clearInterval(this.timerInterval); // Clear any previous timer intervals
        this.timerInterval = setInterval(() => {
            const currentTime = Date.now();
            const elapsedTime = Math.floor((currentTime - startTime) / 1000);
            const remainingTime = duration - elapsedTime;

            if (remainingTime <= 0) {
                clearInterval(this.timerInterval);
                this.timerSubject.next('00:00');
            } else {
                this.timerSubject.next(this.formatTime(remainingTime));
            }
        }, 1000);
    }

    // Function to reset and sync the countdown across all tabs
    private resetAndSyncCountdown() {
        const startTime = Date.now();
        localStorage.setItem(this.startTimeKey, startTime.toString()); // Store the new start time
        localStorage.setItem(this.resetTriggeredKey, Date.now().toString()); // Trigger reset
        localStorage.setItem(this.countdownDurationKey, this.countdownDuration.toString()); // Store countdown duration
        this.startCountdown(startTime, this.countdownDuration); // Start the countdown
    }

    // Initialize the countdown when the service is created
    private initializeTimer() {
        this.resetAndSyncCountdown();
    }

    // Listen for changes to localStorage and synchronize timers across tabs
    private listenForReset() {
        window.addEventListener('storage', (event) => {
            if (event.key === this.resetTriggeredKey) {
                const storedTime = localStorage.getItem(this.startTimeKey);
                const storedDuration = localStorage.getItem(this.countdownDurationKey);
                if (storedTime && storedDuration) {
                    this.startCountdown(parseInt(storedTime, 10), parseInt(storedDuration, 10)); // Sync the countdown in this tab
                }
            }
        });
    }

    // Public method to reset the countdown manually
    public resetTimer() {
        this.resetAndSyncCountdown();
    }
}

// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { BehaviorSubject, interval, Subscription } from 'rxjs';

// @Injectable({
//     providedIn: 'root'
// })
// export class TimerService {
//     private inactivityTimeout: any;
//     private countdown: Subscription;
//     private readonly MAX_INACTIVE_TIME = 5 * 60 * 1000; // 20 minutes
//     private countdownTimer = new BehaviorSubject<number>((5 * 60 * 1000) / 1000); // Timer in seconds
//     public countdownTimerObservable = this.countdownTimer.asObservable();
//     public PreviousTime: number = 0;
    
//     constructor(private router: Router) {
//         this.initInactivityListener();
//      }
    
//     initInactivityListener() {
//         this.PreviousTime = (this.MAX_INACTIVE_TIME / 1000);
//         this.resetTimer();
//     }

//     resetTimer() {
//         if (this.inactivityTimeout) {
//             clearTimeout(this.inactivityTimeout);
//         }
//         if (this.countdown) {
//             this.countdown?.unsubscribe();
//         }

//         console.log('resetTimerresetTimer 3', this.PreviousTime);
//         this.PreviousTime = (this.MAX_INACTIVE_TIME) / 1000;
//         this.startCountdown();
//         this.inactivityTimeout = setTimeout(() => {
//             this.redirectToHome();
//         }, this.PreviousTime * 1000);
//     }

//     private startCountdown() {
//         let timeRemaining = (this.PreviousTime); // in seconds
//         this.countdownTimer.next(timeRemaining);

//         this.countdown = interval(1000).subscribe(() => {
//             if (timeRemaining > 0) {
//                 timeRemaining--;
//                 localStorage.setItem("RealTime", timeRemaining.toString());
//                 localStorage.setItem("TimerTime", new Date().toString());
//                 console.log('timeRemaining', timeRemaining);
//                 this.PreviousTime--;
//                 this.countdownTimer.next(timeRemaining);
//             }

//             if (timeRemaining == 0) {
//                 this.countdown?.unsubscribe();
//                 this.redirectToHome();
//             }
//         });

//     }

//     private redirectToHome() {
//         // if (this.PreviousTime > 0)
//             // this.router.navigateByUrl('/login');
//     }
// }