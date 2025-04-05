import React, { useState } from 'react';
import { GraduationCap, Brain, BookOpen, Award, Users, Calendar } from 'lucide-react';
import { StepIndicator } from './components/StepIndicator';
import { Login } from './components/Login';
import { PsychometricTest } from './components/PsychometricTest';
import { FieldSelection } from './components/FieldSelection';
import { IntellectTest } from './components/IntellectTest';
import { EducatorMatching } from './components/EducatorMatching';
import { EducatorSelection } from './components/EducatorSelection';
import { Schedule } from './components/Schedule';

const steps = [
  { icon: GraduationCap, title: 'Login', description: 'Sign in or create an account' },
  { icon: Brain, title: 'Learning Style', description: 'Complete psychometric test' },
  { icon: BookOpen, title: 'Field', description: 'Choose your subject' },
  { icon: Award, title: 'Knowledge Test', description: 'Get your Intellect Badge' },
  { icon: Users, title: 'Match', description: 'Find your perfect educator' },
  { icon: Users, title: 'Select', description: 'Choose your educator' },
  { icon: Calendar, title: 'Schedule', description: 'Book your session' },
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
    <Login onComplete={(data) => {
      setUserData(prev => ({ ...prev, ...data }));
      setCurrentStep(1);
    }} />,
    <PsychometricTest onComplete={(data) => {
      setUserData(prev => ({ ...prev, learningStyle: data }));
      setCurrentStep(2);
    }} />,
    <FieldSelection onComplete={(field) => {
      setUserData(prev => ({ ...prev, selectedField: field }));
      setCurrentStep(3);
    }} />,
    <IntellectTest onComplete={(badge) => {
      setUserData(prev => ({ ...prev, intellectBadge: badge }));
      setCurrentStep(4);
    }} />,
    <EducatorMatching 
      learningStyle={userData.learningStyle}
      field={userData.selectedField}
      onComplete={(educators) => {
        setUserData(prev => ({ ...prev, matchedEducators: educators }));
        setCurrentStep(5);
      }}
    />,
    <EducatorSelection 
      educators={userData.matchedEducators}
      onComplete={(educator) => {
        setUserData(prev => ({ ...prev, selectedEducator: educator }));
        setCurrentStep(6);
      }}
    />,
    <Schedule 
      educator={userData.selectedEducator}
      onComplete={(session) => {
        setUserData(prev => ({ ...prev, scheduledSession: session }));
      }}
    />,
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