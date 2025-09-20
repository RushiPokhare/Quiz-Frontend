import React, { useState, useEffect } from 'react';
import { questionService } from '../services/api';
import './Quiz.css';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const data = await questionService.getAllQuestions();
      setQuestions(data);
      setError(null);
    } catch (err) {
      setError('Failed to load questions. Please try again.');
      console.error('Error loading questions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = async () => {
    try {
      const answerList = Object.entries(answers).map(([questionId, givenAnswer]) => ({
        questionId: parseInt(questionId),
        givenAnswer: givenAnswer
      }));

      const result = await questionService.submitQuiz(answerList);
      setScore(result);
      setSubmitted(true);
    } catch (err) {
      setError('Failed to submit quiz. Please try again.');
      console.error('Error submitting quiz:', err);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(null);
    setError(null);
  };

  if (loading) {
    return <div className="loading">Loading questions...</div>;
  }

  if (error) {
    return (
      <div className="error">
        {error}
        <button onClick={loadQuestions} className="btn" style={{ marginTop: '10px' }}>
          Retry
        </button>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="card">
        <h2>No Questions Available</h2>
        <p>There are no questions in the database. Please add some questions first.</p>
      </div>
    );
  }

  if (submitted && score) {
    return (
      <div className="card">
        <div className="score-display">{score}</div>
        <div style={{ textAlign: 'center' }}>
          <button onClick={resetQuiz} className="btn btn-success">
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="card">
        <h2>Quiz Questions</h2>
        <p>Answer all questions and click submit to see your score.</p>
      </div>

      {questions.map((question, index) => (
        <div key={question.id} className="card question-card">
          <div className="question-text">
            {index + 1}. {question.questionText}
          </div>
          
          {question.difficultyLevel && (
            <div className="difficulty">
              Difficulty: {question.difficultyLevel}
            </div>
          )}

          <div className="options">
            {question.optionA && (
              <div className="option">
                <input
                  type="radio"
                  id={`${question.id}_A`}
                  name={`question_${question.id}`}
                  value="A"
                  checked={answers[question.id] === 'A'}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                />
                <label htmlFor={`${question.id}_A`}>A. {question.optionA}</label>
              </div>
            )}

            {question.optionB && (
              <div className="option">
                <input
                  type="radio"
                  id={`${question.id}_B`}
                  name={`question_${question.id}`}
                  value="B"
                  checked={answers[question.id] === 'B'}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                />
                <label htmlFor={`${question.id}_B`}>B. {question.optionB}</label>
              </div>
            )}

            {question.optionC && (
              <div className="option">
                <input
                  type="radio"
                  id={`${question.id}_C`}
                  name={`question_${question.id}`}
                  value="C"
                  checked={answers[question.id] === 'C'}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                />
                <label htmlFor={`${question.id}_C`}>C. {question.optionC}</label>
              </div>
            )}

            {question.optionD && (
              <div className="option">
                <input
                  type="radio"
                  id={`${question.id}_D`}
                  name={`question_${question.id}`}
                  value="D"
                  checked={answers[question.id] === 'D'}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                />
                <label htmlFor={`${question.id}_D`}>D. {question.optionD}</label>
              </div>
            )}
          </div>
        </div>
      ))}

      <div className="card">
        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={handleSubmit} 
            className="btn btn-success"
            disabled={Object.keys(answers).length === 0}
          >
            Submit Quiz
          </button>
          <p style={{ marginTop: '10px', color: '#666' }}>
            Answered: {Object.keys(answers).length} / {questions.length} questions
          </p>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
