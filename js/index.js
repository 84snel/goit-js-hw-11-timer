class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
  }

  init() {
    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      let deltaTime = this.targetDate - currentTime;
      if (deltaTime < 0) {
        clearInterval(intervalId);
        deltaTime = 0;
      }
      const time = this.formatDeltaTime(deltaTime);
      this.toDisplay(time);
    }, 1000);
  }

  formatDeltaTime(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  toDisplay({ days, hours, mins, secs }) {
    const timerRef = document.querySelector(this.selector);
    timerRef.querySelector('[data-value="days"]').textContent = days;
    timerRef.querySelector('[data-value="hours"]').textContent = hours;
    timerRef.querySelector('[data-value="mins"]').textContent = mins;
    timerRef.querySelector('[data-value="secs"]').textContent = secs;
  }
}

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Mar 23 2021'),
}).init();
