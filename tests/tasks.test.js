import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { TaskManager } from '../js/tasks.js';

describe('TaskManager', () => {
  let taskManager;
  let mockTaskElements;
  
  beforeEach(() => {
    // Create mock localStorage
    const localStorageMock = (() => {
      let store = {};
      return {
        getItem: vi.fn(key => store[key] || null),
        setItem: vi.fn((key, value) => {
          store[key] = value.toString();
        }),
        clear: () => {
          store = {};
        }
      };
    })();
    
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock
    });
    
    // Create mock task elements
    mockTaskElements = [
      {
        checkbox: { checked: false, addEventListener: vi.fn() },
        textInput: { value: '', addEventListener: vi.fn() }
      },
      {
        checkbox: { checked: false, addEventListener: vi.fn() },
        textInput: { value: '', addEventListener: vi.fn() }
      },
      {
        checkbox: { checked: false, addEventListener: vi.fn() },
        textInput: { value: '', addEventListener: vi.fn() }
      }
    ];
    
    taskManager = new TaskManager({
      taskElements: mockTaskElements
    });
  });
  
  afterEach(() => {
    vi.restoreAllMocks();
  });
  
  it('should initialize with task elements', () => {
    expect(taskManager.taskElements).toEqual(mockTaskElements);
    expect(taskManager.storageKey).toBe('monk-mode-tasks');
  });
  
  it('should set up event listeners on init', () => {
    const setupEventListenersSpy = vi.spyOn(taskManager, 'setupEventListeners');
    const loadTasksSpy = vi.spyOn(taskManager, 'loadTasks');
    
    taskManager.init();
    
    expect(setupEventListenersSpy).toHaveBeenCalled();
    expect(loadTasksSpy).toHaveBeenCalled();
  });
  
  it('should save tasks to localStorage', () => {
    // Set up task data
    mockTaskElements[0].textInput.value = 'Task 1';
    mockTaskElements[0].checkbox.checked = true;
    mockTaskElements[1].textInput.value = 'Task 2';
    
    taskManager.saveTasks();
    
    const expectedData = JSON.stringify([
      { text: 'Task 1', completed: true },
      { text: 'Task 2', completed: false },
      { text: '', completed: false }
    ]);
    
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'monk-mode-tasks',
      expectedData
    );
  });
  
  it('should load tasks from localStorage', () => {
    // Set up mock saved data
    const savedTasks = [
      { text: 'Saved Task 1', completed: true },
      { text: 'Saved Task 2', completed: false },
      { text: 'Saved Task 3', completed: true }
    ];
    
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(savedTasks));
    
    taskManager.loadTasks();
    
    // Check if tasks were loaded correctly
    expect(mockTaskElements[0].textInput.value).toBe('Saved Task 1');
    expect(mockTaskElements[0].checkbox.checked).toBe(true);
    expect(mockTaskElements[1].textInput.value).toBe('Saved Task 2');
    expect(mockTaskElements[1].checkbox.checked).toBe(false);
    expect(mockTaskElements[2].textInput.value).toBe('Saved Task 3');
    expect(mockTaskElements[2].checkbox.checked).toBe(true);
  });
  
  it('should handle errors when loading tasks', () => {
    // Mock console.error
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Set up invalid JSON data
    localStorage.getItem.mockReturnValueOnce('invalid-json');
    
    taskManager.loadTasks();
    
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
  
  it('should clear all tasks', () => {
    // Set up initial task data
    mockTaskElements[0].textInput.value = 'Task 1';
    mockTaskElements[0].checkbox.checked = true;
    mockTaskElements[1].textInput.value = 'Task 2';
    
    const saveTasksSpy = vi.spyOn(taskManager, 'saveTasks');
    
    taskManager.clearTasks();
    
    // Check if tasks were cleared
    expect(mockTaskElements[0].textInput.value).toBe('');
    expect(mockTaskElements[0].checkbox.checked).toBe(false);
    expect(mockTaskElements[1].textInput.value).toBe('');
    expect(mockTaskElements[1].checkbox.checked).toBe(false);
    expect(mockTaskElements[2].textInput.value).toBe('');
    expect(mockTaskElements[2].checkbox.checked).toBe(false);
    
    // Check if save was called
    expect(saveTasksSpy).toHaveBeenCalled();
  });
});
