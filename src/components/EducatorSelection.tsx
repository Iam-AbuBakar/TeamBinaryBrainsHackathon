import React, { useState } from 'react';
import { Star, Clock, GraduationCap, MessageCircle } from 'lucide-react';

interface Educator {
  id: string;
  name: string;
  photo: string;
  rating: number;
  experience: string;
  specialization: string;
  availability: string;
}

interface EducatorSelectionProps {
  educators: Educator[];
  onComplete: (educator: Educator, subscription: string, price: number) => void;
}

const subscriptions = [
  { label: '1 Month', value: '1_month', price: 200 },
  { label: '3 Months', value: '3_months', price: 300 },
  { label: '6 Months', value: '6_months', price: 500 },
];

export function EducatorSelection({ educators, onComplete }: EducatorSelectionProps) {
  const [selectedEducator, setSelectedEducator] = useState<Educator | null>(null);
  const [selectedSubscription, setSelectedSubscription] = useState<string | null>(null);

  const handleSelectEducator = (educator: Educator) => {
    setSelectedEducator(educator);
    setSelectedSubscription(null); // reset if changing educator
  };

  const handleProceed = () => {
    if (selectedEducator && selectedSubscription) {
      const sub = subscriptions.find((s) => s.value === selectedSubscription);
      if (sub) {
        onComplete(selectedEducator, sub.label, sub.price);
      }
    }
  };

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
        <p className="mt-2 text-gray-600">Select an educator and choose a subscription to continue</p>
      </div>

      <div className="grid gap-6 mt-8">
        {educators.map((educator) => (
          <div
            key={educator.id}
            className={`bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow ${
              selectedEducator?.id === educator.id ? 'border-indigo-500' : 'border-gray-200'
            }`}
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
                  onClick={() => handleSelectEducator(educator)}
                  className={`mt-4 w-full px-4 py-2 text-sm font-medium rounded-md ${
                    selectedEducator?.id === educator.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {selectedEducator?.id === educator.id ? 'Selected' : 'Choose Educator'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedEducator && (
        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Choose Subscription Plan</h3>
          <div className="flex justify-center gap-4 flex-wrap">
            {subscriptions.map((sub) => (
              <button
                key={sub.value}
                onClick={() => setSelectedSubscription(sub.value)}
                className={`px-4 py-2 rounded-lg border font-medium transition ${
                  selectedSubscription === sub.value
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {sub.label} - ₹{sub.price}
              </button>
            ))}
          </div>

          <button
            onClick={handleProceed}
            disabled={!selectedSubscription}
            className={`mt-6 w-60 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium ${
              selectedSubscription
                ? 'text-white bg-green-600 hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Continue to Next Step
          </button>
        </div>
      )}
    </div>
  );
}
