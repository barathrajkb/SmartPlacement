import { useState } from 'react';

export default function ResumeBuilder() {
  const [activeSection, setActiveSection] = useState('summary');
  const [showPreview, setShowPreview] = useState(false);
  const [name, setName] = useState('Alex L.');
  const [email, setEmail] = useState('alex@example.com');
  const [phone, setPhone] = useState('+1 (555) 123-4567');
  const [summary, setSummary] = useState('Senior Software Engineer with 4 years of experience building scalable microservices...');
  const [skills, setSkills] = useState(['React', 'Node.js', 'Go', 'Kubernetes', 'AWS', 'PostgreSQL', 'Redis']);
  const [newSkill, setNewSkill] = useState('');
  const [enhancedSections, setEnhancedSections] = useState<Set<string>>(new Set());
  const [appliedFixes, setAppliedFixes] = useState<Set<number>>(new Set());

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills(prev => [...prev, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (s: string) => setSkills(prev => prev.filter(x => x !== s));

  const handleEnhance = (section: string) => {
    setEnhancedSections(prev => { const n = new Set(prev); n.add(section); return n; });
    if (section === 'summary') {
      setSummary('Results-driven Senior Software Engineer with 4+ years of experience architecting and deploying high-throughput microservices processing 2M+ daily requests. Expert in distributed systems, container orchestration, and cloud-native development. Proven track record of reducing system latency by 40% and improving deployment frequency by 3x through CI/CD automation.');
    }
    alert(`AI Enhanced! Your ${section} section has been rewritten for maximum impact.`);
  };

  const handleDownload = () => alert('Generating professional PDF resume...\n\nYour resume will be downloaded as "Alex_L_Resume.pdf"');

  const applyFix = (i: number) => {
    setAppliedFixes(prev => { const n = new Set(prev); n.add(i); return n; });
    if (i === 0) handleEnhance('experience');
    if (i === 1) handleEnhance('summary');
  };

  const suggestions = [
    { icon: 'speed', text: 'Quantify bullet points under Work Experience. Add metrics like % improvements.', resolved: false },
    { icon: 'spellcheck', text: 'Passive voice detected in summary. Use action verbs like "Architected", "Deployed".', resolved: false },
    { icon: 'check_circle', text: 'Contact info is complete and ATS parsable.', resolved: true },
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto h-[calc(100vh-4rem)] flex flex-col">
      {/* Full Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 bg-primary-container/20 backdrop-blur-2xl flex items-center justify-center p-8" onClick={() => setShowPreview(false)}>
          <div className="bg-white rounded-[32px] p-12 max-w-[700px] w-full max-h-[90vh] overflow-y-auto shadow-ambient text-gray-900 relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowPreview(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"><span className="material-symbols-outlined">close</span></button>
            <h1 className="text-2xl font-extrabold text-gray-900 mb-1">{name}</h1>
            <p className="text-sm text-gray-500 mb-6">{email} • {phone}</p>
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-700 border-b border-gray-200 pb-1 mb-3">Professional Summary</h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-6">{summary}</p>
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-700 border-b border-gray-200 pb-1 mb-3">Technical Skills</h2>
            <div className="flex flex-wrap gap-2 mb-6">{skills.map(s => <span key={s} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">{s}</span>)}</div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-700 border-b border-gray-200 pb-1 mb-3">Work Experience</h2>
            <p className="text-sm text-gray-500 italic">Add your work experience entries in the editor.</p>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex justify-between items-end mb-8 shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded">AI-Powered</span>
            <span className="text-xs text-on-surface-variant font-mono">Last autosave: 2 mins ago</span>
          </div>
          <h1 className="text-3xl font-extrabold text-on-surface flex items-center group">
            Senior Software Engineer <span className="bg-primary/50 w-3 h-8 ml-1 inline-block animate-pulse"></span>
          </h1>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setShowPreview(true)} className="flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-on-surface px-4 py-2 hover:bg-surface-container rounded-xl transition-colors">
            <span className="material-symbols-outlined text-[20px]">visibility</span> Preview
          </button>
          <button onClick={handleDownload} className="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-xl text-sm font-bold shadow-ambient hover:scale-105 transition-transform">
            Download PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 flex-1 overflow-hidden min-h-0">
        {/* Left Editor */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-low rounded-[32px] p-8 shadow-ambient overflow-y-auto border border-outline-variant/10 relative">
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none rounded-t-[32px]"></div>
          <div className="flex items-center gap-6 mb-12 relative z-10">
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-outline-variant/50 flex flex-col items-center justify-center text-outline-variant cursor-pointer hover:border-primary hover:text-primary transition-colors bg-surface-container-lowest shadow-ambient" onClick={() => alert('Photo upload dialog would open here.')}>
              <span className="material-symbols-outlined text-[28px] mb-1">photo_camera</span>
              <span className="text-[10px] font-mono uppercase">Upload</span>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="col-span-2 bg-surface-container-highest rounded-xl p-3 text-sm focus:ring-1 focus:ring-primary w-full border-none focus:outline-none" />
              <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="bg-surface-container-highest rounded-xl p-3 text-sm focus:ring-1 focus:ring-primary w-full border-none focus:outline-none" />
              <input type="text" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} className="bg-surface-container-highest rounded-xl p-3 text-sm focus:ring-1 focus:ring-primary w-full border-none focus:outline-none" />
            </div>
          </div>
          <div className="flex flex-col gap-4 relative z-10">
            {[
              { id: 'summary', title: 'Professional Summary' },
              { id: 'experience', title: 'Work Experience' },
              { id: 'education', title: 'Education' },
              { id: 'skills', title: 'Technical Skills' },
              { id: 'projects', title: 'Projects' }
            ].map(section => (
              <div key={section.id} className="bg-surface-container rounded-2xl overflow-hidden border border-outline-variant/5 shadow-sm transition-all group">
                <div className="p-5 flex justify-between items-center cursor-pointer hover:bg-surface-container-highest transition-colors" onClick={() => setActiveSection(activeSection === section.id ? '' : section.id)}>
                  <h2 className="font-bold text-lg flex items-center gap-2">
                    {section.title}
                    {enhancedSections.has(section.id) && <span className="text-secondary text-xs font-mono">✨ Enhanced</span>}
                  </h2>
                  <div className="flex items-center gap-3">
                    <button onClick={e => { e.stopPropagation(); handleEnhance(section.id); }} className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 px-2 py-1 rounded text-[10px] font-bold tracking-widest uppercase flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      AI Enhance ✨
                    </button>
                    <span className={`material-symbols-outlined transition-transform ${activeSection === section.id ? 'rotate-180' : ''}`}>expand_more</span>
                  </div>
                </div>
                {activeSection === section.id && (
                  <div className="p-5 pt-0 border-t border-outline-variant/10">
                    {section.id === 'summary' && (
                      <textarea className="w-full min-h-[120px] bg-surface-container-lowest rounded-xl p-4 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed font-medium" value={summary} onChange={e => setSummary(e.target.value)} />
                    )}
                    {section.id === 'skills' && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {skills.map(skill => (
                          <span key={skill} className="bg-surface-container-highest px-3 py-1.5 rounded-lg text-sm font-medium flex gap-2 items-center border border-outline-variant/20 hover:bg-surface-bright cursor-pointer">
                            {skill} <span onClick={() => removeSkill(skill)} className="material-symbols-outlined text-[14px] text-on-surface-variant hover:text-error cursor-pointer">close</span>
                          </span>
                        ))}
                        <input type="text" placeholder="Add skill..." value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyDown={e => e.key === 'Enter' && addSkill()} className="bg-transparent border-none text-sm w-32 focus:outline-none focus:ring-0 px-2" />
                      </div>
                    )}
                    {['experience', 'education', 'projects'].includes(section.id) && (
                      <div onClick={() => alert(`Add ${section.title} entry form would appear here with fields for title, dates, description, etc.`)} className="py-4 text-center text-on-surface-variant text-sm font-mono border-2 border-dashed border-outline-variant/20 rounded-xl cursor-pointer hover:border-primary/50 transition-colors">
                        + Add Entry
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 overflow-y-auto">
          {/* Resume Preview Card */}
          <div className="bg-surface-container rounded-[32px] p-6 shadow-ambient border border-outline-variant/10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Live Preview</h3>
              <button onClick={() => setShowPreview(true)} className="text-[11px] font-mono tracking-widest uppercase text-primary font-bold hover:text-primary-container">Full Preview →</button>
            </div>
            <div onClick={() => setShowPreview(true)} className="bg-white rounded-xl aspect-[1/1.4] w-full p-4 shadow-lg overflow-hidden border-[4px] border-surface-container-highest cursor-zoom-in hover:border-primary/30 transition-colors shrink-0">
              <div className="h-2 w-1/3 bg-gray-300 rounded mb-4 mx-auto"></div>
              <div className="flex justify-center gap-2 mb-6"><div className="h-1 w-8 bg-gray-200 rounded"></div><div className="h-1 w-8 bg-gray-200 rounded"></div></div>
              <div className="h-1.5 w-1/4 bg-blue-500/50 rounded mb-2"></div>
              <div className="space-y-1 mb-6"><div className="h-1 w-full bg-gray-200 rounded"></div><div className="h-1 w-5/6 bg-gray-200 rounded"></div></div>
              <div className="h-1.5 w-1/4 bg-blue-500/50 rounded mb-2"></div>
              <div className="flex gap-1 flex-wrap mb-4">{skills.slice(0, 6).map((_, i) => <div key={i} className="h-2 w-6 bg-gray-200 rounded"></div>)}</div>
            </div>
          </div>

          {/* ATS Score */}
          <div className="bg-surface-container-low rounded-[24px] p-6 shadow-ambient border border-outline-variant/10">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-lg">ATS Match</h3>
              <div className="text-3xl font-extrabold text-secondary">88%</div>
            </div>
            <div className="text-xs text-on-surface-variant font-medium mb-4">Keyword Match for "Senior Backend Engineer"</div>
            <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-secondary w-[88%]"></div>
            </div>
          </div>

          {/* AI Suggestions */}
          <div className="flex-1 min-h-0 bg-primary-container/10 border border-primary/20 rounded-[32px] p-6 shadow-ambient flex flex-col">
            <h3 className="font-bold mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-[20px] text-primary">auto_fix_high</span> AI Optimization Score</h3>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-3 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all" style={{width: `${73 + appliedFixes.size * 9}%`}}></div>
              </div>
              <span className="text-sm font-bold text-primary">{73 + appliedFixes.size * 9}%</span>
            </div>
            <div className="overflow-y-auto flex-1 space-y-3 pr-2">
              {suggestions.map((s, i) => {
                const resolved = s.resolved || appliedFixes.has(i);
                return (
                  <div key={i} className={`p-4 rounded-2xl border ${resolved ? 'bg-secondary/5 border-secondary/20 opacity-60' : 'bg-surface-container border-outline-variant/10 hover:border-primary/30'} flex flex-col transition-colors`}>
                    <div className="flex gap-3 items-start mb-3">
                      <span className={`material-symbols-outlined text-[18px] mt-0.5 ${resolved ? 'text-secondary' : 'text-primary'}`}>{resolved ? 'check_circle' : s.icon}</span>
                      <span className="text-sm leading-snug text-on-surface-variant font-medium">{s.text}</span>
                    </div>
                    {!resolved && (
                      <button onClick={() => applyFix(i)} className="text-[10px] uppercase font-mono tracking-widest text-primary self-end font-bold px-3 py-1.5 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors">Apply Fix</button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
