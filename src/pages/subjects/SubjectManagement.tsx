import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp,
  Calendar,
  User
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
import { toast } from '../../components/ui/Toaster';

// Mock data for subjects
const mockSubjects = [
  {
    id: '1',
    title: 'Database Systems',
    code: 'CS301',
    description: 'Introduction to database concepts, design, and implementation.',
    startDate: '2025-01-15',
    endDate: '2025-05-30',
    faculty: {
      id: 'f1',
      name: 'John Smith'
    },
    students: 32,
    status: 'active'
  },
  {
    id: '2',
    title: 'Web Development',
    code: 'CS305',
    description: 'Frontend and backend web development techniques and tools.',
    startDate: '2025-01-15',
    endDate: '2025-05-30',
    faculty: {
      id: 'f2',
      name: 'Maria Garcia'
    },
    students: 28,
    status: 'active'
  },
  {
    id: '3',
    title: 'Software Engineering',
    code: 'CS401',
    description: 'Software development methodologies, project management, and quality assurance.',
    startDate: '2025-01-15',
    endDate: '2025-05-30',
    faculty: {
      id: 'f3',
      name: 'David Lee'
    },
    students: 24,
    status: 'active'
  },
  {
    id: '4',
    title: 'Artificial Intelligence',
    code: 'CS405',
    description: 'Introduction to AI concepts, algorithms, and applications.',
    startDate: '2025-01-15',
    endDate: '2025-05-30',
    faculty: {
      id: 'f4',
      name: 'Sarah Johnson'
    },
    students: 20,
    status: 'upcoming'
  },
  {
    id: '5',
    title: 'Mobile App Development',
    code: 'CS410',
    description: 'Building native and cross-platform mobile applications.',
    startDate: '2024-08-15',
    endDate: '2024-12-20',
    faculty: {
      id: 'f2',
      name: 'Maria Garcia'
    },
    students: 26,
    status: 'completed'
  }
];

const SubjectManagement = () => {
  const [subjects, setSubjects] = useState(mockSubjects);
  const [filteredSubjects, setFilteredSubjects] = useState(mockSubjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Filter subjects based on search query and selected status
    let filtered = [...subjects];
    
    if (searchQuery) {
      filtered = filtered.filter(subject => 
        subject.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.faculty.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedStatus) {
      filtered = filtered.filter(subject => subject.status === selectedStatus);
    }
    
    // Sort subjects if sort field is specified
    if (sortField) {
      filtered.sort((a, b) => {
        let valueA, valueB;
        
        switch (sortField) {
          case 'title':
            valueA = a.title;
            valueB = b.title;
            break;
          case 'code':
            valueA = a.code;
            valueB = b.code;
            break;
          case 'faculty':
            valueA = a.faculty.name;
            valueB = b.faculty.name;
            break;
          case 'students':
            valueA = a.students;
            valueB = b.students;
            break;
          default:
            valueA = a.title;
            valueB = b.title;
        }
        
        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return sortDirection === 'asc'
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        } else {
          return sortDirection === 'asc'
            ? (valueA as number) - (valueB as number)
            : (valueB as number) - (valueA as number);
        }
      });
    }
    
    setFilteredSubjects(filtered);
  }, [subjects, searchQuery, selectedStatus, sortField, sortDirection]);
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const handleDeleteSubject = (id: string) => {
    // In a real app, you would call an API to delete the subject
    setSubjects(subjects.filter(subject => subject.id !== id));
    toast.success('Subject deleted successfully');
  };
  
  const renderSortIcon = (field: string) => {
    if (sortField !== field) {
      return null;
    }
    
    return sortDirection === 'asc' ? (
      <ChevronUp size={16} className="inline ml-1" />
    ) : (
      <ChevronDown size={16} className="inline ml-1" />
    );
  };
  
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
        <h1 className="text-2xl font-bold text-gray-900">Subject Management</h1>
        {isAdmin && (
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus size={16} className="mr-2" />
            Add Subject
          </Button>
        )}
      </div>
      
      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search subjects..."
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
              onChange={(e) => setSelectedStatus(e.target.value || null)}
              value={selectedStatus || ''}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </Card>
      
      {/* Subjects table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('title')}
                >
                  Subject {renderSortIcon('title')}
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('code')}
                >
                  Code {renderSortIcon('code')}
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('faculty')}
                >
                  Faculty {renderSortIcon('faculty')}
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hidden md:table-cell"
                  onClick={() => handleSort('students')}
                >
                  Students {renderSortIcon('students')}
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell"
                >
                  Period
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubjects.length > 0 ? (
                filteredSubjects.map((subject) => (
                  <tr key={subject.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{subject.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{subject.code}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                          {subject.faculty.name.charAt(0)}
                        </div>
                        <span className="ml-2 text-sm text-gray-900">{subject.faculty.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                      <div className="text-sm text-gray-900">{subject.students}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1 text-gray-400" />
                        {new Date(subject.startDate).toLocaleDateString()} - {new Date(subject.endDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`
                        px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${subject.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : subject.status === 'upcoming' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-gray-100 text-gray-800'}
                      `}>
                        {subject.status.charAt(0).toUpperCase() + subject.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <Link to={`/subjects/${subject.id}`}>
                          <button className="text-indigo-600 hover:text-indigo-900">
                            <span className="sr-only">View</span>
                            Details
                          </button>
                        </Link>
                        {isAdmin && (
                          <>
                            <button className="text-blue-600 hover:text-blue-900">
                              <Edit size={16} />
                              <span className="sr-only">Edit</span>
                            </button>
                            <button 
                              className="text-red-600 hover:text-red-900"
                              onClick={() => handleDeleteSubject(subject.id)}
                            >
                              <Trash2 size={16} />
                              <span className="sr-only">Delete</span>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No subjects found. Try adjusting your search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Create Subject Modal would go here */}
    </div>
  );
};

export default SubjectManagement;