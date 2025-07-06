import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, X, ArrowRight, RotateCcw } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuizInterfaceProps {
  quizzes: Question[];
  onComplete: (results: any) => void;
}

const QuizInterface: React.FC<QuizInterfaceProps> = ({ quizzes, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isQuizComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleQuizComplete();
    }
  }, [timeLeft, isQuizComplete]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...userAnswers];
      newAnswers[currentQuestion] = selectedAnswer;
      setUserAnswers(newAnswers);
      
      if (currentQuestion < quizzes.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(newAnswers[currentQuestion + 1] ?? null);
      } else {
        handleQuizComplete();
      }
    }
  };

  const handleQuizComplete = () => {
    setIsQuizComplete(true);
    const finalAnswers = [...userAnswers];
    if (selectedAnswer !== null) {
      finalAnswers[currentQuestion] = selectedAnswer;
    }
    
    const score = finalAnswers.reduce((acc, answer, index) => {
      return acc + (answer === quizzes[index]?.correct ? 1 : 0);
    }, 0);
    
    const results = {
      score,
      total: quizzes.length,
      percentage: Math.round((score / quizzes.length) * 100),
      answers: finalAnswers,
      timeSpent: 300 - timeLeft,
      completedAt: new Date().toISOString()
    };
    
    onComplete(results);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return ((currentQuestion + 1) / quizzes.length) * 100;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (quizzes.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="max-w-md mx-auto">
          <CheckCircle className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">No Quiz Available</h2>
          <p className="text-slate-600">Please generate a quiz first to start practicing.</p>
        </div>
      </div>
    );
  }

  if (isQuizComplete) {
    return (
      <div className="p-8 text-center">
        <div className="max-w-md mx-auto bg-white rounded-xl p-8 shadow-sm border border-slate-200">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Quiz Completed!</h2>
          <p className="text-slate-600 mb-4">Your results have been saved and you'll be redirected to analytics.</p>
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mx-auto"></div>
        </div>
      </div>
    );
  }

  const currentQ = quizzes[currentQuestion];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-slate-900">Quiz Mode</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-blue-800">{formatTime(timeLeft)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-600">Question</span>
              <span className="font-medium text-slate-900">{currentQuestion + 1}</span>
              <span className="text-slate-400">/</span>
              <span className="font-medium text-slate-900">{quizzes.length}</span>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
          <div className="flex items-center space-x-3 mb-6">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Question {currentQuestion + 1}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentQ.difficulty)}`}>
              {currentQ.difficulty}
            </span>
          </div>
          
          <h2 className="text-2xl font-semibold text-slate-900 mb-8">{currentQ.question}</h2>
          
          <div className="space-y-4 mb-8">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                  selectedAnswer === index
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    selectedAnswer === index
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-lg">{option}</span>
                </div>
              </button>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                if (currentQuestion > 0) {
                  setCurrentQuestion(currentQuestion - 1);
                  setSelectedAnswer(userAnswers[currentQuestion - 1] ?? null);
                }
              }}
              disabled={currentQuestion === 0}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                currentQuestion === 0
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  : 'bg-slate-600 text-white hover:bg-slate-700'
              }`}
            >
              Previous
            </button>
            
            <button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                selectedAnswer !== null
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                  : 'bg-slate-200 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>{currentQuestion === quizzes.length - 1 ? 'Finish Quiz' : 'Next'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizInterface;