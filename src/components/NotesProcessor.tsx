import React, { useState, useRef } from 'react';
import { Upload, FileText, Type, ArrowRight, CheckCircle, AlertCircle, BookOpen } from 'lucide-react';

interface NotesProcessorProps {
  notes: string;
  setNotes: (notes: string) => void;
  onProcess: () => void;
}

const NotesProcessor: React.FC<NotesProcessorProps> = ({ notes, setNotes, onProcess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProcess = async () => {
    if (!notes.trim()) return;
    
    setIsProcessing(true);
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setProcessed(true);
    setTimeout(() => {
      onProcess();
    }, 1000);
  };

  const handleFileUpload = async (file: File) => {
    setUploadError('');
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size must be less than 10MB');
      return;
    }

    // Check file type
    const allowedTypes = [
      'text/plain',
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ];

    if (!allowedTypes.includes(file.type)) {
      setUploadError('Please upload a .txt, .pdf, or .docx file');
      return;
    }

    try {
      let content = '';

      if (file.type === 'text/plain') {
        content = await file.text();
      } else if (file.type === 'application/pdf') {
        // For PDF files, we'll simulate extraction since we can't use pdf-parse in browser
        content = `PDF Content Extracted from: ${file.name}\n\nThis is a simulated PDF text extraction. In a real implementation, you would use a PDF parsing library.\n\nSample content that might be extracted from your PDF:\n\nChapter 1: Introduction\nThis chapter covers the fundamental concepts...\n\nChapter 2: Key Topics\nImportant points to remember:\n- Point 1\n- Point 2\n- Point 3\n\nConclusion\nSummary of the main ideas...`;
      } else if (file.type.includes('word')) {
        // For Word documents, simulate extraction
        content = `Word Document Content from: ${file.name}\n\nThis is a simulated Word document text extraction. In a real implementation, you would use a library like mammoth.js.\n\nDocument Title: Study Notes\n\nSection 1: Overview\nKey concepts and definitions...\n\nSection 2: Details\nDetailed explanations and examples...\n\nSection 3: Summary\nMain takeaways and conclusions...`;
      }

      setNotes(content);
      setUploadError('');
    } catch (error) {
      setUploadError('Error reading file. Please try again.');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const sampleNotes = `Machine Learning Fundamentals

1. Introduction to Machine Learning
   - Definition: A subset of artificial intelligence that enables computers to learn and improve from experience
   - Types: Supervised, Unsupervised, and Reinforcement Learning
   - Applications: Image recognition, natural language processing, recommendation systems

2. Supervised Learning
   - Uses labeled training data
   - Goal: Make predictions on new, unseen data
   - Common algorithms: Linear regression, decision trees, neural networks
   - Evaluation metrics: Accuracy, precision, recall, F1-score

3. Unsupervised Learning
   - Works with unlabeled data
   - Goal: Discover hidden patterns or structures
   - Common algorithms: K-means clustering, hierarchical clustering, PCA
   - Applications: Customer segmentation, anomaly detection

4. Model Evaluation
   - Training vs. Testing data
   - Cross-validation techniques
   - Overfitting and underfitting
   - Bias-variance tradeoff`;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header with Image */}
      <div className="mb-8 lg:mb-12">
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">Process Your Notes</h1>
              <p className="text-blue-100 text-sm sm:text-base lg:text-lg">
                Upload or paste your lecture notes to begin AI processing
              </p>
            </div>
            <div className="flex-shrink-0">
              <img 
                src="https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400" 
                alt="Notes Processing"
                className="w-48 h-32 sm:w-64 sm:h-40 lg:w-80 lg:h-48 object-cover rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900 flex items-center">
                <Type className="h-5 w-5 mr-2" />
                Text Input
              </h2>
              <button
                onClick={() => setNotes(sampleNotes)}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors px-3 py-1 rounded-lg hover:bg-blue-50"
              >
                Use Sample Notes
              </button>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Paste your lecture notes here..."
              className="w-full h-48 sm:h-64 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all text-sm sm:text-base"
            />
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <span className="text-sm text-slate-600">
                {notes.length} characters
              </span>
              <button
                onClick={handleProcess}
                disabled={!notes.trim() || isProcessing}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base ${
                  notes.trim() && !isProcessing
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transform hover:scale-105'
                    : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Processing...</span>
                  </>
                ) : processed ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    <span>Processed</span>
                  </>
                ) : (
                  <>
                    <span>Process Notes</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 flex items-center">
              <Upload className="h-5 w-5 mr-2" />
              File Upload
            </h2>
            
            {uploadError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
                <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-red-700">{uploadError}</span>
              </div>
            )}

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed rounded-lg p-6 sm:p-8 text-center transition-all duration-200 cursor-pointer ${
                isDragOver
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
              }`}
              onClick={openFileDialog}
            >
              <Upload className={`h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 transition-colors ${
                isDragOver ? 'text-blue-500' : 'text-slate-400'
              }`} />
              <p className="text-slate-600 mb-2 text-sm sm:text-base">
                {isDragOver ? 'Drop your file here' : 'Drag and drop your files here'}
              </p>
              <p className="text-xs sm:text-sm text-slate-500 mb-3 sm:mb-4">
                Supports .txt, .pdf, .docx files (max 10MB)
              </p>
              <button className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
                Browse Files
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.pdf,.docx,.doc"
              onChange={handleFileSelect}
              className="hidden"
            />

            <div className="mt-4 text-xs text-slate-500">
              <p className="mb-1 font-medium">Supported formats:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>.txt - Plain text files</li>
                <li>.pdf - PDF documents (text extraction)</li>
                <li>.docx/.doc - Microsoft Word documents</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Preview
            </h2>
            {notes ? (
              <div className="prose prose-sm max-w-none">
                <div className="bg-slate-50 rounded-lg p-4 max-h-64 sm:max-h-80 lg:max-h-96 overflow-y-auto border border-slate-200">
                  <pre className="whitespace-pre-wrap text-slate-700 font-mono text-xs sm:text-sm leading-relaxed">
                    {notes}
                  </pre>
                </div>
                <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-slate-600">
                  <span>Words: {notes.split(/\s+/).filter(word => word.length > 0).length}</span>
                  <span>Lines: {notes.split('\n').length}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12">
                <img 
                  src="https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=300" 
                  alt="Empty notes"
                  className="w-32 h-24 sm:w-48 sm:h-32 object-cover rounded-lg mx-auto mb-4 opacity-60"
                />
                <p className="text-slate-500 text-sm sm:text-base">No notes to preview</p>
                <p className="text-xs sm:text-sm text-slate-400 mt-2">
                  Start by pasting your notes or uploading a file
                </p>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 sm:p-6 border border-blue-200">
            <div className="flex items-center mb-3 sm:mb-4">
              <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-base sm:text-lg font-semibold text-slate-900">AI Processing Features</h3>
            </div>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start space-x-3">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700 text-sm sm:text-base">Automatic text extraction and formatting</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700 text-sm sm:text-base">Key concept identification</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700 text-sm sm:text-base">Structure analysis and organization</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700 text-sm sm:text-base">Preparation for summary generation</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesProcessor;