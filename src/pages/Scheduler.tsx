import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Scheduler() {
  const navigate = useNavigate();
  const [schedulerActive, setSchedulerActive] = useState(true);
  const [selectedDate, setSelectedDate] = useState(16);
  const [selectedCompany, setSelectedCompany] = useState('Any');
  const [selectedType, setSelectedType] = useState('Sys Design');
  const [selectedDuration, setSelectedDuration] = useState('45min');
  const [scheduled, setScheduled] = useState(false);

  const handleSchedule = () => {
    setScheduled(true);
    setTimeout(() => setScheduled(false), 4000);
    alert(`Mock Interview Scheduled!\n\nCompany: ${selectedCompany}\nType: ${selectedType}\nDuration: ${selectedDuration}\nDate: April ${selectedDate}, 2026`);
  };

  const dateEvents: Record<number, { time: string; title: string; subtitle: string; color: string; icon: string }[]> = {
    5: [{ time: '10:00', title: 'Application Deadline', subtitle: 'Netflix SWE Intern', color: 'border-l-error', icon: 'description' }],
    15: [{ time: 'All Day', title: 'Today — Review Day', subtitle: 'Roadmap Week 4 Checkpoint', color: 'border-l-primary', icon: 'flag' }],
    16: [
      { time: '15:00', title: 'Mock Interview: System Design', subtitle: 'Google Target', color: 'border-l-secondary', icon: 'psychology' },
      { time: '23:59', title: 'Application Deadline', subtitle: 'Stripe 2026 APM Cohort', color: 'border-l-tertiary', icon: 'description' }
    ],
    21: [{ time: '14:00', title: 'API Design Prep Session', subtitle: 'Stripe', color: 'border-l-primary', icon: 'code' }],
    25: [
      { time: '10:00', title: 'Behavioral Intro Mock', subtitle: 'Amazon LP Focus', color: 'border-l-tertiary', icon: 'groups' },
      { time: '16:00', title: 'System Design Practice', subtitle: 'General', color: 'border-l-primary', icon: 'architecture' },
      { time: '20:00', title: 'Study Group: Graphs', subtitle: 'Peer Session', color: 'border-l-secondary', icon: 'people' }
    ],
  };

  const eventDates = new Set(Object.keys(dateEvents).map(Number));

  return (
    <div className="p-8 pb-16 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-on-surface mb-2">Interview Scheduler</h1>
          <p className="text-on-surface-variant font-medium text-sm">Sync your roadmap with reality. Manage deadlines and mock sessions.</p>
        </div>
        <div className="bg-surface-container-low rounded-[20px] p-4 flex items-center gap-6 shadow-ambient border border-outline-variant/10 flex-wrap">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-secondary font-bold">Global Status</span>
            <span className="text-sm font-bold text-on-surface">{schedulerActive ? 'Ready for Mock Match' : 'Paused'}</span>
          </div>
          <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors relative ${schedulerActive ? 'bg-primary-container shadow-[0_0_10px_rgba(79,70,229,0.3)]' : 'bg-surface-container-highest'}`} onClick={() => setSchedulerActive(!schedulerActive)}>
            <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${schedulerActive ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </div>
          <div className="w-[1px] h-6 bg-outline-variant/30"></div>
          <div className="flex gap-2">
            <span className="bg-surface-container-highest px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-on-surface flex items-center gap-2 border border-outline-variant/10">Upcoming: <span className="text-secondary text-sm">3</span></span>
            <span className="bg-tertiary-container/20 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-tertiary flex items-center gap-2 border border-tertiary/20">Next: Tomorrow 3PM</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Calendar */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-low rounded-[32px] p-8 shadow-ambient border border-outline-variant/10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-4">
              <button className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors" onClick={() => alert('Would navigate to March 2026')}>chevron_left</button>
              April 2026
              <button className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors" onClick={() => alert('Would navigate to May 2026')}>chevron_right</button>
            </h2>
            <button onClick={() => setSelectedDate(15)} className="px-4 py-2 bg-surface-container-highest rounded-xl text-xs font-bold text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors">Today</button>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
              <div key={day} className="text-center font-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2">{day}</div>
            ))}
            <div className="aspect-square min-h-[80px]"></div>
            <div className="aspect-square min-h-[80px]"></div>
            {Array.from({length: 30}).map((_, i) => {
              const date = i + 1;
              const isToday = date === 15;
              const isSelected = date === selectedDate;
              const hasEvents = eventDates.has(date);
              const evts = dateEvents[date] || [];
              return (
                <div key={i} onClick={() => setSelectedDate(date)}
                  className={`aspect-square min-h-[80px] rounded-2xl p-2 flex flex-col justify-between transition-all cursor-pointer border ${
                    isToday ? 'bg-primary-container text-on-primary-container border-primary-container shadow-[0_0_15px_rgba(79,70,229,0.3)]' :
                    isSelected ? 'bg-surface-container-high border-primary/50 shadow-ambient ring-2 ring-primary/20' :
                    'bg-surface-container border-transparent hover:border-outline-variant/30 hover:bg-surface-container-high'
                  }`}>
                  <span className={`text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full ${isToday ? 'bg-white/20' : ''}`}>{date}</span>
                  <div className="flex flex-wrap gap-1 mt-auto overflow-hidden">
                    {evts.slice(0, 2).map((ev, idx) => (
                      <div key={idx} className={`w-2 h-2 rounded-full ${isToday ? 'bg-white' : ev.color.replace('border-l-', 'bg-')}`}></div>
                    ))}
                    {evts.length > 2 && <div className={`text-[8px] font-mono font-bold ${isToday ? 'text-white' : 'text-on-surface-variant'}`}>+{evts.length - 2}</div>}
                    {!hasEvents && <div></div>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Date Detail */}
          <div className="mt-8 bg-surface-container rounded-2xl p-5 border border-outline-variant/10 shadow-inner flex flex-col gap-4">
            <h3 className="text-sm font-mono tracking-widest uppercase font-bold text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">event</span> April {selectedDate}, 2026
            </h3>
            {(dateEvents[selectedDate] || []).length === 0 ? (
              <div className="text-center py-6 text-on-surface-variant text-sm font-medium">
                <span className="material-symbols-outlined text-[32px] block mb-2 opacity-30">event_busy</span>
                No events scheduled for this day.
                <button onClick={() => alert('Would open the schedule form for this date.')} className="block mx-auto mt-3 text-primary font-bold text-xs">+ Add Event</button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {(dateEvents[selectedDate] || []).map((evt, ei) => (
                  <div key={ei} className={`flex items-center gap-4 bg-surface-container-low p-3 rounded-xl ${evt.color} border-l-4`}>
                    <span className="font-mono text-xs text-on-surface-variant w-14">{evt.time}</span>
                    <div className={`w-8 h-8 rounded-full ${evt.color.replace('border-l-', 'bg-')}/10 flex items-center justify-center ${evt.color.replace('border-l-', 'text-')}`}>
                      <span className="material-symbols-outlined text-[16px]">{evt.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-on-surface">{evt.title}</h4>
                      <div className="text-[10px] uppercase font-mono text-on-surface-variant mt-0.5">{evt.subtitle}</div>
                    </div>
                    {evt.icon === 'psychology' && (
                      <button onClick={() => navigate('/mock-interview')} className="text-xs font-bold bg-secondary-container/20 text-secondary border border-secondary/30 px-3 py-1.5 rounded-lg hover:bg-secondary/10 transition-colors">Join</button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          {/* Schedule Form */}
          <div className="bg-surface-container-low rounded-[32px] p-6 shadow-ambient border border-outline-variant/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-2xl rounded-full pointer-events-none"></div>
            {scheduled && (
              <div className="bg-secondary/10 border border-secondary/30 text-secondary rounded-xl p-3 mb-4 text-sm font-bold flex items-center gap-2 animate-in relative z-10">
                <span className="material-symbols-outlined text-[18px]">check_circle</span> Session scheduled successfully!
              </div>
            )}
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10">
              <span className="material-symbols-outlined text-primary">add_circle</span> Schedule Session
            </h3>
            <div className="flex flex-col gap-5 relative z-10">
              <select value={selectedCompany} onChange={e => setSelectedCompany(e.target.value)} className="bg-surface-container-highest text-on-surface p-3.5 rounded-xl border-none focus:ring-1 focus:ring-primary text-sm font-medium appearance-none focus:outline-none">
                <option value="Any">Target Company: Any</option>
                <option value="Google">Target Company: Google</option>
                <option value="Meta">Target Company: Meta</option>
                <option value="Apple">Target Company: Apple</option>
                <option value="Stripe">Target Company: Stripe</option>
                <option value="Amazon">Target Company: Amazon</option>
              </select>
              <div>
                <label className="text-[10px] uppercase font-mono text-on-surface-variant font-bold tracking-widest mb-2 block">Interview Type</label>
                <div className="flex flex-wrap gap-2">
                  {['DSA', 'Sys Design', 'Behavioral', 'Mixed'].map(t => (
                    <button key={t} onClick={() => setSelectedType(t)} className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${selectedType === t ? 'bg-primary-container text-on-primary-container border-primary/50' : 'bg-surface-container-highest text-on-surface border-transparent hover:border-outline-variant/30'}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase font-mono text-on-surface-variant font-bold tracking-widest mb-2 block">Duration</label>
                <div className="flex gap-2">
                  {['30min', '45min', '60min'].map(d => (
                    <button key={d} onClick={() => setSelectedDuration(d)} className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors ${selectedDuration === d ? 'bg-surface-container-highest text-primary border-primary/40' : 'bg-surface-container text-on-surface-variant border-transparent hover:bg-surface-container-highest'}`}>{d}</button>
                  ))}
                </div>
              </div>
              <button onClick={handleSchedule} className="w-full bg-primary-container text-on-primary-container font-bold py-3.5 rounded-xl mt-2 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:scale-105 transition-transform">
                Schedule Session <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className="bg-surface-container-low rounded-[32px] p-6 shadow-ambient border border-outline-variant/10">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-[22px]">calendar_month</span> Upcoming</h3>
            <div className="flex flex-col gap-4">
              {[
                { date: 'Apr 16', title: 'System Design Mock', cmp: 'Google', badge: 'text-secondary' },
                { date: 'Apr 21', title: 'API Design Prep', cmp: 'Stripe', badge: 'text-primary' },
                { date: 'Apr 25', title: 'Behavioral Intro', cmp: 'Amazon', badge: 'text-tertiary' }
              ].map((s, i) => (
                <div key={i} onClick={() => setSelectedDate(parseInt(s.date.split(' ')[1]))} className="flex gap-4 items-start group cursor-pointer hover:bg-surface-container rounded-xl p-2 -mx-2 transition-colors">
                  <div className={`text-[10px] font-mono tracking-widest font-bold py-1 px-2 rounded-lg bg-surface-container-highest shrink-0 mt-0.5 ${s.badge}`}>{s.date}</div>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">{s.title}</h4>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-on-surface-variant mt-1 uppercase tracking-wider">
                      <span className="material-symbols-outlined text-[12px]">corporate_fare</span> {s.cmp}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Application Pipeline */}
          <div className="bg-tertiary-container/10 rounded-[32px] p-6 shadow-ambient border border-tertiary/20 relative overflow-hidden flex-1 min-h-[180px]">
            <span className="material-symbols-outlined absolute -right-6 -bottom-6 text-[100px] text-tertiary opacity-5">timer</span>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-tertiary"><span className="material-symbols-outlined text-[20px]">timer</span> Application Pipeline</h3>
            <div className="flex flex-col gap-2">
              {[
                { name: 'Meta APM', status: 'Screening', statusColor: 'bg-tertiary-container text-tertiary border-tertiary/30' },
                { name: 'Google SWE L4', status: 'Interview', statusColor: 'bg-secondary-container/20 text-secondary border-secondary/30' },
                { name: 'Apple SWE', status: 'Applied', statusColor: 'bg-surface-container-highest text-on-surface-variant border-transparent' },
              ].map((app, i) => (
                <div key={i} onClick={() => navigate('/companies')} className="flex items-center justify-between bg-surface-container/50 p-2 rounded-xl text-xs font-bold border border-outline-variant/10 backdrop-blur-md cursor-pointer hover:bg-surface-container transition-colors">
                  <span className="text-on-surface">{app.name}</span>
                  <span className={`${app.statusColor} px-2 py-0.5 rounded text-[9px] uppercase font-mono border`}>{app.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
