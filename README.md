# Monk Mode

A minimalist web application designed to help you focus on what truly matters. Monk Mode combines a pomodoro timer, task management, inspirational quotes, and focus music to create an ideal environment for deep work.

## Features

- **Pomodoro Timer**: Choose between 30-minute and 60-minute focus sessions
- **Task Management**: Limited to only three tasks to promote focus and intentionality
- **Inspirational Quotes**: Refreshes every hour to keep you motivated
- **Focus Music Player**: Built-in lofi music player to enhance concentration

## Why Only Three Tasks?

Monk Mode deliberately limits you to just three tasks because:

1. **Reduced Decision Fatigue**: Fewer choices means less mental energy wasted on deciding what to do next
2. **Increased Focus**: Concentrating on fewer tasks leads to higher quality output
3. **Higher Completion Rate**: A shorter list is less overwhelming and more likely to be completed
4. **Prioritization Skills**: Forces you to identify what truly matters most

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository or download the source code
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Development

To run the application in development mode:

```bash
npm run dev
```

This will start a local development server, typically at http://localhost:5173

### Building for Production

To build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Running Tests

To run the test suite:

```bash
npm test
```

For watching mode during development:

```bash
npm run test:watch
```

## Technologies Used

- HTML5, CSS3, JavaScript
- Vite (for development and building)
- Howler.js (for audio playback)
- Vitest (for testing)
- localStorage (for data persistence)

## Deployment to Netlify

### Option 1: Deploy via Netlify UI

1. Build your project locally:
   ```bash
   npm run build
   ```

2. Create a new site on [Netlify](https://app.netlify.com/)

3. Drag and drop the `dist` folder to the Netlify UI

### Option 2: Deploy via Netlify CLI

1. Install Netlify CLI:
   ```bash
   npm install netlify-cli -g
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Initialize your site:
   ```bash
   netlify init
   ```

4. Deploy your site:
   ```bash
   netlify deploy --prod
   ```

### Option 3: Connect to GitHub

1. Push your code to a GitHub repository

2. Log in to [Netlify](https://app.netlify.com/)

3. Click "New site from Git" and select your repository

4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

5. Click "Deploy site"

## Design Philosophy

The Monk Mode app follows a minimalist, brutalist black theme designed to reduce distractions and help users focus on what matters most. The design emphasizes:

- Simplicity and focus
- Limited options to reduce decision fatigue
- Clear visual feedback for task completion
- Distraction-free environment

## License

MIT
