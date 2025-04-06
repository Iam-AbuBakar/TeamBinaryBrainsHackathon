import React, { useState } from 'react';

// Sample questions for each field
const quizQuestions = {
  cybersecurity: [
    { 
      question: 'What does SSL stand for?', 
      type: 'fill-in-the-blank', 
      correctAnswer: 'Secure Sockets Layer' 
    },
    { 
      question: 'Which of these is a common cybersecurity threat?', 
      type: 'multiple-choice', 
      options: ['Phishing', 'Eavesdropping', 'Hacking', 'All of the above'],
      correctAnswer: 'All of the above' 
    },
    { 
      question: 'What is a DDoS attack?', 
      type: 'fill-in-the-blank', 
      correctAnswer: 'Distributed Denial of Service' 
    },
    { 
      question: 'Which of these is a strong password?', 
      type: 'multiple-choice', 
      options: ['123456', 'password', 'strongP@ssw0rd!', 'abcdef'],
      correctAnswer: 'strongP@ssw0rd!' 
    },
  ],
  ai: [
    { 
      question: 'What does AI stand for?', 
      type: 'fill-in-the-blank', 
      correctAnswer: 'Artificial Intelligence' 
    },
    { 
      question: 'Which algorithm is commonly used in machine learning?', 
      type: 'multiple-choice', 
      options: ['Linear Regression', 'Decision Tree', 'Neural Networks', 'All of the above'],
      correctAnswer: 'All of the above' 
    },
    { 
      question: 'What is the Turing Test used for?', 
      type: 'fill-in-the-blank', 
      correctAnswer: 'To test a machine\'s ability to exhibit intelligent behavior' 
    },
    { 
      question: 'Which programming language is widely used for AI development?', 
      type: 'multiple-choice', 
      options: ['Python', 'Java', 'C++', 'All of the above'],
      correctAnswer: 'All of the above' 
    },
  ],
  webdev: [
    { 
      question: 'What does HTML stand for?', 
      type: 'fill-in-the-blank', 
      correctAnswer: 'HyperText Markup Language' 
    },
    { 
      question: 'Which of these is a CSS property?', 
      type: 'multiple-choice', 
      options: ['color', 'background-color', 'font-size', 'All of the above'],
      correctAnswer: 'All of the above' 
    },
    { 
      question: 'What is the purpose of JavaScript in web development?', 
      type: 'fill-in-the-blank', 
      correctAnswer: 'To add interactivity to web pages' 
    },
    { 
      question: 'Which HTML tag is used to create a hyperlink?', 
      type: 'multiple-choice', 
      options: ['<a>', '<div>', '<button>', '<p>'],
      correctAnswer: '<a>' 
    },
  ],
};

// Sample educator data
const educatorData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1-234-567-8901',
  field: 'Cybersecurity',
  bio: 'Expert in network security and ethical hacking.',
};

export function Dashboard({ session }: { session: any }) {
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);

  if (!session) return <p className="text-center text-gray-600">No session details available.</p>;

  const handleFieldSelection = (field: string) => {
    setSelectedField(field);
    setQuestionIndex(0);
    setScore(0);
    setGameCompleted(false);
  };

  const handleAnswerSubmit = () => {
    const currentQuestion = quizQuestions[selectedField!][questionIndex];
    if (currentQuestion.type === 'fill-in-the-blank' && userAnswer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase()) {
      setScore(score + 1);
    } else if (currentQuestion.type === 'multiple-choice' && userAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    // Go to the next question or end the game
    if (questionIndex < quizQuestions[selectedField!].length - 1) {
      setQuestionIndex(questionIndex + 1);
      setUserAnswer('');
    } else {
      setGameCompleted(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-2 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">🎉 Session Booked!</h2>

      <div className="space-y-2 text-gray-700">
        <p><strong>👨‍🏫 Mentor:</strong> {session.mentorName}</p>
        <p><strong>📅 Date:</strong> {session.date}</p>
        <p><strong>⏰ Time:</strong> {session.time}</p>
        <p><strong>📚 Topic:</strong> {session.topic}</p>
      </div>

      <div className="my-4">
        <a
          href="https://zoom.us"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-blue-600 cursor-pointer text-white rounded hover:bg-blue-700 transition"
        >
          🔗 Join Session
        </a>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">📝 Notes</h3>
        <p className="text-gray-700 whitespace-pre-wrap">{session.notes || 'No notes available.'}</p>
      </div>

      {/* Game Section */}
      {!gameCompleted ? (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">🎮 Choose a Learning Game</h3>
          <div className="space-x-4 mb-4">
            <button
              onClick={() => handleFieldSelection('cybersecurity')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Cybersecurity
            </button>
            <button
              onClick={() => handleFieldSelection('ai')}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              AI
            </button>
            <button
              onClick={() => handleFieldSelection('webdev')}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
            >
              Web Development
            </button>
          </div>

          {selectedField && (
            <div className="space-y-4">
              <p><strong>Question {questionIndex + 1}: </strong>{quizQuestions[selectedField][questionIndex].question}</p>
              {quizQuestions[selectedField][questionIndex].type === 'fill-in-the-blank' ? (
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Your answer"
                  className="p-2 border border-gray-300 rounded"
                />
              ) : (
                <div>
                  {quizQuestions[selectedField][questionIndex].options?.map((option, idx) => (
                    <div key={idx}>
                      <input
                        type="radio"
                        id={option}
                        name="answer"
                        value={option}
                        onChange={(e) => setUserAnswer(e.target.value)}
                      />
                      <label htmlFor={option} className="ml-2">{option}</label>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={handleAnswerSubmit}
                className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Submit Answer
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold">🎉 Game Completed!</h3>
          <p className="text-lg">Your final score: {score} / {quizQuestions[selectedField!].length}</p>
        </div>
      )}

      {/* Educator's Contact Information */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">📚 Your Educator's Contact</h3>
        <p><strong>Name:</strong> {educatorData.name}</p>
        <p><strong>Email:</strong> <a href={`mailto:${educatorData.email}`} className="text-blue-600">{educatorData.email}</a></p>
        <p><strong>Phone:</strong> {educatorData.phone}</p>
        <p><strong>Bio:</strong> {educatorData.bio}</p>
      </div>
    </div>
  );
}
