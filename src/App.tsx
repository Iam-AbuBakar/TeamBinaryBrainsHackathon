import React, { useState } from 'react';
import { GraduationCap, Brain, BookOpen, Award, Users, Calendar } from 'lucide-react';

import { StepIndicator } from './components/StepIndicator';
import { Login } from './components/Login';
import { PsychometricTest } from './components/PsychometricTest';
import { Score } from './components/Score';
import { FieldSelection } from './components/FieldSelection';
import { IntellectTest } from './components/IntellectTest';
import { EducatorMatching } from './components/EducatorMatching';
import { EducatorSelection } from './components/EducatorSelection';
import { Schedule } from './components/Schedule';
import { Dashboard } from './components/Dashboard';
import { Home } from './components/Home';

const steps = [
  { icon: GraduationCap, title: 'Login', description: 'Sign in or create an account' },
  { icon: Brain, title: 'Learning Style', description: 'Complete psychometric test' },
  { icon: Brain, title: 'Ability Score', description: 'View your learning ability score' },
  { icon: BookOpen, title: 'Field', description: 'Choose your subject' },
  { icon: Award, title: 'Knowledge Test', description: 'Get your Intellect Badge' },
  { icon: Users, title: 'Match', description: 'Find your perfect educator' },
  { icon: Users, title: 'Select', description: 'Choose your educator' },
  { icon: Calendar, title: 'Schedule', description: 'Book your session' },
  { icon: Calendar, title: 'Dashboard', description: 'Session Details' },
];

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({
    email: '',
    learningStyle: null,
    selectedField: '',
    intellectBadge: null,
    matchedEducators: [],
    selectedEducator: null,
    scheduledSession: null,
  });

  const components = [
    <Login
      onComplete={(data) => {
        setUserData(prev => ({ ...prev, ...data }));
        setCurrentStep(1);
      }}
    />,
    <PsychometricTest
      onComplete={(data) => {
        setUserData(prev => ({ ...prev, learningStyle: data }));
        setCurrentStep(2); // Move to score page
      }}
    />,
    <Score
      score={userData.learningStyle?.score || 0}
      onComplete={() => setCurrentStep(3)}
    />,
    <FieldSelection
      onComplete={(field) => {
        setUserData(prev => ({ ...prev, selectedField: field }));
        setCurrentStep(4);
      }}
    />,
    <IntellectTest
      onComplete={(badge) => {
        setUserData(prev => ({ ...prev, intellectBadge: badge }));
        setCurrentStep(5);
      }}
    />,
    <EducatorMatching
      learningStyle={userData.learningStyle}
      field={userData.selectedField}
      onComplete={(educators) => {
        setUserData(prev => ({ ...prev, matchedEducators: educators }));
        setCurrentStep(6);
      }}
    />,
    <EducatorSelection
      educators={userData.matchedEducators}
      onComplete={(educator) => {
        setUserData(prev => ({ ...prev, selectedEducator: educator }));
        setCurrentStep(7);
      }}
    />,
    <Schedule
      educator={userData.selectedEducator}
      onComplete={(session) => {
        setUserData(prev => ({ ...prev, scheduledSession: session }));
        setCurrentStep(8);
      }}
    />,
    <Dashboard session={userData.scheduledSession} />,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <StepIndicator steps={steps} currentStep={currentStep} />
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
            {components[currentStep]}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
