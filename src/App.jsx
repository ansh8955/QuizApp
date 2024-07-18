import React, { useState, useEffect } from 'react';
import './App.css'; // Import your CSS file

const questionsData = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'Berlin', 'Madrid', 'Rome'],
    correctAnswer: 'Paris'
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Jupiter', 'Mars', 'Saturn'],
    correctAnswer: 'Mars'
  },
  // Add more questions as needed
];

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [answerSelected, setAnswerSelected] = useState(false);

  // Initialize questions on component mount
  useEffect(() => {
    resetQuiz();
  }, []);

  // Function to reset the quiz
  const resetQuiz = () => {
    // Shuffle questions array for a new quiz order
    const shuffledQuestions = shuffleArray(questionsData);
    setQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setFinished(false);
    setWrongAnswers([]);
  };

  // Function to shuffle array (Fisher-Yates shuffle algorithm)
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleAnswerClick = (selectedOption) => {
    if (answerSelected) return; // Prevent multiple clicks during the pause

    setAnswerSelected(true);

    setTimeout(() => {
      const correctAnswer = questions[currentQuestionIndex].correctAnswer;
      if (selectedOption === correctAnswer) {
        setScore(prevScore => prevScore + 1); // Increment score if answer is correct
      } else {
        // Store wrong answer with correct answer for result display
        setWrongAnswers(prevWrongAnswers => [
          ...prevWrongAnswers,
          {
            question: questions[currentQuestionIndex].question,
            correctAnswer
          }
        ]);
      }

      // Move to next question or finish the quiz
      if (currentQuestionIndex === questions.length - 1) {
        setFinished(true); // All questions answered
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }

      setAnswerSelected(false); // Allow next answer selection
    }, 2000); // 2 seconds delay
  };

  return (
    <div className="app">
      <div className="score">Score: {score}</div>
      {!finished ? (
        <Question
          question={questions[currentQuestionIndex]}
          onAnswerClick={handleAnswerClick}
          answerSelected={answerSelected}
        />
      ) : (
        <Result score={score} wrongAnswers={wrongAnswers} resetQuiz={resetQuiz} />
      )}
    </div>
  );
};

const Question = ({ question, onAnswerClick, answerSelected }) => {
  if (!question) {
    return null; // Handle case where question is not defined yet
  }

  const { question: q, options, correctAnswer } = question;

  return (
    <div className="question">
      <h2>{q}</h2>
      <div className="options">
        {options.map(option => (
          <button
            key={option}
            onClick={() => onAnswerClick(option)}
            disabled={answerSelected}
          >
            {option}
          </button>
        ))}
      </div>
      {answerSelected && (
        <div className="correct-answer">
          Correct Answer: <span style={{ color: 'green' }}>{correctAnswer}</span>
        </div>
      )}
    </div>
  );
};

const Result = ({ score, wrongAnswers, resetQuiz }) => {
  return (
    <div className="result">
      <h2>Quiz Finished!</h2>
      <p>Your Score: {score}</p>
      {wrongAnswers.length > 0 && (
        <div>
          <h3>Questions with wrong answers:</h3>
          <ul>
            {wrongAnswers.map((item, index) => (
              <li key={index}>
                <strong>Q: {item.question}</strong> - Correct Answer: {item.correctAnswer}
              </li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={resetQuiz}>Start Again</button>
    </div>
  );
};

export default App;
