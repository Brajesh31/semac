import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  FileText,
  Calendar,
  Clock,
  ArrowUpRight,
  ChevronRight,
  BarChart
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

// Mock data
const mockCourses = [
  {
    id: '1',
    title: 'Database Systems',
    code: 'CS301',
    faculty: 'Prof. John Smith',
    progress: 75,
    nextDeadline: {
      title: 'Final Project',
      date: 'May 25, 2025',
      daysLeft: 7
    }
  },
  {
    id: '2',
    title: 'Web Development',
    code: 'CS305',
    faculty: 'Prof. Maria Garcia',
    progress: 60,
    nextDeadline: {
      title: 'Assignment 3',
      date: 'May 20, 2025',
      daysLeft: 2
    }
  },
  {
    id: '3',
    title: 'Software Engineering',
    code: 'CS401',
    faculty: 'Prof. David Lee',
    progress: 40,
    nextDeadline: {
      title: 'Group Presentation',
      date: 'May 30, 2025',
      daysLeft: 12
    }
  }
];

const mockSchedule = [
  {
    id: '1',
    title: 'Database Systems',
    type: 'Lecture',
    time: '10:00 AM - 11:30 AM',
    location: 'Room 201',
    isToday: true
  },
  {
    id: '2',
    title: 'Web Development',
    type: 'Lab',
    time: '1:00 PM - 3:00 PM',
    location: 'Lab 103',
    isToday: true
  },
  {
    id: '3',
    title: 'Software Engineering',
    type: 'Lecture',
    time: '9:00 AM - 10:30 AM',
    location: 'Room 305',
    isToday: false,
    day: 'Tomorrow'
  }
];

const mockAssignments = [
  {
    id: '1',
    title: 'Database ERD Design',
    course: 'Database Systems',
    deadline: 'May 22, 2025',
    status: 'pending'
  },
  {
    id: '2',
    title: 'React Frontend Project',
    course: 'Web Development',
    deadline: 'May 20, 2025',
    status: 'in-progress'
  },
  {
    id: '3',
    title: 'UML Diagrams',
    course: 'Software Engineering',
    deadline: 'May 30, 2025',
    status: 'completed'
  }
];

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    code: string;
    faculty: string;
    progress: number;
    nextDeadline: {
      title: string;
      date: string;
      daysLeft: number;
    };
  };
}

const CourseCard = ({ course }: CourseCardProps) => {
  const deadlineClass = course.nextDeadline.daysLeft <= 3 
    ? 'text-red-600' 
    : course.nextDeadline.daysLeft <= 7 
      ? 'text-amber-600' 
      : 'text-blue-600';
  
  return (
    <Link to={`/subjects/${course.id}`}>
      <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
        <div>
          <h3 className="font-medium text-gray-900">{course.title}</h3>
          <p className="text-sm text-gray-500">{course.code} • {course.faculty}</p>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-gray-500">Course Progress</span>
            <span className="text-xs font-medium text-gray-700">{course.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mt-4 border-t border-gray-100 pt-3">
          <p className="text-xs font-medium text-gray-500 mb-1">Next Deadline</p>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">{course.nextDeadline.title}</p>
              <p className="text-xs text-gray-500">{course.nextDeadline.date}</p>
            </div>
            <span className={`text-xs font-medium ${deadlineClass}`}>
              {course.nextDeadline.daysLeft} days left
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const StudentDashboard = () => {
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
          <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-500">Welcome back, {user?.name}</p>
        </div>
        <div className="flex space-x-2">
          <Link to="/reports/submit">
            <Button>
              <FileText size={16} className="mr-2" />
              Submit Assignment
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="flex items-center">
            <div className="p-3 bg-white/20 rounded-full">
              <BookOpen size={24} className="text-white" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium opacity-90">Enrolled Courses</p>
              <h3 className="text-2xl font-bold">5</h3>
            </div>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
          <div className="flex items-center">
            <div className="p-3 bg-white/20 rounded-full">
              <FileText size={24} className="text-white" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium opacity-90">Assignments</p>
              <h3 className="text-2xl font-bold">12</h3>
            </div>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
          <div className="flex items-center">
            <div className="p-3 bg-white/20 rounded-full">
              <BarChart size={24} className="text-white" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium opacity-90">Current GPA</p>
              <h3 className="text-2xl font-bold">3.8</h3>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Today's Schedule */}
      <Card title="Today's Schedule">
        <div className="space-y-4">
          {mockSchedule.filter(item => item.isToday).map(item => (
            <div key={item.id} className="flex items-start">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                <Clock size={18} />
              </div>
              <div className="ml-3">
                <div className="flex items-center">
                  <p className="text-sm font-medium text-gray-900">{item.title}</p>
                  <span className="ml-2 px-2 py-0.5 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                    {item.type}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{item.time} • {item.location}</p>
              </div>
            </div>
          ))}
          {mockSchedule.filter(item => !item.isToday).length > 0 && (
            <div className="pt-2 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Tomorrow</h4>
              {mockSchedule.filter(item => !item.isToday).map(item => (
                <div key={item.id} className="flex items-start mb-3">
                  <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 flex-shrink-0">
                    <Calendar size={18} />
                  </div>
                  <div className="ml-3">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-gray-700">{item.title}</p>
                      <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{item.time} • {item.location}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Link 
            to="/schedule" 
            className="block text-center text-sm text-blue-600 hover:text-blue-800"
          >
            View full schedule
          </Link>
        </div>
      </Card>
      
      {/* My Courses */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">My Courses</h2>
          <Link to="/subjects" className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
            View All <ArrowUpRight size={14} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
      
      {/* Upcoming Assignments */}
      <Card title="Upcoming Assignments">
        <div className="space-y-4">
          {mockAssignments.map(assignment => (
            <div key={assignment.id} className="flex items-start">
              <div className={`
                h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0
                ${assignment.status === 'pending' 
                  ? 'bg-amber-100 text-amber-600' 
                  : assignment.status === 'in-progress' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-green-100 text-green-600'}
              `}>
                <FileText size={18} />
              </div>
              <div className="ml-3 flex-grow">
                <p className="text-sm font-medium text-gray-900">{assignment.title}</p>
                <p className="text-xs text-gray-500">{assignment.course} • Due: {assignment.deadline}</p>
                <span className={`
                  inline-block mt-1 px-2 py-0.5 text-xs rounded-full
                  ${assignment.status === 'pending' 
                    ? 'bg-amber-100 text-amber-800' 
                    : assignment.status === 'in-progress' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'}
                `}>
                  {assignment.status === 'in-progress' ? 'In Progress' : assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                </span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          ))}
          <Link 
            to="/assignments" 
            className="block text-center text-sm text-blue-600 hover:text-blue-800"
          >
            View all assignments
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default StudentDashboard;