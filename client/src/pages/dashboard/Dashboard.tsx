
import { useAuth } from '../../contexts/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to your Dashboard, {user ? (user?.firstName + ' ' + user?.lastName) : ('Guest')}!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              This is a protected route. Only authenticated users can access this page.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Profile Info</h3>
                <p className="text-blue-700">Name: {user ? (user?.firstName + ' ' + user?.lastName) : ('Guest')}</p>
                <p className="text-blue-700">Email: {user?.email}</p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-900 mb-2">Quick Actions</h3>
                <div className="space-y-2">
                  <a href="/goals" className="block text-green-700 hover:text-green-900">
                    → Set Fitness Goals
                  </a>
                  <a href="/analytics" className="block text-green-700 hover:text-green-900">
                    → View Analytics
                  </a>
                </div>
              </div>

              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-red-900 mb-2">Account Actions</h3>
                <button
                  onClick={logout}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
