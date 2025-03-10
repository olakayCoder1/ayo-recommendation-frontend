import React, { useState, useEffect } from 'react';
import thumbnail from '../assets/images/thumbnail-im.jpg'
// Types
interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  level: string;
  interests: string[];
  joinDate: string;
}

interface PasswordReset {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Modal types for confirmation
type ModalType = 'deleteAccount' | 'passwordUpdate' | 'dataDownload' | null;

const ProfileManagementPage: React.FC = () => {
  // Mock user data
  const [profile, setProfile] = useState<UserProfile>({
    id: 'usr_123456',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    avatar: thumbnail,
    bio: 'Product designer and developer based in San Francisco.',
    level: '300 Level',
    interests: ['UI/UX Design', 'React', 'TypeScript', 'Photography'],
    joinDate: '2023-05-12'
  });

  // Form states
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [profileForm, setProfileForm] = useState({ ...profile });
  const [passwordForm, setPasswordForm] = useState<PasswordReset>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [newInterest, setNewInterest] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'interests'>('profile');
  
  // Modal state
  const [modalOpen, setModalOpen] = useState<ModalType>(null);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  // Reset forms when canceling edit modes
  useEffect(() => {
    if (!isEditingProfile) {
      setProfileForm({ ...profile });
    }
    if (!isChangingPassword) {
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setFormErrors({});
    }
  }, [isEditingProfile, isChangingPassword, profile]);

  // Handle profile form changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle password form changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Validate password form
  const validatePasswordForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!passwordForm.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    
    if (!passwordForm.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordForm.newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle profile update
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    setTimeout(() => {
      setProfile(profileForm);
      setIsEditingProfile(false);
    //   toast.success('Profile updated successfully');
    }, 800);
  };

  // Handle password form submission - now opens confirmation modal
  const handlePasswordFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validatePasswordForm()) {
      setModalOpen('passwordUpdate');
    }
  };

  // Handle password reset after confirmation
  const handlePasswordReset = () => {
    // Simulate API call
    setTimeout(() => {
      setIsChangingPassword(false);
      setModalOpen(null);
      // toast.success('Password changed successfully');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }, 800);
  };

  // Handle adding a new interest
  const handleAddInterest = () => {
    if (newInterest.trim() && !profile.interests.includes(newInterest.trim())) {
      const updatedInterests = [...profile.interests, newInterest.trim()];
      setProfile(prev => ({
        ...prev,
        interests: updatedInterests
      }));
      setNewInterest('');
    //   toast.success('Interest added');
    } else if (profile.interests.includes(newInterest.trim())) {
    //   toast.error('Interest already exists');
    }
  };

  // Handle removing an interest
  const handleRemoveInterest = (interest: string) => {
    const updatedInterests = profile.interests.filter(item => item !== interest);
    setProfile(prev => ({
      ...prev,
      interests: updatedInterests
    }));
    // toast.success('Interest removed');
  };

  // Format join date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // Handle account deletion
  const handleDeleteAccount = () => {
    if (deleteConfirmText === 'DELETE') {
      // Simulate API call
      setTimeout(() => {
        // In a real app, you would redirect to logout page or login page
        alert('Account deleted successfully');
        setModalOpen(null);
        setDeleteConfirmText('');
      }, 800);
    }
  };

  // Handle data download
  const handleDataDownload = () => {
    // Simulate API call for data download
    setTimeout(() => {
      // In a real app, you would start the download process
      alert('Your data is being prepared and will be available for download soon.');
      setModalOpen(null);
    }, 800);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Profile Management</h1>
      
      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'profile' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile Information
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'password' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('password')}
        >
          Change Password
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'interests' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('interests')}
        >
          Interests
        </button>
      </div>
      
      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Profile Information</h2>
            <button
              className={`px-4 py-2 rounded ${isEditingProfile ? 'bg-gray-200 text-gray-800' : 'px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 '}`}
              onClick={() => setIsEditingProfile(!isEditingProfile)}
            >
              {isEditingProfile ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
          
          {isEditingProfile ? (
            <form onSubmit={handleProfileUpdate}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profileForm.name}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileForm.email}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                    disabled
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                  <input
                    type="text"
                    name="level"
                    value={profileForm.level}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
               
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    name="bio"
                    value={profileForm.bio}
                    onChange={handleProfileChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  className="px-4 py-2 mr-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsEditingProfile(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 mb-6 md:mb-0">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-32 h-32 rounded-full"
                />
                <div className="mt-4 text-sm text-gray-500">
                  Member since {formatDate(profile.joinDate)}
                </div>
              </div>
              
              <div className="md:w-2/3">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Name</h3>
                    <p className="mt-1">{profile.name}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="mt-1">{profile.email}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Level</h3>
                    <p className="mt-1">{profile.level || 'Not specified'}</p>
                  </div>
                  
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Bio</h3>
                    <p className="mt-1">{profile.bio || 'No bio provided yet.'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Password Tab */}
      {activeTab === 'password' && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Change Password</h2>
          </div>
          
          <form onSubmit={handlePasswordFormSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    formErrors.currentPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.currentPassword && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.currentPassword}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    formErrors.newPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.newPassword && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.newPassword}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    formErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.confirmPassword}</p>
                )}
              </div>
            </div>
            
            <div className="mt-6">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Update Password
              </button>
            </div>
          </form>
          
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-100 rounded-md">
            <h3 className="text-sm font-medium text-yellow-800">Password requirements:</h3>
            <ul className="mt-2 text-sm text-yellow-700 list-disc list-inside">
              <li>Minimum 8 characters long</li>
              <li>Include at least one uppercase letter</li>
              <li>Include at least one number</li>
              <li>Include at least one special character</li>
            </ul>
          </div>
        </div>
      )}
      
      {/* Interests Tab */}
      {activeTab === 'interests' && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Manage Interests</h2>
          </div>
          
          <div className="mb-6">
            <div className="flex">
              <input
                type="text"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                placeholder="Add a new interest"
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={handleAddInterest}
                disabled={!newInterest.trim()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 disabled:bg-indigo-300"
              >
                Add
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Your interests</h3>
            <div className="flex flex-wrap gap-2">
              {profile.interests.length > 0 ? (
                profile.interests.map((interest, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-indigo-50 text-indigo-800 px-3 py-1 rounded-full"
                  >
                    <span>{interest}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveInterest(interest)}
                      className="ml-2 text-indigo-600 hover:text-indigo-800 focus:outline-none"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">You haven't added any interests yet.</p>
              )}
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-indigo-50 border border-indigo-100 rounded-md">
            <p className="text-sm text-indigo-800">
              Your interests help us personalize your experience and suggest relevant content. They're also visible on your public profile.
            </p>
          </div>
        </div>
      )}
      
      {/* Account Danger Zone */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-red-200">
        <h2 className="text-xl font-semibold text-red-600 mb-4">Danger Zone</h2>
        <p className="text-gray-600 mb-4">
          Actions in this section can permanently affect your account. Please proceed with caution.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
            <div>
              <h3 className="font-medium">Delete Account</h3>
              <p className="text-sm text-gray-500">
                This will permanently delete your account and all associated data.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setModalOpen('deleteAccount')}
              className="px-4 py-2 bg-white border border-red-500 text-red-600 rounded-md hover:bg-red-50"
            >
              Delete Account
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
            <div>
              <h3 className="font-medium">Download Personal Data</h3>
              <p className="text-sm text-gray-500">
                Download a copy of your personal data and content.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setModalOpen('dataDownload')}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Request Data
            </button>
          </div>
        </div>
      </div>

      {/* Password Update Confirmation Modal */}
      {modalOpen === 'passwordUpdate' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Confirm Password Update</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to update your password? You will be logged out of all devices except this one.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setModalOpen(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePasswordReset}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Confirm Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      {modalOpen === 'deleteAccount' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-2 text-red-600">Delete Account</h3>
            <p className="text-gray-600 mb-4">
              This action is <span className="font-bold">permanent and irreversible</span>. All your data, posts, and personal information will be permanently deleted.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type "DELETE" to confirm
              </label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setModalOpen(null);
                  setDeleteConfirmText('');
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={deleteConfirmText !== 'DELETE'}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-300"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Data Download Confirmation Modal */}
      {modalOpen === 'dataDownload' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Request Data Download</h3>
            <p className="text-gray-600 mb-4">
              We'll prepare your personal data for download. This process may take up to 48 hours. You'll receive an email with a download link when your data is ready.
            </p>
            <div className="p-3 bg-blue-50 text-blue-700 text-sm rounded-md mb-4">
              The download link will be sent to: <strong>{profile.email}</strong>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setModalOpen(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDataDownload}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Request Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileManagementPage;