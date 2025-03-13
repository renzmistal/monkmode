import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { Timer } from '../js/timer.js';

describe('Timer', () => {
  let timer;
  let mockElements;
  
  // Mock DOM elements
  beforeEach(() => {
    mockElements = {
      displayElement: { textContent: '' },
      statusElement: { textContent: '' },
      startButton: { 
        innerHTML: '',
        addEventListener: vi.fn()
      },
      resetButton: { addEventListener: vi.fn() },
      timer30Button: { addEventListener: vi.fn() },
      timer60Button: { addEventListener: vi.fn() }
    };
    
    // Mock the AudioContext
    global.AudioContext = vi.fn().mockImplementation(() => ({
      createOscillator: vi.fn().mockImplementation(() => ({
        connect: vi.fn(),
        start: vi.fn(),
        stop: vi.fn(),
        type: '',
        frequency: { value: 0 }
      })),
      createGain: vi.fn().mockImplementation(() => ({
        connect: vi.fn(),
        gain: { value: 0 }
      })),
      destination: {}
    }));
    
    global.webkitAudioContext = global.AudioContext;
    
    // Mock setInterval and clearInterval
    vi.useFakeTimers();
    
    timer = new Timer(mockElements);
  });
  
  afterEach(() => {
    vi.restoreAllMocks();
  });
  
  it('should initialize with default values', () => {
    expect(timer.duration).toBe(25 * 60); // 25 minutes in seconds
    expect(timer.remainingTime).toBe(25 * 60);
    expect(timer.isRunning).toBe(false);
    expect(timer.timer).toBe(null);
  });
  
  it('should update display with formatted time', () => {
    timer.remainingTime = 65; // 1 minute and 5 seconds
    timer.updateDisplay();
    expect(timer.displayElement.textContent).toBe('01:05');
    
    timer.remainingTime = 3600; // 1 hour
    timer.updateDisplay();
    expect(timer.displayElement.textContent).toBe('60:00');
  });
  
  it('should set duration correctly', () => {
    timer.setDuration(30);
    expect(timer.duration).toBe(30 * 60);
    expect(timer.remainingTime).toBe(30 * 60);
    
    timer.setDuration(60);
    expect(timer.duration).toBe(60 * 60);
    expect(timer.remainingTime).toBe(60 * 60);
  });
  
  it('should start and stop timer', () => {
    // Start timer
    timer.startTimer();
    expect(timer.isRunning).toBe(true);
    expect(timer.startButton.innerHTML).toBe('Pause');
    expect(timer.statusElement.textContent).toBe('Focus Mode');
    
    // Advance timer by 5 seconds
    vi.advanceTimersByTime(5000);
    expect(timer.remainingTime).toBe(timer.duration - 5);
    
    // Stop timer
    timer.stopTimer();
    expect(timer.isRunning).toBe(false);
    expect(timer.startButton.innerHTML).toBe('Start');
    expect(timer.statusElement.textContent).toBe('Paused');
    
    // Time should not advance after stopping
    vi.advanceTimersByTime(5000);
    expect(timer.remainingTime).toBe(timer.duration - 5);
  });
  
  it('should reset timer correctly', () => {
    // Start and advance timer
    timer.startTimer();
    vi.advanceTimersByTime(10000);
    
    // Reset timer
    timer.resetTimer();
    expect(timer.isRunning).toBe(false);
    expect(timer.remainingTime).toBe(timer.duration);
    expect(timer.statusElement.textContent).toBe('Ready');
  });
  
  it('should complete timer when time runs out', () => {
    // Mock the completion sound method
    timer.playCompletionSound = vi.fn();
    
    // Set a short duration for testing
    timer.duration = 5;
    timer.remainingTime = 5;
    
    // Start timer
    timer.startTimer();
    
    // Advance time past the duration
    vi.advanceTimersByTime(6000);
    
    // Timer should be completed
    expect(timer.isRunning).toBe(false);
    expect(timer.statusElement.textContent).toBe('Completed!');
    expect(timer.playCompletionSound).toHaveBeenCalled();
  });
});
