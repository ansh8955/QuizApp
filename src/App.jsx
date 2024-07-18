import React, { useState, useEffect } from 'react';
import './App.css'; // Import your CSS file

const questionsData = [
  {
    question: 'What is the capital of Australia?',
    options: ['Canberra', 'Sydney', 'Melbourne', 'Brisbane'],
    correctAnswer: 'Canberra'
  },
  {
    question: 'Who wrote the novel "1984"?',
    options: ['George Orwell', 'Ernest Hemingway', 'J.K. Rowling', 'F. Scott Fitzgerald'],
    correctAnswer: 'George Orwell'
  },
  {
    question: 'Which river is the longest in the world?',
    options: ['Nile', 'Amazon', 'Yangtze', 'Mississippi'],
    correctAnswer: 'Nile'
  },
  {
    question: 'Which gas do plants absorb from the atmosphere?',
    options: ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Hydrogen'],
    correctAnswer: 'Carbon dioxide'
  },
  {
    question: 'What is the largest planet in our solar system?',
    options: ['Jupiter', 'Saturn', 'Neptune', 'Earth'],
    correctAnswer: 'Jupiter'
  },
  {
    question: 'Who is the author of "Harry Potter and the Philosopher\'s Stone"?',
    options: ['J.K. Rowling', 'Stephen King', 'George R.R. Martin', 'Roald Dahl'],
    correctAnswer: 'J.K. Rowling'
  },
  {
    question: 'What is the smallest bone in the human body?',
    options: ['Stapes', 'Femur', 'Humerus', 'Tibia'],
    correctAnswer: 'Stapes'
  },
  {
    question: 'Which city hosted the 2012 Summer Olympics?',
    options: ['London', 'Tokyo', 'Rio de Janeiro', 'Beijing'],
    correctAnswer: 'London'
  },
  {
    question: 'What is the chemical symbol for water?',
    options: ['H2O', 'CO2', 'NaCl', 'O2'],
    correctAnswer: 'H2O'
  },
  {
    question: 'Who painted the famous "Starry Night"?',
    options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Claude Monet'],
    correctAnswer: 'Vincent van Gogh'
  }
];

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [answerSelected, setAnswerSelected] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

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
    setShowCorrectAnswer(false);
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

      // Show correct answer after 2 seconds
      setShowCorrectAnswer(true);

      setTimeout(() => {
        // Move to next question or finish the quiz
        if (currentQuestionIndex === questions.length - 1) {
          setFinished(true); // All questions answered
        } else {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setAnswerSelected(false); // Allow next answer selection
          setShowCorrectAnswer(false); // Hide correct answer for the next question
        }
      }, 2000); // 2 seconds delay before moving to next question

    }, 2000); // 2 seconds delay before showing correct answer
  };

  // Calculate current question number
  const currentQuestionNumber = currentQuestionIndex + 1;

  return (
    <div className="app">
      <header className="app-header">
        <h1>USA Quiz</h1>
      </header>
      <div className="main-content">
        <div className="score">Current Score: {score}</div>
        {!finished ? (
          <div className="question">
            <h2>Question {currentQuestionNumber} of {questions.length}</h2>
            <h3>{questions[currentQuestionIndex]?.question}</h3>
            <div className="options">
              {questions[currentQuestionIndex]?.options.map(option => (
                <button
                  key={option}
                  onClick={() => handleAnswerClick(option)}
                  disabled={answerSelected}
                >
                  {option}
                </button>
              ))}
            </div>
            {answerSelected && showCorrectAnswer && (
              <div className="correct-answer">
                Correct Answer: <span style={{ color: 'green' }}>{questions[currentQuestionIndex].correctAnswer}</span>
              </div>
            )}
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default App;
