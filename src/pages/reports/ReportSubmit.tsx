import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Upload, X } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { useAuth } from '../../context/AuthContext';
import { toast } from '../../components/ui/Toaster';

// Mock data for subjects
const mockSubjects = [
  { value: '1', label: 'Database Systems' },
  { value: '2', label: 'Web Development' },
  { value: '3', label: 'Software Engineering' },
  { value: '4', label: 'Artificial Intelligence' }
];

// Mock data for report types
const mockReportTypes = [
  { value: 'lecture', label: 'Lecture Notes' },
  { value: 'assignment', label: 'Assignment Submission' },
  { value: 'project', label: 'Project Update' },
  { value: 'lab', label: 'Lab Report' }
];

const ReportSubmit = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [reportType, setReportType] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    subject?: string;
    reportType?: string;
    title?: string;
    summary?: string;
  }>({});
  
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setFiles(prev => [...prev, ...fileList]);
    }
  };
  
  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };
  
  const validateForm = () => {
    const newErrors: {
      subject?: string;
      reportType?: string;
      title?: string;
      summary?: string;
    } = {};
    
    if (!selectedSubject) {
      newErrors.subject = 'Please select a subject';
    }
    
    if (!reportType) {
      newErrors.reportType = 'Please select a report type';
    }
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!summary.trim()) {
      newErrors.summary = 'Summary is required';
    } else if (summary.length < 20) {
      newErrors.summary = 'Summary should be at least 20 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Report submitted successfully!');
      navigate('/reports');
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Submit Report</h1>
        <p className="text-gray-500 mt-1">
          Complete the form below to submit your report
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Main Form */}
            <Card>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Subject"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    options={mockSubjects}
                    error={errors.subject}
                    fullWidth
                  />
                  
                  <Select
                    label="Report Type"
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    options={mockReportTypes}
                    error={errors.reportType}
                    fullWidth
                  />
                </div>
                
                <Input
                  label="Title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a descriptive title"
                  error={errors.title}
                  fullWidth
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Summary
                  </label>
                  <textarea
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    rows={5}
                    className={`
                      w-full px-3 py-2 bg-white border shadow-sm border-gray-300 
                      placeholder-gray-400 focus:outline-none focus:border-blue-500 
                      focus:ring-1 focus:ring-blue-500 rounded-md sm:text-sm
                      ${errors.summary ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
                    `}
                    placeholder="Provide a detailed summary of your report"
                  />
                  {errors.summary && (
                    <p className="mt-1 text-sm text-red-600">{errors.summary}</p>
                  )}
                </div>
                
                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Attachments
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6">
                    <div className="text-center">
                      <Upload size={24} className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Drag and drop files here, or
                        </p>
                        <label className="mt-2 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                          Browse files
                          <input
                            type="file"
                            className="sr-only"
                            multiple
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        PDF, DOCX, JPG, PNG up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* File List */}
                {files.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Selected Files ({files.length})
                    </h3>
                    <ul className="space-y-2">
                      {files.map((file, index) => (
                        <li 
                          key={index}
                          className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-md"
                        >
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 bg-blue-100 text-blue-600 rounded-md flex items-center justify-center">
                              {file.name.split('.').pop()?.toUpperCase()}
                            </div>
                            <div className="ml-3 text-sm">
                              <p className="font-medium text-gray-900 truncate max-w-xs">{file.name}</p>
                              <p className="text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <X size={16} />
                            <span className="sr-only">Remove file</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card>
            
            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/reports')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isSubmitting}
              >
                Submit Report
              </Button>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Submission Info</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Calendar size={18} className="text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">{today}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={18} className="text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">{currentTime}</span>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700">Submitter</h4>
                  <div className="flex items-center mt-2">
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      {user?.name.charAt(0)}
                    </div>
                    <div className="ml-2">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Guidelines</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-500 font-bold mr-2">•</span>
                  <span>Provide a clear and concise summary of your work</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 font-bold mr-2">•</span>
                  <span>Include all relevant files as attachments</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 font-bold mr-2">•</span>
                  <span>Make sure files are in the correct format</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 font-bold mr-2">•</span>
                  <span>Reports cannot be edited after submission</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReportSubmit;