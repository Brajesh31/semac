import { useParams } from 'react-router-dom';
import { BookOpen, Users, Calendar, FileText } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const SubjectDetails = () => {
  const { id } = useParams();
  
  // Mock data - in a real app, fetch this from your API
  const subject = {
    id,
    title: 'Database Systems',
    code: 'CS301',
    description: 'Introduction to database concepts, design, and implementation.',
    faculty: {
      name: 'John Smith',
      email: 'john@example.com'
    },
    startDate: '2025-01-15',
    endDate: '2025-05-30',
    students: 32,
    topics: [
      'Introduction to DBMS',
      'ER Diagrams',
      'Normalization',
      'SQL Basics',
      'Transactions'
    ],
    assignments: [
      {
        title: 'ER Diagram Project',
        dueDate: '2025-02-15',
        status: 'active'
      },
      {
        title: 'SQL Assignment',
        dueDate: '2025-03-01',
        status: 'upcoming'
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{subject.title}</h1>
          <p className="text-gray-500">{subject.code}</p>
        </div>
        <Button>
          <FileText size={16} className="mr-2" />
          Submit Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Overview</h2>
          <p className="text-gray-600 mb-6">{subject.description}</p>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center">
              <BookOpen className="text-blue-500 mr-2" size={20} />
              <div>
                <p className="text-sm text-gray-500">Course Code</p>
                <p className="font-medium">{subject.code}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Users className="text-green-500 mr-2" size={20} />
              <div>
                <p className="text-sm text-gray-500">Students</p>
                <p className="font-medium">{subject.students}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="text-purple-500 mr-2" size={20} />
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">4 Months</p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Faculty</h2>
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl">
              {subject.faculty.name.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-900">{subject.faculty.name}</p>
              <p className="text-sm text-gray-500">{subject.faculty.email}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Course Topics</h2>
          <ul className="space-y-3">
            {subject.topics.map((topic, index) => (
              <li key={index} className="flex items-center">
                <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                <span className="text-gray-600">{topic}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Assignments</h2>
          <div className="space-y-4">
            {subject.assignments.map((assignment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{assignment.title}</p>
                  <p className="text-sm text-gray-500">Due: {assignment.dueDate}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  assignment.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SubjectDetails;