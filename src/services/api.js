import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/app';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock data storage key
const STORAGE_KEY = 'quiz-app-questions';

// Helper functions for localStorage
const getStoredQuestions = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

const storeQuestions = (questions) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
};

// Initialize with some sample questions if none exist
const initializeSampleQuestions = () => {
  const existingQuestions = getStoredQuestions();
  if (existingQuestions.length === 0) {
    const sampleQuestions = [
      {
        id: 1,
        questionText: "What is the capital of France?",
        optionA: "London",
        optionB: "Paris",
        optionC: "Berlin",
        optionD: "Madrid",
        correctAnswer: "B",
        difficultyLevel: "Easy"
      },
      {
        id: 2,
        questionText: "Which planet is known as the Red Planet?",
        optionA: "Venus",
        optionB: "Mars",
        optionC: "Jupiter",
        optionD: "Saturn",
        correctAnswer: "B",
        difficultyLevel: "Easy"
      },
      {
        id: 3,
        questionText: "What is 2 + 2?",
        optionA: "3",
        optionB: "4",
        optionC: "5",
        optionD: "6",
        correctAnswer: "B",
        difficultyLevel: "Easy"
      }
    ];
    storeQuestions(sampleQuestions);
  }
};

// Initialize sample questions on first load
initializeSampleQuestions();

export const questionService = {
  // Get all questions
  getAllQuestions: async () => {
    try {
      // Try real API first
      const response = await api.get('/questions');
      return response.data;
    } catch (error) {
      console.log('Backend not available, using mock data');
      // Fallback to mock data
      return getStoredQuestions();
    }
  },

  // Add a new question
  addQuestion: async (question) => {
    try {
      // Try real API first
      const response = await api.post('/questions', question);
      return response.data;
    } catch (error) {
      console.log('Backend not available, using mock data');
      // Fallback to mock data
      const questions = getStoredQuestions();
      const newQuestion = {
        ...question,
        id: Date.now() // Simple ID generation
      };
      questions.push(newQuestion);
      storeQuestions(questions);
      return newQuestion;
    }
  },

  // Submit quiz answers and get score
  submitQuiz: async (answers) => {
    try {
      // Try real API first
      const response = await api.post('/quiz/submit', answers);
      return response.data;
    } catch (error) {
      console.log('Backend not available, calculating score locally');
      // Fallback to local calculation
      const questions = getStoredQuestions();
      let correctAnswers = 0;
      let totalQuestions = 0;

      questions.forEach(question => {
        if (answers[question.id]) {
          totalQuestions++;
          if (answers[question.id] === question.correctAnswer) {
            correctAnswers++;
          }
        }
      });

      const score = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

      return {
        score: score,
        correctAnswers: correctAnswers,
        totalQuestions: totalQuestions,
        answers: answers
      };
    }
  }
};

export default api;
