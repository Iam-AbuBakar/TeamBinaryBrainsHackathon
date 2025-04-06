import React from 'react';

interface ScoreProps {
  score: number;
  onComplete: () => void;
}

export const Score: React.FC<ScoreProps> = ({ score, onComplete }) => {
  let description = '';

  if (score >= 85) {
    description = "You are a highly proactive and independent learner. You enjoy hands-on learning and can grasp concepts quickly.";
  } else if (score >= 70) {
    description = "You are a balanced learner who benefits from a structured approach and occasional help from educators.";
  } else if (score >= 50) {
    description = "You are a developing learner. You can benefit a lot from guided mentoring and regular study habits.";
  } else {
    description = "You may need extra support and motivation. A personalized educator can help bring out your best potential.";
  }

  return (
    <div className="max-w-2xl mx-auto text-center p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold text-blue-600">🎯 Your Self Ability Score: {score}/100</h2>
      <p className="mt-4 text-lg text-gray-700">{description}</p>

      <button
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={onComplete}
      >
        Continue to Field Selection →
      </button>
    </div>
  );
};
