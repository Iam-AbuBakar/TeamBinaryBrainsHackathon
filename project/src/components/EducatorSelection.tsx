import React from 'react';
import { Star, Clock, GraduationCap, MessageCircle } from 'lucide-react';

interface Educator {
  id: string;
  name: string;
  photo: string;
  rating: number;
  experience: string;
  specialization: string;
  hourlyRate: number;
  availability: string;
}

interface EducatorSelectionProps {
  educators: Educator[];
  onComplete: (educator: Educator) => void;
}

export function EducatorSelection({ educators, onComplete }: EducatorSelectionProps) {
  if (!educators.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No educators found. Please try adjusting your criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Choose Your Educator</h2>
        <p className="mt-2 text-gray-600">Select the educator that best matches your needs</p>
      </div>

      <div className="grid gap-6 mt-8">
        {educators.map((educator) => (
          <div
            key={educator.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-6">
              <img
                src={educator.photo}
                alt={educator.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{educator.name}</h3>
                    <div className="flex items-center mt-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="ml-1 text-sm">{educator.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <span className="text-lg font-semibold text-indigo-600">
                    ${educator.hourlyRate}/hr
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{educator.experience}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    <span className="text-sm">{educator.specialization}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">Available: {educator.availability}</span>
                </div>

                <button
                  onClick={() => onComplete(educator)}
                  className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Select and Continue
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}