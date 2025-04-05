import React, { useState } from 'react';
import { Award, ChevronRight, AlertCircle } from 'lucide-react';

interface IntellectTestProps {
  onComplete: (badge: { type: string; score: number }) => void;
}

export function IntellectTest({ onComplete }: IntellectTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  // Sample questions - in a real app, these would be fetched based on the selected field
  const questions = [
    {
      question: "What is the primary purpose of version control systems?",
      options: [
        "To make backup copies of files",
        "To track changes and collaborate on code",
        "To compress files for storage",
        "To encrypt sensitive data"
      ],
      correct: 1
    },
    {
      question: "Which of these is NOT a common HTTP method?",
      options: [
        "GET",
        "POST",
        "SEND",
        "DELETE"
      ],
      correct: 2
    },
    // Add more questions here
  ];

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Calculate score (each question is worth 5 points)
      const correctAnswers = newAnswers.filter(
        (answer, index) => answer === questions[index].correct
      ).length;
      const score = correctAnswers * 5;

      // Determine badge type
      let type = 'ruby';
      if (score >= 86) type = 'diamond';
      else if (score >= 61) type = 'emerald';
      else if (score >= 31) type = 'sapphire';

      onComplete({ type, score });
    }
  };

  const getBadgeColor = (score: number) => {
    if (score >= 86) return 'text-blue-500';
    if (score >= 61) return 'text-green-500';
    if (score >= 31) return 'text-indigo-500';
    return 'text-red-500';
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <Award className="w-16 h-16 text-blue-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Knowledge Assessment</h2>
        <p className="mt-2 text-gray-600">
          Let's evaluate your current understanding of the subject
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-medium text-gray-900">
              Question {currentQuestion + 1}
            </h3>
            <span className="text-sm text-gray-500">
              {currentQuestion + 1} of {questions.length}
            </span>
          </div>

          <p className="text-lg text-gray-800 mb-6">
            {questions[currentQuestion].question}
          </p>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <span className="flex items-center">
                  <span className="text-gray-700">{option}</span>
                  <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center text-sm text-gray-500">
            <AlertCircle className="w-4 h-4 mr-2" />
            <span>Choose the best answer to proceed</span>
          </div>
        </div>
      </div>
    </div>
  );
}