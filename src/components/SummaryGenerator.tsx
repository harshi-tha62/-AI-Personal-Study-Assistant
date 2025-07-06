import React, { useState } from 'react';
import { Brain, Sparkles, ArrowRight, Copy, Download, CheckCircle, FileText } from 'lucide-react';

interface SummaryGeneratorProps {
  notes: string;
  summary: string;
  setSummary: (summary: string) => void;
  onNext: () => void;
}

const SummaryGenerator: React.FC<SummaryGeneratorProps> = ({ 
  notes, 
  summary, 
  setSummary, 
  onNext 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [summaryType, setSummaryType] = useState('comprehensive');
  const [copied, setCopied] = useState(false);

  const generateSummary = async () => {
    if (!notes.trim()) return;
    
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate AI summary generation
    let generatedSummary = '';
    
    if (summaryType === 'comprehensive') {
      generatedSummary = `# Comprehensive Summary

## Key Concepts

**Machine Learning Fundamentals**
- Machine Learning is a subset of AI that enables computers to learn from experience
- Three main types: Supervised, Unsupervised, and Reinforcement Learning
- Applications include image recognition, NLP, and recommendation systems

**Supervised Learning**
- Uses labeled training data for predictions
- Common algorithms: Linear regression, decision trees, neural networks
- Evaluation metrics: Accuracy, precision, recall, F1-score

**Unsupervised Learning**
- Works with unlabeled data to discover patterns
- Key algorithms: K-means clustering, hierarchical clustering, PCA
- Applications: Customer segmentation, anomaly detection

**Model Evaluation**
- Importance of training vs. testing data separation
- Cross-validation techniques for robust evaluation
- Understanding overfitting, underfitting, and bias-variance tradeoff

## Important Points
- Always validate models on unseen data
- Choose appropriate algorithms based on problem type
- Consider computational complexity and interpretability
- Regular evaluation prevents overfitting`;
    } else if (summaryType === 'bullet-points') {
      generatedSummary = `# Key Points Summary

• **Machine Learning Definition**: AI subset enabling computers to learn from experience

• **Three ML Types**:
  - Supervised: Uses labeled data for predictions
  - Unsupervised: Finds patterns in unlabeled data
  - Reinforcement: Learns through rewards/penalties

• **Supervised Learning**:
  - Algorithms: Linear regression, decision trees, neural networks
  - Metrics: Accuracy, precision, recall, F1-score

• **Unsupervised Learning**:
  - Algorithms: K-means, hierarchical clustering, PCA
  - Uses: Customer segmentation, anomaly detection

• **Model Evaluation**:
  - Training vs. testing data separation
  - Cross-validation for robust evaluation
  - Avoid overfitting and underfitting`;
    } else {
      generatedSummary = `# Quick Summary

Machine Learning is an AI subset that enables computers to learn from experience. It has three main types: Supervised (uses labeled data), Unsupervised (finds patterns in unlabeled data), and Reinforcement Learning.

Key supervised algorithms include linear regression and decision trees, evaluated using metrics like accuracy and precision. Unsupervised learning uses techniques like K-means clustering for applications like customer segmentation.

Model evaluation is crucial, requiring separation of training and testing data, cross-validation, and awareness of overfitting/underfitting issues.`;
    }
    
    setSummary(generatedSummary);
    setIsGenerating(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadSummary = () => {
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'study-summary.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header with Image */}
      <div className="mb-8 lg:mb-12">
        <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 sm:p-8 text-white">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">Generate AI Summary</h1>
              <p className="text-purple-100 text-sm sm:text-base lg:text-lg">
                Create intelligent summaries from your processed notes
              </p>
            </div>
            <div className="flex-shrink-0">
              <img 
                src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400" 
                alt="AI Summary"
                className="w-48 h-32 sm:w-64 sm:h-40 lg:w-80 lg:h-48 object-cover rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        {/* Controls */}
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 flex items-center">
              <Brain className="h-5 w-5 mr-2" />
              Summary Options
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Summary Type
                </label>
                <select
                  value={summaryType}
                  onChange={(e) => setSummaryType(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                >
                  <option value="comprehensive">Comprehensive</option>
                  <option value="bullet-points">Bullet Points</option>
                  <option value="quick">Quick Overview</option>
                </select>
              </div>

              <button
                onClick={generateSummary}
                disabled={!notes.trim() || isGenerating}
                className={`w-full px-4 sm:px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base ${
                  notes.trim() && !isGenerating
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
                    <Sparkles className="h-4 w-4" />
                    <span>Generate Summary</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {summary && (
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200">
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-4">Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={copyToClipboard}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm sm:text-base"
                >
                  {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
                </button>
                <button
                  onClick={downloadSummary}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm sm:text-base"
                >
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </button>
                <button
                  onClick={onNext}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:shadow-lg transition-all text-sm sm:text-base"
                >
                  <span>Create Quiz</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Summary Types Info */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 sm:p-6 border border-blue-200">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3">Summary Types</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-slate-900">Comprehensive</p>
                  <p className="text-slate-600">Detailed summary with all key points</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-slate-900">Bullet Points</p>
                  <p className="text-slate-600">Organized list format for quick review</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-slate-900">Quick Overview</p>
                  <p className="text-slate-600">Concise summary of main concepts</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Display */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200 h-full">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 flex items-center">
              <Sparkles className="h-5 w-5 mr-2" />
              Generated Summary
            </h2>
            
            {summary ? (
              <div className="prose prose-sm max-w-none">
                <div className="bg-slate-50 rounded-lg p-4 sm:p-6 max-h-64 sm:max-h-80 lg:max-h-96 overflow-y-auto border border-slate-200">
                  <pre className="whitespace-pre-wrap text-slate-700 font-sans text-xs sm:text-sm leading-relaxed">
                    {summary}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 sm:py-16">
                <img 
                  src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300" 
                  alt="AI Summary"
                  className="w-32 h-24 sm:w-48 sm:h-32 object-cover rounded-lg mx-auto mb-4 opacity-60"
                />
                <Brain className="h-12 w-12 sm:h-16 sm:w-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 text-base sm:text-lg">No summary generated yet</p>
                <p className="text-xs sm:text-sm text-slate-400 mt-2">
                  Click "Generate Summary" to create an AI-powered summary
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryGenerator;