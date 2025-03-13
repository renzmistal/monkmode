/**
 * TaskManager class for managing the three main tasks
 */
export class TaskManager {
  constructor(options) {
    this.taskElements = options.taskElements;
    this.storageKey = 'monk-mode-tasks';
    this.lastResetKey = 'monk-mode-last-reset';
  }
  
  init() {
    this.checkAndResetTasks();
    this.loadTasks();
    this.setupEventListeners();
  }
  
  /**
   * Check if tasks need to be reset based on 24-hour period
   */
  checkAndResetTasks() {
    const now = new Date();
    const lastReset = localStorage.getItem(this.lastResetKey);
    
    if (lastReset) {
      const lastResetDate = new Date(parseInt(lastReset, 10));
      const dayDiff = this.getDayDifference(lastResetDate, now);
      
      // Reset if it's a new day (24 hours have passed)
      if (dayDiff >= 1) {
        this.clearTasks();
        localStorage.setItem(this.lastResetKey, now.getTime().toString());
      }
    } else {
      // First time using the app, set the last reset time
      localStorage.setItem(this.lastResetKey, now.getTime().toString());
    }
  }
  
  /**
   * Calculate the difference in days between two dates
   */
  getDayDifference(startDate, endDate) {
    // Reset time to midnight to compare just the days
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(endDate);
    end.setHours(0, 0, 0, 0);
    
    // Calculate the difference in days
    const diffTime = Math.abs(end - start);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  }
  
  setupEventListeners() {
    this.taskElements.forEach((task, index) => {
      // Save tasks when text input changes
      task.textInput.addEventListener('input', () => this.saveTasks());
      
      // Save tasks when checkbox state changes
      task.checkbox.addEventListener('change', () => {
        this.handleTaskCompletion(index);
        this.saveTasks();
      });
      
      // Lock button event listener
      if (task.lockButton) {
        task.lockButton.addEventListener('click', () => this.lockTask(index));
      }
    });
  }
  
  lockTask(index) {
    const task = this.taskElements[index];
    
    // Only lock if there's text in the input
    if (task.textInput.value.trim() === '') {
      // Show error effect
      task.textInput.classList.add('error');
      setTimeout(() => {
        task.textInput.classList.remove('error');
      }, 500);
      return;
    }
    
    // Lock the task
    task.textInput.disabled = true;
    task.textInput.classList.add('locked');
    task.lockButton.classList.add('locked');
    task.lockButton.innerHTML = '<i class="fas fa-lock"></i>';
    task.lockButton.disabled = true;
    
    // Update task state
    this.saveTasks();
  }
  
  handleTaskCompletion(index) {
    const task = this.taskElements[index];
    
    // Only allow completion if task is locked
    if (!task.textInput.disabled) {
      task.checkbox.checked = false;
      return;
    }
    
    if (task.checkbox.checked) {
      task.textInput.classList.add('completed');
      task.container.classList.add('task-completed');
    } else {
      task.textInput.classList.remove('completed');
      task.container.classList.remove('task-completed');
    }
  }
  
  saveTasks() {
    const tasks = this.taskElements.map(task => ({
      text: task.textInput.value,
      completed: task.checkbox.checked,
      locked: task.textInput.disabled || false
    }));
    
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }
  
  loadTasks() {
    try {
      const savedTasks = localStorage.getItem(this.storageKey);
      
      if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        
        tasks.forEach((task, index) => {
          if (index < this.taskElements.length) {
            const taskElement = this.taskElements[index];
            
            taskElement.textInput.value = task.text || '';
            taskElement.checkbox.checked = task.completed || false;
            
            // Handle locked state
            if (task.locked) {
              taskElement.textInput.disabled = true;
              taskElement.textInput.classList.add('locked');
              taskElement.lockButton.classList.add('locked');
              taskElement.lockButton.innerHTML = '<i class="fas fa-lock"></i>';
              taskElement.lockButton.disabled = true;
              
              // Apply completed styling if needed
              if (task.completed) {
                taskElement.textInput.classList.add('completed');
                taskElement.container.classList.add('task-completed');
              }
            }
          }
        });
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  }
  
  clearTasks() {
    this.taskElements.forEach(task => {
      task.textInput.value = '';
      task.checkbox.checked = false;
      task.textInput.disabled = false;
      task.textInput.classList.remove('locked', 'completed', 'error');
      task.container.classList.remove('task-completed');
      task.lockButton.classList.remove('locked');
      task.lockButton.innerHTML = '<i class="fas fa-lock-open"></i>';
      task.lockButton.disabled = false;
    });
    
    this.saveTasks();
  }
}
