import React, { useEffect, useState } from 'react';
import { Brain } from 'lucide-react';

interface PsychometricTestProps {
  onComplete: (data: { score: number }) => void;
}

interface Option {
  value: string;
  label: string;
  score: number;
}

interface Question {
  id: string;
  question: string;
  options: Option[];
}

function generateAIQuestions(): Question[] {
  // Simulated AI-generated questions
  return [
    {
      id: 'confidence_level',
      question: 'How confident are you in solving new problems?',
      options: [
        { value: 'Very confident', label: 'Very confident', score: 12 },
        { value: 'Somewhat confident', label: 'Somewhat confident', score: 10 },
        { value: 'Not sure', label: 'Not sure', score: 8 },
        { value: 'Not confident', label: 'Not confident', score: 6 },
      ],
    },
    {
      id: 'problem_approach',
      question: 'What is your approach when you get stuck on a question?',
      options: [
        { value: 'Try different strategies', label: 'Try different strategies', score: 12 },
        { value: 'Ask for help', label: 'Ask for help', score: 10 },
        { value: 'Skip it', label: 'Skip it', score: 6 },
        { value: 'Panic', label: 'Panic', score: 4 },
      ],
    },
    {
      id: 'time_management',
      question: 'How well do you manage your study time?',
      options: [
        { value: 'Very well', label: 'Very well', score: 12 },
        { value: 'Sometimes well', label: 'Sometimes well', score: 10 },
        { value: 'Needs improvement', label: 'Needs improvement', score: 8 },
        { value: 'Not at all', label: 'Not at all', score: 6 },
      ],
    },
    {
      id: 'distraction_handling',
      question: 'How do you handle distractions while studying?',
      options: [
        { value: 'Ignore and continue', label: 'Ignore and continue', score: 12 },
        { value: 'Take short breaks', label: 'Take short breaks', score: 10 },
        { value: 'Get distracted easily', label: 'Get distracted easily', score: 6 },
        { value: 'Stop studying', label: 'Stop studying', score: 4 },
      ],
    },
    {
      id: 'feedback_reaction',
      question: 'How do you feel about receiving feedback?',
      options: [
        { value: 'Love it', label: 'Love it', score: 12 },
        { value: 'Accept it', label: 'Accept it', score: 10 },
        { value: 'Sometimes upset', label: 'Sometimes upset', score: 8 },
        { value: 'Dislike it', label: 'Dislike it', score: 6 },
      ],
    },
  ];
}

export function PsychometricTest({ onComplete }: PsychometricTestProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const aiQuestions = generateAIQuestions();
    setQuestions(aiQuestions);
  }, []);

  const handleAnswer = (scoreToAdd: number) => {
    setScore((prev) => prev + scoreToAdd);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const finalScore = Math.min(100, score + scoreToAdd); // cap at 100
      onComplete({ score: finalScore });
    }
  };

  if (questions.length === 0) {
    return <div className="text-center mt-10 text-gray-500">Loading AI questions...</div>;
  }

  const question = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto text-center">
      <Brain className="w-12 h-12 text-blue-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold mb-4">{question.question}</h2>
      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleAnswer(option.score)}
            className="w-full border-2 p-3 rounded-xl hover:bg-blue-100"
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-500">
        Question {currentQuestion + 1} of {questions.length}
      </div>
    </div>
  );
}
