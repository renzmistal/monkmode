import { Timer } from './timer.js';
import { QuoteManager } from './quotes.js';
import { TaskManager } from './tasks.js';
import { MusicPlayer } from './music.js';

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Timer
  const timer = new Timer({
    displayElement: document.getElementById('timer-display'),
    statusElement: document.getElementById('status-text'),
    startButton: document.getElementById('start-btn'),
    resetButton: document.getElementById('reset-btn'),
    timer30Button: document.getElementById('timer-30'),
    timer60Button: document.getElementById('timer-60')
  });

  // Initialize Quote Manager
  const quoteManager = new QuoteManager({
    quoteElement: document.getElementById('quote'),
    authorElement: document.getElementById('author'),
    updateInterval: 3600000 // 1 hour in milliseconds
  });

  // Initialize Task Manager
  const taskManager = new TaskManager({
    taskElements: [
      {
        container: document.getElementById('task1-container'),
        checkbox: document.getElementById('task1-check'),
        textInput: document.getElementById('task1-text'),
        lockButton: document.getElementById('task1-lock')
      },
      {
        container: document.getElementById('task2-container'),
        checkbox: document.getElementById('task2-check'),
        textInput: document.getElementById('task2-text'),
        lockButton: document.getElementById('task2-lock')
      },
      {
        container: document.getElementById('task3-container'),
        checkbox: document.getElementById('task3-check'),
        textInput: document.getElementById('task3-text'),
        lockButton: document.getElementById('task3-lock')
      }
    ]
  });

  // Initialize Music Player
  const musicPlayer = new MusicPlayer({
    trackNameElement: document.getElementById('track-name'),
    playPauseButton: document.getElementById('play-pause'),
    nextButton: document.getElementById('next-track'),
    prevButton: document.getElementById('prev-track'),
    volumeControl: document.getElementById('volume')
  });

  // Start the app
  quoteManager.init();
  taskManager.init();
  musicPlayer.init();
});
