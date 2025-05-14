import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  FileText,
  Download,
  Eye,
  Calendar,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';

// Mock data for reports
const mockReports = [
  {
    id: '1',
    title: 'Database Systems - Lecture 10 Summary',
    subject: 'Database Systems',
    submittedBy: {
      id: 'u1',
      name: 'John Smith',
      role: 'faculty'
    },
    type: 'lecture',
    date: '2025-05-15',
    attachments: 2,
    status: 'submitted'
  },
  {
    id: '2',
    title: 'Web Development - React Components Assignment',
    subject: 'Web Development',
    submittedBy: {
      id: 'u2',
      name: 'Maria Garcia',
      role: 'faculty'
    },
    type: 'assignment',
    date: '2025-05-14',
    attachments: 1,
    status: 'submitted'
  },
  {
    id: '3',
    title: 'Software Engineering - Project Update',
    subject: 'Software Engineering',
    submittedBy: {
      id: 'u3',
      name: 'David Lee',
      role: 'faculty'
    },
    type: 'project',
    date: '2025-05-13',
    attachments: 3,
    status: 'submitted'
  },
  {
    id: '4',
    title: 'Database Project - ER Diagram Submission',
    subject: 'Database Systems',
    submittedBy: {
      id: 'u4',
      name: 'Ahmed Khan',
      role: 'student'
    },
    type: 'assignment',
    date: '2025-05-12',
    attachments: 1,
    status: 'submitted'
  },
  {
    id: '5',
    title: 'Web Development - Final Project Progress',
    subject: 'Web Development',
    submittedBy: {
      id: 'u5',
      name: 'Sarah Williams',
      role: 'student'
    },
    type: 'project',
    date: '2025-05-11',
    attachments: 2,
    status: 'submitted'
  }
];

const ReportsList = () => {
  const [reports, setReports] = useState(mockReports);
  const [filteredReports, setFilteredReports] = useState(mockReports);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<typeof mockReports[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { user } = useAuth();
  const reportsPerPage = 10;
  
  // Extract unique subjects and types for filters
  const uniqueSubjects = Array.from(new Set(reports.map(report => report.subject)));
  const uniqueTypes = Array.from(new Set(reports.map(report => report.type)));
  
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Filter reports based on search query, subject, type, and date range
    let filtered = [...reports];
    
    if (searchQuery) {
      filtered = filtered.filter(report => 
        report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.submittedBy.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedSubject) {
      filtered = filtered.filter(report => report.subject === selectedSubject);
    }
    
    if (selectedType) {
      filtered = filtered.filter(report => report.type === selectedType);
    }
    
    if (dateRange.from) {
      filtered = filtered.filter(report => new Date(report.date) >= new Date(dateRange.from));
    }
    
    if (dateRange.to) {
      filtered = filtered.filter(report => new Date(report.date) <= new Date(dateRange.to));
    }
    
    setFilteredReports(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [reports, searchQuery, selectedSubject, selectedType, dateRange]);
  
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSubject(null);
    setSelectedType(null);
    setDateRange({ from: '', to: '' });
  };
  
  const openReportModal = (report: typeof mockReports[0]) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };
  
  // Pagination logic
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);
  
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <Link to="/reports/submit">
          <Button>
            <FileText size={16} className="mr-2" />
            Submit New Report
          </Button>
        </Link>
      </div>
      
      {/* Filters */}
      <Card>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  fullWidth
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter size={18} className="text-gray-500" />
              <select
                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                onChange={(e) => setSelectedSubject(e.target.value || null)}
                value={selectedSubject || ''}
              >
                <option value="">All Subjects</option>
                {uniqueSubjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
              
              <select
                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                onChange={(e) => setSelectedType(e.target.value || null)}
                value={selectedType || ''}
              >
                <option value="">All Types</option>
                {uniqueTypes.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
            <div className="flex flex-grow items-center space-x-2">
              <Calendar size={18} className="text-gray-500" />
              <Input
                type="date"
                placeholder="From"
                value={dateRange.from}
                onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                className="w-full md:w-40"
              />
              <span className="text-gray-500">to</span>
              <Input
                type="date"
                placeholder="To"
                value={dateRange.to}
                onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                className="w-full md:w-40"
              />
            </div>
            
            <Button 
              variant="outline" 
              onClick={clearFilters}
              className="md:w-auto w-full"
            >
              <X size={16} className="mr-1" />
              Clear Filters
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Reports table */}
      <Card>
        {filteredReports.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted By
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Subject
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-md bg-blue-100 flex items-center justify-center text-blue-600">
                          <FileText size={20} />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{report.title}</div>
                          <div className="text-xs text-gray-500">{report.attachments} attachment(s)</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                          {report.submittedBy.name.charAt(0)}
                        </div>
                        <div className="ml-2">
                          <div className="text-sm font-medium text-gray-900">{report.submittedBy.name}</div>
                          <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-800 rounded">
                            {report.submittedBy.role}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                      {report.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                      <span className={`
                        px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${report.type === 'lecture' 
                          ? 'bg-blue-100 text-blue-800' 
                          : report.type === 'assignment' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-green-100 text-green-800'}
                      `}>
                        {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(report.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <button 
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => openReportModal(report)}
                        >
                          <Eye size={16} />
                          <span className="sr-only">View</span>
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          <Download size={16} />
                          <span className="sr-only">Download</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{indexOfFirstReport + 1}</span> to{' '}
                      <span className="font-medium">
                        {Math.min(indexOfLastReport, filteredReports.length)}
                      </span>{' '}
                      of <span className="font-medium">{filteredReports.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                      <button
                        onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      
                      {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentPage(index + 1)}
                          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                            currentPage === index + 1
                              ? 'bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                              : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No reports found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        )}
      </Card>
      
      {/* Report Modal would go here */}
    </div>
  );
};

export default ReportsList;