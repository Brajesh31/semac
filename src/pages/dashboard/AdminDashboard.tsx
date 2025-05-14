import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  BookOpen, 
  FileText, 
  AlertTriangle,
  ArrowUpRight,
  UserPlus
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

// Mock data
const mockUserData = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    role: 'faculty',
    department: 'Computer Science'
  },
  {
    id: '2',
    name: 'Maria Garcia',
    email: 'maria@example.com',
    role: 'faculty',
    department: 'Mathematics'
  },
  {
    id: '3',
    name: 'Ahmed Khan',
    email: 'ahmed@example.com',
    role: 'student',
    department: 'Computer Science'
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    role: 'student',
    department: 'Mathematics'
  }
];

const mockActivityLog = [
  {
    id: '1',
    user: 'John Smith',
    action: 'Submitted report',
    subject: 'Database Systems',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    user: 'Maria Garcia',
    action: 'Created new subject',
    subject: 'Advanced Calculus',
    timestamp: '5 hours ago'
  },
  {
    id: '3',
    user: 'Ahmed Khan',
    action: 'Submitted assignment',
    subject: 'Web Development',
    timestamp: '1 day ago'
  },
  {
    id: '4',
    user: 'Admin',
    action: 'Added new user',
    subject: 'Sarah Williams',
    timestamp: '2 days ago'
  }
];

// Chart data
const mockChartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Reports Submitted',
      data: [12, 19, 8, 15, 12, 3, 5]
    }
  ]
};

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

const MetricCard = ({ title, value, icon, color }: MetricCardProps) => (
  <Card className="flex items-center justify-between h-full">
    <div>
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
    </div>
    <div className={`p-3 rounded-full ${color}`}>
      {icon}
    </div>
  </Card>
);

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  
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
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex space-x-2">
          <Button>
            <UserPlus size={16} className="mr-2" />
            Add User
          </Button>
          <Button variant="outline">
            Export Data
          </Button>
        </div>
      </div>
      
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Users"
          value="254"
          icon={<Users size={24} className="text-white" />}
          color="bg-blue-600"
        />
        <MetricCard
          title="Active Subjects"
          value="18"
          icon={<BookOpen size={24} className="text-white" />}
          color="bg-emerald-600"
        />
        <MetricCard
          title="Reports Today"
          value="35"
          icon={<FileText size={24} className="text-white" />}
          color="bg-indigo-600"
        />
        <MetricCard
          title="Issues Flagged"
          value="4"
          icon={<AlertTriangle size={24} className="text-white" />}
          color="bg-amber-600"
        />
      </div>
      
      {/* User list and Activity log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Recent Users">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockUserData.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                          {user.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.department}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <Link to="/users" className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium">
              View all users
              <ArrowUpRight size={16} className="ml-1" />
            </Link>
          </div>
        </Card>
        
        <Card title="Activity Log">
          <div className="space-y-4">
            {mockActivityLog.map((activity) => (
              <div key={activity.id} className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                  {activity.user.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.user} <span className="font-normal text-gray-500">{activity.action}</span> {activity.subject}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {activity.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link to="/activity" className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium">
              View full activity log
              <ArrowUpRight size={16} className="ml-1" />
            </Link>
          </div>
        </Card>
      </div>
      
      {/* Chart */}
      <Card title="Weekly Report Submissions">
        <div className="h-64 flex items-center justify-center">
          <p className="text-gray-500">Chart visualization would appear here</p>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;