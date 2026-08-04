import React from "react";
import { Link, Navigate } from "react-router-dom";
import { User } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import DeleteAccount from "../../components/dashboard/DeleteAccount";
import Loading from "@/components/common/Loading.tsx";

const Profile: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <Loading />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");

  return (
    <div className="min-h-[70vh] bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-1">
            Manage your Lifeline account settings.
          </p>
        </div>

        {/* Account overview */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-400 to-primary-500 flex items-center justify-center shrink-0">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-lg font-semibold text-gray-900 truncate">
                {fullName || user?.username || "Your account"}
              </p>
              <p className="text-gray-600 text-sm truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Danger zone */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-red-100 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-gray-900">Danger zone</h2>
          <p className="text-gray-600 text-sm mt-1 mb-6">
            Deleting your account is permanent. All of your data, plans and
            progress will be removed and cannot be recovered.
          </p>
          <DeleteAccount />
          <p className="text-xs text-gray-500 mt-4">
            See{" "}
            <Link
              to="/delete-account"
              className="text-primary-600 hover:text-primary-700"
            >
              what deleting your account removes
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
