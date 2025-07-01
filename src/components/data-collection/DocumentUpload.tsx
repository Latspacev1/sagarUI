import React, { useState, useCallback } from 'react';
import { Layout } from '../layout/Layout';
import { Upload, File, CheckCircle, AlertCircle, X, FileText, FileImage, Database, Factory, Zap, Leaf, Edit3, Check, XCircle, Calendar, ChevronDown } from 'lucide-react';

type DocumentType = 'production' | 'environmental' | 'electricity';
type ReviewStatus = 'pending' | 'reviewing' | 'approved' | 'rejected' | 'editing';

interface ExtractedDataItem {
  key: string;
  label: string;
  value: string;
  unit?: string;
  editable: boolean;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  documentType: DocumentType;
  reportingMonth: number;
  reportingYear: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  reviewStatus: ReviewStatus;
  progress: number;
  extractedData?: ExtractedDataItem[];
  editableData?: Record<string, string>;
  error?: string;
}

export const DocumentUpload: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState<DocumentType | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
    'text/plain'
  ];

  const handleDragOver = useCallback((e: React.DragEvent, docType: DocumentType) => {
    e.preventDefault();
    setIsDragOver(docType);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, docType: DocumentType) => {
    e.preventDefault();
    setIsDragOver(null);
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles, docType);
  }, [selectedMonth, selectedYear]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>, docType: DocumentType) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      processFiles(selectedFiles, docType);
    }
  }, [selectedMonth, selectedYear]);

  const processFiles = (fileList: File[], docType: DocumentType) => {
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
      documentType: docType,
      reportingMonth: selectedMonth,
      reportingYear: selectedYear,
      status: 'uploading',
      reviewStatus: 'pending',
      progress: 0
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate file upload and processing
    newFiles.forEach(file => {
      simulateFileProcessing(file.id, docType);
    });
  };

  const getDocumentTypeData = (docType: DocumentType): ExtractedDataItem[] => {
    switch (docType) {
      case 'production':
        return [
          { key: 'totalClinkerProduction', label: 'Total Clinker Production', value: '199,906', unit: 't', editable: true },
          { key: 'totalClinkerConsumption', label: 'Total Clinker Consumption', value: '182,990.98', unit: 't', editable: true },
          { key: 'totalRawMeal', label: 'Total Raw Meal Production', value: '306,360', unit: 't', editable: true },
          { key: 'naturalGypsum', label: 'Natural Gypsum for OPC/PPC', value: '0', unit: 't', editable: true },
          { key: 'limestone', label: 'Limestone', value: '281,802', unit: 't', editable: true },
          { key: 'cementTotal', label: 'Cement Total', value: '145,228.27', unit: 't', editable: true },
          { key: 'totalOPC', label: 'Total OPC Produced', value: '114,590.5', unit: 't', editable: true },
          { key: 'importedPetcokeSaudi', label: 'Imported Petcoke – HC Saudi', value: '4,422', unit: 't', editable: true },
          { key: 'usPetcoke', label: 'US Petcoke', value: '4,399', unit: 't', editable: true },
          { key: 'indianCoal', label: 'Indian Coal', value: '17,516', unit: 't', editable: true }
        ];
      case 'environmental':
        return [
          { key: 'dustPm', label: 'Dust / PM', value: '16.50', unit: 'mg/Nm³', editable: true },
          { key: 'noxEmissions', label: 'NOx (as NO₂-eq.)', value: '328', unit: 'mg/Nm³', editable: true },
          { key: 'soxEmissions', label: 'SOx (as SO₂)', value: '1.40', unit: 'mg/Nm³', editable: true },
          { key: 'normalVolumeFlow', label: 'Normal-volume flow', value: '590,691', unit: 'Nm³/h', editable: true }
        ];
      case 'electricity':
        return [
          { key: 'mainConsumption', label: 'Total Consumption', value: '12,52,112', unit: 'kWh', editable: true },
          { key: 'billingPeriod', label: 'Billing Period', value: '2024-04-01 to 2024-04-31', unit: '', editable: true },
        ];
      default:
        return [];
    }
  };

  const updateExtractedData = (fileId: string, key: string, value: string) => {
    setFiles(prev => prev.map(f => 
      f.id === fileId ? {
        ...f,
        editableData: { ...f.editableData, [key]: value }
      } : f
    ));
  };

  const approveFile = (fileId: string) => {
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, reviewStatus: 'approved' as ReviewStatus } : f
    ));
  };

  const rejectFile = (fileId: string) => {
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, reviewStatus: 'rejected' as ReviewStatus } : f
    ));
  };

  const editFile = (fileId: string) => {
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, reviewStatus: 'editing' as ReviewStatus } : f
    ));
  };

  const saveEditedFile = (fileId: string) => {
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, reviewStatus: 'approved' as ReviewStatus } : f
    ));
  };

  const simulateFileProcessing = async (fileId: string, docType: DocumentType) => {
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

    // Get document type specific mock data
    const mockExtractedData = getDocumentTypeData(docType);

    // Complete processing
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { 
        ...f, 
        status: 'completed', 
        reviewStatus: 'reviewing',
        progress: 100,
        extractedData: mockExtractedData,
        editableData: mockExtractedData.reduce((acc, item) => ({
          ...acc,
          [item.key]: item.value
        }), {})
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

  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

  const getDocumentTypeConfig = (docType: DocumentType) => {
    switch (docType) {
      case 'production':
        return {
          title: 'Daily Production Report Upload',
          icon: <Factory className="w-8 h-8 text-latspace-dark" />,
          description: 'Upload daily production reports, output metrics, and operational data',
          acceptedTypes: 'PDF, Excel, Word documents'
        };
      case 'environmental':
        return {
          title: 'Third Party NOx, SOx, Particulate Matter Report',
          icon: <Leaf className="w-8 h-8 text-latspace-dark" />,
          description: 'Upload environmental compliance reports and emissions data',
          acceptedTypes: 'PDF, certified test reports'
        };
      case 'electricity':
        return {
          title: 'Electricity Bill Upload',
          icon: <Zap className="w-8 h-8 text-latspace-dark" />,
          description: 'Upload electricity bills and energy consumption reports',
          acceptedTypes: 'PDF, images, utility bills'
        };
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-latspace-dark tracking-tight">Document Upload</h1>
          <div className="text-xs text-latspace-medium font-mono bg-gray-50 px-3 py-1.5 rounded-md">
            PDF, Word, Images, Excel (Max 10MB)
          </div>
        </div>

        {/* Month/Year Selection */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-latspace-dark" />
              <h3 className="text-lg font-semibold text-latspace-dark">Reporting Period</h3>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select 
                  value={selectedMonth} 
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2.5 pr-10 text-sm text-latspace-dark cursor-pointer hover:border-latspace-medium focus:outline-none focus:ring-2 focus:ring-latspace-dark focus:border-transparent transition-all"
                >
                  {months.map(month => (
                    <option key={month.value} value={month.value}>{month.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-latspace-medium pointer-events-none" />
              </div>
              <div className="relative">
                <select 
                  value={selectedYear} 
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2.5 pr-10 text-sm text-latspace-dark cursor-pointer hover:border-latspace-medium focus:outline-none focus:ring-2 focus:ring-latspace-dark focus:border-transparent transition-all"
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-latspace-medium pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Three Upload Boxes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {(['production', 'environmental', 'electricity'] as DocumentType[]).map((docType) => {
            const config = getDocumentTypeConfig(docType);
            return (
              <div
                key={docType}
                className={`border-2 p-8 text-center transition-all duration-300 bg-white rounded-lg shadow-sm hover:shadow-md ${
                  isDragOver === docType
                    ? 'border-latspace-dark bg-latspace-dark bg-opacity-5 shadow-lg transform scale-[1.02]'
                    : 'border-gray-300 hover:border-latspace-medium'
                }`}
                onDragOver={(e) => handleDragOver(e, docType)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, docType)}
              >
                <div className="mb-6">{config.icon}</div>
                <h3 className="text-sm font-bold text-latspace-dark mb-3 leading-tight">
                  {config.title}
                </h3>
                <p className="text-latspace-medium mb-4 text-sm leading-relaxed px-2">
                  {config.description}
                </p>
                <p className="text-xs text-latspace-medium mb-6 font-mono bg-gray-50 px-3 py-1.5 rounded-md inline-block">
                  {config.acceptedTypes}
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt,.xlsx,.xls"
                  onChange={(e) => handleFileSelect(e, docType)}
                  className="hidden"
                  id={`file-upload-${docType}`}
                />
                <label
                  htmlFor={`file-upload-${docType}`}
                  className="inline-flex items-center px-6 py-3 bg-latspace-dark text-white hover:bg-latspace-medium transition-all duration-200 cursor-pointer text-xs font-bold rounded-md shadow-sm hover:shadow-md transform hover:scale-105"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Files
                </label>
              </div>
            );
          })}
        </div>

        {files.length > 0 && (
          <div className="space-y-6">
            {(['production', 'environmental', 'electricity'] as DocumentType[]).map((docType) => {
              const docFiles = files.filter(f => f.documentType === docType);
              if (docFiles.length === 0) return null;

              const config = getDocumentTypeConfig(docType);
              
              return (
                <div key={docType} className="bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="px-6 py-4 border-b border-gray-200 flex items-center bg-gray-50 rounded-t-lg">
                    <div className="mr-4">{config.icon}</div>
                    <h3 className="text-lg font-bold text-latspace-dark">
                      {config.title}
                    </h3>
                    <span className="ml-auto text-sm text-latspace-medium font-mono bg-white px-3 py-1.5 rounded-md border">
                      {months.find(m => m.value === selectedMonth)?.label} {selectedYear}
                    </span>
                  </div>
                  <div className="p-6 space-y-6">
                    {docFiles.map((file) => (
                      <div key={file.id} className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            {getFileIcon(file.type)}
                            <div className="ml-4">
                              <p className="text-sm font-semibold text-latspace-dark">{file.name}</p>
                              <p className="text-xs text-latspace-medium font-mono">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(file.status)}
                            <button
                              onClick={() => removeFile(file.id)}
                              className="text-latspace-medium hover:text-latspace-dark transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Enhanced Processing Animation */}
                        {file.status !== 'completed' && (
                          <div className="mb-4">
                            <div className="flex justify-between text-xs mb-2">
                              <span className="text-latspace-medium flex items-center">
                                {file.status === 'uploading' && (
                                  <><Upload className="w-3 h-3 mr-1 animate-pulse" /> Uploading</>
                                )}
                                {file.status === 'processing' && (
                                  <><Database className="w-3 h-3 mr-1 animate-spin" /> AI Processing</>
                                )}
                              </span>
                              <span className="font-mono text-latspace-dark">{file.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-latspace-dark to-latspace-medium h-3 transition-all duration-500 ease-out rounded-full"
                                style={{ width: `${file.progress}%` }}
                              />
                            </div>
                            {file.status === 'processing' && (
                              <div className="mt-2 text-xs text-latspace-medium animate-pulse">
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-latspace-medium rounded-full animate-bounce"></div>
                                  <div className="w-2 h-2 bg-latspace-medium rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                  <div className="w-2 h-2 bg-latspace-medium rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                  <span>Extracting sustainability data...</span>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Enhanced Data Review Interface */}
                        {file.status === 'completed' && file.extractedData && (
                          <div className="border border-gray-200 bg-gradient-to-br from-gray-50 via-white to-gray-50 p-6 mt-3 rounded-lg shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-sm font-semibold text-latspace-dark flex items-center">
                                <Database className="w-4 h-4 mr-2" />
                                Extracted Data - Review Required
                              </h4>
                              <div className="flex items-center space-x-2">
                                {file.reviewStatus === 'reviewing' && (
                                  <span className="text-xs text-orange-500 font-mono px-2 py-1 bg-orange-50 border border-orange-200 rounded">
                                    Pending Review
                                  </span>
                                )}
                                {file.reviewStatus === 'approved' && (
                                  <span className="text-xs text-green-600 font-mono px-2 py-1 bg-green-50 border border-green-200 rounded">
                                    Approved
                                  </span>
                                )}
                                {file.reviewStatus === 'rejected' && (
                                  <span className="text-xs text-red-600 font-mono px-2 py-1 bg-red-50 border border-red-200 rounded">
                                    Rejected
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <div className="space-y-3 mb-4">
                              {file.extractedData.map((dataItem, index) => (
                                <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-2">
                                  <div className="flex-1">
                                    <label className="text-xs font-semibold text-latspace-dark block mb-1">
                                      {dataItem.label}
                                    </label>
                                    {file.reviewStatus === 'editing' && dataItem.editable ? (
                                      <input
                                        type="text"
                                        value={file.editableData?.[dataItem.key] || dataItem.value}
                                        onChange={(e) => updateExtractedData(file.id, dataItem.key, e.target.value)}
                                        className="text-sm border border-gray-300 px-2 py-1 rounded w-full font-mono"
                                      />
                                    ) : (
                                      <span className="text-sm font-mono text-latspace-dark data-value">
                                        {file.editableData?.[dataItem.key] || dataItem.value}
                                        {dataItem.unit && ` ${dataItem.unit}`}
                                      </span>
                                    )}
                                  </div>
                                  {dataItem.editable && file.reviewStatus !== 'editing' && (
                                    <Edit3 className="w-3 h-3 text-latspace-medium ml-2" />
                                  )}
                                </div>
                              ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-end space-x-2">
                              {file.reviewStatus === 'reviewing' && (
                                <>
                                  <button
                                    onClick={() => rejectFile(file.id)}
                                    className="px-3 py-2 border border-red-300 text-red-600 hover:bg-red-50 transition-colors text-xs font-semibold uppercase tracking-wider rounded"
                                  >
                                    <XCircle className="w-4 h-4 mr-1 inline" />
                                    Reject
                                  </button>
                                  <button
                                    onClick={() => editFile(file.id)}
                                    className="px-3 py-2 border border-orange-300 text-orange-600 hover:bg-orange-50 transition-colors text-xs font-semibold uppercase tracking-wider rounded"
                                  >
                                    <Edit3 className="w-4 h-4 mr-1 inline" />
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => approveFile(file.id)}
                                    className="px-3 py-2 bg-latspace-dark text-white hover:bg-latspace-medium transition-colors text-xs font-semibold uppercase tracking-wider rounded"
                                  >
                                    <Check className="w-4 h-4 mr-1 inline" />
                                    Approve
                                  </button>
                                </>
                              )}
                              {file.reviewStatus === 'editing' && (
                                <>
                                  <button
                                    onClick={() => setFiles(prev => prev.map(f => 
                                      f.id === file.id ? { ...f, reviewStatus: 'reviewing' as ReviewStatus } : f
                                    ))}
                                    className="px-3 py-2 border border-gray-300 text-latspace-medium hover:bg-gray-50 transition-colors text-xs font-semibold rounded"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => saveEditedFile(file.id)}
                                    className="px-3 py-2 bg-latspace-dark text-white hover:bg-latspace-medium transition-colors text-xs font-semibold rounded"
                                  >
                                    <Check className="w-4 h-4 mr-1 inline" />
                                    Save & Approve
                                  </button>
                                </>
                              )}
                              {file.reviewStatus === 'approved' && (
                                <span className="text-xs text-green-600 font-mono flex items-center">
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Data Approved
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {file.status === 'error' && (
                          <div className="border border-red-300 bg-red-50 p-3 mt-2 rounded">
                            <p className="text-xs text-red-600 font-mono">
                              {file.error || 'Error: File processing failed'}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
          <h3 className="text-xl font-bold text-latspace-dark mb-6">AI Document Processing & Review Workflow</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div className="space-y-3">
              <h4 className="font-semibold text-latspace-dark flex items-center">
                <Factory className="w-4 h-4 mr-1" />
                Production Reports
              </h4>
              <div className="space-y-2">
                <div className="flex items-start">
                  <span className="text-latspace-medium mr-3">•</span>
                  <span className="text-latspace-medium">Output volumes & efficiency metrics</span>
                </div>
                <div className="flex items-start">
                  <span className="text-latspace-medium mr-3">•</span>
                  <span className="text-latspace-medium">Operating hours & downtime tracking</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-latspace-dark flex items-center">
                <Leaf className="w-4 h-4 mr-1" />
                Environmental Data
              </h4>
              <div className="space-y-2">
                <div className="flex items-start">
                  <span className="text-latspace-medium mr-3">•</span>
                  <span className="text-latspace-medium">NOx, SOx, particulate matter readings</span>
                </div>
                <div className="flex items-start">
                  <span className="text-latspace-medium mr-3">•</span>
                  <span className="text-latspace-medium">Compliance status verification</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-latspace-dark flex items-center">
                <Zap className="w-4 h-4 mr-1" />
                Energy Consumption
              </h4>
              <div className="space-y-2">
                <div className="flex items-start">
                  <span className="text-latspace-medium mr-3">•</span>
                  <span className="text-latspace-medium">Total kWh consumption & peak demand</span>
                </div>
                <div className="flex items-start">
                  <span className="text-latspace-medium mr-3">•</span>
                  <span className="text-latspace-medium">Billing costs & power factor analysis</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-6">
            <h4 className="font-bold text-latspace-dark mb-4 text-base">Review & Approval Process</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <span className="text-latspace-medium mr-3 font-bold">1.</span>
                <span className="text-latspace-medium">AI processes documents and extracts relevant sustainability data</span>
              </div>
              <div className="flex items-start">
                <span className="text-latspace-medium mr-3 font-bold">2.</span>
                <span className="text-latspace-medium">Review extracted data for accuracy and completeness</span>
              </div>
              <div className="flex items-start">
                <span className="text-latspace-medium mr-3 font-bold">3.</span>
                <span className="text-latspace-medium">Edit values if needed, then approve or reject</span>
              </div>
              <div className="flex items-start">
                <span className="text-latspace-medium mr-3 font-bold">4.</span>
                <span className="text-latspace-medium">Approved data integrates into facility sustainability metrics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};