import React, { useState } from 'react';
import { Brain, Eye, Headphones, Activity } from 'lucide-react';

interface PsychometricTestProps {
  onComplete: (data: any) => void;
}

export function PsychometricTest({ onComplete }: PsychometricTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    {
      id: 'learning_style',
      question: 'How do you prefer to learn new information?',
      options: [
        { value: 'visual', label: 'Through diagrams and visual aids', icon: Eye },
        { value: 'auditory', label: 'By listening to explanations', icon: Headphones },
        { value: 'kinesthetic', label: 'By doing hands-on activities', icon: Activity },
      ],
    },
    {
      id: 'content_preference',
      question: 'What type of content helps you learn best?',
      options: [
        { value: 'lectures', label: 'Structured lectures and presentations' },
        { value: 'projects', label: 'Practical projects and assignments' },
        { value: 'multimedia', label: 'Interactive multimedia content' },
      ],
    },
    {
      id: 'learning_pace',
      question: 'What learning pace suits you best?',
      options: [
        { value: 'fast', label: 'Quick progression with challenging content' },
        { value: 'moderate', label: 'Balanced pace with regular checkpoints' },
        { value: 'step_by_step', label: 'Detailed step-by-step instruction' },
      ],
    },
  ];

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onComplete(answers);
    }
  };

  const question = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <Brain className="w-16 h-16 text-blue-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Learning Style Discovery</h2>
        <p className="mt-2 text-gray-600">
          Let's understand how you learn best to match you with the perfect educator
        </p>
      </div>

      <div className="bg-white rounded-xl p-6">
        <div className="mb-6">
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            {question.question}
          </h3>
          <div className="space-y-4">
            {question.options.map((option) => {
              const Icon = option.icon || Brain;
              return (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(question.id, option.value)}
                  className="w-full flex items-center p-4 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <Icon className="w-6 h-6 text-blue-500 mr-3" />
                  <span className="text-left text-gray-700">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex justify-between text-sm text-gray-500">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <div className="flex space-x-1">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentQuestion ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}