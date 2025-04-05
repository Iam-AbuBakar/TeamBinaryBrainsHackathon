import React, { useEffect, useState } from 'react';
import { BookOpen, Brain, Star, Clock } from 'lucide-react';

interface EducatorMatchingProps {
  learningStyle: any;
  field: string;
  onComplete: (educators: any[]) => void;
}

interface Educator {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  experience: number;
  matchScore: number;
  imageUrl: string;
}

export function EducatorMatching({ learningStyle, field, onComplete }: EducatorMatchingProps) {
  const [loading, setLoading] = useState(true);
  const [educators, setEducators] = useState<Educator[]>([]);

  useEffect(() => {
    // Simulate API call to match educators
    setTimeout(() => {
      const matchedEducators: Educator[] = [
        {
          id: '1',
          name: 'Dr. Sarah Chen',
          specialization: field,
          rating: 4.9,
          experience: 8,
          matchScore: 95,
          imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200'
        },
        {
          id: '2',
          name: 'Prof. Michael Rodriguez',
          specialization: field,
          rating: 4.8,
          experience: 12,
          matchScore: 92,
          imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200'
        },
        {
          id: '3',
          name: 'Dr. Emily Thompson',
          specialization: field,
          rating: 4.7,
          experience: 6,
          matchScore: 88,
          imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200'
        }
      ];
      setEducators(matchedEducators);
      setLoading(false);
    }, 2000);
  }, [field, learningStyle]);

  const handleContinue = () => {
    onComplete(educators);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-lg text-gray-600">Finding your perfect match...</p>
        <p className="mt-2 text-sm text-gray-500">We're analyzing your learning style and preferences</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">We've Found Your Matches!</h2>
        <p className="mt-2 text-gray-600">Based on your learning style and field of interest</p>
      </div>

      <div className="grid gap-6">
        {educators.map((educator) => (
          <div key={educator.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <img
                  src={educator.imageUrl}
                  alt={educator.name}
                  className="h-20 w-20 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">{educator.name}</h3>
                  <div className="flex items-center mt-1 text-gray-600">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>{educator.specialization}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{educator.matchScore}%</div>
                  <div className="text-sm text-gray-500">Match Score</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center text-gray-600">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span>{educator.rating} Rating</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{educator.experience} Years Experience</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleContinue}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue with These Matches
        </button>
      </div>
    </div>
  );
}