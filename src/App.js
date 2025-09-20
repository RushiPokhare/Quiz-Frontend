import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Quiz from './components/Quiz';
import AddQuestion from './components/AddQuestion';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navigation">
          <div className="nav-title">Quiz Application</div>
          <div className="nav-buttons">
            <Link to="/" className="btn btn-secondary">Take Quiz</Link>
            <Link to="/add-question" className="btn">Add Question</Link>
          </div>
        </nav>
        
        <div className="container">
          <Routes>
            <Route path="/" element={<Quiz />} />
            <Route path="/add-question" element={<AddQuestion />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
