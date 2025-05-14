import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  FileText,
  Users,
  ChevronRight,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

// Mock data
const mockSubjects = [
  {
    id: '1',
    title: 'Database Systems',
    code: 'CS301',
    students: 32,
    nextDeadline: '2 days',
    progress: 75
  },
  {
    id: '2',
    title: 'Web Development',
    code: 'CS305',
    students: 28,
    nextDeadline: '5 days',
    progress: 60
  },
  {
    id: '3',
    title: 'Software Engineering',
    code: 'CS401',
    students: 24,
    nextDeadline: '1 week',
    progress: 40
  },
  {
    id: '4',
    title: 'Artificial Intelligence',
    code: 'CS405',
    students: 20,
    nextDeadline: '2 weeks',
    progress: 25
  }
];

const mockUpcomingEvents = [
  {
    id: '1',
    title: 'Database Final Project Deadline',
    subject: 'Database Systems',
    date: 'May 25, 2025',
    type: 'deadline'
  },
  {
    id: '2',
    title: 'Web Development Mid-Term Evaluation',
    subject: 'Web Development',
    date: 'May 28, 2025',
    type: 'evaluation'
  },
  {
    id: '3',
    title: 'AI Research Presentation',
    subject: 'Artificial Intelligence',
    date: 'June 5, 2025',
    type: 'presentation'
  }
];

const mockRecentReports = [
  {
    id: '1',
    title: 'Database Lecture 12',
    date: 'May 18, 2025',
    status: 'submitted'
  },
  {
    id: '2',
    title: 'Web Dev Lab Session',
    date: 'May 16, 2025',
    status: 'submitted'
  },
  {
    id: '3',
    title: 'Software Engineering Weekly Report',
    date: 'May 15, 2025',
    status: 'submitted'
  }
];

interface SubjectCardProps {
  subject: {
    id: string;
    title: string;
    code: string;
    students: number;
    nextDeadline: string;
    progress: number;
  };
}

const SubjectCard = ({ subject }: SubjectCardProps) => (
  <Link to={`/subjects/${subject.id}`}>
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-900">{subject.title}</h3>
          <p className="text-sm text-gray-500">{subject.code}</p>
        </div>
        <span className="flex items-center text-sm text-gray-500">
          <Users size={14} className="mr-1" /> {subject.students}
        </span>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-medium text-gray-500">Progress</span>
          <span className="text-xs font-medium text-gray-700">{subject.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full" 
            style={{ width: `${subject.progress}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <span className="flex items-center text-xs text-gray-500">
          <Clock size={12} className="mr-1" /> 
          Next deadline: {subject.nextDeadline}
        </span>
        <ChevronRight size={16} className="text-gray-400" />
      </div>
    </div>
  </Link>
);

const FacultyDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
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
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Faculty Dashboard</h1>
          <p className="text-gray-500">Welcome back, {user?.name}</p>
        </div>
        <div className="flex space-x-2">
          <Link to="/reports/submit">
            <Button>
              <FileText size={16} className="mr-2" />
              Submit Report
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <h3 className="font-medium mb-2">Today's Schedule</h3>
          <p className="text-sm opacity-90">You have 3 lectures scheduled today</p>
          <Button variant="outline" className="mt-4 border-white text-white hover:bg-blue-700">
            View Schedule
          </Button>
        </Card>
        
        <Card className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
          <h3 className="font-medium mb-2">Student Assignments</h3>
          <p className="text-sm opacity-90">12 assignments pending review</p>
          <Button variant="outline" className="mt-4 border-white text-white hover:bg-indigo-700">
            Review Now
          </Button>
        </Card>
        
        <Card className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
          <h3 className="font-medium mb-2">Teaching Hours</h3>
          <p className="text-sm opacity-90">18 hours logged this week</p>
          <Button variant="outline" className="mt-4 border-white text-white hover:bg-emerald-700">
            Log Hours
          </Button>
        </Card>
      </div>
      
      {/* My Subjects */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">My Subjects</h2>
          <Link to="/subjects" className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
            View All <ArrowUpRight size={14} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockSubjects.map(subject => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      </div>
      
      {/* Upcoming Events and Recent Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Upcoming Events">
          <div className="space-y-4">
            {mockUpcomingEvents.map(event => (
              <div key={event.id} className="flex items-start">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Calendar size={20} />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{event.title}</p>
                  <p className="text-xs text-gray-500">{event.subject} • {event.date}</p>
                  <span className={`
                    inline-block mt-1 px-2 py-0.5 text-xs rounded-full
                    ${event.type === 'deadline' ? 'bg-amber-100 text-amber-800' : 
                      event.type === 'evaluation' ? 'bg-purple-100 text-purple-800' : 
                      'bg-green-100 text-green-800'}
                  `}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                </div>
                <ChevronRight size={16} className="ml-auto text-gray-400" />
              </div>
            ))}
          </div>
        </Card>
        
        <Card title="Recent Reports">
          <div className="space-y-4">
            {mockRecentReports.map(report => (
              <div key={report.id} className="flex items-start">
                <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
                  <FileText size={20} />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{report.title}</p>
                  <p className="text-xs text-gray-500">Submitted on {report.date}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                    {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                  </span>
                </div>
                <ChevronRight size={16} className="ml-auto text-gray-400" />
              </div>
            ))}
            <Link 
              to="/reports" 
              className="block text-center mt-2 text-sm text-blue-600 hover:text-blue-800"
            >
              View all reports
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FacultyDashboard;