import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const skillLevels = ['Novice', 'Beginner', 'Intermediate', 'Competent', 'Expert'];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Step 1 state
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [gradYear, setGradYear] = useState('');
  const [language, setLanguage] = useState('');
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  // Step 2 state
  const [skills, setSkills] = useState<Record<string, number>>({
    'Data Structures': 3, 'System Design': 2, 'Logical Aptitude': 3, 'Core CS Concepts': 2, 'Communication': 4
  });
  const [domains, setDomains] = useState<Set<string>>(new Set(['Frontend', 'Backend']));

  // Step 3 state
  const [targetCompanies, setTargetCompanies] = useState<Set<string>>(new Set());
  const [companySearch, setCompanySearch] = useState('');

  // Step 4 state
  const [timeline, setTimeline] = useState('3 Months');
  const [studyHours, setStudyHours] = useState(4);
  const [learnStyle, setLearnStyle] = useState('Practice-heavy');
  const [interviewFocus, setInterviewFocus] = useState('All-Round');

  const handleNext = () => setStep(s => Math.min(s + 1, 4));
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));
  const handleFinish = async () => {
    if (currentUser) {
      try {
        await setDoc(doc(db, 'users', currentUser.uid), {
          profile: { name, college, gradYear, language, selectedTier },
          skills,
          domains: Array.from(domains),
          targetCompanies: Array.from(targetCompanies),
          preferences: { timeline, studyHours, learnStyle, interviewFocus }
        }, { merge: true });
      } catch (err) {
        console.error('Error saving onboarding data:', err);
        alert('There was an issue saving some of your preferences to the database, but you can continue to the application.');
      }
    }
    navigate('/dashboard');
  };

  const toggleDomain = (d: string) => {
    setDomains(prev => { const n = new Set(prev); n.has(d) ? n.delete(d) : n.add(d); return n; });
  };

  const toggleCompany = (c: string) => {
    setTargetCompanies(prev => { const n = new Set(prev); n.has(c) ? n.delete(c) : n.add(c); return n; });
  };

  const allCompanies = ['Google', 'Meta', 'Amazon', 'Microsoft', 'Apple', 'Flipkart', 'Swiggy', 'Zomato', 'Stripe', 'Netflix', 'Uber', 'Airbnb'];
  const filteredCompanies = allCompanies.filter(c => c.toLowerCase().includes(companySearch.toLowerCase()));

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col justify-center items-center font-sans text-on-surface p-6">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[100px] rounded-full pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

      <div className="w-full max-w-4xl z-10 relative">
        <div className="text-center mb-10 mt-8">
          <h1 className="text-5xl font-extrabold text-primary tracking-tight mb-4">SmartPlacement</h1>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">Configure your intelligence profile to generate a precision-engineered career roadmap.</p>
        </div>

        {/* Stepper */}
        <div className="mb-12 relative">
          <div className="absolute top-5 left-0 w-full h-[2px] bg-surface-container-highest rounded-full z-0"></div>
          <div className="absolute top-5 left-0 h-[2px] bg-primary transition-all duration-500 ease-in-out z-0" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
          <div className="flex justify-between relative z-10">
            {['Profile', 'Skills', 'Targets', 'Preferences'].map((label, idx) => {
              const num = idx + 1;
              const isActive = step === num;
              const isCompleted = step > num;
              return (
                <div key={num} className="flex flex-col items-center gap-3 cursor-pointer" onClick={() => num < step && setStep(num)}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 shadow-ambient ${isCompleted ? 'bg-secondary-container text-white' : isActive ? 'bg-primary-container text-on-primary-container ring-4 ring-primary-container/20' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                    {isCompleted ? <span className="material-symbols-outlined text-lg">check</span> : num}
                  </div>
                  <span className={`text-sm font-label tracking-wide ${isActive ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>{label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="min-h-[400px]">
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-7 bg-glass rounded-3xl p-8 border border-outline-variant/10 shadow-ambient flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-on-surface">Intelligence Profile</h2>
                <div className="flex flex-col gap-5">
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" className="w-full bg-surface-container-highest text-on-surface rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium placeholder:text-on-surface-variant" />
                  <input type="text" value={college} onChange={e => setCollege(e.target.value)} placeholder="College / University" className="w-full bg-surface-container-highest text-on-surface rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium placeholder:text-on-surface-variant" />
                  <div className="flex gap-4">
                    <input type="text" value={gradYear} onChange={e => setGradYear(e.target.value)} placeholder="Graduation Year" className="w-1/2 bg-surface-container-highest text-on-surface rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium placeholder:text-on-surface-variant" />
                    <select value={language} onChange={e => setLanguage(e.target.value)} className="w-1/2 bg-surface-container-highest text-on-surface rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium appearance-none">
                      <option value="" disabled>Primary Language</option>
                      <option>Python</option><option>Java</option><option>C++</option><option>JavaScript</option><option>Go</option><option>Rust</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="md:col-span-5 bg-surface-container-low rounded-3xl p-8 shadow-ambient flex flex-col gap-4">
                <h3 className="text-xl font-bold text-on-surface mb-2">Target Tier</h3>
                {['FAANG+', 'Product Companies', 'Service Companies', 'Startups'].map(tier => (
                  <button key={tier} onClick={() => setSelectedTier(tier)} className={`w-full text-left px-5 py-4 rounded-xl border transition-all flex justify-between items-center ${selectedTier === tier ? 'bg-primary-container/30 border-primary/50 text-primary' : 'bg-surface-container-high border-transparent text-on-surface-variant hover:bg-surface-container-highest'}`}>
                    <span className="font-semibold">{tier}</span>
                    {selectedTier === tier && <span className="material-symbols-outlined text-primary">check_circle</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-7 bg-surface-container-low rounded-3xl p-8 shadow-ambient border border-outline-variant/10">
                <h2 className="text-2xl font-bold text-on-surface flex items-center gap-3 mb-8">
                  <span className="material-symbols-outlined text-secondary">analytics</span> Skill Proficiency
                </h2>
                <div className="flex flex-col gap-6">
                  {Object.entries(skills).map(([skill, val]) => (
                    <div key={skill} className="flex flex-col gap-2">
                      <div className="flex justify-between items-end">
                        <span className="font-label uppercase tracking-widest text-[11px] text-on-surface-variant">{skill}</span>
                        <span className="text-primary font-bold text-sm">{skillLevels[val - 1]}</span>
                      </div>
                      <input type="range" min="1" max="5" value={val} onChange={e => setSkills(prev => ({ ...prev, [skill]: parseInt(e.target.value) }))} className="w-full accent-primary-container h-2 bg-surface-container-highest rounded-full cursor-pointer" />
                      <div className="flex justify-between text-[10px] uppercase font-mono text-outline"><span>Novice</span><span>Expert</span></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-5 bg-surface-container-low rounded-3xl p-8 shadow-ambient border border-outline-variant/10">
                <h3 className="text-xl font-bold text-on-surface mb-6">Domain Focus</h3>
                <div className="flex flex-wrap gap-3">
                  {['Frontend', 'Backend', 'Mobile', 'Data Science', 'ML/AI', 'Security', 'DevOps', 'Full Stack'].map(domain => (
                    <button key={domain} onClick={() => toggleDomain(domain)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${domains.has(domain) ? 'bg-primary-container text-on-primary-container shadow-[0_0_10px_rgba(79,70,229,0.3)]' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'}`}>
                      {domain}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-glass rounded-3xl p-8 border border-outline-variant/10 shadow-ambient h-full">
              <div className="relative mb-8">
                <span className="material-symbols-outlined absolute left-4 top-4 text-on-surface-variant">search</span>
                <input type="text" value={companySearch} onChange={e => setCompanySearch(e.target.value)} placeholder="Search target companies..." className="w-full bg-surface-container-highest text-on-surface rounded-full py-4 pl-12 pr-6 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium placeholder:text-on-surface-variant" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filteredCompanies.map(company => {
                  const sel = targetCompanies.has(company);
                  return (
                    <div key={company} onClick={() => toggleCompany(company)} className={`flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all border ${sel ? 'bg-primary/20 border-primary/30 shadow-ambient' : 'bg-surface-container text-on-surface-variant border-transparent hover:bg-surface-container-high'}`}>
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1 text-surface font-extrabold text-xs shadow-ambient">{company[0]}</div>
                      <div className="flex-1">
                        <div className={`font-bold ${sel ? 'text-on-surface' : ''}`}>{company}</div>
                        <div className="text-[10px] font-mono uppercase bg-surface-container-highest text-on-surface-variant inline-block px-1.5 rounded mt-1">FAANG+</div>
                      </div>
                      {sel && <span className="material-symbols-outlined text-secondary ml-auto text-[20px]">check_circle</span>}
                    </div>
                  );
                })}
              </div>
              {targetCompanies.size > 0 && (
                <p className="mt-4 text-sm text-secondary font-mono">{targetCompanies.size} companies selected</p>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-surface-container-low rounded-3xl p-8 border border-outline-variant/10">
                <h3 className="text-xl font-bold mb-6">Preparation Timeline</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['1 Month', '3 Months', '6 Months', '12 Months'].map(time => (
                    <div key={time} onClick={() => setTimeline(time)} className={`p-4 rounded-xl text-center cursor-pointer font-bold transition-all border ${timeline === time ? 'bg-primary-container/20 border-primary/50 text-primary' : 'bg-surface-container-high border-transparent text-on-surface-variant hover:bg-surface-container-highest'}`}>
                      {time}
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <div className="flex justify-between text-sm mb-2"><span>Daily Study Hours</span><span className="text-primary font-bold">{studyHours} hrs</span></div>
                  <input type="range" min="1" max="8" value={studyHours} onChange={e => setStudyHours(parseInt(e.target.value))} className="w-full accent-primary-container" />
                </div>
              </div>
              <div className="flex flex-col gap-8">
                <div className="bg-surface-container-low rounded-3xl p-8 border border-outline-variant/10">
                  <h3 className="text-xl font-bold mb-6">Preferred Style</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {['Visual', 'Reading', 'Practice-heavy', 'Mixed'].map(style => (
                      <div key={style} onClick={() => setLearnStyle(style)} className={`p-4 rounded-xl text-center cursor-pointer font-bold transition-all border ${learnStyle === style ? 'bg-primary-container/20 border-primary/50 text-primary' : 'bg-surface-container-high border-transparent text-on-surface-variant hover:bg-surface-container-highest'}`}>
                        {style}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-surface-container-low rounded-3xl p-8 border border-outline-variant/10">
                  <h3 className="text-xl font-bold mb-6">Interview Focus</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {['Coding', 'System Design', 'HR', 'All-Round'].map(focus => (
                      <div key={focus} onClick={() => setInterviewFocus(focus)} className={`p-4 rounded-xl text-center cursor-pointer font-bold transition-all border ${interviewFocus === focus ? 'bg-primary-container/20 border-primary/50 text-primary' : 'bg-surface-container-high border-transparent text-on-surface-variant hover:bg-surface-container-highest'}`}>
                        {focus}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 flex justify-between items-center border-t border-outline-variant/20 pt-6">
          {step > 1 ? (
            <button onClick={handlePrev} className="px-6 py-3 rounded-xl font-bold text-on-surface-variant hover:text-on-surface transition-colors">← Back</button>
          ) : <div></div>}
          <button onClick={step === 4 ? handleFinish : handleNext} className="px-8 py-3 rounded-xl bg-primary-container text-on-primary-container font-bold relative overflow-hidden group shadow-ambient hover:scale-105 transition-transform">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"></div>
            <span className="relative flex items-center gap-2">
              {step === 4 ? 'Generate My Roadmap' : 'Continue'} <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
