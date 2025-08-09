import { useEffect, useState } from "react";
import {
  User,
  Settings,
  Trophy,
  Calendar,
  Target,
  Weight,
  Ruler,
  Flame,
  Clock,
  Users,
  Award,
  BarChart3,
  Trash2,
  Menu,
  X,
  CheckCircle,
} from "lucide-react";
import api from "@/lib/axios.ts";
import { EditProfile } from "@/components/dashboard/EditProfile.tsx";
import { Link } from "react-router-dom";
import type { Achievement, Challenge, Plan, UserPreferences, UserProfile } from "@/types/user.types";



const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState<UserProfile>({
    activityLevel: "",
    createdAt: "",
    dateOfBirth: "",
    email: "",
    firstName: "",
    gender: "",
    height: 0,
    id: "",
    isEmailVerified: false,
    lastName: "",
    profileImage: "",
    role: "",
    weight: 0
  });
  const [preferences, setPreferences] = useState<UserPreferences>({});
  const [activePlans, setActivePlans] = useState<Plan[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch user data
        const userResponse = await api.get("/user/profile");
        setUser(userResponse.data.data.user);

        // Fetch preferences
        const preferencesResponse = await api.get("/user/preferences");
        setPreferences(preferencesResponse.data.data);

        // Fetch active plans
        const plansResponse = await api.get("/plans/active");
        setActivePlans(plansResponse.data.data);

        // Fetch challenges
        const challengesResponse = await api.get("/challenges");
        setChallenges(challengesResponse.data.data);

        // Fetch achievements
        const achievementsResponse = await api.get("/achievements");
        setAchievements(achievementsResponse.data.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData().then(r => console.log(r));
  }, []);

  const calculateAge = (dateOfBirth?: string | number | Date) => {
    if (!dateOfBirth) return "N/A";
    const dob = new Date(dateOfBirth);
    const diff = Date.now() - dob.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const getBMI = (weight?: number, height?: number) => {
    if (!weight || !height) return "0.0";
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const getCaloriesBurned = (activityLevel: string) => {
    const base = 2000;
    switch (activityLevel) {
      case "SEDENTARY":
        return base;
      case "LIGHTLY_ACTIVE":
        return base * 1.2;
      case "MODERATELY_ACTIVE":
        return base * 1.4;
      case "VERY_ACTIVE":
        return base * 1.6;
      case "EXTREMELY_ACTIVE":
        return base * 1.8;
      default:
        return base;
    }
  };

  const getBMICategory = (bmiValue: string) => {
    const value = parseFloat(bmiValue);
    if (value < 18.5) return "Underweight";
    if (value < 25) return "Normal";
    if (value < 30) return "Overweight";
    return "Obese";
  };

  const bmi = getBMI(user.weight, user.height);
  const bmiPercentage = Math.min(100, (parseFloat(bmi || "0") / 40) * 100);
  const bmiCategory = getBMICategory(bmi);

  // Navigation items
  const navItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'plans', label: 'Active Plans', icon: Target },
    { id: 'challenges', label: 'Challenges', icon: Trophy },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  if (loading) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Fetching API...</p>
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center">
                  {/*<Activity className="h-8 w-8 text-indigo-600" />*/}
                  <Link to="/" className="flex items-center space-x-3">
                    <img
                        src={"/logo.svg"}
                        alt="Lifeline Logo"
                        className="w-16 h-16 sm:w-20 sm:h-20"
                    />
                    <span className="ml-2 text-xl font-bold text-gray-900 hidden sm:block">
                    LifeLine Dashboard
                  </span>
                  </Link>
                </div>
                <button
                    className="ml-4 sm:hidden text-gray-500 hover:text-gray-700"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  {sidebarOpen ? (
                      <X className="h-6 w-6" />
                  ) : (
                      <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
              <div className="flex items-center">
                <div className="flex items-center">
                  <img
                      className="h-8 w-8 rounded-full ring-2 ring-indigo-200"
                      src={user.profileImage || "https://placehold.co/400x400"}
                      alt="Profile"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">
                  {user.firstName}
                </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div
                className={`fixed rounded-xl inset-y-0 left-0 z-20 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col items-center">
                    <img
                        className="h-20 w-20 rounded-full ring-4 ring-indigo-100"
                        src={user.profileImage || "https://placehold.co/400x400"}
                        alt="Profile"
                    />
                    <h2 className="mt-4 text-lg font-bold text-gray-900">
                      {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      @{user.firstName || "user"}_{user.id ? user.id.slice(0, 6) : ""}
                    </p>
                    <div className="mt-3 flex flex-wrap justify-center gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {user.role}
                    </span>
                      {user.isEmailVerified ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Verified
                      </span>
                      ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Unverified
                      </span>
                      )}
                    </div>
                  </div>
                </div>
                <nav className="flex-1 px-4 py-6 overflow-y-auto">
                  <div className="space-y-1">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      return (
                          <button
                              key={item.id}
                              onClick={() => {
                                setActiveTab(item.id);
                                setSidebarOpen(false);
                              }}
                              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                                  activeTab === item.id
                                      ? "bg-indigo-50 text-indigo-700 shadow-sm"
                                      : "text-gray-700 hover:bg-gray-100"
                              }`}
                          >
                            <Icon className="mr-3 h-5 w-5" />
                            {item.label}
                          </button>
                      );
                    })}
                  </div>
                </nav>
              </div>
            </div>

            {/* Overlay for mobile sidebar */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-10 bg-black bg-opacity-50 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content */}
            <div className="flex-1">
              {activeTab === "overview" && (
                  <div>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
                      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center">
                          <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                            <Weight className="h-6 w-6" />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">
                              Current Weight
                            </p>
                            <p className="text-2xl font-bold text-gray-900">
                              {user.weight || "0"} kg
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center">
                          <div className="p-3 rounded-xl bg-green-100 text-green-600">
                            <Ruler className="h-6 w-6" />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">
                              Height
                            </p>
                            <p className="text-2xl font-bold text-gray-900">
                              {user.height || "0"} cm
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center">
                          <div className="p-3 rounded-xl bg-amber-100 text-amber-600">
                            <Flame className="h-6 w-6" />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">
                              Calories Burned
                            </p>
                            <p className="text-2xl font-bold text-gray-900">
                              {getCaloriesBurned(user.activityLevel)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* BMI Card */}
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <h2 className="text-lg font-bold text-gray-900">
                          Body Mass Index (BMI)
                        </h2>
                        <div className="mt-2 md:mt-0">
                      <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                              bmiCategory === "Underweight"
                                  ? "bg-blue-100 text-blue-800"
                                  : bmiCategory === "Normal"
                                      ? "bg-green-100 text-green-800"
                                      : bmiCategory === "Overweight"
                                          ? "bg-yellow-100 text-yellow-800"
                                          : "bg-red-100 text-red-800"
                          }`}
                      >
                        {bmiCategory}
                      </span>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row items-center">
                        <div className="relative w-full md:w-3/4">
                          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-red-500 rounded-full"
                                style={{ width: `${bmiPercentage}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>Underweight</span>
                            <span>Normal</span>
                            <span>Overweight</span>
                            <span>Obese</span>
                          </div>
                        </div>
                        <div className="ml-0 md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                          <p className="text-3xl font-bold text-gray-900">{bmi}</p>
                          <p className="text-sm text-gray-500">BMI</p>
                        </div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                      <h2 className="text-lg font-bold text-gray-900 mb-4">
                        Recent Activity
                      </h2>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                              <Trophy className="h-5 w-5 text-indigo-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">
                              Completed 30-Day Cardio Challenge
                            </p>
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
                            <p className="text-sm font-medium text-gray-900">
                              Joined Strength Training Program
                            </p>
                            <p className="text-sm text-gray-500">5 days ago</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                              <Users className="h-5 w-5 text-amber-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">
                              Invited 3 friends to Hydration Challenge
                            </p>
                            <p className="text-sm text-gray-500">1 week ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              )}

              {activeTab === "profile" && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h1 className="text-2xl font-bold text-gray-900">
                        Profile Information
                      </h1>
                      <EditProfile user={user} />
                    </div>
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                      <div className="border-t border-gray-200">
                        <dl>
                          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                              Full name
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {user.firstName} {user.lastName}
                            </dd>
                          </div>
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                              Username
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {user.firstName ? `${user.firstName}_${user.id ? user.id.slice(0, 6) : ""}` : "Not set"}
                            </dd>
                          </div>
                          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                              Email address
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {user.email}
                            </dd>
                          </div>
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                              Date of Birth
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {user.dateOfBirth
                                  ? new Date(user.dateOfBirth).toLocaleDateString()
                                  : "Not set"}
                              {user.dateOfBirth &&
                                  ` (Age: ${calculateAge(user.dateOfBirth)})`}
                            </dd>
                          </div>
                          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                              Gender
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {user.gender || "Not specified"}
                            </dd>
                          </div>
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                              Height
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {user.height || "0"} cm
                            </dd>
                          </div>
                          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                              Weight
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {user.weight || "0"} kg
                            </dd>
                          </div>
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                              Activity Level
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {user.activityLevel ? user.activityLevel.replace(/_/g, " ") : "Not specified"}
                            </dd>
                          </div>
                          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                              Account Created
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {user.createdAt
                                  ? new Date(user.createdAt).toLocaleDateString()
                                  : "Not available"}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
              )}

              {activeTab === "plans" && (
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">
                      Active Plans
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {activePlans.map((plan) => (
                          <div
                              key={plan.id}
                              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
                          >
                            <div className="p-6">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-lg font-bold text-gray-900">
                                    {plan.title}
                                  </h3>
                                  <p className="mt-1 text-sm text-gray-500">
                                    {plan.description}
                                  </p>
                                  <span className="inline-flex items-center mt-3 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                              {plan.category}
                            </span>
                                </div>
                                <div className="bg-gray-100 rounded-full p-2">
                                  <Calendar className="h-5 w-5 text-gray-600" />
                                </div>
                              </div>
                              <div className="mt-5">
                                <div className="flex justify-between text-sm text-gray-500 mb-1">
                                  <span>Progress</span>
                                  <span>{plan.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                  <div
                                      className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2.5 rounded-full"
                                      style={{ width: `${plan.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                              <div className="mt-4 flex justify-between text-sm text-gray-500">
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 mr-1" />
                                  <span>
                              {plan.participants?.toLocaleString() || 0}{" "}
                                    participants
                            </span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>
                              {plan.endDate
                                  ? new Date(plan.endDate).toLocaleDateString()
                                  : "N/A"}
                            </span>
                                </div>
                              </div>
                              <div className="mt-6">
                                <button className="w-full inline-flex justify-center items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none transition-all">
                                  View Details
                                </button>
                              </div>
                            </div>
                          </div>
                      ))}
                    </div>
                  </div>
              )}

              {activeTab === "challenges" && (
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">
                      Active Challenges
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {challenges.map((challenge) => (
                          <div
                              key={challenge.id}
                              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
                          >
                            <div className="p-6">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-lg font-bold text-gray-900">
                                    {challenge.title}
                                  </h3>
                                  <p className="mt-1 text-sm text-gray-500">
                                    {challenge.description}
                                  </p>
                                </div>
                                <div className="bg-gray-100 rounded-full p-2">
                                  <Trophy className="h-5 w-5 text-gray-600" />
                                </div>
                              </div>
                              <div className="mt-4 flex items-center text-sm text-gray-500">
                                <Award className="h-4 w-4 mr-1" />
                                <span>Reward: {challenge.reward || "N/A"}</span>
                              </div>
                              <div className="mt-2 flex items-center text-sm text-gray-500">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>
                            Deadline:{" "}
                                  {challenge.deadline
                                      ? new Date(
                                          challenge.deadline,
                                      ).toLocaleDateString()
                                      : "N/A"}
                          </span>
                              </div>
                              <div className="mt-2 flex items-center text-sm text-gray-500">
                                <Users className="h-4 w-4 mr-1" />
                                <span>
                            {challenge.participants?.toLocaleString() || 0}{" "}
                                  participants
                          </span>
                              </div>
                              <div className="mt-6 flex space-x-3">
                                <button
                                    className={`flex-1 inline-flex justify-center items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white ${
                                        challenge.completed
                                            ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                                            : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                                    } focus:outline-none transition-all`}
                                >
                                  {challenge.completed ? (
                                      <>
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Completed
                                      </>
                                  ) : (
                                      "Join Challenge"
                                  )}
                                </button>
                                <button className="inline-flex justify-center items-center px-4 py-2.5 border border-gray-300 text-sm font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-colors">
                                  Details
                                </button>
                              </div>
                            </div>
                          </div>
                      ))}
                    </div>
                  </div>
              )}

              {activeTab === "achievements" && (
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">
                      Achievements
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {achievements.map((achievement) => (
                          <div
                              key={achievement.id}
                              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
                          >
                            <div className="p-6">
                              <div className="flex items-center">
                                <div className="text-3xl">
                                  {achievement.icon || "🏆"}
                                </div>
                                <div className="ml-4">
                                  <h3 className="text-lg font-bold text-gray-900">
                                    {achievement.title}
                                  </h3>
                                  <p className="text-sm text-gray-500">
                                    {achievement.description}
                                  </p>
                                  <p className="mt-2 text-xs text-gray-400">
                                    Earned:{" "}
                                    {achievement.earned
                                        ? new Date(
                                            achievement.earned,
                                        ).toLocaleDateString()
                                        : "N/A"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                      ))}
                    </div>
                  </div>
              )}

              {activeTab === "settings" && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h1 className="text-2xl font-bold text-gray-900">
                        Account Settings
                      </h1>
                      <EditProfile user={user} />
                    </div>
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6 border border-gray-100">
                      <div className="border-t border-gray-200">
                        <dl>
                          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                              Dietary Restrictions
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {preferences.dietaryRestrictions?.length ? preferences.dietaryRestrictions.join(", ") : "None"}
                            </dd>
                          </div>
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                              Allergies
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {preferences.allergies?.length ? preferences.allergies.join(", ") : "None"}
                            </dd>
                          </div>
                          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                              Notifications
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  preferences.notificationsEnabled
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                              }`}
                          >
                            {preferences.notificationsEnabled
                                ? "Enabled"
                                : "Disabled"}
                          </span>
                            </dd>
                          </div>
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                              Privacy
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                            {preferences.privacy || "Not set"}
                          </span>
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                      <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-rose-50 to-red-50">
                        <h3 className="text-lg leading-6 font-bold text-gray-900">
                          Account Management
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                          Manage your account settings and preferences.
                        </p>
                      </div>
                      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
                          <div>
                            <h4 className="text-sm font-bold text-gray-900">
                              Delete Account
                            </h4>
                            <p className="text-sm text-gray-500">
                              Permanently delete your account and all associated
                              data.
                            </p>
                          </div>
                          <button className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 focus:outline-none transition-all">
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