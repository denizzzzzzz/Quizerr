import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function QuizComponent({ questions, open_questions }) {
  console.log(open_questions);
  // Initaliseer usestate variabelen.
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // useState functie met een standaard waarde van 0 bedoeld voor het navigeren door vragen.
  const [selectedAnswer, setSelectedAnswer] = useState(null); // useState functie met een standaard waarde van null bedoeld voor het checken of een antwoord selected is en welke.
  const [correctAnswer, setCorrectAnswer] = useState(false); // useState functie met een standaar bool waarde van false, puur en alleen om later isCorrect op true te kunnen zetten.
  const [hasQuestionBeenChecked, setHasQuestionBeenChecked] = useState(false); // useState functie met een standaard bool waarde van false voor het checken of dat er op de controleren knop is gedrukt dus checked als in gecontroleerd.
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false); // useState functie met een standaard bool waarde van false voor het later forceren van het laten zien van de het juiste antwoord.
  // Bekijk het aantal objecten in de array en voeg dit toe aan de constant totalQuestions.
 
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // ES6 array destructuring to swap elements
    }
    return array;
    console.log(array)
}

// Combine and shuffle the questions
const allQuetions = shuffleArray([...questions, ...open_questions]);
const totalQuestions = allQuetions.length;
console.log(allQuetions);
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  // Functie voor het navigeren naar volgende vraag.
  const goToNextQuestion = () => {
    if (!isLastQuestion) {
      // Als niet de laatste vraag voer onderstaande code uit:
      // Update currentQuestionIndex en ga door naar de volgende vraag door te kijken naar de prevIndex en deze op te hogen met 1.
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      // Reset alles weer zodat bijvoorbeeld niet hetzelfde antwoord al geselecteerd is of het juiste antwoord groen wordt.
      setSelectedAnswer(null);
      setCorrectAnswer(false);
      setHasQuestionBeenChecked(false);
      setShowCorrectAnswer(false);
    } else {
     
    }
  };

  // Contant die bepaalt welke vraag moet worden weergegeven als currentQuestionIndex gelijk is aan totalQuestions wordt currentQuestion ingesteld op null.
  const currentQuestion =
    currentQuestionIndex === totalQuestions ? null : questions[currentQuestionIndex];

  // Functie die wordt aangeroepen als gebruiker antwoord selecteert met parameter answer dus "a","b","c".
  const selectAnswer = (answer) => {
    // Hou waarde bij van state variabele in selectedAnswer in dit geval.
    setSelectedAnswer(answer);
    // Laat nog niet het juiste antwoord zien.
    setShowCorrectAnswer(false);
  };

  // Functie voor het valideren van het ingediende antwoord.
  const checkAnswer = () => {
    // Check of vraag al gecontroleerd is.
    if (!hasQuestionBeenChecked) {
      // Vraag is nog niet gecontroleerd, haal juiste antwoord op van currentQuestion
      const correctAnswer = currentQuestion.correct_answer.toLowerCase();
      // Haal de id van de vraag op.
      const questionId = currentQuestion.question_id;
      // Als het geselecteerde antwoord gelijk is aan correctAnswer zet correctAnswer op true, anders false.

      const isCorrect = selectedAnswer === correctAnswer;
      if (selectedAnswer === correctAnswer) {
        setCorrectAnswer(true);
      } else {
        setCorrectAnswer(false);
      }
      
      // Als correctAnswer waar is (wat betekent dat het geselecteerde antwoord juist is),
      // stel dan showCorrectAnswer in op waar en zoek de geselecteerde knop met behulp van querySelector.
      // Als de geselecteerde knop bestaat, voeg dan de "wrong-answer" klasse toe om visuele feedback te geven.
      if (correctAnswer) {
        setShowCorrectAnswer(true);
        const selectedButton = document.querySelector(`.answer_${selectedAnswer}`);
        if (selectedButton) {
          selectedButton.classList.add('wrong-answer');
        }
      }

      // Haal de huidige score op uit de localStorage.
      let score = JSON.parse(localStorage.getItem("score")) || [];
      // Creëer een nieuw object dat de id en het antwoord bevat.
      const quizProgress = [...score, {
        questionId,
        isCorrect,
        selectedAnswer,
      }];
      // Sla de score op in localStorage dus de questionId en het selectedAnswer.
      localStorage.setItem("score", JSON.stringify(quizProgress));
      
      // Zet hasQuestionBeenChecked op true.
      setHasQuestionBeenChecked(true);
      
      // Gebruik setTimeout om een vertraging van 2 seconden in te stellen voordat goToNextQuestion wordt aangeroepen en je 
      // naar de volgende vraag wordt gestuurd en zet showCorrectAnswer op false voor de volgende vraag.
      if (isLastQuestion) {
        localStorage.setItem("totaal-vragen", JSON.stringify(totalQuestions));
        window.location.href = '/results';
      } else {
        
        setTimeout(() => {
          goToNextQuestion();
          setShowCorrectAnswer(false);
        }, 2000);
      }
    }
  };

  // Einde van alle functies, dit is wat de component terug gaat geven 
  return (
    <div className='quiz'>
      {/* Voeg mijn header toe bovenaan */}
      <Header />
      <div>
        <div className='question-count'>
          <h2>
            {/* Bekijk welke vraag we nu zijn en hoeveel er totaal zijn en laat dit zien */}
            {currentQuestionIndex === totalQuestions
              ? totalQuestions
              : currentQuestionIndex + 1}{' '}
            / {totalQuestions}
          </h2>
        </div>
        {/* Is currentquestion waar voer code na de vraagteken uit, niet waar of null of undefined voer code na: uit */}
        {currentQuestion ? (
          // Begint van vragen container met als key currentQuestionIndex oftewel het nummer van welke vraag we nu zijn in array style
          // dus 0 next 1 next 2 next totdat currentQuestion null is 
          <div key={currentQuestionIndex} className='questions-container'>
            {/* Laat de vraag waar we nu zijn zien */}
            <h1 className='question fade-in'>{currentQuestion.question}</h1>
            <div>
              <div className='answer_container'>
                {/* Als selectedAnswer gelijk is aan a voeg class .selected toe correct-answer-class wordt toegevoegd als geselecteerde antwoord
                goed is of showCorrectAnswer waar is */}
                <button
                  className={`answer_a fade-in-slow answer_${selectedAnswer === 'a' ? 'selected' : ''
                    } ${correctAnswer &&
                      currentQuestion.correct_answer.toLowerCase() === 'a'
                      ? 'correct-answer'
                      : ''
                    } ${showCorrectAnswer && currentQuestion.correct_answer.toLowerCase() === 'a' ? 'correct-answer' : ''}`}
                  // Onclick geef de selectAnswer de parameter 'a' mee, knop is uitgeschakeld als hasQuestionBeenChecked true is
                  onClick={() => selectAnswer('a')}
                  disabled={hasQuestionBeenChecked}
                >
                  {/* Laat antwoord a zien */}
                  {currentQuestion.answer_a}
                </button>
                <button
                  className={`answer_b fade-in-slow answer_${selectedAnswer === 'b' ? 'selected' : ''
                    } ${correctAnswer &&
                      currentQuestion.correct_answer.toLowerCase() === 'b'
                      ? 'correct-answer'
                      : ''
                    } ${showCorrectAnswer && currentQuestion.correct_answer.toLowerCase() === 'b' ? 'correct-answer' : ''}`}
                  // Onclick geef de selectAnswer de parameter 'b' mee, knop is uitgeschakeld als hasQuestionBeenChecked true is
                  onClick={() => selectAnswer('b')}
                  disabled={hasQuestionBeenChecked}
                >
                  {/* Laat antwoord b zien */}
                  {currentQuestion.answer_b}
                </button>
                <button
                  className={`answer_c fade-in-slow answer_${selectedAnswer === 'c' ? 'selected' : ''
                    } ${correctAnswer &&
                      currentQuestion.correct_answer.toLowerCase() === 'c'
                      ? 'correct-answer'
                      : ''
                    } ${showCorrectAnswer && currentQuestion.correct_answer.toLowerCase() === 'c' ? 'correct-answer' : ''}`}
                  // Onclick geef de selectAnswer de parameter 'c' mee, knop is uitgeschakeld als hasQuestionBeenChecked true is
                  onClick={() => selectAnswer('c')}
                  disabled={hasQuestionBeenChecked}
                >
                  {/* Laat antwoord c zien */}
                  {currentQuestion.answer_c}
                </button>
              </div>
            </div>
          </div>
        ): <h1 className='error-no-questions'>Jou docent heeft nog geen vragen geupload....</h1>}
        {currentQuestion ? (
          <div className='navi-buttons'>
            {/* Onclick voer de functie checkAnswer uit, knop is uitgeschakeld als hasQuestionBeenChecked true is */}
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
