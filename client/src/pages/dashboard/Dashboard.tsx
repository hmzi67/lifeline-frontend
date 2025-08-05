//
// import { useAuth } from '../../contexts/AuthContext';
//
// export default function Dashboard() {
//   const { user, logout } = useAuth();
//
//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="bg-white overflow-hidden shadow rounded-lg">
//           <div className="px-4 py-5 sm:p-6">
//             <h1 className="text-3xl font-bold text-gray-900 mb-4">
//               Welcome to your Dashboard, {user ? (user?.firstName + ' ' + user?.lastName) : ('Guest')}!
//             </h1>
//             <p className="text-lg text-gray-600 mb-6">
//               This is a protected route. Only authenticated users can access this page.
//             </p>
//
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="bg-blue-50 p-6 rounded-lg">
//                 <h3 className="text-lg font-semibold text-blue-900 mb-2">Profile Info</h3>
//                 <p className="text-blue-700">Name: {user ? (user?.firstName + ' ' + user?.lastName) : ('Guest')}</p>
//                 <p className="text-blue-700">Email: {user?.email}</p>
//               </div>
//
//               <div className="bg-green-50 p-6 rounded-lg">
//                 <h3 className="text-lg font-semibold text-green-900 mb-2">Quick Actions</h3>
//                 <div className="space-y-2">
//                   <a href="/goals" className="block text-green-700 hover:text-green-900">
//                     → Set Fitness Goals
//                   </a>
//                   <a href="/analytics" className="block text-green-700 hover:text-green-900">
//                     → View Analytics
//                   </a>
//                 </div>
//               </div>
//
//               <div className="bg-red-50 p-6 rounded-lg">
//                 <h3 className="text-lg font-semibold text-red-900 mb-2">Account Actions</h3>
//                 <button
//                   onClick={logout}
//                   className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
//                 >
//                   Logout
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'products', label: 'Products', icon: '📦' },
    { id: 'orders', label: 'Orders', icon: '🛒' },
    { id: 'reports', label: 'Reports', icon: '📋' },
  ];

  const preferenceItems = [
    { id: 'preferences', label: 'Preferences', icon: '⚙️' },
    { id: 'settings', label: 'Settings', icon: '🔧' },
    { id: 'help', label: 'Help Center', icon: '❓' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className={'space-y-6'}>
              <h1 className={'font-medium text-2xl'}>Welcome to your Dashboard, {user ? (user?.firstName + ' ' + user?.lastName) : ('Guest')}!</h1>
              <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">Logout</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <span className="text-blue-600 text-xl">📊</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                    <p className="text-2xl font-bold">$45,231.89</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <span className="text-green-600 text-xl">👥</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Subscriptions</p>
                    <p className="text-2xl font-bold">+2350</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 bg-amber-100 rounded-lg">
                    <span className="text-amber-600 text-xl">🛒</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Sales</p>
                    <p className="text-2xl font-bold">+12,234</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 bg-rose-100 rounded-lg">
                    <span className="text-rose-600 text-xl">💳</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Active Now</p>
                    <p className="text-2xl font-bold">+573</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-600">👤</span>
                      </div>
                      <div className="ml-4">
                        <p className="font-medium">User {item} performed an action</p>
                        <p className="text-sm text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Chart visualization area</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">Analytics Overview</h2>
            <div className="h-96 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Analytics dashboard content</p>
            </div>
          </div>
        );
      case 'preferences':
        return (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">Preferences</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Theme Settings</h3>
                <div className="flex space-x-4">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Light</button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">Dark</button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">System</button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Notification Preferences</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Email Notifications</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Push Notifications</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">Settings</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Account Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="admin_user"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="admin@example.com"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Security</h3>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold capitalize">{activeSection}</h2>
            <p className="mt-4 text-gray-600">Content for {activeSection} section</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`bg-white shadow-md transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              {sidebarOpen && (
                <h1 className="ml-3 text-xl font-bold text-gray-800">Dashboard</h1>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-2">
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                      activeSection === item.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {sidebarOpen && (
                      <span className="ml-3 font-medium">{item.label}</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Divider */}
              {sidebarOpen && (
                <div className="my-4 border-t border-gray-200"></div>
              )}

              {/* Preferences & Settings */}
              <div className="space-y-1 mt-4">
                {preferenceItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                      activeSection === item.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {sidebarOpen && (
                      <span className="ml-3 font-medium">{item.label}</span>
                    )}
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600">👤</span>
              </div>
              {sidebarOpen && (
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">{user ? user.firstName + ' ' + user.lastName : 'Admin'}</p>
                  <p className="text-xs text-gray-500">{user ? user.email : 'admin@lifeline.com'}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <span className="text-gray-600">☰</span>
            </button>

            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                <span className="text-gray-600">🔔</span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <span className="text-gray-600">⚙️</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;