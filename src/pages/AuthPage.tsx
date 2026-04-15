import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isLogin && password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    setIsLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
        navigate('/dashboard');
      } else {
        await signup(email, password);
        navigate('/onboarding');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to authenticate');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col justify-center items-center font-sans p-6 text-on-surface">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[100px] rounded-full pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

      <div className="w-full max-w-md z-10 relative">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-primary tracking-tight mb-2">SmartPlacement</h1>
          <p className="text-on-surface-variant">Your career intelligence platform.</p>
        </div>

        <div className="bg-surface-container-low rounded-3xl p-8 shadow-ambient border border-outline-variant/20 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-3xl rounded-full pointer-events-none"></div>
          
          <div className="flex mb-8 bg-surface-container-highest p-1 rounded-xl">
            <button 
              type="button"
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${isLogin ? 'bg-primary-container text-on-primary-container shadow-md' : 'text-on-surface-variant hover:text-on-surface'}`}
              onClick={() => { setIsLogin(true); setError(''); }}
            >
              Sign In
            </button>
            <button 
              type="button"
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${!isLogin ? 'bg-primary-container text-on-primary-container shadow-md' : 'text-on-surface-variant hover:text-on-surface'}`}
              onClick={() => { setIsLogin(false); setError(''); }}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
            {error && (
              <div className="bg-error/20 text-error p-3 rounded-xl text-sm border border-error/30 text-center font-medium">
                {error}
              </div>
            )}
            
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-on-surface-variant ml-1">Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-3.5 text-outline-variant text-[20px]">mail</span>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface-container text-on-surface rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium border border-transparent focus:border-primary/30"
                  placeholder="name@university.edu"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-on-surface-variant ml-1">Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-3.5 text-outline-variant text-[20px]">lock</span>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface-container text-on-surface rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium border border-transparent focus:border-primary/30"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div className="flex flex-col gap-1.5 animate-in slide-in-from-top-2 fade-in duration-300">
                <label className="text-sm font-bold text-on-surface-variant ml-1">Confirm Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-3.5 text-outline-variant text-[20px]">lock_reset</span>
                  <input 
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-surface-container text-on-surface rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium border border-transparent focus:border-primary/30"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="mt-4 w-full py-3.5 bg-primary-container text-on-primary-container rounded-xl font-bold relative overflow-hidden group shadow-ambient disabled:opacity-70 transition-transform active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"></div>
              <span className="relative flex items-center justify-center gap-2">
                {isLoading ? (
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </>
                )}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
