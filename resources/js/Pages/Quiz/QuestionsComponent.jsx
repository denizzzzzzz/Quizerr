import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function QuestionsComponent(props) {
  const { questions } = props;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [hasQuestionBeenChecked, setHasQuestionBeenChecked] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const totalQuestions = questions.length;
  const [isInitialRender, setIsInitialRender] = useState(true);

  const goToNextQuestion = () => {
    if (currentQuestionIndex === totalQuestions - 1) {
      setCurrentQuestionIndex(totalQuestions); 
      return;
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedAnswer(null);
    setIsAnswerCorrect(false);
    setHasQuestionBeenChecked(false);
    setShowCorrectAnswer(false);
  };

  const currentQuestion =
    currentQuestionIndex === totalQuestions ? null : questions[currentQuestionIndex];

  const selectAnswer = (answer) => {
    setSelectedAnswer(answer);
    setIsAnswerCorrect(false);
    setHasQuestionBeenChecked(false);
    setShowCorrectAnswer(false);
  };

  const checkAnswer = () => {
    if (!hasQuestionBeenChecked) {
      const correctAnswer = currentQuestion.correct_answer;
      const questionId = currentQuestion.question_id;
      
      const selectedAnswerLowerCase = selectedAnswer.toLowerCase();
      let questionsProgress = [
        questionId,
        isAnswerCorrect,
      ];
      if (selectedAnswer && selectedAnswerLowerCase === correctAnswer.toLowerCase()) {
        setIsAnswerCorrect(true);

      } else {
        setShowCorrectAnswer(true);
        const selectedButton = document.querySelector(`.answer_${selectedAnswer}`);
        if (selectedButton) {
          selectedButton.classList.add('wrong-answer');
        }
      }
      localStorage.setItem("voortgang",questionsProgress)

      setHasQuestionBeenChecked(true);
      setTimeout(() => {
        goToNextQuestion();
        setShowCorrectAnswer(false);
      }, 2000); 
    }
  };

  
  return (
    <div className='quiz'>
      <Header />
      <div>
        <div className='question-count'>
          <h2>
            {currentQuestionIndex === totalQuestions
              ? totalQuestions
              : currentQuestionIndex + 1}{' '}
            / {totalQuestions}
          </h2>
        </div>
        {currentQuestion ? (
          <div key={currentQuestionIndex} className='questions-container'>
            <h1 className='question fade-in'>{currentQuestion.question}</h1>
            <div>
              <div className='answer_container'>
                <button
                  className={`answer_a fade-in-slow answer_${selectedAnswer === 'a' ? 'selected' : ''
                    } ${isAnswerCorrect &&
                      currentQuestion.correct_answer.toLowerCase() === 'a'
                      ? 'correct-answer'
                      : ''
                    } ${showCorrectAnswer && currentQuestion.correct_answer.toLowerCase() === 'a' ? 'correct-answer' : ''}`}
                  onClick={() => selectAnswer('a')}
                  disabled={hasQuestionBeenChecked}
                >
                  {currentQuestion.answer_a}
                </button>
                <button
                  className={`answer_b fade-in-slow answer_${selectedAnswer === 'b' ? 'selected' : ''
                    } ${isAnswerCorrect &&
                      currentQuestion.correct_answer.toLowerCase() === 'b'
                      ? 'correct-answer'
                      : ''
                    } ${showCorrectAnswer && currentQuestion.correct_answer.toLowerCase() === 'b' ? 'correct-answer' : ''}`}
                  onClick={() => selectAnswer('b')}
                  disabled={hasQuestionBeenChecked}
                >
                  {currentQuestion.answer_b}
                </button>
                <button
                  className={`answer_c fade-in-slow answer_${selectedAnswer === 'c' ? 'selected' : ''
                    } ${isAnswerCorrect &&
                      currentQuestion.correct_answer.toLowerCase() === 'c'
                      ? 'correct-answer'
                      : ''
                    } ${showCorrectAnswer && currentQuestion.correct_answer.toLowerCase() === 'c' ? 'correct-answer' : ''}`}
                  onClick={() => selectAnswer('c')}
                  disabled={hasQuestionBeenChecked}
                >
                  {currentQuestion.answer_c}
                </button>
              </div>
            </div>
          </div>
        ) : currentQuestionIndex === totalQuestions ? (
          <div>
            <button className="get-results" onClick={() => handleGetResultsClick()}>
              Haal je resultaten op!
            </button>
          </div>
        ) : null}
        {currentQuestion ? (
          <div className='navi-buttons'>
            <button className='check-button' onClick={checkAnswer} disabled={hasQuestionBeenChecked}>
              Controleren
            </button>
          </div>
        ) : null}
      </div>
      <Footer />
    </div>
  );
}
