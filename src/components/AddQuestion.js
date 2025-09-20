import React, { useState } from 'react';
import { questionService } from '../services/api';
import './AddQuestion.css';

const AddQuestion = () => {
  const [formData, setFormData] = useState({
    questionText: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: '',
    difficultyLevel: 'Easy'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.questionText.trim()) {
      setError('Question text is required');
      return;
    }
    
    if (!formData.correctAnswer) {
      setError('Please select a correct answer');
      return;
    }

    // Check if at least two options are provided
    const options = [formData.optionA, formData.optionB, formData.optionC, formData.optionD].filter(opt => opt.trim());
    if (options.length < 2) {
      setError('At least two options are required');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      await questionService.addQuestion(formData);
      
      setSuccess(true);
      setFormData({
        questionText: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctAnswer: '',
        difficultyLevel: 'Easy'
      });
      
      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
      
    } catch (err) {
      setError('Failed to add question. Please try again.');
      console.error('Error adding question:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      questionText: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: '',
      difficultyLevel: 'Easy'
    });
    setError(null);
    setSuccess(false);
  };

  return (
    <div className="add-question-container">
      <div className="card">
        <h2>Add New Question</h2>
        <p>Fill in the details below to add a new question to the quiz.</p>
      </div>

      <form onSubmit={handleSubmit} className="card">
        {success && (
          <div className="success-message">
            Question added successfully!
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="questionText">Question Text *</label>
          <textarea
            id="questionText"
            name="questionText"
            value={formData.questionText}
            onChange={handleChange}
            rows="3"
            placeholder="Enter your question here..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="optionA">Option A</label>
          <input
            type="text"
            id="optionA"
            name="optionA"
            value={formData.optionA}
            onChange={handleChange}
            placeholder="First option"
          />
        </div>

        <div className="form-group">
          <label htmlFor="optionB">Option B</label>
          <input
            type="text"
            id="optionB"
            name="optionB"
            value={formData.optionB}
            onChange={handleChange}
            placeholder="Second option"
          />
        </div>

        <div className="form-group">
          <label htmlFor="optionC">Option C</label>
          <input
            type="text"
            id="optionC"
            name="optionC"
            value={formData.optionC}
            onChange={handleChange}
            placeholder="Third option (optional)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="optionD">Option D</label>
          <input
            type="text"
            id="optionD"
            name="optionD"
            value={formData.optionD}
            onChange={handleChange}
            placeholder="Fourth option (optional)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="correctAnswer">Correct Answer *</label>
          <select
            id="correctAnswer"
            name="correctAnswer"
            value={formData.correctAnswer}
            onChange={handleChange}
            required
          >
            <option value="">Select correct answer</option>
            {formData.optionA && <option value="A">A. {formData.optionA}</option>}
            {formData.optionB && <option value="B">B. {formData.optionB}</option>}
            {formData.optionC && <option value="C">C. {formData.optionC}</option>}
            {formData.optionD && <option value="D">D. {formData.optionD}</option>}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="difficultyLevel">Difficulty Level</label>
          <select
            id="difficultyLevel"
            name="difficultyLevel"
            value={formData.difficultyLevel}
            onChange={handleChange}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-success"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Question'}
          </button>
          
          <button 
            type="button" 
            onClick={resetForm}
            className="btn btn-secondary"
            disabled={loading}
          >
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestion;
