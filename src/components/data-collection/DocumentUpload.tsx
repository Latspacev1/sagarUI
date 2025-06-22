import React, { useState, useCallback } from 'react';
import { Layout } from '../layout/Layout';
import { Upload, File, CheckCircle, AlertCircle, X, FileText, FileImage, Database } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  extractedData?: string[];
  error?: string;
}

export const DocumentUpload: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
    'text/plain'
  ];

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      processFiles(selectedFiles);
    }
  }, []);

  const processFiles = (fileList: File[]) => {
    const validFiles = fileList.filter(file => {
      if (!allowedTypes.includes(file.type)) {
        alert(`File type ${file.type} is not supported`);
        return false;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert(`File ${file.name} is too large. Maximum size is 10MB`);
        return false;
      }
      return true;
    });

    const newFiles: UploadedFile[] = validFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading',
      progress: 0
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate file upload and processing
    newFiles.forEach(file => {
      simulateFileProcessing(file.id);
    });
  };

  const simulateFileProcessing = async (fileId: string) => {
    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 20) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, progress } : f
      ));
    }

    // Change to processing
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, status: 'processing', progress: 0 } : f
    ));

    // Simulate processing
    for (let progress = 0; progress <= 100; progress += 25) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, progress } : f
      ));
    }

    // Simulate extraction results
    const mockExtractedData = [
      'Energy consumption: 1,250 MWh',
      'CO2 emissions: 245 tons',
      'Water usage: 3,400 gallons',
      'Safety incidents: 2',
      'Employee count: 450'
    ];

    // Complete processing
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { 
        ...f, 
        status: 'completed', 
        progress: 100,
        extractedData: mockExtractedData
      } : f
    ));
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return <FileText className="w-6 h-6 text-latspace-dark" />;
    if (fileType.includes('image')) return <FileImage className="w-6 h-6 text-latspace-medium" />;
    if (fileType.includes('word')) return <FileText className="w-6 h-6 text-latspace-dark" />;
    return <File className="w-6 h-6 text-latspace-medium" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-latspace-dark" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-latspace-light" />;
      default:
        return <div className="w-5 h-5 border-2 border-latspace-medium border-t-transparent animate-spin" />;
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-grid-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-grid-3">
          <h1 className="text-2xl font-semibold text-latspace-dark">Document Upload</h1>
          <div className="text-xs text-latspace-medium font-mono uppercase tracking-wider">
            PDF, WORD, IMAGES, TEXT (MAX 10MB)
          </div>
        </div>

        <div
          className={`border-2 p-grid-8 text-center transition-colors bg-white ${
            isDragOver
              ? 'border-latspace-dark'
              : 'border-gray-300 hover:border-latspace-medium'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="w-grid-6 h-grid-6 text-latspace-medium mx-auto mb-grid-3" />
          <h3 className="text-base font-semibold text-latspace-dark mb-grid-2 uppercase tracking-wide">
            Upload ESG Documents
          </h3>
          <p className="text-latspace-medium mb-grid-3 text-sm">
            Drag and drop your files here, or click to browse
          </p>
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-grid-3 py-grid-2 bg-latspace-dark text-white hover:bg-latspace-medium transition-colors cursor-pointer uppercase text-xs font-semibold tracking-wider"
          >
            <Upload className="w-4 h-4 mr-grid" />
            Choose Files
          </label>
        </div>

        {files.length > 0 && (
          <div className="bg-white border border-gray-200">
            <div className="px-grid-4 py-grid-3 border-b border-gray-200">
              <h3 className="text-base font-semibold text-latspace-dark uppercase tracking-wide">Uploaded Files</h3>
            </div>
            <div className="p-grid-4 space-y-grid-3">
              {files.map((file) => (
                <div key={file.id} className="border border-gray-200 p-grid-3 grid-pattern">
                  <div className="flex items-center justify-between mb-grid-2">
                    <div className="flex items-center">
                      {getFileIcon(file.type)}
                      <div className="ml-grid-2">
                        <p className="text-sm font-semibold text-latspace-dark">{file.name}</p>
                        <p className="text-xs text-latspace-medium font-mono data-value">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-grid-2">
                      {getStatusIcon(file.status)}
                      <button
                        onClick={() => removeFile(file.id)}
                        className="text-latspace-medium hover:text-latspace-dark transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {file.status !== 'completed' && (
                    <div className="mb-grid-2">
                      <div className="flex justify-between text-xs mb-grid">
                        <span className="text-latspace-medium uppercase tracking-wider">
                          {file.status === 'uploading' ? 'UPLOADING' : 'PROCESSING'}...
                        </span>
                        <span className="font-mono text-latspace-dark data-value">{file.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2">
                        <div
                          className="bg-latspace-dark h-2 transition-all duration-300"
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {file.status === 'completed' && file.extractedData && (
                    <div className="border border-latspace-dark p-grid-2 mt-grid-2">
                      <h4 className="text-xs font-semibold text-latspace-dark mb-grid-2 flex items-center uppercase tracking-wider">
                        <Database className="w-4 h-4 mr-grid" />
                        Extracted Data
                      </h4>
                      <ul className="text-xs space-y-grid">
                        {file.extractedData.map((data, index) => (
                          <li key={index} className="flex items-center text-latspace-dark font-mono data-value">
                            <CheckCircle className="w-3 h-3 mr-grid text-latspace-dark" />
                            {data}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {file.status === 'error' && (
                    <div className="border border-latspace-light p-grid-2 mt-grid-2">
                      <p className="text-xs text-latspace-light font-mono uppercase">
                        {file.error || 'ERROR: FILE PROCESSING FAILED'}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white border border-gray-200 p-grid-4 grid-pattern">
          <h3 className="text-base font-semibold text-latspace-dark mb-grid-3 uppercase tracking-wide">Document Processing</h3>
          <div className="space-y-grid-2 text-xs">
            <div className="flex items-start">
              <span className="text-latspace-medium mr-grid">•</span>
              <span className="text-latspace-medium uppercase tracking-wider">AI EXTRACTS ESG DATA FROM UPLOADED DOCUMENTS</span>
            </div>
            <div className="flex items-start">
              <span className="text-latspace-medium mr-grid">•</span>
              <span className="text-latspace-medium uppercase tracking-wider">SUPPORTED: ENERGY BILLS, SUSTAINABILITY REPORTS, COMPLIANCE CERTIFICATES</span>
            </div>
            <div className="flex items-start">
              <span className="text-latspace-medium mr-grid">•</span>
              <span className="text-latspace-medium uppercase tracking-wider">EXTRACTED DATA CAN BE REVIEWED AND ADJUSTED</span>
            </div>
            <div className="flex items-start">
              <span className="text-latspace-medium mr-grid">•</span>
              <span className="text-latspace-medium uppercase tracking-wider">PROCESSING TIME VARIES BY DOCUMENT COMPLEXITY</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};