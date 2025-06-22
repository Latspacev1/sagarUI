import React, { useState, useCallback } from 'react';
import { Layout } from '../layout/Layout';
import { Download, Upload, FileSpreadsheet, AlertTriangle, CheckCircle, X, Eye } from 'lucide-react';

interface ValidationError {
  row: number;
  column: string;
  value: string;
  error: string;
}

interface BulkUploadFile {
  id: string;
  name: string;
  size: number;
  status: 'uploading' | 'validating' | 'valid' | 'invalid' | 'imported';
  progress: number;
  rowCount?: number;
  validRows?: number;
  errors?: ValidationError[];
  previewData?: any[];
}

export const BulkUpload: React.FC = () => {
  const [files, setFiles] = useState<BulkUploadFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showPreview, setShowPreview] = useState<string | null>(null);

  const templateData = [
    {
      facility_id: 'fac1',
      metric_type: 'environmental',
      metric_name: 'emissions',
      value: 245,
      unit: 'tons',
      reporting_period: '2024-Q2',
      date_recorded: '2024-06-15'
    },
    {
      facility_id: 'fac1',
      metric_type: 'environmental',
      metric_name: 'energy',
      value: 1250,
      unit: 'MWh',
      reporting_period: '2024-Q2',
      date_recorded: '2024-06-15'
    },
    {
      facility_id: 'fac1',
      metric_type: 'social',
      metric_name: 'employees',
      value: 450,
      unit: 'count',
      reporting_period: '2024-Q2',
      date_recorded: '2024-06-15'
    }
  ];

  const downloadTemplate = () => {
    const csv = [
      Object.keys(templateData[0]).join(','),
      ...templateData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'esg_data_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

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
    const excelFiles = fileList.filter(file => {
      const isExcel = file.type.includes('sheet') || file.type.includes('excel') || file.name.endsWith('.csv');
      if (!isExcel) {
        alert(`File ${file.name} is not a supported spreadsheet format`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert(`File ${file.name} is too large. Maximum size is 5MB`);
        return false;
      }
      return true;
    });

    const newFiles: BulkUploadFile[] = excelFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      status: 'uploading',
      progress: 0
    }));

    setFiles(prev => [...prev, ...newFiles]);

    newFiles.forEach(file => {
      simulateFileProcessing(file.id);
    });
  };

  const simulateFileProcessing = async (fileId: string) => {
    // Simulate upload
    for (let progress = 0; progress <= 100; progress += 25) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, progress } : f
      ));
    }

    // Start validation
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, status: 'validating', progress: 0 } : f
    ));

    // Simulate validation progress
    for (let progress = 0; progress <= 100; progress += 20) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, progress } : f
      ));
    }

    // Simulate validation results
    const mockErrors: ValidationError[] = [
      { row: 5, column: 'value', value: 'invalid', error: 'Value must be numeric' },
      { row: 8, column: 'facility_id', value: 'unknown', error: 'Facility ID not found' }
    ];

    const mockPreviewData = [
      { facility_id: 'fac1', metric_type: 'environmental', metric_name: 'emissions', value: 245, unit: 'tons' },
      { facility_id: 'fac1', metric_type: 'environmental', metric_name: 'energy', value: 1250, unit: 'MWh' },
      { facility_id: 'fac1', metric_type: 'social', metric_name: 'employees', value: 450, unit: 'count' }
    ];

    // Complete validation
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { 
        ...f, 
        status: mockErrors.length > 0 ? 'invalid' : 'valid',
        progress: 100,
        rowCount: 150,
        validRows: 148,
        errors: mockErrors,
        previewData: mockPreviewData
      } : f
    ));
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const importFile = async (fileId: string) => {
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, status: 'imported' } : f
    ));
    // Simulate import process
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="w-5 h-5 text-latspace-dark" />;
      case 'invalid':
        return <AlertTriangle className="w-5 h-5 text-latspace-light" />;
      case 'imported':
        return <CheckCircle className="w-5 h-5 text-latspace-medium" />;
      default:
        return <div className="w-5 h-5 border-2 border-latspace-medium border-t-transparent animate-spin" />;
    }
  };

  const getStatusText = (file: BulkUploadFile) => {
    switch (file.status) {
      case 'uploading':
        return 'Uploading...';
      case 'validating':
        return 'Validating data...';
      case 'valid':
        return `Valid (${file.validRows}/${file.rowCount} rows)`;
      case 'invalid':
        return `Invalid (${file.errors?.length} errors found)`;
      case 'imported':
        return 'Successfully imported';
      default:
        return 'Processing...';
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-grid-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-grid-3">
          <h1 className="text-2xl font-semibold text-latspace-dark">Bulk Upload</h1>
          <button
            onClick={downloadTemplate}
            className="inline-flex items-center px-grid-3 py-grid-2 bg-latspace-dark text-white hover:bg-latspace-medium transition-colors uppercase text-xs font-semibold tracking-wider"
          >
            <Download className="w-4 h-4 mr-grid" />
            Download Template
          </button>
        </div>

        <div className="bg-white border border-gray-200 p-grid-4">
          <h3 className="text-base font-semibold text-latspace-dark mb-grid-3 uppercase tracking-wide">Template Format</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="border-b border-gray-200">
                <tr>
                  {Object.keys(templateData[0]).map(header => (
                    <th key={header} className="px-grid-3 py-grid-2 text-left text-xs font-semibold text-latspace-dark uppercase tracking-wider border-r border-gray-200 last:border-r-0">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {templateData.map((row, index) => (
                  <tr key={index} className="border-b border-gray-200 last:border-b-0">
                    {Object.values(row).map((value, cellIndex) => (
                      <td key={cellIndex} className="px-grid-3 py-grid-2 text-xs text-latspace-dark font-mono data-value border-r border-gray-200 last:border-r-0 grid-pattern">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
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
          <FileSpreadsheet className="w-grid-6 h-grid-6 text-latspace-medium mx-auto mb-grid-3" />
          <h3 className="text-base font-semibold text-latspace-dark mb-grid-2 uppercase tracking-wide">
            Upload Excel/CSV Files
          </h3>
          <p className="text-latspace-medium mb-grid-3 text-sm">
            Drag and drop your spreadsheet files here, or click to browse
          </p>
          <input
            type="file"
            multiple
            accept=".xlsx,.xls,.csv"
            onChange={handleFileSelect}
            className="hidden"
            id="bulk-upload"
          />
          <label
            htmlFor="bulk-upload"
            className="inline-flex items-center px-grid-3 py-grid-2 bg-latspace-dark text-white hover:bg-latspace-medium transition-colors cursor-pointer uppercase text-xs font-semibold tracking-wider"
          >
            <Upload className="w-4 h-4 mr-grid" />
            Choose Files
          </label>
        </div>

        {files.length > 0 && (
          <div className="bg-white border border-gray-200">
            <div className="px-grid-4 py-grid-3 border-b border-gray-200">
              <h3 className="text-base font-semibold text-latspace-dark uppercase tracking-wide">Upload Progress</h3>
            </div>
            <div className="p-grid-4 space-y-grid-3">
              {files.map((file) => (
                <div key={file.id} className="border border-gray-200 p-grid-3 grid-pattern">
                  <div className="flex items-center justify-between mb-grid-2">
                    <div className="flex items-center">
                      <FileSpreadsheet className="w-6 h-6 text-latspace-dark" />
                      <div className="ml-grid-2">
                        <p className="text-sm font-semibold text-latspace-dark">{file.name}</p>
                        <p className="text-xs text-latspace-medium font-mono data-value">
                          {formatFileSize(file.size)} • {getStatusText(file)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-grid-2">
                      {getStatusIcon(file.status)}
                      {file.status === 'valid' && (
                        <button
                          onClick={() => setShowPreview(showPreview === file.id ? null : file.id)}
                          className="text-latspace-medium hover:text-latspace-dark transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => removeFile(file.id)}
                        className="text-latspace-medium hover:text-latspace-dark transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {(file.status === 'uploading' || file.status === 'validating') && (
                    <div className="mb-grid-2">
                      <div className="flex justify-between text-xs mb-grid">
                        <span className="text-latspace-medium uppercase tracking-wider">{getStatusText(file)}</span>
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

                  {file.status === 'invalid' && file.errors && (
                    <div className="border border-latspace-light p-grid-2 mb-grid-2">
                      <h4 className="text-xs font-semibold text-latspace-light mb-grid-2 uppercase tracking-wider">
                        VALIDATION ERRORS ({file.errors.length})
                      </h4>
                      <div className="space-y-grid max-h-32 overflow-y-auto">
                        {file.errors.map((error, index) => (
                          <div key={index} className="text-xs text-latspace-light font-mono">
                            ROW {error.row}, COLUMN "{error.column}": {error.error}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {file.status === 'valid' && showPreview === file.id && file.previewData && (
                    <div className="border border-latspace-dark p-grid-2 mb-grid-2">
                      <h4 className="text-xs font-semibold text-latspace-dark mb-grid-2 uppercase tracking-wider">
                        DATA PREVIEW (FIRST 3 ROWS)
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-xs border border-gray-200">
                          <thead>
                            <tr className="border-b border-gray-200">
                              {Object.keys(file.previewData[0]).map(header => (
                                <th key={header} className="text-left px-grid py-1 text-latspace-dark font-semibold uppercase tracking-wider">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {file.previewData.map((row, index) => (
                              <tr key={index} className="border-b border-gray-200 last:border-b-0">
                                {Object.values(row).map((value, cellIndex) => (
                                  <td key={cellIndex} className="px-grid py-1 text-latspace-dark font-mono data-value">
                                    {String(value)}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {file.status === 'valid' && (
                    <div className="flex justify-end">
                      <button
                        onClick={() => importFile(file.id)}
                        className="px-grid-3 py-grid-2 bg-latspace-dark text-white hover:bg-latspace-medium transition-colors uppercase text-xs font-semibold tracking-wider"
                      >
                        Import Data
                      </button>
                    </div>
                  )}

                  {file.status === 'imported' && (
                    <div className="border border-latspace-medium p-grid-2">
                      <p className="text-xs text-latspace-medium font-mono uppercase">
                        SUCCESSFULLY IMPORTED {file.validRows} ROWS OF ESG DATA
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white border border-gray-200 p-grid-4 grid-pattern">
          <h3 className="text-base font-semibold text-latspace-dark mb-grid-3 uppercase tracking-wide flex items-center">
            <AlertTriangle className="w-5 h-5 text-latspace-medium mr-grid-2" />
            Bulk Upload Guidelines
          </h3>
          <div className="space-y-grid-2 text-xs">
            <div className="flex items-start">
              <span className="text-latspace-medium mr-grid">•</span>
              <span className="text-latspace-medium uppercase tracking-wider">USE THE PROVIDED TEMPLATE FORMAT FOR BEST RESULTS</span>
            </div>
            <div className="flex items-start">
              <span className="text-latspace-medium mr-grid">•</span>
              <span className="text-latspace-medium uppercase tracking-wider">ENSURE FACILITY_ID MATCHES YOUR ASSIGNED FACILITIES</span>
            </div>
            <div className="flex items-start">
              <span className="text-latspace-medium mr-grid">•</span>
              <span className="text-latspace-medium uppercase tracking-wider">NUMERIC VALUES SHOULD NOT CONTAIN COMMAS OR CURRENCY SYMBOLS</span>
            </div>
            <div className="flex items-start">
              <span className="text-latspace-medium mr-grid">•</span>
              <span className="text-latspace-medium uppercase tracking-wider">DATES SHOULD BE IN YYYY-MM-DD FORMAT</span>
            </div>
            <div className="flex items-start">
              <span className="text-latspace-medium mr-grid">•</span>
              <span className="text-latspace-medium uppercase tracking-wider">MAXIMUM FILE SIZE: 5MB PER FILE</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};