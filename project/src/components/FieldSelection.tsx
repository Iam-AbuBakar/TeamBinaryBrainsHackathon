import React from 'react';
import { Code, Shield, Brain, Globe, Database, Cloud, Cpu, Palette } from 'lucide-react';

interface FieldSelectionProps {
  onComplete: (field: string) => void;
}

export function FieldSelection({ onComplete }: FieldSelectionProps) {
  const fields = [
    { id: 'web-dev', name: 'Web Development', icon: Code, description: 'Master modern web technologies and frameworks' },
    { id: 'cybersecurity', name: 'Cybersecurity', icon: Shield, description: 'Learn to protect systems and networks' },
    { id: 'ai-ml', name: 'Artificial Intelligence', icon: Brain, description: 'Explore machine learning and AI concepts' },
    { id: 'networking', name: 'Networking', icon: Globe, description: 'Understand computer networks and protocols' },
    { id: 'database', name: 'Database Management', icon: Database, description: 'Master data storage and manipulation' },
    { id: 'cloud', name: 'Cloud Computing', icon: Cloud, description: 'Learn cloud platforms and services' },
    { id: 'embedded', name: 'Embedded Systems', icon: Cpu, description: 'Work with hardware and IoT devices' },
    { id: 'ui-ux', name: 'UI/UX Design', icon: Palette, description: 'Create beautiful user interfaces' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Choose Your Learning Path</h2>
        <p className="mt-2 text-gray-600">Select the field you want to master</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fields.map((field) => {
          const Icon = field.icon;
          return (
            <button
              key={field.id}
              onClick={() => onComplete(field.id)}
              className="flex flex-col items-center p-6 bg-white rounded-xl border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all transform hover:-translate-y-1"
            >
              <Icon className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{field.name}</h3>
              <p className="text-sm text-gray-600 text-center">{field.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}