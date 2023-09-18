import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function QuestionsComponent(props) {
  const { questions } = props;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const totalQuestions = questions.length;

  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex === totalQuestions - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex === 0 ? totalQuestions - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      <Header />
      {totalQuestions > 0 ? (
        <div>
          <div className='question-count'>
            <h2>
              {currentQuestionIndex + 1} / {totalQuestions}
            </h2>
          </div>

          <div className='questions-container'>
            <div>
              <h1 className='question'>{questions[currentQuestionIndex].question}</h1>
            </div>
          </div>

          <div>
            <button onClick={goToPreviousQuestion}>Previous Question</button>
            <button onClick={goToNextQuestion}>Next Question</button>
          </div>
        </div>
      ) : (
        <div className='error-no-questions'>Jou docent heeft helaas nog geen vragen ingediend</div>
      )}
      <Footer />
    </div>
  );
}
