import React, { useState } from 'react';
import { Pizza as Quiz, Settings, Play, Plus, Trash2, CheckCircle, Target } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuizGeneratorProps {
  notes: string;
  summary: string;
  quizzes: Question[];
  setQuizzes: (quizzes: Question[]) => void;
  onStartQuiz: () => void;
}

const QuizGenerator: React.FC<QuizGeneratorProps> = ({ 
  notes, 
  summary, 
  quizzes, 
  setQuizzes, 
  onStartQuiz 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizSettings, setQuizSettings] = useState({
    numQuestions: 5,
    difficulty: 'mixed',
    questionType: 'multiple-choice'
  });

  const generateQuiz = async () => {
    if (!notes.trim() && !summary.trim()) return;
    
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate AI quiz generation
    const sampleQuestions: Question[] = [
      {
        id: '1',
        question: 'What is Machine Learning?',
        options: [
          'A type of computer hardware',
          'A subset of artificial intelligence that enables computers to learn from experience',
          'A programming language',
          'A database management system'
        ],
        correct: 1,
        difficulty: 'easy'
      },
      {
        id: '2',
        question: 'Which of the following is NOT a type of Machine Learning?',
        options: [
          'Supervised Learning',
          'Unsupervised Learning',
          'Reinforcement Learning',
          'Deterministic Learning'
        ],
        correct: 3,
        difficulty: 'medium'
      },
      {
        id: '3',
        question: 'What is the main goal of supervised learning?',
        options: [
          'To discover hidden patterns in data',
          'To make predictions on new, unseen data',
          'To reduce data dimensionality',
          'To cluster similar data points'
        ],
        correct: 1,
        difficulty: 'easy'
      },
      {
        id: '4',
        question: 'Which algorithm is commonly used for unsupervised learning?',
        options: [
          'Linear Regression',
          'Decision Trees',
          'K-means Clustering',
          'Neural Networks'
        ],
        correct: 2,
        difficulty: 'medium'
      },
      {
        id: '5',
        question: 'What does the bias-variance tradeoff refer to?',
        options: [
          'The balance between model complexity and generalization',
          'The difference between training and testing accuracy',
          'The relationship between data size and model performance',
          'The choice between supervised and unsupervised learning'
        ],
        correct: 0,
        difficulty: 'hard'
      }
    ];

    const filteredQuestions = sampleQuestions.slice(0, quizSettings.numQuestions);
    setQuizzes(filteredQuestions);
    setIsGenerating(false);
  };

  const removeQuestion = (id: string) => {
    setQuizzes(quizzes.filter(q => q.id !== id));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header with Image */}
      <div className="mb-8 lg:mb-12">
        <div className="relative overflow-hidden bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-6 sm:p-8 text-white">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">Generate Quiz</h1>
              <p className="text-green-100 text-sm sm:text-base lg:text-lg">
                Create interactive quizzes from your notes and summaries
              </p>
            </div>
            <div className="flex-shrink-0">
              <img 
                src="https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=400" 
                alt="Quiz Generation"
                className="w-48 h-32 sm:w-64 sm:h-40 lg:w-80 lg:h-48 object-cover rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
        {/* Settings Panel */}
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Quiz Settings
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Number of Questions
                </label>
                <select
                  value={quizSettings.numQuestions}
                  onChange={(e) => setQuizSettings({...quizSettings, numQuestions: parseInt(e.target.value)})}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                >
                  <option value={3}>3 Questions</option>
                  <option value={5}>5 Questions</option>
                  <option value={10}>10 Questions</option>
                  <option value={15}>15 Questions</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Difficulty Level
                </label>
                <select
                  value={quizSettings.difficulty}
                  onChange={(e) => setQuizSettings({...quizSettings, difficulty: e.target.value})}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Question Type
                </label>
                <select
                  value={quizSettings.questionType}
                  onChange={(e) => setQuizSettings({...quizSettings, questionType: e.target.value})}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                >
                  <option value="multiple-choice">Multiple Choice</option>
                  <option value="true-false">True/False</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>

              <button
                onClick={generateQuiz}
                disabled={(!notes.trim() && !summary.trim()) || isGenerating}
                className={`w-full px-4 sm:px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base ${
                  (notes.trim() || summary.trim()) && !isGenerating
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transform hover:scale-105'
                    : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                }`}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    <span>Generate Quiz</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {quizzes.length > 0 && (
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200">
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Quiz Ready
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Questions:</span>
                  <span className="font-medium">{quizzes.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Difficulty:</span>
                  <span className="font-medium capitalize">{quizSettings.difficulty}</span>
                </div>
                <button
                  onClick={onStartQuiz}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:shadow-lg transition-all text-sm sm:text-base"
                >
                  <Play className="h-4 w-4" />
                  <span>Start Quiz</span>
                </button>
              </div>
            </div>
          )}

          {/* Quiz Tips */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-4 sm:p-6 border border-green-200">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3">Quiz Tips</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">Review your notes before starting</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">Take your time to read each question</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-slate-700">Use process of elimination</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quiz Preview */}
        <div className="xl:col-span-3">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 flex items-center">
              <Quiz className="h-5 w-5 mr-2" />
              Quiz Preview
            </h2>
            
            {quizzes.length > 0 ? (
              <div className="space-y-4 sm:space-y-6">
                {quizzes.map((question, index) => (
                  <div key={question.id} className="bg-slate-50 rounded-lg p-4 sm:p-6 border border-slate-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-3">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs sm:text-sm font-medium">
                            Question {index + 1}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                            {question.difficulty}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-medium text-slate-900 mb-4">{question.question}</h3>
                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className={`p-3 rounded-lg border ${
                                optionIndex === question.correct
                                  ? 'bg-green-50 border-green-200 text-green-800'
                                  : 'bg-white border-slate-200'
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <span className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-sm font-medium">
                                  {String.fromCharCode(65 + optionIndex)}
                                </span>
                                <span className="text-sm sm:text-base">{option}</span>
                                {optionIndex === question.correct && (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => removeQuestion(question.id)}
                        className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 sm:py-16">
                <img 
                  src="https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=300" 
                  alt="Quiz Generation"
                  className="w-32 h-24 sm:w-48 sm:h-32 object-cover rounded-lg mx-auto mb-4 opacity-60"
                />
                <Quiz className="h-12 w-12 sm:h-16 sm:w-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 text-base sm:text-lg">No quiz generated yet</p>
                <p className="text-xs sm:text-sm text-slate-400 mt-2">
                  Configure your settings and click "Generate Quiz" to create questions
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizGenerator;