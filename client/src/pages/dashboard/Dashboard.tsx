import { useEffect, useState } from "react";
import {
  User,
  Settings,
  Trophy,
  Calendar,
  Target,
  Activity,
  Edit,
  Weight,
  Ruler,
  Flame,
  Clock,
  Users,
  Award,
  BarChart3,
  Bell, Trash2
} from "lucide-react";
import api from "@/lib/axios.ts";


// Mock data based on your schema
const mockUser = {
  id: "user_123456",
  username: "fitness_enthusiast",
  email: "user@example.com",
  firstName: "Alex",
  lastName: "Johnson",
  dateOfBirth: "1990-05-15",
  gender: "MALE",
  height: 180,
  weight: 75,
  activityLevel: "MODERATELY_ACTIVE",
  role: "USER",
  isEmailVerified: true,
  profileImage: "https://placehold.co/400x400",
  createdAt: "2023-01-15",
  updatedAt: "2023-10-20"
};

const mockPreferences = {
  dietaryRestrictions: ["Vegetarian"],
  allergies: ["Peanuts"],
  fitnessGoals: ["Weight Loss", "Muscle Gain"],
  notificationsEnabled: true,
  units: "METRIC",
  privacy: "FRIENDS"
};

const mockActivePlans = [
  {
    id: "plan_1",
    title: "30-Day Cardio Challenge",
    description: "Improve cardiovascular health through daily cardio workouts",
    progress: 65,
    startDate: "2023-10-01",
    endDate: "2023-10-31",
    participants: 1242,
    category: "Cardio"
  },
  {
    id: "plan_2",
    title: "Strength Training Program",
    description: "Build muscle mass with progressive overload techniques",
    progress: 30,
    startDate: "2023-09-15",
    endDate: "2023-12-15",
    participants: 876,
    category: "Strength"
  }
];

const mockChallenges = [
  {
    id: "chal_1",
    title: "10K Steps Daily",
    description: "Reach 10,000 steps every day for a week",
    reward: "100 points",
    deadline: "2023-10-27",
    participants: 5432,
    completed: false
  },
  {
    id: "chal_2",
    title: "Hydration Challenge",
    description: "Drink 2L of water daily for 5 days",
    reward: "50 points",
    deadline: "2023-10-25",
    participants: 3210,
    completed: true
  }
];

const mockAchievements = [
  { id: "ach_1", title: "First Workout", description: "Completed your first workout", icon: "💪", earned: "2023-01-20" },
  { id: "ach_2", title: "Week Warrior", description: "Worked out 5 days in a row", icon: "🔥", earned: "2023-03-15" },
  { id: "ach_3", title: "Social Butterfly", description: "Joined 3 challenges", icon: "🏆", earned: "2023-05-30" }
];

const Dashboard = () => {
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/auth/me");

        setUser(response.data.data.user)
      } catch (err: any) {
        console.error(err.message);
      }
    };

    fetchData();
  }, []);

  const calculateAge = (dateOfBirth: string) => {
    const dob = new Date(dateOfBirth);
    const diff = Date.now() - dob.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const getBMI = (weight: number, height: number) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const getCaloriesBurned = (activityLevel: string) => {
    const base = 2000;
    switch(activityLevel) {
      case "SEDENTARY": return base;
      case "LIGHTLY_ACTIVE": return base * 1.2;
      case "MODERATELY_ACTIVE": return base * 1.4;
      case "VERY_ACTIVE": return base * 1.6;
      case "EXTREMELY_ACTIVE": return base * 1.8;
      default: return base;
    }
  };

  return (

    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Activity className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">FitTracker</span>
              </div>
              <nav className="ml-6 flex space-x-8">
                <a href="#" className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Dashboard
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Plans
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Challenges
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Community
                </a>
              </nav>
            </div>
            <div className="flex items-center">
              <button className="bg-gray-100 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                <Bell className="h-6 w-6" />
              </button>
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <img className="h-8 w-8 rounded-full" src={mockUser.profileImage} alt="Profile" />
                  <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">{mockUser.firstName}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col items-center">
                <img
                  className="h-24 w-24 rounded-full"
                  src={mockUser.profileImage}
                  alt="Profile"
                />
                <h2 className="mt-4 text-xl font-bold text-gray-900">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-500">@{mockUser.username}</p>
                <div className="mt-4 flex space-x-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {user.role || mockUser.role}
                  </span>
                  {user.isEmailVerified ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                      Unverified
                    </span>
                  )}
                </div>
              </div>

              <nav className="mt-8">
                <div className="space-y-1">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'overview'
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <BarChart3 className="mr-3 h-5 w-5" />
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'profile'
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <User className="mr-3 h-5 w-5" />
                    Profile
                  </button>
                  <button
                    onClick={() => setActiveTab('plans')}
                    className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'plans'
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Target className="mr-3 h-5 w-5" />
                    Active Plans
                  </button>
                  <button
                    onClick={() => setActiveTab('challenges')}
                    className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'challenges'
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Trophy className="mr-3 h-5 w-5" />
                    Challenges
                  </button>
                  <button
                    onClick={() => setActiveTab('achievements')}
                    className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'achievements'
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Award className="mr-3 h-5 w-5" />
                    Achievements
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'settings'
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Settings className="mr-3 h-5 w-5" />
                    Settings
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                        <Weight className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Current Weight</p>
                        <p className="text-2xl font-semibold text-gray-900">{user.weight || 'null'} kg</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-green-100 text-green-600">
                        <Ruler className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Height</p>
                        <p className="text-2xl font-semibold text-gray-900">{user.height || 'null'} cm</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                        <Flame className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Calories Burned</p>
                        <p className="text-2xl font-semibold text-gray-900">
                          {getCaloriesBurned(user.activityLevel)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BMI Card */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Body Mass Index (BMI)</h2>
                  <div className="flex items-center">
                    <div className="relative w-full">
                      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                          style={{ width: `${Math.min(100, (parseFloat(getBMI(user.weight, user.height)) / 40) * 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>Underweight</span>
                        <span>Normal</span>
                        <span>Overweight</span>
                        <span>Obese</span>
                      </div>
                    </div>
                    <div className="ml-6 text-center">
                      <p className="text-3xl font-bold text-gray-900">
                        {getBMI(user.weight, user.height)}
                      </p>
                      <p className="text-sm text-gray-500">BMI</p>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Trophy className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">Completed 30-Day Cardio Challenge</p>
                        <p className="text-sm text-gray-500">2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <Target className="h-5 w-5 text-green-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">Joined Strength Training Program</p>
                        <p className="text-sm text-gray-500">5 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                          <Users className="h-5 w-5 text-yellow-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">Invited 3 friends to Hydration Challenge</p>
                        <p className="text-sm text-gray-500">1 week ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Profile Information</h1>
                  <button
                    onClick={() => setShowProfileEdit(!showProfileEdit)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </button>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and account information.</p>
                  </div>
                  <div className="border-t border-gray-200">
                    <dl>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Full name</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {user.firstName} {user.lastName}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Username</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {user.firstName}_{user.id.slice(0, 6)}
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Email address</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {user.email}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {new Date(user.dateOfBirth).toLocaleDateString()} (Age: {calculateAge(user.dateOfBirth)})
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Gender</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {user.gender || 'null'}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Height</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {user.height || 'null'} cm
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Weight</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {user.weight || 'null'} kg
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Activity Level</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {user.activityLevel.replace('_', ' ')}
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Account Created</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'plans' && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Active Plans</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockActivePlans.map((plan) => (
                    <div key={plan.id} className="bg-white rounded-lg shadow overflow-hidden">
                      <div className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{plan.title}</h3>
                            <p className="mt-1 text-sm text-gray-500">{plan.description}</p>
                            <span className="inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {plan.category}
                            </span>
                          </div>
                          <div className="bg-gray-100 rounded-full p-2">
                            <Calendar className="h-5 w-5 text-gray-600" />
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="flex justify-between text-sm text-gray-500 mb-1">
                            <span>Progress</span>
                            <span>{plan.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${plan.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="mt-4 flex justify-between text-sm text-gray-500">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{plan.participants.toLocaleString()} participants</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{new Date(plan.endDate).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="mt-6">
                          <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'challenges' && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Active Challenges</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockChallenges.map((challenge) => (
                    <div key={challenge.id} className="bg-white rounded-lg shadow overflow-hidden">
                      <div className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{challenge.title}</h3>
                            <p className="mt-1 text-sm text-gray-500">{challenge.description}</p>
                          </div>
                          <div className="bg-gray-100 rounded-full p-2">
                            <Trophy className="h-5 w-5 text-gray-600" />
                          </div>
                        </div>

                        <div className="mt-4 flex items-center text-sm text-gray-500">
                          <Award className="h-4 w-4 mr-1" />
                          <span>Reward: {challenge.reward}</span>
                        </div>

                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Deadline: {new Date(challenge.deadline).toLocaleDateString()}</span>
                        </div>

                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{challenge.participants.toLocaleString()} participants</span>
                        </div>

                        <div className="mt-6 flex space-x-3">
                          <button className={`flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                            challenge.completed
                              ? 'bg-green-600 hover:bg-green-700'
                              : 'bg-blue-600 hover:bg-blue-700'
                          } focus:outline-none`}>
                            {challenge.completed ? 'Completed' : 'Join Challenge'}
                          </button>
                          <button className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockAchievements.map((achievement) => (
                    <div key={achievement.id} className="bg-white rounded-lg shadow overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-center">
                          <div className="text-3xl">{achievement.icon}</div>
                          <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-900">{achievement.title}</h3>
                            <p className="text-sm text-gray-500">{achievement.description}</p>
                            <p className="mt-2 text-xs text-gray-400">Earned: {new Date(achievement.earned).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h1>

                <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Preferences</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Manage your notification and privacy preferences.</p>
                  </div>
                  <div className="border-t border-gray-200">
                    <dl>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Dietary Restrictions</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {mockPreferences.dietaryRestrictions.join(', ') || 'None'}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Allergies</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {mockPreferences.allergies.join(', ') || 'None'}
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Fitness Goals</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {mockPreferences.fitnessGoals.join(', ') || 'None'}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Notifications</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            mockPreferences.notificationsEnabled
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {mockPreferences.notificationsEnabled ? 'Enabled' : 'Disabled'}
                          </span>
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Privacy</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {mockPreferences.privacy}
                          </span>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Account Management</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Manage your account settings and preferences.</p>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Delete Account</h4>
                        <p className="text-sm text-gray-500">Permanently delete your account and all associated data.</p>
                      </div>
                      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;