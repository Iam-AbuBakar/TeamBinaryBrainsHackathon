import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Check } from 'lucide-react';

interface ScheduleProps {
  educator: {
    name: string;
    availability?: {
      date: string;
      slots: string[];
    }[];
  };
  onComplete: (session: { date: string; time: string }) => void;
}

export function Schedule({ educator, onComplete }: ScheduleProps) {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Mock availability data - in a real app, this would come from an API
  const availability = educator?.availability || [
    {
      date: '2025-02-20',
      slots: ['09:00', '10:00', '14:00', '15:00']
    },
    {
      date: '2025-02-21',
      slots: ['11:00', '13:00', '16:00']
    },
    {
      date: '2025-02-22',
      slots: ['09:00', '10:00', '11:00']
    }
  ];

  const handleSchedule = () => {
    if (selectedDate && selectedTime) {
      onComplete({ date: selectedDate, time: selectedTime });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Schedule Your Session</h2>
        <p className="mt-2 text-gray-600">Select a date and time with {educator?.name || 'your educator'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-gray-700">
            <CalendarIcon className="w-5 h-5" />
            <h3 className="font-semibold">Select Date</h3>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {availability.map((day) => (
              <button
                key={day.date}
                onClick={() => setSelectedDate(day.date)}
                className={`p-4 rounded-lg border transition-colors ${
                  selectedDate === day.date
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-200'
                }`}
              >
                {new Date(day.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'short',
                  day: 'numeric'
                })}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-gray-700">
            <Clock className="w-5 h-5" />
            <h3 className="font-semibold">Select Time</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {selectedDate &&
              availability
                .find((day) => day.date === selectedDate)
                ?.slots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-4 rounded-lg border transition-colors ${
                      selectedTime === time
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    {time}
                  </button>
                ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={handleSchedule}
          disabled={!selectedDate || !selectedTime}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg text-white transition-colors ${
            selectedDate && selectedTime
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          <Check className="w-5 h-5" />
          Schedule Session
        </button>
      </div>
    </div>
  );
}