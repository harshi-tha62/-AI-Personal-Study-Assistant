import React from 'react';
import { FileText, Brain, Pizza as Quiz, TrendingUp, ArrowRight, BookOpen, Sparkles, Target } from 'lucide-react';

interface DashboardProps {
  notes: string;
  summary: string;
  quizzes: any[];
  completedQuizzes: any[];
  setActiveTab: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  notes, 
  summary, 
  quizzes, 
  completedQuizzes, 
  setActiveTab 
}) => {
  const stats = [
    {
      title: 'Notes Processed',
      value: notes ? '1' : '0',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Summaries Generated',
      value: summary ? '1' : '0',
      icon: Brain,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
    {
      title: 'Quizzes Created',
      value: quizzes.length.toString(),
      icon: Quiz,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Quizzes Completed',
      value: completedQuizzes.length.toString(),
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    }
  ];

  const quickActions = [
    {
      title: 'Process New Notes',
      description: 'Upload or paste your lecture notes to get started',
      icon: FileText,
      action: () => setActiveTab('notes'),
      color: 'from-blue-500 to-blue-600',
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Generate Summary',
      description: 'Create AI-powered summaries from your notes',
      icon: Brain,
      action: () => setActiveTab('summary'),
      color: 'from-purple-500 to-purple-600',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Create Quiz',
      description: 'Generate interactive quizzes for better learning',
      icon: Quiz,
      action: () => setActiveTab('quiz'),
      color: 'from-green-500 to-green-600',
      image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Hero Section */}
      <div className="mb-8 lg:mb-12">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl p-6 sm:p-8 lg:p-12 text-white">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative z-10 max-w-4xl">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  Welcome to AI Study Assistant
                </h1>
                <p className="text-lg sm:text-xl text-blue-100 mb-6 max-w-2xl">
                  Transform your learning with AI-powered study tools. Process notes, generate summaries, and create interactive quizzes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button
                    onClick={() => setActiveTab('notes')}
                    className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105"
                  >
                    Get Started
                  </button>
                  <button className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all">
                    Learn More
                  </button>
                </div>
              </div>
              <div className="flex-shrink-0">
                <img 
                  src="https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=500" 
                  alt="AI Learning"
                  className="w-64 h-48 sm:w-80 sm:h-60 object-cover rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 lg:mb-12">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200 transform hover:scale-105"
            >
              <div className="flex flex-col items-center text-center lg:flex-row lg:text-left lg:items-start lg:justify-between">
                <div className="mb-3 lg:mb-0">
                  <p className="text-xs sm:text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                  <p className="text-xl sm:text-2xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <div className={`p-2 sm:p-3 rounded-lg ${stat.bgColor} lg:ml-4`}>
                  <Icon className={`h-4 w-4 sm:h-6 sm:w-6 ${stat.textColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8 lg:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-4 sm:mb-6 text-center lg:text-left">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-200 text-left group overflow-hidden transform hover:scale-105"
              >
                <div className="relative h-32 sm:h-40 overflow-hidden">
                  <img 
                    src={action.image} 
                    alt={action.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className={`absolute top-4 left-4 p-2 sm:p-3 rounded-lg bg-gradient-to-r ${action.color}`}>
                    <Icon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900">{action.title}</h3>
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                  </div>
                  <p className="text-sm sm:text-base text-slate-600">{action.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 lg:mb-12">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 sm:p-8 border border-blue-200">
          <div className="flex items-center mb-4">
            <Sparkles className="h-6 w-6 text-blue-600 mr-3" />
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900">AI-Powered Learning</h3>
          </div>
          <p className="text-slate-700 mb-4">
            Leverage advanced AI to transform your study materials into comprehensive summaries and interactive quizzes.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              Smart content analysis
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              Automatic key point extraction
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              Personalized learning paths
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 sm:p-8 border border-purple-200">
          <div className="flex items-center mb-4">
            <Target className="h-6 w-6 text-purple-600 mr-3" />
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900">Track Progress</h3>
          </div>
          <p className="text-slate-700 mb-4">
            Monitor your learning journey with detailed analytics and performance insights.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              Performance analytics
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              Learning streaks
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              Improvement suggestions
            </li>
          </ul>
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-6 sm:p-8 border border-slate-200">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
          <div className="flex-shrink-0">
            <img 
              src="https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300" 
              alt="Getting Started"
              className="w-48 h-32 sm:w-64 sm:h-40 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-4 flex items-center justify-center lg:justify-start">
              <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
              Getting Started
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">1</span>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-sm sm:text-base font-medium text-slate-900">Process your lecture notes</p>
                  <p className="text-xs sm:text-sm text-slate-600">Upload or paste your study materials</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-purple-600">2</span>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-sm sm:text-base font-medium text-slate-900">Generate AI summaries</p>
                  <p className="text-xs sm:text-sm text-slate-600">Get key points and insights</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-green-600">3</span>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-sm sm:text-base font-medium text-slate-900">Create interactive quizzes</p>
                  <p className="text-xs sm:text-sm text-slate-600">Test your knowledge and track progress</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;