# Quiz Application Frontend

A ReactJS frontend for the Quiz Application that allows users to take quizzes and add new questions.

## Features

- **Take Quiz**: Display questions with multiple choice options and submit answers
- **Add Questions**: Form to add new questions with options and correct answers
- **Score Calculation**: Automatic scoring after quiz submission
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean and intuitive user interface

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Backend Spring Boot application running on `http://localhost:8080`

## Installation

1. Navigate to the project directory:
   ```bash
   cd quiz-app-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
quiz-app-frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Quiz.js
│   │   ├── Quiz.css
│   │   ├── AddQuestion.js
│   │   └── AddQuestion.css
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Components

### Quiz Component
- Displays all available questions
- Handles user answers with radio buttons
- Shows progress (answered questions count)
- Submits answers and displays score

### AddQuestion Component
- Form to add new questions
- Input fields for question text and options
- Dropdown to select correct answer
- Difficulty level selection
- Form validation and success/error messages

### API Service
- Handles all backend communication
- Uses axios for HTTP requests
- Configured to work with Spring Boot backend

## Backend Integration

The frontend expects the backend to be running on `http://localhost:8080` with the following endpoints:

- `GET /app/questions` - Get all questions
- `POST /app/questions` - Add a new question
- `POST /app/quiz/submit` - Submit quiz answers and get score

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Styling

The application uses CSS modules and includes:
- Responsive design for mobile and desktop
- Modern card-based layout
- Hover effects and transitions
- Form validation styling
- Loading and error states

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
