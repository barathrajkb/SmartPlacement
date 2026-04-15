import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function Settings() {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    college: '',
    gradYear: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    async function fetchProfile() {
      if (!currentUser) return;
      try {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfile({
            name: data.profile?.name || '',
            college: data.profile?.college || '',
            gradYear: data.profile?.gradYear || ''
          });
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [currentUser]);

  const handleSave = async () => {
    if (!currentUser) return;
    setSaving(true);
    setMessage({ text: '', type: '' });

    try {
      const docRef = doc(db, 'users', currentUser.uid);
      await setDoc(docRef, {
        profile: {
          name: profile.name,
          college: profile.college,
          gradYear: profile.gradYear
        }
      }, { merge: true });
      
      setMessage({ text: 'Settings updated successfully!', type: 'success' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (err) {
      console.error('Error saving profile:', err);
      setMessage({ text: 'Failed to save settings. Please try again.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-[900px] mx-auto animate-in fade-in duration-500">
      <h1 className="text-4xl font-extrabold text-on-surface mb-2">Settings</h1>
      <p className="text-on-surface-variant font-medium text-sm mb-10">Manage your account preferences and application configuration.</p>

      <div className="flex flex-col gap-6">
        {/* Profile Section */}
        <div className="bg-surface-container-low rounded-[24px] p-8 shadow-ambient border border-outline-variant/10">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><span className="material-symbols-outlined text-primary">person</span> Profile</h2>
          
          {message.text && (
            <div className={`mb-6 p-4 rounded-xl text-sm font-bold border ${message.type === 'success' ? 'bg-secondary/10 border-secondary/30 text-secondary' : 'bg-error/10 border-error/30 text-error'}`}>
              {message.text}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant ml-1">Full Name</label>
              <input 
                type="text" 
                value={profile.name} 
                onChange={e => setProfile({...profile, name: e.target.value})}
                placeholder="Full Name" 
                className="bg-surface-container-highest text-on-surface rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium border border-transparent" 
              />
            </div>
            
            <div className="flex flex-col gap-1.5 opacity-60">
              <label className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant ml-1">Email (Read-only)</label>
              <input 
                type="email" 
                value={currentUser?.email || ''} 
                readOnly
                className="bg-surface-container text-on-surface-variant rounded-xl px-4 py-3 text-sm focus:outline-none font-medium border border-transparent cursor-not-allowed" 
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant ml-1">University</label>
              <input 
                type="text" 
                value={profile.college} 
                onChange={e => setProfile({...profile, college: e.target.value})}
                placeholder="University" 
                className="bg-surface-container-highest text-on-surface rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium border border-transparent" 
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant ml-1">Graduation Year</label>
              <input 
                type="text" 
                value={profile.gradYear} 
                onChange={e => setProfile({...profile, gradYear: e.target.value})}
                placeholder="Graduation Year" 
                className="bg-surface-container-highest text-on-surface rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium border border-transparent" 
              />
            </div>
          </div>
          
          <button 
            onClick={handleSave} 
            disabled={saving}
            className="mt-6 bg-primary-container text-on-primary-container px-8 py-2.5 rounded-xl text-sm font-bold shadow-ambient hover:scale-105 transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 flex items-center gap-2"
          >
            {saving ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>

        {/* Notifications Section */}
        <div className="bg-surface-container-low rounded-[24px] p-8 shadow-ambient border border-outline-variant/10">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><span className="material-symbols-outlined text-secondary">notifications</span> Notifications</h2>
          <div className="flex flex-col gap-4">
            {['Email Notifications', 'Push Notifications', 'Weekly Progress Reports', 'Deadline Reminders'].map(pref => (
              <label key={pref} className="flex items-center justify-between p-4 bg-surface-container rounded-xl cursor-pointer hover:bg-surface-container-high transition-colors">
                <span className="text-sm font-semibold">{pref}</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary-container rounded" />
              </label>
            ))}
          </div>
        </div>

        {/* Appearance Section */}
        <div className="bg-surface-container-low rounded-[24px] p-8 shadow-ambient border border-outline-variant/10">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><span className="material-symbols-outlined text-tertiary">palette</span> Appearance</h2>
          <div className="flex gap-4">
            <div className="flex-1 p-4 bg-surface-container-lowest rounded-xl border-2 border-primary cursor-pointer text-center">
              <span className="material-symbols-outlined text-primary mb-2 block">dark_mode</span>
              <span className="text-sm font-bold text-primary">Dark Mode</span>
            </div>
            <div className="flex-1 p-4 bg-surface-container rounded-xl border border-outline-variant/10 cursor-pointer text-center opacity-50">
              <span className="material-symbols-outlined text-on-surface-variant mb-2 block">light_mode</span>
              <span className="text-sm font-bold text-on-surface-variant">Light Mode</span>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-error/5 border border-error/20 rounded-[24px] p-8 shadow-ambient">
          <h2 className="text-xl font-bold text-error mb-4 flex items-center gap-2"><span className="material-symbols-outlined">warning</span> Danger Zone</h2>
          <div className="flex gap-4">
            <button onClick={() => alert('All progress data has been reset.')} className="bg-surface-container text-error border border-error/30 px-4 py-2 rounded-xl text-sm font-bold hover:bg-error/10 transition-colors">Reset Progress</button>
            <button onClick={() => alert('Account deletion request submitted.')} className="bg-error/20 text-error border border-error/30 px-4 py-2 rounded-xl text-sm font-bold hover:bg-error/30 transition-colors">Delete Account</button>
          </div>
        </div>

        <Link to="/dashboard" className="text-sm font-bold text-primary hover:text-primary-container self-start mb-8">← Back to Dashboard</Link>
      </div>
    </div>
  );
}

