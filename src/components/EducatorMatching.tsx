import React, { useEffect, useState } from 'react';
import { BookOpen, Star, Clock } from 'lucide-react';

interface EducatorMatchingProps {
  learningStyle: any;
  field: string;
  score: number;
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

export function EducatorMatching({ learningStyle, field, score, onComplete }: EducatorMatchingProps) {
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
        },
        {
          id: '4',
          name: 'Prof. John Smith',
          specialization: field,
          rating: 4.5,
          experience: 10,
          matchScore: 84,
          imageUrl: 'https://images.unsplash.com/photo-1542577731-5ee4fc6152d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVkdWNhdG9ycyUyMHByb2ZpbGUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D'
        },
        {
          id: '5',
          name: 'Dr. Lisa Miller',
          specialization: field,
          rating: 4.6,
          experience: 9,
          matchScore: 90,
          imageUrl: 'https://plus.unsplash.com/premium_photo-1681681060809-acbbaf12acae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE5fHx8ZW58MHx8fHx8'
        },
        {
          id: '6',
          name: 'Prof. Greg Stevens',
          specialization: field,
          rating: 4.3,
          experience: 15,
          matchScore: 75,
          imageUrl: 'https://plus.unsplash.com/premium_photo-1682787495017-a8f4c7584868?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
          id: '7',
          name: 'Dr. Angela Wright',
          specialization: field,
          rating: 4.2,
          experience: 7,
          matchScore: 80,
          imageUrl: 'https://plus.unsplash.com/premium_photo-1683535508589-84c5ee5b357c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
          id: '8',
          name: 'Prof. Henry Parker',
          specialization: field,
          rating: 4.4,
          experience: 11,
          matchScore: 85,
          imageUrl: 'https://plus.unsplash.com/premium_photo-1683167306228-44c2723b8159?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
          id: '9',
          name: 'Dr. Matthew Johnson',
          specialization: field,
          rating: 4.7,
          experience: 5,
          matchScore: 78,
          imageUrl: 'https://plus.unsplash.com/premium_photo-1682787494413-08785febcdd7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
          id: '10',
          name: 'Prof. Nancy Lee',
          specialization: field,
          rating: 4.8,
          experience: 14,
          matchScore: 92,
          imageUrl: 'https://images.unsplash.com/photo-1515073838964-4d4d56a58b21?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }
      ];

      // Sort all educators by matchScore in descending order
      const sortedEducators = matchedEducators.sort((a, b) => b.matchScore - a.matchScore);

      setEducators(sortedEducators);  // No need to sort by proximity if you're showing all and sorting by matchScore
      setLoading(false);
    }, 2000);
  }, [field, learningStyle, score]);

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
