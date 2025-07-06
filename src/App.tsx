import React, { useState } from 'react';
import { BookOpen, Brain, FileText, Pizza as Quiz, TrendingUp, Download, Upload, CheckCircle, Menu, X } from 'lucide-react';
import Dashboard from './components/Dashboard';
import NotesProcessor from './components/NotesProcessor';
import SummaryGenerator from './components/SummaryGenerator';
import QuizGenerator from './components/QuizGenerator';
import QuizInterface from './components/QuizInterface';
import AnalyticsView from './components/AnalyticsView';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notes, setNotes] = useState('');
  const [summary, setSummary] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: BookOpen },
    { id: 'notes', label: 'Process Notes', icon: FileText },
    { id: 'summary', label: 'Generate Summary', icon: Brain },
    { id: 'quiz', label: 'Create Quiz', icon: Quiz },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-slate-900">AI Study Assistant</h1>
                <p className="text-sm text-slate-600">Smart learning companion</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-lg font-bold text-slate-900">AI Study Assistant</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">AI Ready</span>
              </div>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar Navigation - Desktop */}
          <nav className="hidden lg:block lg:w-64 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 shadow-sm'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
                <div className="p-4 border-b border-slate-200">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                      <Brain className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-lg font-bold text-slate-900">AI Study Assistant</h1>
                      <p className="text-sm text-slate-600">Smart learning companion</p>
                    </div>
                  </div>
                </div>
                <nav className="p-4 space-y-2">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleTabChange(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                          activeTab === item.id
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          )}

          {/* Bottom Navigation - Mobile */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2 z-30">
            <div className="flex justify-around">
              {navigation.slice(0, 4).map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className={`flex flex-col items-center space-y-1 px-2 py-2 rounded-lg transition-all duration-200 ${
                      activeTab === item.id
                        ? 'text-blue-600'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-xs font-medium">{item.label.split(' ')[0]}</span>
                  </button>
                );
              })}
              <button
                onClick={() => handleTabChange('analytics')}
                className={`flex flex-col items-center space-y-1 px-2 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === 'analytics'
                    ? 'text-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <TrendingUp className="h-5 w-5" />
                <span className="text-xs font-medium">Stats</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 mb-20 lg:mb-0">
            {activeTab === 'dashboard' && (
              <Dashboard
                notes={notes}
                summary={summary}
                quizzes={quizzes}
                completedQuizzes={completedQuizzes}
                setActiveTab={setActiveTab}
              />
            )}
            {activeTab === 'notes' && (
              <NotesProcessor
                notes={notes}
                setNotes={setNotes}
                onProcess={() => setActiveTab('summary')}
              />
            )}
            {activeTab === 'summary' && (
              <SummaryGenerator
                notes={notes}
                summary={summary}
                setSummary={setSummary}
                onNext={() => setActiveTab('quiz')}
              />
            )}
            {activeTab === 'quiz' && (
              <QuizGenerator
                notes={notes}
                summary={summary}
                quizzes={quizzes}
                setQuizzes={setQuizzes}
                onStartQuiz={() => setActiveTab('quiz-interface')}
              />
            )}
            {activeTab === 'quiz-interface' && (
              <QuizInterface
                quizzes={quizzes}
                onComplete={(results) => {
                  setCompletedQuizzes(prev => [...prev, results]);
                  setActiveTab('analytics');
                }}
              />
            )}
            {activeTab === 'analytics' && (
              <AnalyticsView
                completedQuizzes={completedQuizzes}
                totalQuizzes={quizzes.length}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;