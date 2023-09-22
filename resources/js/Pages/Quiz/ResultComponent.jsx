import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

const ResultComponent = () => {
  const [answers, setAnswers] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState(generateRandomInteger()); 
  const totalQuestions = localStorage.getItem("totaal-vragen");

  function generateRandomInteger() {
    return Math.floor(Math.random() * 1000000);
  }

  const trueCount = answers.reduce((count, item) => {
    if (item.isCorrect === true) {
      return count + 1;
    }
    return count;
  }, 0);

  useEffect(() => {
    const storedAnswers = JSON.parse(localStorage.getItem('score')) || [];

    setAnswers(storedAnswers.map(answer => ({ ...answer })));
  }, []);

  const handleSubmit = async () => {
    try {
      const dataToSend = {
        student_name: studentName,
        student_id: studentId, 
        answers: answers.map(({ questionId, selectedAnswer }) => ({
          question_id: questionId,
          selected_answer: selectedAnswer,
        })),
      };

      const response = await axios.post('/process-results', dataToSend);
      console.log('Response:', response.data);
    } catch (error) {
      if (error.response) {
        console.error('Response Data:', error.response.data);
        console.error('Response Status:', error.response.status);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <div>
      <Header />
      <div className='form-container'>
        <h1 className='result-title'></h1>
        <h2 className='score'>
          {trueCount} / {totalQuestions}
        </h2>
        <h1 className='submit-score-title'>Dien je score in:</h1>
        <div className='score-form'>
          <label  className='name-label'>
            Naam:
          </label>
          <input
            type="text"
            name="student_name"
            id="student_name"
            className='name-input'
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
          <button className='submit-button' onClick={handleSubmit}>Submit</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResultComponent;
