// Frontend/src/components/TopBar/ProfileDropdown.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import API from '../../services/api';
import { getCSRFToken, logout } from '../../services/authService';
import { ChevronDown, ChevronUp, LogOut, Edit, X, Check, User } from 'react-feather';
import ConfirmationDialog from '../common/ConfirmationDialog';

export default function ProfileDropdown({ user, onClose, onLogout  }) {
  const { logout: authLogout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone: user.phone,
  });

  useEffect(() => {
    getCSRFToken();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.patch(`/users/${user.id}/`, formData);
      setIsEditing(false);
      // You might want to refresh user data here
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await onLogout();
      onClose();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getRoleBadgeColor = () => {
    switch(user.user_type) {
      case 1: return 'bg-red-100 text-red-800'; // Admin
      case 2: return 'bg-blue-100 text-blue-800'; // Instructor
      default: return 'bg-green-100 text-green-800'; // Student
    }
  };

  return (
    <>
    <div className="absolute right-0 mt-2 w-80 pb-10 p-4 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
      {/* Header */}
      <div className=" p-4 text-gray-800 rounded-sm bg-red-100 flex justify-between items-center">
        <h3 className="font-medium">
          {isEditing ? 'Edit Profile' : 'My Profile'}
        </h3>
        <button 
          onClick={onClose}
          className="p-1 rounded-full text-red-800 hover:text-white hover:bg-red-800 transition"
        >
          <X size={18} />
        </button>
      </div>

      <div className="p-4">
        {!isEditing ? (
          <>
            {/* Profile Info */}
            <div className="flex items-start gap-4 mb-4">
              {user.profile_picture ? (
                <img
                  src={user.profile_picture}
                  alt="Profile"
                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-naita-red flex items-center justify-center text-white shadow">
                  <User size={24} />
                </div>
              )}
              <div>
                <h4 className="font-semibold text-gray-900">
                  {user.first_name} {user.last_name}
                </h4>
                <p className="text-sm text-gray-600">{user.email}</p>
                <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor()}`}>
                  {user.user_type === 1 ? 'Admin' : user.user_type === 2 ? 'Instructor' : 'Student'}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3 border-t border-gray-100 pt-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">ID Number</span>
                <span className="font-medium">{user.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Phone</span>
                <span className="font-medium">{user.phone || 'Not set'}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-10">
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-red-800 rounded hover:bg-red-300 hover:text-red-900 transition"
              >
                <Edit size={14} />
                Edit Profile
              </button>
              <button
                onClick={()=>setShowLogoutConfirm(true)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-naita-red focus:border-naita-red outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-naita-red focus:border-naita-red outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-naita-red focus:border-naita-red outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-naita-red focus:border-naita-red outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-naita-red rounded-md hover:bg-red-900 transition flex items-center gap-1"
              >
                <Check size={16} />
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>


    
      

<ConfirmationDialog
    isOpen={showLogoutConfirm}
    onClose={() => setShowLogoutConfirm(false)}
    onConfirm={handleLogout}
    title="Confirm Logout"
    message="Are you sure you want to logout?"
    confirmText="Logout"
    cancelText="Cancel"
  />
  </>
  );
}