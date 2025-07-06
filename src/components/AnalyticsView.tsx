import React from 'react';
import { TrendingUp, Award, Clock, Target, BarChart3, Calendar } from 'lucide-react';

interface AnalyticsViewProps {
  completedQuizzes: any[];
  totalQuizzes: number;
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ completedQuizzes, totalQuizzes }) => {
  const calculateAverageScore = () => {
    if (completedQuizzes.length === 0) return 0;
    const total = completedQuizzes.reduce((acc, quiz) => acc + quiz.percentage, 0);
    return Math.round(total / completedQuizzes.length);
  };

  const calculateTotalTime = () => {
    if (completedQuizzes.length === 0) return 0;
    return completedQuizzes.reduce((acc, quiz) => acc + quiz.timeSpent, 0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getPerformanceLevel = (percentage: number) => {
    if (percentage >= 90) return { level: 'Excellent', color: 'text-green-600', bg: 'bg-green-50' };
    if (percentage >= 80) return { level: 'Good', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (percentage >= 70) return { level: 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { level: 'Needs Improvement', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const averageScore = calculateAverageScore();
  const totalTime = calculateTotalTime();
  const performance = getPerformanceLevel(averageScore);

  const stats = [
    {
      title: 'Quizzes Completed',
      value: completedQuizzes.length.toString(),
      subtitle: `of ${totalQuizzes} created`,
      icon: Award,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Average Score',
      value: `${averageScore}%`,
      subtitle: performance.level,
      icon: Target,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Total Study Time',
      value: formatTime(totalTime),
      subtitle: 'Active learning',
      icon: Clock,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
    {
      title: 'Learning Streak',
      value: completedQuizzes.length > 0 ? `${completedQuizzes.length} days` : '0 days',
      subtitle: 'Keep it up!',
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Learning Analytics</h1>
        <p className="text-slate-600">Track your progress and improve your study habits</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.textColor}`} />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-sm text-slate-600">{stat.subtitle}</p>
                </div>
              </div>
              <p className="text-sm font-medium text-slate-700">{stat.title}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Overview */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Performance Overview
          </h2>
          
          {completedQuizzes.length > 0 ? (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${performance.bg}`}>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-900">Overall Performance</span>
                  <span className={`font-bold ${performance.color}`}>{performance.level}</span>
                </div>
                <div className="mt-2 bg-white rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${averageScore}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-medium text-slate-900">Score Distribution</h3>
                {completedQuizzes.map((quiz, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm text-slate-700">Quiz {index + 1}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-slate-900">{quiz.percentage}%</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getPerformanceLevel(quiz.percentage).bg} ${getPerformanceLevel(quiz.percentage).color}`}>
                        {getPerformanceLevel(quiz.percentage).level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <BarChart3 className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No quiz data available</p>
              <p className="text-sm text-slate-400 mt-2">Complete some quizzes to see your performance</p>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Recent Activity
          </h2>
          
          {completedQuizzes.length > 0 ? (
            <div className="space-y-4">
              {completedQuizzes.slice(-5).reverse().map((quiz, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Award className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-900">Quiz Completed</p>
                      <span className="text-xs text-slate-500">
                        {new Date(quiz.completedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-slate-600">Score: {quiz.percentage}%</span>
                      <span className="text-xs text-slate-600">Time: {formatTime(quiz.timeSpent)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No recent activity</p>
              <p className="text-sm text-slate-400 mt-2">Start taking quizzes to track your progress</p>
            </div>
          )}
        </div>
      </div>

      {/* Study Recommendations */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Study Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-medium text-slate-900 mb-2">Consistency</h3>
            <p className="text-sm text-slate-600">Take quizzes regularly to maintain your learning momentum</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-medium text-slate-900 mb-2">Review</h3>
            <p className="text-sm text-slate-600">Focus on topics where you scored below 80%</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-medium text-slate-900 mb-2">Challenge</h3>
            <p className="text-sm text-slate-600">Try harder difficulty levels to improve your skills</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;