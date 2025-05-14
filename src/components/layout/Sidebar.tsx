import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Book, 
  FileText, 
  Users, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  User
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  // Links based on user role
  let links = [];
  
  if (user?.role === 'admin') {
    links = [
      { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
      { name: 'Subjects', path: '/subjects', icon: <Book size={20} /> },
      { name: 'Reports', path: '/reports', icon: <FileText size={20} /> },
      { name: 'Users', path: '/users', icon: <Users size={20} /> },
      { name: 'Settings', path: '/settings', icon: <Settings size={20} /> }
    ];
  } else if (user?.role === 'faculty') {
    links = [
      { name: 'Dashboard', path: '/faculty', icon: <LayoutDashboard size={20} /> },
      { name: 'Subjects', path: '/subjects', icon: <Book size={20} /> },
      { name: 'Submit Report', path: '/reports/submit', icon: <FileText size={20} /> },
      { name: 'All Reports', path: '/reports', icon: <FileText size={20} /> },
      { name: 'Profile', path: '/profile', icon: <User size={20} /> }
    ];
  } else {
    links = [
      { name: 'Dashboard', path: '/student', icon: <LayoutDashboard size={20} /> },
      { name: 'Subjects', path: '/subjects', icon: <Book size={20} /> },
      { name: 'Submit Report', path: '/reports/submit', icon: <FileText size={20} /> },
      { name: 'My Reports', path: '/reports', icon: <FileText size={20} /> },
      { name: 'Profile', path: '/profile', icon: <User size={20} /> }
    ];
  }
  
  return (
    <div 
      className={`
        bg-indigo-900 text-white transition-all duration-300 ease-in-out h-screen
        ${collapsed ? 'w-16' : 'w-64'}
      `}
    >
      <div className="flex justify-between items-center p-4 border-b border-indigo-800">
        {!collapsed && (
          <h2 className="text-xl font-bold">SEM&C</h2>
        )}
        <button 
          onClick={toggleSidebar}
          className="p-1 rounded-md hover:bg-indigo-800 focus:outline-none"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      
      <nav className="mt-6">
        <ul className="space-y-2 px-2">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`
                    flex items-center p-3 rounded-md transition-colors
                    ${isActive 
                      ? 'bg-indigo-800 text-white' 
                      : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'}
                  `}
                >
                  <span className="mr-3">{link.icon}</span>
                  {!collapsed && <span>{link.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;