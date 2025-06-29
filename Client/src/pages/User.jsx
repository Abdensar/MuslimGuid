
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../components/Mainn';
// import { updateProfile } from '../../../server/services/UserService';

export default function User() {
 const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    location: { city: '', arabicName: '' },
    prayerNotifications: [],
    favorites: { adkar: [], hadith: [] }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        location: user.location || { city: '', arabicName: '' },
        prayerNotifications: user.prayerNotifications || [],
        favorites: user.favorites || { adkar: [], hadith: [] }
      });
      setIsLoading(false);
    }
  }, [user]);

  const handleSave = async () => {
    setSaveStatus('saving');
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setSaveStatus('success');
        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        throw new Error('Save failed');
      }
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dark-yellow"></div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-blue-sidebar rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-dark-yellow mb-6">User Profile</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-white mb-1">Name</label>
          <input
            value={user.name}
            onChange={(e) => setUser({...user, name: e.target.value})}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-dark-yellow"
          />
        </div>
        
        <div>
          <label className="block text-white mb-1">City</label>
          <select
            value={user.city}
            onChange={(e) => setUser({...user, city: e.target.value})}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-dark-yellow"
          >
            <option value="Rabat">Rabat</option>
            <option value="Casablanca">Casablanca</option>
            <option value="Fes">Fes</option>
            <option value="Marrakech">Marrakech</option>
          </select>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="prayerNotifications"
            checked={user.prayerNotifications}
            onChange={(e) => setUser({...user, prayerNotifications: e.target.checked})}
            className="h-4 w-4 text-dark-yellow focus:ring-dark-yellow"
          />
          <label htmlFor="prayerNotifications" className="ml-2 text-white">
            Enable Prayer Notifications
          </label>
        </div>
        
        <div>
          <label className="block text-white mb-1">Preferred Adhan</label>
          <select
            value={user.preferredAdhan}
            onChange={(e) => setUser({...user, preferredAdhan: e.target.value})}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-dark-yellow"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <option key={num} value={num.toString()}>Adhan {num}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="mt-6 flex items-center justify-between">
        <button 
          onClick={handleSave}
          className="px-4 py-2 bg-dark-yellow hover:bg-arrow-yellow text-white rounded-lg"
        >
          Save Profile
        </button>
        
        {saveStatus === 'saving' && (
          <span className="text-gray-300">Saving...</span>
        )}
        {saveStatus === 'success' && (
          <span className="text-green-400">Profile saved!</span>
        )}
        {saveStatus === 'error' && (
          <span className="text-red-400">Failed to save</span>
        )}
      </div>
    </div>
  );
}
