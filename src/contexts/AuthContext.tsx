import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

interface UserData {
  profile?: {
    name: string;
    college: string;
    gradYear: string;
    language: string;
    selectedTier: string;
  };
  skills?: Record<string, number>;
  domains?: string[];
  targetCompanies?: string[];
  preferences?: {
    timeline: string;
    studyHours: number;
    learnStyle: string;
    interviewFocus: string;
  };
  stats?: {
    streak: number;
    totalHours: number;
    activity: number[]; // Simulated heatmap data
  };
}

interface AuthContextType {
  currentUser: User | null;
  userData: UserData | null;
  loading: boolean;
  signup: (email: string, pass: string) => Promise<any>;
  login: (email: string, pass: string) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Helper to generate simulated activity data for new users
const generateSimulatedActivity = () => {
  return Array.from({ length: 52 * 7 }).map(() => Math.random());
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const signup = (email: string, pass: string) => createUserWithEmailAndPassword(auth, email, pass);
  const login = (email: string, pass: string) => signInWithEmailAndPassword(auth, email, pass);
  const logout = () => signOut(auth);

  useEffect(() => {
    let unsubscribeDoc: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Real-time sync with Firestore user document
        unsubscribeDoc = onSnapshot(doc(db, 'users', user.uid), (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data() as UserData;
            // Ensure stats exist for simulated visuals
            if (!data.stats) {
              data.stats = {
                streak: 14,
                totalHours: 126,
                activity: generateSimulatedActivity()
              };
            }
            setUserData(data);
          } else {
            setUserData(null);
          }
          setLoading(false);
        }, (error) => {
          console.error("Firestore sync error:", error);
          setLoading(false);
        });
      } else {
        setUserData(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeDoc) unsubscribeDoc();
    };
  }, []);

  const value = {
    currentUser,
    userData,
    loading,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
