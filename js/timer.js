/**
 * Timer class for managing the pomodoro timer functionality
 */
export class Timer {
  constructor(options) {
    this.displayElement = options.displayElement;
    this.statusElement = options.statusElement;
    this.startButton = options.startButton;
    this.resetButton = options.resetButton;
    this.timer30Button = options.timer30Button;
    this.timer60Button = options.timer60Button;
    
    this.duration = 25 * 60; // Default: 25 minutes in seconds
    this.remainingTime = this.duration;
    this.isRunning = false;
    this.timer = null;
    
    this.initEventListeners();
    this.updateDisplay();
  }
  
  initEventListeners() {
    this.startButton.addEventListener('click', () => this.toggleTimer());
    this.resetButton.addEventListener('click', () => this.resetTimer());
    this.timer30Button.addEventListener('click', () => this.setDuration(30));
    this.timer60Button.addEventListener('click', () => this.setDuration(60));
  }
  
  setDuration(minutes) {
    if (this.isRunning) {
      this.stopTimer();
    }
    
    this.duration = minutes * 60;
    this.remainingTime = this.duration;
    this.updateDisplay();
    this.updateStatus('Ready');
  }
  
  toggleTimer() {
    if (this.isRunning) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  }
  
  startTimer() {
    if (this.remainingTime <= 0) {
      this.remainingTime = this.duration;
    }
    
    this.isRunning = true;
    this.startButton.innerHTML = 'Pause';
    this.updateStatus('Focus Mode');
    
    this.timer = setInterval(() => {
      this.remainingTime--;
      this.updateDisplay();
      
      if (this.remainingTime <= 0) {
        this.completeTimer();
      }
    }, 1000);
  }
  
  stopTimer() {
    clearInterval(this.timer);
    this.isRunning = false;
    this.startButton.innerHTML = 'Start';
    this.updateStatus('Paused');
  }
  
  resetTimer() {
    this.stopTimer();
    this.remainingTime = this.duration;
    this.updateDisplay();
    this.updateStatus('Ready');
  }
  
  completeTimer() {
    this.stopTimer();
    this.updateStatus('Completed!');
    this.playCompletionSound();
  }
  
  updateDisplay() {
    const minutes = Math.floor(this.remainingTime / 60);
    const seconds = this.remainingTime % 60;
    
    this.displayElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  
  updateStatus(status) {
    this.statusElement.textContent = status;
  }
  
  playCompletionSound() {
    // Simple beep sound using the Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.value = 800;
    gainNode.gain.value = 0.5;
    
    oscillator.start();
    
    setTimeout(() => {
      oscillator.stop();
    }, 1000);
  }
}
