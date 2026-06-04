import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Target, FileText, Award, ArrowRight, ArrowLeft, CheckCircle, AlertTriangle, RefreshCw, User, Plus, Trash2, Info, ChevronLeft, ChevronRight, LayoutDashboard, X, ExternalLink, PieChart, Users, CheckCircle2, ChevronDown, ChevronUp, RotateCcw, Triangle, Search, Pencil, Edit2, Layers } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import html2pdf from 'html2pdf.js';
import { LEARNING_OUTCOMES, EVL_1_FYSIO, THE_4_PS, PType, TRIANGLE_THEORY, MISALIGNMENT_THEORY, AFSTUDEERONDERZOEK_DEFAULT_PORTFOLIO } from './data';

interface Evidence {
  id: string;
  name: string;
  type: PType;
  stakeholders: string;
}

interface LOPart {
  id: string;
  text: string;
  evidence: Evidence[];
  colorClass: string;
}

const HIGHLIGHT_COLORS = [
  'bg-yellow-200 text-yellow-900',
  'bg-green-200 text-green-900',
  'bg-pink-200 text-pink-900',
  'bg-blue-200 text-blue-900',
  'bg-orange-200 text-orange-900',
  'bg-teal-200 text-teal-900',
  'bg-indigo-200 text-indigo-900',
];

export default function App() {
  const [step, setStep] = useState(0);
  const [currentLOId, setCurrentLOId] = useState<string | null>(null);
  const [portfolio, setPortfolio] = useState<Record<string, LOPart[]>>({});
  const [learningOutcomes, setLearningOutcomes] = useState<{id: string, text: string}[]>([]);
  const [evlName, setEvlName] = useState("Afstudeeronderzoek");
  const [targetPartId, setTargetPartId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const goToDashboard = () => {
    setStep(1);
    setCurrentLOId(null);
    setTargetPartId(null);
  };

  const startLO = (id: string, partId?: string) => {
    setCurrentLOId(id);
    if (!portfolio[id]) {
      setPortfolio(prev => ({ ...prev, [id]: [] }));
    }
    if (partId) {
      setTargetPartId(partId);
      setStep(3);
    } else {
      setTargetPartId(null);
      setStep(2);
    }
  };

  const updateParts = (id: string, parts: LOPart[]) => {
    setPortfolio(prev => ({ ...prev, [id]: parts }));
  };

  const updateLO = (oldId: string, newId: string, text: string) => {
    setLearningOutcomes(prev => prev.map(lo => lo.id === oldId ? { ...lo, id: newId, text } : lo));
    if (oldId !== newId && portfolio[oldId]) {
      setPortfolio(prev => {
        const next = { ...prev };
        next[newId] = next[oldId];
        delete next[oldId];
        return next;
      });
      if (currentLOId === oldId) {
        setCurrentLOId(newId);
      }
    }
  };

  const restartAnalysis = () => {
    if (window.confirm("Weet je zeker dat je de hele analyse wilt wissen en opnieuw wilt beginnen?")) {
      setPortfolio({});
      setCurrentLOId(null);
      setStep(0);
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-[var(--color-accent)] selection:text-white pb-20">
      <header className="glass-header sticky top-0 z-10 border-b border-black/5 bg-white/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[var(--color-accent)] font-extrabold text-xl tracking-tight cursor-pointer" onClick={() => setStep(0)}>
            <Target className="w-6 h-6" />
            <span>4Portfolio</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-3 text-sm font-medium">
             <button onClick={() => setStep(0)} className={`hover:text-[var(--color-accent)] transition-colors flex items-center ${step === 0 ? 'text-[var(--color-accent)] font-bold' : 'opacity-60'}`}>
               1. Start
             </button>
             
             {Object.keys(portfolio).length > 0 && (
               <>
                 <ChevronRight className="w-3 h-3 opacity-30" />
                 <button onClick={goToDashboard} className={`hover:text-[var(--color-accent)] transition-colors flex items-center ${step === 1 ? 'text-[var(--color-accent)] font-bold' : 'opacity-60'}`}>
                   2. LUK Overzicht
                 </button>
               </>
             )}
             
             {(step === 2 || step === 3) && currentLOId && (
               <>
                 <ChevronRight className="w-3 h-3 opacity-30" />
                 <button onClick={() => setStep(2)} className={`hover:text-[var(--color-accent)] transition-colors flex items-center ${step === 2 ? 'text-[var(--color-accent)] font-bold' : 'opacity-60'}`}>
                   3. Opsplitsen
                 </button>
                 <ChevronRight className="w-3 h-3 opacity-30" />
                 <button onClick={() => setStep(3)} className={`hover:text-[var(--color-accent)] transition-colors flex items-center ${step === 3 ? 'text-[var(--color-accent)] font-bold' : 'opacity-60'}`}>
                   4. Bewijs Ontwerpen
                 </button>
               </>
             )}
             
             {(step === 4 || (Object.keys(portfolio).length > 0 && portfolio[Object.keys(portfolio)[0]])) && (
               <>
                 <ChevronRight className="w-3 h-3 opacity-30" />
                 <button onClick={() => setStep(4)} className={`hover:text-[var(--color-accent)] transition-colors flex items-center ${step === 4 ? 'text-[var(--color-accent)] font-bold' : 'opacity-60'}`}>
                   {step === 2 || step === 3 ? '5' : '3'}. <span className="text-[var(--color-accent)] mx-1">4P</span> Analyse
                 </button>
               </>
             )}
          </nav>

          <div className="flex gap-1 md:hidden">
            {[0, 1, 2, 3, 4].map(i => (
              <div 
                key={i} 
                className={`h-2 w-3 rounded-full transition-colors duration-300 ${i <= step ? 'bg-[var(--color-accent)]' : 'bg-black/10'}`}
              />
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {step === 0 && <Theory key="theory" onNext={() => setStep(1)} />}
          {step === 1 && (
            <Dashboard 
              key="dashboard" 
              portfolio={portfolio}
              setPortfolio={setPortfolio}
              learningOutcomes={learningOutcomes}
              setLearningOutcomes={setLearningOutcomes}
              evlName={evlName}
              setEvlName={setEvlName}
              onStartLO={startLO} 
              onViewTotal={() => setStep(4)}
              onBack={() => setStep(0)}
              onRestart={restartAnalysis}
              updateLO={updateLO}
            />
          )}
          {step === 2 && currentLOId && (
            (() => {
              const idx = learningOutcomes.findIndex(l => l.id === currentLOId);
              if (idx === -1) {
                 return (
                    <div className="p-20 text-center flex flex-col items-center">
                       <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
                       <h2 className="text-xl font-bold mb-2">Leeruitkomst niet gevonden</h2>
                       <button onClick={goToDashboard} className="btn-secondary px-6 py-2 mt-4">Ga terug naar dashboard</button>
                    </div>
                 );
              }
              const hasPrev = idx > 0;
              const hasNext = idx < learningOutcomes.length - 1;
              return (
                <Step1Split 
                  key={"step1-"+currentLOId} 
                  loId={currentLOId}
                  parts={portfolio[currentLOId] || []}
                  setParts={(parts) => updateParts(currentLOId, parts)}
                  onNext={() => setStep(3)} 
                  onBack={goToDashboard}
                  learningOutcomes={learningOutcomes}
                  onNextLO={() => {
                    const nextId = learningOutcomes[idx + 1].id;
                    if (!portfolio[nextId]) updateParts(nextId, []);
                    setCurrentLOId(nextId);
                  }}
                  onPrevLO={() => {
                    const prevId = learningOutcomes[idx - 1].id;
                    if (!portfolio[prevId]) updateParts(prevId, []);
                    setCurrentLOId(prevId);
                  }}
                  hasNextLO={hasNext}
                  hasPrevLO={hasPrev}
                />
              )
            })()
          )}
          {step === 3 && currentLOId && (
            (() => {
              const idx = learningOutcomes.findIndex(l => l.id === currentLOId);
              if (idx === -1) {
                 return (
                    <div className="p-20 text-center flex flex-col items-center">
                       <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
                       <h2 className="text-xl font-bold mb-2">Leeruitkomst niet gevonden</h2>
                       <button onClick={goToDashboard} className="btn-secondary px-6 py-2 mt-4">Ga terug naar dashboard</button>
                    </div>
                 );
              }
              return (
                <Step2Proxies 
                  key={"step2-"+currentLOId} 
                  loId={currentLOId}
                  parts={portfolio[currentLOId] || []}
                  setParts={(parts) => updateParts(currentLOId, parts)}
                  onNext={goToDashboard} 
                  onBack={() => setStep(2)}
                  portfolio={portfolio}
                  targetPartId={targetPartId}
                />
              )
            })()
          )}
          {step === 4 && (
            <TotalPortfolio 
              key="total" 
              portfolio={portfolio} 
              learningOutcomes={learningOutcomes}
              evlName={evlName}
              onBack={goToDashboard} 
              onEditLO={startLO}
              onRestart={restartAnalysis}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function Theory({ onNext }: { key?: string, onNext: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto px-4"
    >
      <div className="text-center pt-2 pb-10 border-b border-black/10">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-center leading-tight">
          <span className="text-[var(--color-accent)]">4Portfolio</span>
        </h1>
        <p className="opacity-80 max-w-2xl mx-auto mb-10 text-lg">
          Portfolio-ontwerptool om leeruitkomsten aan te tonen
        </p>
        
        <button onClick={onNext} className="btn-primary text-xl px-10 py-4 shadow-xl">
          START <ArrowRight className="w-5 h-5 ml-2 inline" />
        </button>
      </div>

      <div id="framework-section" className="py-12 border-b border-black/10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Het 4Ps Framework</h2>
          <p className="opacity-80 max-w-2xl mx-auto text-lg">
            Voor een betrouwbare beoordeling van de kwaliteiten van studenten maak je idealiter gebruik van een mix van indirecte metingen: proxies.<br/>
            <a href="https://www.tandfonline.com/doi/full/10.1080/02602938.2026.2620053#abstract" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] font-bold hover:underline">Fawns et al. (2026)</a> beschrijven er vier.
          </p>
        </div>

        <div className="flex flex-col gap-6 mb-8">
          {THE_4_PS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`glass-panel p-6 border-2 grid md:grid-cols-2 gap-6 ${p.colorClass}`}
              >
                {/* Left Column: Info */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 shrink-0 rounded-xl flex items-center justify-center border bg-white/50`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{p.label}</h3>
                      <p className="opacity-90 font-medium">{p.beschrijving}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-1 mt-auto text-sm bg-white/30 p-3 rounded-lg">
                    <p><strong>Focus:</strong> {p.focus}</p>
                    <p><strong>Voorbeelden:</strong> {p.voorbeelden}</p>
                  </div>
                </div>

                {/* Right Column: Pros and Cons */}
                <div className="flex flex-col gap-4">
                  <div className="bg-green-50/70 p-3 rounded-lg border border-green-200 flex-1 flex flex-col justify-center">
                    <p className="text-sm text-green-900 leading-relaxed">
                      <strong>Voordelen:</strong> {p.voordelen}
                    </p>
                  </div>
                  <div className="bg-red-50/70 p-3 rounded-lg border border-red-200 flex-1 flex flex-col justify-center">
                    <p className="text-sm text-red-900 leading-relaxed">
                      <strong>Beperkingen:</strong> {p.beperkingen}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Betrouwbaar beoordelen & beslissen</h2>
          <p className="opacity-80 max-w-2xl mx-auto text-lg hover:text-black">
            Een betrouwbare beslissing vereist een rijke mix van de 4Ps over de gehele linie en een juiste beoordeling vermijdt misalignment.
          </p>
        </div>
        <div className="space-y-8 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 shadow-sm transition-all hover:shadow-md">
              <h4 className="font-bold text-lg text-blue-800 mb-3 flex items-center gap-2">
                <Layers className="w-5 h-5" /> {TRIANGLE_THEORY.saturatie.title}
              </h4>
              <p className="text-sm opacity-80 leading-relaxed mb-2">{TRIANGLE_THEORY.saturatie.text}</p>
              <p className="text-xs opacity-50 italic">{TRIANGLE_THEORY.saturatie.source}</p>
            </div>
            <div className="bg-purple-50/50 p-6 rounded-xl border border-purple-100 shadow-sm transition-all hover:shadow-md">
              <h4 className="font-bold text-lg text-purple-800 mb-3 flex items-center gap-2">
                <Triangle className="w-5 h-5" /> {TRIANGLE_THEORY.triangulatie.title}
              </h4>
              <p className="text-sm opacity-80 leading-relaxed mb-2">
                {TRIANGLE_THEORY.triangulatie.text.split('onderstaand 4Ps framework').map((part, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && (
                      <button 
                        onClick={() => document.getElementById('framework-section')?.scrollIntoView({ behavior: 'smooth' })} 
                        className="text-purple-700 font-bold hover:underline"
                      >
                        bovenstaand 4Ps framework
                      </button>
                    )}
                    {part}
                  </React.Fragment>
                ))}
              </p>
              <p className="text-xs opacity-50 italic">{TRIANGLE_THEORY.triangulatie.source}</p>
            </div>
            <div className="bg-emerald-50/50 p-6 rounded-xl border border-emerald-100 shadow-sm transition-all hover:shadow-md">
              <h4 className="font-bold text-lg text-emerald-800 mb-3 flex items-center gap-2">
                <Users className="w-5 h-5" /> {TRIANGLE_THEORY.intersubjectiviteit.title}
              </h4>
              <p className="text-sm opacity-80 leading-relaxed mb-2">{TRIANGLE_THEORY.intersubjectiviteit.text}</p>
              <p className="text-xs opacity-50 italic">{TRIANGLE_THEORY.intersubjectiviteit.source}</p>
            </div>
          </div>
          <div className="bg-red-50/50 p-6 rounded-xl border border-red-100 shadow-sm flex flex-col gap-4 transition-all hover:shadow-md">
            <h4 className="font-bold text-lg text-red-800 flex items-center gap-2 border-b border-red-200 pb-3">
              <AlertTriangle className="w-6 h-6 flex-shrink-0" /> Misalignment: valkuilen bij beoordelen en beslissen
            </h4>
            <div className="grid md:grid-cols-2 gap-6">
              {MISALIGNMENT_THEORY.map((item, idx) => (
                <div key={idx} className="bg-white/50 p-3 rounded-lg border border-red-50/50">
                  <h5 className="font-bold text-sm text-red-800 mb-1">{item.title}</h5>
                  <p className="text-sm opacity-80 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-xs opacity-60 italic mt-2 text-right">Naar: Fawns et al. (2026)</p>
          </div>
        </div>

        <div className="text-center text-sm opacity-60">
          <p>Auteur: <a href="https://www.linkedin.com/in/tim-gerbrands" target="_blank" rel="noopener noreferrer" className="hover:underline text-[var(--color-accent)] font-bold">Tim A. Gerbrands</a></p>
          <p>Laatst bijgewerkt: 16 april 2026</p>
        </div>
      </div>
    </motion.div>
  );
}

function Dashboard({ portfolio, setPortfolio, learningOutcomes, setLearningOutcomes, evlName, setEvlName, onStartLO, onViewTotal, onBack, onRestart, updateLO }: { 
  key?: string,
  portfolio: Record<string, LOPart[]>, 
  setPortfolio: (p: Record<string, LOPart[]>) => void,
  learningOutcomes: {id: string, text: string}[],
  setLearningOutcomes: (los: {id: string, text: string}[]) => void,
  evlName: string,
  setEvlName: (name: string) => void,
  onStartLO: (id: string) => void, 
  onViewTotal: () => void, 
  onBack: () => void, 
  onRestart: () => void,
  updateLO: (oldId: string, newId: string, text: string) => void
}) {
  const totalEvidence = Object.values(portfolio).flatMap(parts => parts.flatMap(p => p.evidence)).length;
  const [newLOText, setNewLOText] = useState('');
  const [newLONumber, setNewLONumber] = useState('');
  const [isAddingLO, setIsAddingLO] = useState(false);
  const [editingLOId, setEditingLOId] = useState<string | null>(null);
  const [editLONumber, setEditLONumber] = useState('');
  const [editLOText, setEditLOText] = useState('');

  const handleDeleteLO = (id: string) => {
    setLearningOutcomes(learningOutcomes.filter(lo => lo.id !== id));
  };

  const handleAddLO = () => {
    if (!newLOText.trim() || !newLONumber.trim()) return;
    setLearningOutcomes([...learningOutcomes, { id: newLONumber.trim(), text: newLOText }]);
    setNewLOText('');
    setNewLONumber('');
    setIsAddingLO(false);
  };

  const onTriggerAddLO = () => {
    const nextNum = `${evlName.split(' ')[1] || 'X'}.${learningOutcomes.length + 1}`;
    setNewLONumber(nextNum);
    setIsAddingLO(true);
  };

  const startEditLO = (lo: {id: string, text: string}) => {
    setEditingLOId(lo.id);
    setEditLONumber(lo.id);
    setEditLOText(lo.text);
  };

  const saveEditLO = (oldId: string) => {
    if (!editLONumber.trim() || !editLOText.trim()) return;
    updateLO(oldId, editLONumber.trim(), editLOText.trim());
    setEditingLOId(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-sm font-bold opacity-60 hover:opacity-100 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Terug naar theorie
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 group">
            <span className="text-3xl font-bold opacity-80">Naam van EvL:</span>
            <div className="relative">
              <input 
                type="text" 
                value={evlName} 
                onChange={(e) => setEvlName(e.target.value)}
                className="text-3xl font-bold bg-transparent border-b-2 border-dashed border-gray-300 hover:border-[var(--color-glass-border)] focus:border-[var(--color-accent)] outline-none transition-colors min-w-[400px] w-auto max-w-full text-[var(--color-accent)] pr-8"
                title="Pas de naam van de EvL aan"
              />
              <Pencil className="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2 opacity-30 group-hover:opacity-100 pointer-events-none transition-opacity text-[var(--color-accent)]" />
            </div>
          </div>
          <p className="opacity-80 mb-3">Kies een leeruitkomst om te analyseren en bewijsstukken te koppelen.</p>
          <div className="flex items-center gap-2">
            <span className="text-sm opacity-60 font-bold">Inladen:</span>
            <button 
              onClick={() => { 
                setEvlName("Afstudeeronderzoek"); 
                setLearningOutcomes(LEARNING_OUTCOMES); 
                setPortfolio(JSON.parse(JSON.stringify(AFSTUDEERONDERZOEK_DEFAULT_PORTFOLIO)));
              }}
              className="text-sm bg-white/50 border border-black/10 hover:border-[var(--color-accent)] px-3 py-1 rounded-full transition-colors"
            >
              Afstudeeronderzoek
            </button>
            <button 
              onClick={() => { setEvlName("EvL 1, Fysiotherapie"); setLearningOutcomes(EVL_1_FYSIO); }}
              className="text-sm bg-white/50 border border-black/10 hover:border-[var(--color-accent)] px-3 py-1 rounded-full transition-colors"
            >
              EvL 1, Fysiotherapie
            </button>
          </div>
        </div>
        <button 
          onClick={onViewTotal}
          disabled={totalEvidence === 0}
          className={`btn-primary flex items-center gap-2 text-white ${totalEvidence === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <LayoutDashboard className="w-5 h-5" /> <span>4P Analyse</span>
        </button>
      </div>

      <div className="space-y-4">
        {learningOutcomes.map(lo => {
          const parts = portfolio[lo.id] || [];
          const evidenceCount = parts.reduce((acc, p) => acc + p.evidence.length, 0);
          const hasStarted = parts.length > 0;

          if (editingLOId === lo.id) {
            return (
              <div key={lo.id} className="glass-panel p-6 flex flex-col gap-4 border-[var(--color-accent)] ring-1 ring-[var(--color-accent)]">
                <div className="flex gap-4">
                  <div className="w-24 shrink-0">
                     <label className="text-xs font-bold opacity-80 mb-1 block flex-shrink-0">LUK Nummer</label>
                     <input value={editLONumber} onChange={e=>setEditLONumber(e.target.value)} className="w-full p-2 rounded-lg border focus:border-[var(--color-accent)] outline-none text-sm font-bold text-center" />
                  </div>
                  <div className="flex-1">
                     <label className="text-xs font-bold opacity-80 mb-1 block">Beschrijving</label>
                     <textarea value={editLOText} onChange={e=>setEditLOText(e.target.value)} className="w-full p-2 rounded-lg border focus:border-[var(--color-accent)] outline-none text-sm resize-none h-20" />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-2">
                   <button onClick={() => setEditingLOId(null)} className="px-4 py-2 rounded-xl font-bold opacity-70 hover:opacity-100 text-sm">Annuleren</button>
                   <button onClick={() => saveEditLO(lo.id)} className="btn-primary py-2 px-6 text-sm">Opslaan</button>
                </div>
              </div>
            );
          }

          return (
            <div key={lo.id} className={`glass-panel p-6 flex flex-col md:flex-row gap-6 items-center transition-colors group ${evidenceCount > 0 ? 'bg-green-50/50 border-green-400/50 hover:border-green-500' : 'hover:border-[var(--color-accent)]'}`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold shrink-0 ${evidenceCount > 0 ? 'bg-green-100 text-green-700' : 'glass-item text-[var(--color-accent)]'}`}>
                {lo.id}
              </div>
              <div className="flex-1">
                <p className={`font-medium line-clamp-2 opacity-90 ${evidenceCount > 0 ? 'text-green-900' : ''}`}>{lo.text}</p>
                {hasStarted && (
                  <div className={`flex gap-4 mt-3 text-sm font-bold ${evidenceCount > 0 ? 'text-green-600' : 'text-[var(--color-accent)]'}`}>
                    <span>{parts.length} LUK-onderdelen</span>
                    <span>•</span>
                    <span>{evidenceCount} bewijsstuk{evidenceCount !== 1 && 'ken'}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => startEditLO(lo)}
                  className={`p-3 rounded-xl transition-colors md:opacity-0 md:group-hover:opacity-100 ${evidenceCount > 0 ? 'text-green-700 hover:bg-green-100' : 'text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white'}`}
                  title="Pas nummer en tekst aan"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => onStartLO(lo.id)}
                  className={`px-6 py-3 rounded-xl border-2 font-bold transition-colors flex items-center gap-2 ${evidenceCount > 0 ? 'border-green-600 text-green-700 hover:bg-green-600 hover:text-white' : 'border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white'}`}
                >
                  {hasStarted ? 'Bewerk' : 'Start'} <ChevronRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDeleteLO(lo.id)}
                  className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors opacity-0 group-hover:opacity-100"
                  title="Verwijder leeruitkomst"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })}

        {isAddingLO ? (
          <div className="glass-panel p-6 flex flex-col gap-4">
            <div className="flex gap-4">
               <div className="w-24 shrink-0">
                  <label className="text-xs font-bold opacity-80 mb-1 block">LUK Nummer</label>
                  <input value={newLONumber} onChange={e=>setNewLONumber(e.target.value)} className="w-full p-2 rounded-lg border focus:border-[var(--color-accent)] outline-none text-sm font-bold text-center" />
               </div>
               <div className="flex-1">
                  <label className="text-xs font-bold opacity-80 mb-1 block">Beschrijving</label>
                  <textarea 
                    value={newLOText}
                    onChange={(e) => setNewLOText(e.target.value)}
                    placeholder="Typ hier de nieuwe leeruitkomst..."
                    className="w-full p-2 rounded-lg border focus:border-[var(--color-accent)] outline-none text-sm resize-none h-20"
                  />
               </div>
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <button onClick={() => setIsAddingLO(false)} className="px-4 py-2 rounded-xl font-bold opacity-70 hover:opacity-100 text-sm">Annuleren</button>
              <button onClick={handleAddLO} className="btn-primary py-2 px-6 text-sm">Toevoegen</button>
            </div>
          </div>
        ) : (
          <button 
            onClick={onTriggerAddLO}
            className="w-full py-4 border-2 border-dashed border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-colors rounded-xl font-bold flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" /> Voeg een Leeruitkomst toe
          </button>
        )}
      </div>
    </motion.div>
  );
}

function Step1Split({ loId, parts, setParts, onNext, onBack, learningOutcomes, onNextLO, onPrevLO, hasNextLO, hasPrevLO }: { key?: string, loId: string, parts: LOPart[], setParts: (parts: LOPart[]) => void, onNext: () => void, onBack: () => void, learningOutcomes: {id: string, text: string}[], onNextLO: () => void, onPrevLO: () => void, hasNextLO: boolean, hasPrevLO: boolean }) {
  const lo = learningOutcomes.find(l => l.id === loId);
  const [selection, setSelection] = useState('');

  const handleMouseUp = () => {
    const text = window.getSelection()?.toString().trim();
    if (text && text.length > 3) {
      setSelection(text);
    }
  };

  const addPartFromSelection = () => {
    if (!selection) return;
    const colorClass = HIGHLIGHT_COLORS[parts.length % HIGHLIGHT_COLORS.length];
    setParts([...parts, { id: Date.now().toString(), text: selection, evidence: [], colorClass }]);
    setSelection('');
    window.getSelection()?.removeAllRanges();
  };

  const updatePartText = (id: string, text: string) => {
    setParts(parts.map(p => p.id === id ? { ...p, text } : p));
  };

  const removePart = (id: string) => {
    setParts(parts.filter(p => p.id !== id));
  };

  const renderHighlightedText = () => {
    if (!lo) return null;
    if (parts.length === 0) return lo.text;

    let elements: React.ReactNode[] = [lo.text];
    
    parts.forEach((part) => {
      elements = elements.flatMap((el, index) => {
        if (typeof el !== 'string') return el;
        
        const pieces = el.split(part.text);
        if (pieces.length === 1) return el;

        const newElements: React.ReactNode[] = [];
        pieces.forEach((piece, i) => {
          newElements.push(piece);
          if (i < pieces.length - 1) {
            newElements.push(
              <mark key={`${part.id}-${index}-${i}`} className={`px-1 rounded ${part.colorClass}`}>
                {part.text}
              </mark>
            );
          }
        });
        return newElements;
      });
    });

    return elements;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-5xl mx-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <button onClick={onBack} className="text-sm font-bold opacity-60 hover:opacity-100 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Terug naar overzicht
        </button>
        <div className="flex gap-4">
          <button onClick={onPrevLO} disabled={!hasPrevLO} className={`text-sm font-bold flex items-center gap-1 ${hasPrevLO ? 'opacity-60 hover:opacity-100' : 'opacity-20 cursor-not-allowed'}`}>
            <ChevronLeft className="w-4 h-4" /> Vorige LUK
          </button>
          <button onClick={onNextLO} disabled={!hasNextLO} className={`text-sm font-bold flex items-center gap-1 ${hasNextLO ? 'opacity-60 hover:opacity-100' : 'opacity-20 cursor-not-allowed'}`}>
            Volgende LUK <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-black/10 gap-4">
        <div className="text-left">
          <h2 className="text-sm font-bold text-[var(--color-accent)] uppercase tracking-wider mb-1">Leeruitkomst {loId}</h2>
          <h3 className="text-2xl font-bold">Splits de LUK evt. op in delen</h3>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => {
              setParts([{
                id: Date.now().toString(),
                text: lo.text,
                evidence: [],
                colorClass: 'bg-blue-100 text-blue-900'
              }]);
              onNext();
            }}
            className="btn-secondary py-2.5 px-6 border border-black/20 hover:bg-black/5"
          >
            Sla over
          </button>
          <button 
            onClick={onNext} 
            disabled={parts.length === 0}
            className={`btn-primary py-2.5 px-8 shrink-0 ${parts.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            KLAAR
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-start mb-10">
        <div>
          <h4 className="font-bold mb-3 text-lg text-center">Selecteer een deel van de LUK:</h4>
          <div 
            onMouseUp={handleMouseUp} 
            className="text-xl leading-relaxed glass-panel p-8 cursor-text select-text border-2 border-dashed border-[var(--color-accent)]/50 hover:border-[var(--color-accent)] transition-colors relative"
          >
            {renderHighlightedText()}
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center pt-16">
          <button 
            onClick={addPartFromSelection}
            disabled={!selection}
            className={`p-4 rounded-full shadow-lg flex items-center justify-center transition-all ${
              selection 
                ? 'bg-[var(--color-accent)] text-white hover:scale-105' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            title="Maak LUK-onderdeel van selectie"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        <div>
          <h4 className="font-bold mb-3 text-lg text-center">LUK-onderdelen</h4>
          <div className="space-y-3">
            {parts.length === 0 && (
              <div className="text-center p-6 glass-panel opacity-60 italic">
                Nog geen LUK-onderdelen gemaakt. Selecteer tekst links.
              </div>
            )}
            <AnimatePresence>
              {parts.map((part, i) => (
                <motion.div 
                  key={part.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`flex gap-3 items-center glass-panel p-4 border-l-4 ${part.colorClass.split(' ')[0].replace('bg-', 'border-')}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0 ${part.colorClass}`}>
                    {i + 1}
                  </div>
                  <input 
                    type="text"
                    value={part.text}
                    onChange={(e) => updatePartText(part.id, e.target.value)}
                    className="flex-1 font-medium bg-transparent border-b border-transparent hover:border-[var(--color-glass-border)] focus:border-[var(--color-accent)] outline-none transition-colors px-2 py-1"
                  />
                  <button 
                    onClick={() => removePart(part.id)}
                    className="p-2 glass-item text-red-500 hover:bg-red-50 transition-colors"
                    title="Verwijder LUK-onderdeel"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Step2Proxies({ loId, parts, setParts, onNext, onBack, portfolio, targetPartId }: { key?: string, loId: string, parts: LOPart[], setParts: (parts: LOPart[]) => void, onNext: () => void, onBack: () => void, portfolio: Record<string, LOPart[]>, targetPartId?: string | null }) {
  const [activePartId, setActivePartId] = useState<string | null>(targetPartId || parts[0]?.id || null);
  const [draftName, setDraftName] = useState('');
  const [draftStakeholders, setDraftStakeholders] = useState<string[]>([]);
  const [stakeholderInput, setStakeholderInput] = useState('');
  const [draftType, setDraftType] = useState<PType | null>(null);
  const [editingEvidenceId, setEditingEvidenceId] = useState<string | null>(null);
  const [showProxyInfoModal, setShowProxyInfoModal] = useState(false);
  const [hoveredPType, setHoveredPType] = useState<PType | null>(null);
  const activePart = parts.find(p => p.id === activePartId);

  const allStakeholders = useMemo(() => {
    const stakeholders = Object.values(portfolio)
      .flatMap(parts => parts.flatMap(p => p.evidence.flatMap(e => e.stakeholders ? e.stakeholders.split(',').map(s=>s.trim()) : [])))
      .filter(Boolean);
    return Array.from(new Set(stakeholders));
  }, [portfolio]);

  const cancelEdit = () => {
    setEditingEvidenceId(null);
    setDraftName('');
    setDraftStakeholders([]);
    setStakeholderInput('');
    setDraftType(null);
  };

  const handleEditClick = (partId: string, ev: Evidence) => {
    setActivePartId(partId);
    setEditingEvidenceId(ev.id);
    setDraftName(ev.name);
    setDraftStakeholders(ev.stakeholders ? ev.stakeholders.split(',').map(s=>s.trim()).filter(Boolean) : []);
    setStakeholderInput('');
    setDraftType(ev.type);
  };

  const handleAddEvidence = () => {
    if (!activePartId || !draftName.trim() || !draftType) return;
    
    // Process any lingering stakeholder input
    let finalStakeholders = [...draftStakeholders];
    if (stakeholderInput.trim()) {
      const inputs = stakeholderInput.split(',').map(s=>s.trim()).filter(Boolean);
      inputs.forEach(val => {
        if (!finalStakeholders.includes(val)) {
          finalStakeholders.push(val);
        }
      });
    }
    
    if (editingEvidenceId) {
      setParts(parts.map(p => 
        p.id === activePartId ? {
          ...p,
          evidence: p.evidence.map(e => e.id === editingEvidenceId ? {
            ...e, name: draftName.trim(), stakeholders: finalStakeholders.join(', '), type: draftType
          } : e)
        } : p
      ));
      setEditingEvidenceId(null);
    } else {
      const newEvidence: Evidence = {
        id: Date.now().toString(),
        name: draftName.trim(),
        stakeholders: finalStakeholders.join(', '),
        type: draftType
      };
      setParts(parts.map(p => 
        p.id === activePartId ? { ...p, evidence: [...p.evidence, newEvidence] } : p
      ));
    }

    setDraftName('');
    setDraftStakeholders([]);
    setStakeholderInput('');
    setDraftType(null);
  };

  const handleRemoveEvidence = (partId: string, evidenceId: string) => {
    setParts(parts.map(p => 
      p.id === partId ? { ...p, evidence: p.evidence.filter(e => e.id !== evidenceId) } : p
    ));
    if (editingEvidenceId === evidenceId) cancelEdit();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <button onClick={onBack} className="mb-6 text-sm font-bold opacity-60 hover:opacity-100 flex items-center gap-1">
        <ArrowLeft className="w-4 h-4" /> Terug naar opsplitsen
      </button>

      <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 pb-4 border-b border-black/10 gap-4">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold mb-2">Ontwerp bewijs voor LUK {loId}</h3>
          <p className="text-sm font-bold opacity-80 decoration-[var(--color-accent)] decoration-2 underline-offset-4 mb-1">Let in het proces op dat de samenhang tussen LUK-onderdelen niet verloren gaat.</p>
        </div>
        <button onClick={onNext} className="btn-primary shrink-0 py-2.5 px-8 mt-1">
          KLAAR
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        
        {/* LINKS: Form & Topnav (wider column) */}
        <div className="lg:col-span-2 flex flex-col gap-0 h-fit">
          <div className="glass-panel overflow-hidden border border-white/60 shadow-md">
            
            {/* Top Navigatie voor LUK-onderdelen */}
            <div className="bg-black/5 p-2 flex overflow-x-auto gap-2 scrollbar-hide border-b border-black/10">
              {parts.map((p, i) => {
                const hasEvidence = p.evidence.length > 0;
                const isSelected = activePartId === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setActivePartId(p.id);
                      if (editingEvidenceId) cancelEdit();
                    }}
                    className={`px-3 py-1.5 rounded-md font-bold text-xs whitespace-nowrap transition-colors flex items-center gap-1.5 border ${
                      isSelected ? 'bg-white text-[var(--color-accent)] border-[var(--color-accent)] shadow-sm' : 'bg-transparent hover:bg-black/5 opacity-70 border-transparent text-gray-700'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${isSelected ? 'bg-[var(--color-accent)] text-white' : 'bg-black/10'}`}>
                      {i + 1}
                    </div>
                    Onderdeel {i + 1}
                    {!hasEvidence && <span className="text-[10px] text-red-500 font-extrabold ml-1">(!)</span >}
                  </button>
                )
              })}
            </div>

            {/* Invoervelden voor geselecteerde part */}
            {activePart && (
              <div className="p-6 flex flex-col justify-between min-h-[420px]">
                <div>
                  <div className="h-[60px] mb-2">
                    <h4 className="font-bold text-[13px] opacity-90 leading-snug line-clamp-3" title={activePart.text}>{activePart.text}</h4>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <div className="flex-1">
                      <label className="block text-xs font-bold opacity-80 mb-1">Naam bewijsstuk</label>
                      <input 
                        type="text"
                        value={draftName}
                        onChange={(e) => setDraftName(e.target.value)}
                        placeholder="Reflectieverslag, video..."
                        className={`w-full glass-item px-3 py-2 outline-none focus:border-[var(--color-accent)] transition-colors text-sm ${!draftName.trim() ? 'border-red-300 bg-red-50/50' : ''}`}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-bold opacity-80 mb-1">Betrokken stakeholders</label>
                      {draftStakeholders.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {draftStakeholders.map(s => (
                            <span key={s} className="bg-[var(--color-accent)] text-white text-[10px] px-2 py-1 rounded-full flex items-center gap-1">
                              {s}
                              <button onClick={() => setDraftStakeholders(draftStakeholders.filter(x => x !== s))}>
                                <X className="w-3 h-3 hover:opacity-75" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                      <input 
                        type="text"
                        value={stakeholderInput}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val.includes(',')) {
                            const splits = val.split(',');
                            const newStakeholders = [...draftStakeholders];
                            splits.slice(0, -1).forEach(p => {
                              const trimmed = p.trim();
                              if (trimmed && !newStakeholders.includes(trimmed)) {
                                newStakeholders.push(trimmed);
                              }
                            });
                            setDraftStakeholders(newStakeholders);
                            setStakeholderInput(splits[splits.length - 1]);
                          } else {
                            setStakeholderInput(val);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (stakeholderInput.trim()) {
                              const inputs = stakeholderInput.split(',').map(s=>s.trim()).filter(Boolean);
                              const newStakeholders = [...draftStakeholders];
                              inputs.forEach(val => {
                                if (!newStakeholders.includes(val)) {
                                  newStakeholders.push(val);
                                }
                              });
                              setDraftStakeholders(newStakeholders);
                              setStakeholderInput('');
                            }
                          }
                        }}
                        placeholder={draftStakeholders.length === 0 ? "Typ en druk op Enter..." : "Nog een stakeholder..."}
                        className="w-full glass-item px-3 py-2 outline-none focus:border-[var(--color-accent)] transition-colors text-sm mb-2"
                      />
                      {allStakeholders.filter(s => !draftStakeholders.includes(s)).length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {allStakeholders.filter(s => !draftStakeholders.includes(s)).map(s => (
                            <button 
                              key={s}
                              onClick={() => {
                                setDraftStakeholders([...draftStakeholders, s]);
                                setStakeholderInput('');
                              }}
                              className="text-[9px] px-2 py-1 rounded-full bg-black/5 hover:bg-[var(--color-accent)] hover:text-white transition-colors"
                            >
                              + {s}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-2">
                    <label className="block text-xs font-bold opacity-80 mb-1">Kies proxy type</label>
                    <div className="grid grid-cols-4 gap-2">
                      {THE_4_PS.map(pt => {
                        const Icon = pt.icon;
                        const isSelected = draftType === pt.id;
                        return (
                          <button
                            key={pt.id}
                            onClick={() => setDraftType(pt.id)}
                            onMouseEnter={() => setHoveredPType(pt.id)}
                            onMouseLeave={() => setHoveredPType(null)}
                            className={`p-2 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1.5 text-center ${pt.colorClass} ${
                              isSelected 
                                ? 'ring-2 ring-[var(--color-accent)] shadow-sm border-[var(--color-accent)] scale-105' 
                                : `opacity-60 hover:opacity-100 ${!draftType ? 'border-red-300 border-dashed' : 'border-transparent'}`
                            }`}
                            title={pt.label}
                          >
                            <Icon className="w-4 h-4 shrink-0" />
                            <div className="font-bold text-[9px] break-all">{pt.label}</div>
                          </button>
                        );
                      })}
                    </div>
                    {(() => {
                      const proxyToDisplay = hoveredPType || draftType;
                      if (!proxyToDisplay) return null;
                      const selectedProxy = THE_4_PS.find(p => p.id === proxyToDisplay);
                      if (!selectedProxy) return null;
                      return (
                        <div className={`mt-3 p-2.5 rounded-xl border flex items-center justify-between gap-3 ${selectedProxy.colorClass}`}>
                          <div className="text-xs italic truncate font-medium opacity-90 text-left flex-1" title={selectedProxy.beschrijving}>
                            {selectedProxy.beschrijving}
                          </div>
                          <button onClick={() => setShowProxyInfoModal(true)} className="p-1.5 hover:bg-black/10 rounded-full transition-colors shrink-0">
                            <Info className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button 
                    onClick={handleAddEvidence}
                    disabled={!draftName.trim() || !draftType}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all flex items-center justify-center gap-2 ${
                      !draftName.trim() || !draftType ? 'bg-slate-300 cursor-not-allowed' : 'bg-[var(--color-accent)] hover:bg-opacity-90 shadow-md'
                    }`}
                  >
                    {editingEvidenceId ? <><Edit2 className="w-4 h-4" /> Update bewijs</> : <><Plus className="w-4 h-4" /> Voeg bewijs toe</>}
                  </button>
                  {editingEvidenceId && (
                    <button onClick={cancelEdit} className="px-4 py-2.5 rounded-xl text-sm font-bold bg-gray-200 hover:bg-gray-300 transition-colors">
                      Annuleer
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RECHTS: Gekoppelde bewijsmaterialen (small column) */}
        <div className="lg:col-span-1">
          <div className="glass-panel p-4 bg-white/40 sticky top-6 border border-white/60">
            <h5 className="font-bold text-[13px] mb-3 border-b border-black/10 pb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[var(--color-accent)]" /> Totaaloverzicht LUK {loId}
            </h5>
            
            <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1 scrollbar-hide">
              {parts.every(p => p.evidence.length === 0) ? (
                <div className="opacity-50 italic text-[11px] bg-black/5 p-3 rounded-lg text-center">Nog nergens bewijs gekoppeld.</div>
              ) : (
                parts.map((p, pIndex) => {
                  if (p.evidence.length === 0) return null;
                  return (
                    <div key={p.id} className="mb-4 last:mb-0">
                      <div className="text-[10px] uppercase font-bold text-gray-500 mb-1.5 pl-1">Onderdeel {pIndex + 1}</div>
                      <div className="space-y-2">
                        {p.evidence.map(ev => {
                          const typeInfo = THE_4_PS.find(t => t.id === ev.type);
                          const Icon = typeInfo?.icon || FileText;
                          return (
                            <div 
                              key={ev.id} 
                              onClick={() => handleEditClick(p.id, ev)}
                              className={`flex items-start justify-between p-2.5 rounded-xl border cursor-pointer hover:shadow-md transition-all ${typeInfo?.colorClass} ${editingEvidenceId === ev.id ? 'ring-2 ring-[var(--color-accent)] shadow-lg scale-[1.02]' : ''}`}
                            >
                              <div className="flex items-start gap-2.5 min-w-0 pointer-events-none">
                                <div className="bg-white/50 p-1.5 rounded-md shadow-sm shrink-0 mt-0.5">
                                  <Icon className="w-3.5 h-3.5" />
                                </div>
                                <div className="min-w-0">
                                  <div className="font-bold text-[11px] leading-tight break-words">{ev.name}</div>
                                  {ev.stakeholders && <div className="text-[10px] opacity-80 mt-1 break-words">👥 {ev.stakeholders}</div>}
                                </div>
                              </div>
                              <button 
                                onClick={(e) => { e.stopPropagation(); handleRemoveEvidence(p.id, ev.id); }}
                                className="p-1 hover:bg-black/10 text-red-600 rounded-md transition-colors shrink-0 ml-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

      </div>

      <AnimatePresence>
        {showProxyInfoModal && draftType && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="glass-panel p-6 max-w-lg w-full relative bg-white/95"
            >
              <button onClick={() => setShowProxyInfoModal(false)} className="absolute top-4 right-4 p-2 hover:bg-black/5 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
              {(() => {
                const pt = THE_4_PS.find(p => p.id === draftType);
                if (!pt) return null;
                const Icon = pt.icon;
                return (
                  <div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border mb-4 ${pt.colorClass}`}>
                      {Icon && <Icon className="w-5 h-5" />}
                      <h3 className="text-lg font-bold">{pt.label}</h3>
                    </div>
                    <div className="space-y-3 text-sm">
                      <p><strong>Beschrijving:</strong> {pt.beschrijving}</p>
                      <p><strong>Focus:</strong> {pt.focus}</p>
                      <p><strong>Voorbeelden:</strong> {pt.voorbeelden}</p>
                      <p><strong>Voordelen:</strong> {pt.voordelen}</p>
                      <p><strong>Beperkingen:</strong> {pt.beperkingen}</p>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function TotalPortfolio({ portfolio, learningOutcomes, evlName, onBack, onEditLO, onRestart }: { key?: string, portfolio: Record<string, LOPart[]>, learningOutcomes: {id: string, text: string}[], evlName: string, onBack: () => void, onEditLO: (id: string, partId?: string) => void, onRestart: () => void }) {
  const [expandedLOs, setExpandedLOs] = useState<string[]>([]);
  const [showCoverageModal, setShowCoverageModal] = useState(false);
  const [showStakeholdersModal, setShowStakeholdersModal] = useState(false);
  const [selectedProxyInfoType, setSelectedProxyInfoType] = useState<string | null>(null);
  
  const activeLOs = learningOutcomes.filter(lo => portfolio[lo.id] && portfolio[lo.id].length > 0);
  
  const toggleLO = (id: string) => {
    setExpandedLOs(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const partsWithLoInfo = Object.entries(portfolio).flatMap(([loId, parts]) => 
    parts.map(p => ({ ...p, loId }))
  );
  
  const partsWithEvidence = partsWithLoInfo.filter(p => p.evidence.length > 0);
  const uncoveredParts = partsWithLoInfo.filter(p => p.evidence.length === 0);
  const coveragePercent = partsWithLoInfo.length > 0 ? Math.round((partsWithEvidence.length / partsWithLoInfo.length) * 100) : 0;
  
  const stakeholderUsage = useMemo(() => {
    const usage: Record<string, Set<string>> = {};
    Object.entries(portfolio).forEach(([loId, parts]) => {
      parts.forEach(p => {
        p.evidence.forEach(e => {
          if (!e.stakeholders) return;
          const sts = e.stakeholders.split(',').map(s => s.trim()).filter(Boolean);
          sts.forEach(s => {
            if (!usage[s]) usage[s] = new Set();
            usage[s].add(loId);
          });
        });
      });
    });
    return usage;
  }, [portfolio]);
  
  const uniqueStakeholdersList = Object.keys(stakeholderUsage).sort();
  const uniqueStakeholders = uniqueStakeholdersList.length;

  const allEvidence = partsWithLoInfo.flatMap(p => p.evidence);
  const proxyCounts = {
    product: allEvidence.filter(e => e.type === 'product').length,
    performance: allEvidence.filter(e => e.type === 'performance').length,
    process: allEvidence.filter(e => e.type === 'process').length,
    practice: allEvidence.filter(e => e.type === 'practice').length,
  };

  // Order for Radar: Top (Product), Right (Process), Bottom (Performance), Left (Practice)
  const radarData = [
    { subject: 'Product', A: proxyCounts.product, fullMark: Math.max(...Object.values(proxyCounts), 5), desc: THE_4_PS.find(p=>p.id==='product')?.beschrijving },
    { subject: 'Process', A: proxyCounts.process, fullMark: Math.max(...Object.values(proxyCounts), 5), desc: THE_4_PS.find(p=>p.id==='process')?.beschrijving },
    { subject: 'Performance', A: proxyCounts.performance, fullMark: Math.max(...Object.values(proxyCounts), 5), desc: THE_4_PS.find(p=>p.id==='performance')?.beschrijving },
    { subject: 'Practice', A: proxyCounts.practice, fullMark: Math.max(...Object.values(proxyCounts), 5), desc: THE_4_PS.find(p=>p.id==='practice')?.beschrijving },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const pt = THE_4_PS.find(p => p.label === label);
      return (
        <div className={`glass-panel p-3 border-2 ${pt?.colorClass} text-sm max-w-[200px]`}>
          <p className="font-bold mb-1">{label}: {payload[0].value}</p>
          <p className="opacity-80 leading-tight">{pt?.beschrijving}</p>
        </div>
      );
    }
    return null;
  };

  const analyzeBlindSpots = (evidence: Evidence[]) => {
    const types = new Set(evidence.map(e => e.type));
    const present = THE_4_PS.filter(p => types.has(p.id));
    const missing = THE_4_PS.filter(p => !types.has(p.id));
    
    const mitigated = present.map(p => ({ type: p.label, text: p.beperkingen }));
    const unmitigated = missing.map(m => {
      let advice = "";
      if (m.id === 'process') advice = "Advies: Voeg een 'Process' proxy toe (bijv. reflectieverslag) om inzicht te krijgen in de stappen, iteraties en reflecties.";
      if (m.id === 'performance') advice = "Advies: Voeg een 'Performance' proxy toe (bijv. observatie) om zicht te krijgen op het daadwerkelijke handelen.";
      if (m.id === 'practice') advice = "Advies: Voeg een 'Practice' proxy toe (bijv. feedback uit de praktijk) om de complexe praktijkcontext mee te wegen.";
      if (m.id === 'product') advice = "Advies: Voeg een 'Product' proxy toe (bijv. een verslag of ontwerp) om een tastbaar eindresultaat te beoordelen.";
      return { type: m.label, text: m.beperkingen, advice };
    });

    let score = 2;
    let text = "Redelijke mix. Je combineert meerdere typen, maar het beeld is nog niet compleet.";
    if (missing.length === 0) {
      score = 3;
      text = "Sterke mix! Alle 4Ps zijn vertegenwoordigd. De blinde vlekken van individuele proxies worden uitstekend ondervangen door deze triangulatie.";
    } else if (types.size <= 1) {
      score = 1;
      text = `Zwakke mix. Je leunt volledig op één type proxy. Hierdoor blijven veel blinde vlekken onbelicht.`;
    }
    
    return { score, text, mitigated, unmitigated };
  };

  const losWithMissingEvidence = activeLOs.filter(lo => {
    const parts = portfolio[lo.id];
    return parts.some(p => p.evidence.length === 0);
  });

  const handleExportPDF = async () => {
    const element = document.getElementById('print-container');
    if (!element) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Pop-ups worden geblokkeerd. Sta pop-ups toe om in een nieuw tabblad te kunnen exporteren als PDF.");
      return;
    }
    
    // Verzamel bestaande stijlen
    let styles = '';
    for (const styleSheet of Array.from(document.styleSheets)) {
      try {
        styles += Array.from(styleSheet.cssRules).map(rule => rule.cssText).join('\n');
      } catch (e) {
        // Negeren van cross-origin styles
      }
    }
    
    const content = element.innerHTML;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Portfolio Export - ${evlName}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            ${styles}
            * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            body { font-family: sans-serif; background: white; color: black; }
            .page-break-after { page-break-after: always; }
            .print-grid { display: grid; gap: 1rem; }
            @media (min-width: 768px) {
              .print-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
            }
            .print-col { break-inside: avoid; }
            .print-panel { border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 1rem; }
            ul.list-disc { padding-left: 1rem; list-style-type: disc; }
            ul.list-circle { padding-left: 1rem; list-style-type: circle; }
            @media print {
              body { padding: 0 !important; }
              @page { margin: 15mm; size: A4; }
              #print-btn { display: none !important; }
            }
          </style>
        </head>
        <body class="p-8 max-w-[210mm] mx-auto relative">
          <button id="print-btn" onclick="window.print()" style="position: absolute; top: 1rem; right: 1rem; padding: 0.75rem 1.5rem; background-color: purple; color: white; border: none; border-radius: 0.5rem; cursor: pointer; font-weight: bold; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
            Genereer PDF / Print
          </button>
          
          ${content}
          
          <script>
            // Tailwind wordt geladen via CDN, we geven het inladen heel kort de tijd en printen dan automatisch.
            setTimeout(() => {
              window.print();
            }, 1500);
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <>
    {/* PRINT VIEW */}
    <div id="print-container" className="absolute top-[-9999px] left-[-9999px] w-[210mm] bg-white text-black text-sm p-4 z-[-1] print:block print:relative print:top-auto print:left-auto print:w-auto">
      <div className="h-screen flex flex-col items-center justify-center page-break-after">
        <Target className="w-24 h-24 text-[var(--color-accent)] mb-6" style={{ color: 'var(--color-accent)' }} />
        <h1 className="text-5xl font-extrabold tracking-tight mb-6 text-center leading-tight">
          <span className="text-[var(--color-accent)]">4P</span><span className="text-black"> Leerroutes:</span><br/>
          <span className="text-black">Een tool voor (her)ontwerp</span>
        </h1>
        <h2 className="text-3xl font-bold opacity-80">EvL: {evlName}</h2>
      </div>

      <div className="page-break-after flex flex-col justify-center min-h-[90vh]">
        <h3 className="text-2xl font-bold mb-3">Betrouwbaar beoordelen & beslissen</h3>
        <p className="opacity-80 mb-6 text-sm font-bold">
          Een betrouwbare beslissing vereist saturatie, triangulatie en intersubjectiviteit. Een juiste beoordeling vermijdt alle vormen van misalignment.
        </p>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 shadow-sm">
            <h4 className="font-bold text-sm text-blue-800 mb-2 flex items-center gap-1.5"><Layers className="w-4 h-4 flex-shrink-0" /> {TRIANGLE_THEORY.saturatie.title}</h4>
            <p className="text-xs opacity-80 leading-relaxed">{TRIANGLE_THEORY.saturatie.text}</p>
          </div>
          <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-100 shadow-sm">
            <h4 className="font-bold text-sm text-purple-800 mb-2 flex items-center gap-1.5"><Triangle className="w-4 h-4 flex-shrink-0" /> {TRIANGLE_THEORY.triangulatie.title}</h4>
            <p className="text-xs opacity-80 leading-relaxed">{TRIANGLE_THEORY.triangulatie.text.replace('onderstaand 4Ps framework', 'het 4Ps framework')}</p>
          </div>
          <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 shadow-sm">
            <h4 className="font-bold text-sm text-emerald-800 mb-2 flex items-center gap-1.5"><Users className="w-4 h-4 flex-shrink-0" /> {TRIANGLE_THEORY.intersubjectiviteit.title}</h4>
            <p className="text-xs opacity-80 leading-relaxed">{TRIANGLE_THEORY.intersubjectiviteit.text}</p>
          </div>
        </div>

        <div className="bg-red-50/50 p-4 rounded-xl border border-red-100 shadow-sm">
          <h4 className="font-bold text-sm text-red-800 border-b border-red-200 pb-2 mb-3 flex items-center gap-1.5"><AlertTriangle className="w-4 h-4 flex-shrink-0" /> Misalignment: valkuilen bij beoordelen en beslissen</h4>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            {MISALIGNMENT_THEORY.map(m => (
              <div key={m.title} className="flex flex-col gap-1">
                <strong className="text-xs text-red-900">{m.title}</strong>
                <p className="text-[11px] text-red-900/80 leading-snug">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="page-break-after w-full">
        <h3 className="text-2xl font-bold mb-6"><span className="text-[var(--color-accent)]">4P</span> Analyse</h3>
        <div className="flex flex-col gap-6 mb-6 w-full">
          <div className="print-panel p-4 flex flex-row gap-4 items-center w-full">
            <div className="text-center shrink-0 w-32 border-r border-black/10 pr-4">
              <div className="text-2xl font-bold mb-1 text-[var(--color-accent)]">{coveragePercent}%</div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Dekking LUK</div>
            </div>
            {uncoveredParts.length > 0 ? (
              <div className="text-xs text-red-600 flex-1 pl-2">
                <strong className="block mb-1">Niet gedekt:</strong>
                <ul className="list-disc pl-3 text-[11px] grid grid-cols-2 gap-x-4">
                  {uncoveredParts.map(p => <li key={p.id}>{p.loId}: {p.text}</li>)}
                </ul>
              </div>
            ) : (
              <div className="text-sm text-green-600 font-bold flex-1 pl-2">Alle LUK-onderdelen zijn gedekt!</div>
            )}
          </div>
          
          <div className="print-panel p-4 flex flex-row gap-4 items-start w-full">
            <div className="text-center shrink-0 w-32 border-r border-black/10 pr-4">
              <div className="text-2xl font-bold mb-1 text-[var(--color-accent)]">{Object.keys(stakeholderUsage).length}</div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Unieke<br/>stakeholders</div>
            </div>
            {Object.keys(stakeholderUsage).length > 0 ? (
              <div className="text-[11px] flex-1 pl-2">
                <ul className="list-disc pl-3 grid grid-cols-3 gap-x-4">
                  {Object.keys(stakeholderUsage).map(sh => <li key={sh} className="mb-0.5">{sh}</li>)}
                </ul>
              </div>
            ) : (
              <div className="text-sm opacity-60 italic flex-1 pl-2">Geen stakeholders ingevoerd.</div>
            )}
          </div>
          
          <div className="print-panel p-4 w-full flex flex-col items-center justify-center">
            <h4 className="text-sm font-bold text-center mb-4 text-gray-500 uppercase tracking-wider">Spreiding van type bewijsmateriaal</h4>
            <RadarChart width={500} height={400} cx="50%" cy="50%" outerRadius="75%" data={radarData}>
              <PolarGrid opacity={0.3} />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--color-accent)', fontSize: 12, fontWeight: 'bold' }} />
              <PolarRadiusAxis angle={30} domain={[0, Math.max(1, radarData.reduce((max, d) => Math.max(max, d.A), 0))]} tick={false} axisLine={false} />
              <Radar name="Aantal bewijzen" dataKey="A" stroke="var(--color-accent)" fill="var(--color-accent)" fillOpacity={0.4} />
            </RadarChart>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-6 page-break-before">Analyse per leeruitkomst</h3>
        {activeLOs.map(lo => {
          const parts = portfolio[lo.id];
          const loEvidence = parts.flatMap(p => p.evidence);
          const usedProxyTypes = Array.from(new Set(loEvidence.map(e => e.type)));
          const loStakeholders = Array.from(new Set(
            loEvidence.flatMap(e => e.stakeholders ? e.stakeholders.split(',').map(s => s.trim()).filter(Boolean) : [])
          ));
          const partsWithoutEvidenceCount = parts.filter(p => p.evidence.length === 0).length;

          return (
            <div key={lo.id} className="print-panel p-6 mb-6 print-avoid-break">
              <div className="flex justify-between items-start mb-4 gap-4 border-b pb-4">
                <div className="text-sm font-bold flex-1">{lo.id} - {lo.text}</div>
                {partsWithoutEvidenceCount > 0 && (
                  <div className="text-xs font-bold text-red-600 border border-red-600 px-2 py-1 rounded w-fit shrink-0">
                    Let op: niet alle LUK-onderdelen zijn van bewijs voorzien!
                  </div>
                )}
              </div>
              
              <div className="print-grid mb-4">
                <div className="print-col">
                  <strong>Gebruikte Proxies:</strong>
                  <div className="flex gap-2 mt-2">
                    {THE_4_PS.map(pt => usedProxyTypes.includes(pt.id) && (
                      <span key={pt.id} className="border px-2 py-1 text-xs rounded">{pt.label}</span>
                    ))}
                  </div>
                </div>
                <div className="print-col">
                  <strong>Betrokken Stakeholders:</strong>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {loStakeholders.map(sh => (
                      <span key={sh} className="border px-2 py-1 text-xs rounded">{sh}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              {usedProxyTypes.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mb-4 text-[10px] opacity-80 border-l-2 border-[var(--color-accent)] pl-3">
                  <div>
                    <strong className="block mb-1 text-xs">Voordelen:</strong>
                    <ul className="list-disc pl-3 space-y-1">
                      {usedProxyTypes.map(uid => {
                        const pt = THE_4_PS.find(p => p.id === uid);
                        return pt ? <li key={pt.id}><b>{pt.label}:</b> {pt.voordelen}</li> : null;
                      })}
                    </ul>
                  </div>
                  <div>
                    <strong className="block mb-1 text-xs">Nadelen:</strong>
                    <ul className="list-disc pl-3 space-y-1">
                      {usedProxyTypes.map(uid => {
                        const pt = THE_4_PS.find(p => p.id === uid);
                        return pt ? <li key={pt.id}><b>{pt.label}:</b> {pt.beperkingen}</li> : null;
                      })}
                    </ul>
                  </div>
                </div>
              )}

              <div>
                <strong>LUK Onderdelen & Bewijsstukken:</strong>
                <ul className="mt-2 text-xs space-y-2 list-disc pl-4">
                  {parts.map(part => {
                    const textColorClass = part.colorClass.replace(/bg-[a-z]+-[0-9]+/g, '').trim(); 
                    return (
                    <li key={part.id}>
                      <span className={`${part.evidence.length === 0 ? "font-bold text-red-600 underline border-red-600" : textColorClass}`}>
                        {part.text}
                      </span>
                      {part.evidence.length > 0 && (
                        <ul className="list-circle pl-4 mt-1 text-gray-700">
                          {part.evidence.map(e => (
                            <li key={e.id}>{e.name} ({THE_4_PS.find(p=>p.id===e.type)?.label})</li>
                          ))}
                        </ul>
                      )}
                    </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>

    {/* ON-SCREEN VIEW */}
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto no-print"
    >
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-sm font-bold opacity-60 hover:opacity-100 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Terug naar overzicht
        </button>
        <button onClick={handleExportPDF} className="btn-primary flex items-center gap-2 text-sm !py-2 !px-4 hover:shadow-lg">
          <FileText className="w-4 h-4" /> Exporteer naar PDF
        </button>
      </div>

      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2"><span className="text-[var(--color-accent)]">4P</span> Analyse</h2>
        <p className="opacity-80 max-w-2xl mx-auto text-lg">Toont het portfolio de LUKs (in samenhang) overtuigend aan?</p>
      </div>

      <div className="glass-panel p-6 mb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div 
              onClick={() => setShowCoverageModal(true)}
              className="bg-white p-6 rounded-xl border border-black/5 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-black/5 transition-colors shadow-sm"
            >
              <PieChart className="w-8 h-8 text-[var(--color-accent)] mb-2" />
              <div className="text-3xl font-bold mb-1">{coveragePercent}%</div>
              <div className="text-sm opacity-80">Dekking LUK-onderdelen<br/>({partsWithEvidence.length} van {partsWithLoInfo.length} voorzien van bewijs)</div>
            </div>

            <div 
              onClick={() => setShowStakeholdersModal(true)}
              className="bg-white p-6 rounded-xl border border-black/5 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-black/5 transition-colors shadow-sm"
            >
              <Users className="w-8 h-8 text-[var(--color-accent)] mb-2" />
              <div className="text-3xl font-bold mb-1">{uniqueStakeholders}</div>
              <div className="text-sm opacity-80">Unieke stakeholders<br/>betrokken bij bewijs</div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-black/5 flex flex-col justify-center items-center shadow-sm">
              <div className="w-full h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 12, fontWeight: 'bold' }} />
                    <Radar name="Proxies" dataKey="A" stroke="var(--color-accent)" fill="var(--color-accent)" fillOpacity={0.4} />
                    <Tooltip content={<CustomTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4">Analyse per Leeruitkomst</h3>
            {activeLOs.length === 0 ? (
              <div className="text-center p-10 bg-white rounded-xl border border-black/5 opacity-60 italic">
                Er zijn nog geen bewijsstukken toegevoegd aan het portfolio.
              </div>
            ) : (
              <div className="space-y-4">
                {activeLOs.map(lo => {
                  const parts = portfolio[lo.id];
                  const loEvidence = parts.flatMap(p => p.evidence);
                  const isExpanded = expandedLOs.includes(lo.id);
                  const usedProxyTypes = Array.from(new Set(loEvidence.map(e => e.type)));
                  const loStakeholders = Array.from(new Set(
                    loEvidence.flatMap(e => e.stakeholders ? e.stakeholders.split(',').map(s => s.trim()).filter(Boolean) : [])
                  ));
                  const partsWithoutEvidenceCount = parts.filter(p => p.evidence.length === 0).length;
                  
                  const renderHighlightedLO = () => {
                    if (parts.length === 0) return lo.text;
                    let elements: React.ReactNode[] = [lo.text];
                    parts.forEach((part) => {
                      elements = elements.flatMap((el, index) => {
                        if (typeof el !== 'string') return el;
                        const pieces = el.split(part.text);
                        if (pieces.length === 1) return el;
                        const newElements: React.ReactNode[] = [];
                        pieces.forEach((piece, i) => {
                          newElements.push(piece);
                          if (i < pieces.length - 1) {
                            const hasEvidence = part.evidence.length > 0;
                            const textColorClass = part.colorClass.replace(/bg-[a-z]+-[0-9]+/g, '').trim(); 
                            newElements.push(
                              <span 
                                key={`${part.id}-${index}-${i}`} 
                                className={`font-medium ${textColorClass} ${!hasEvidence ? 'text-red-600 font-bold underline cursor-pointer hover:bg-red-50' : ''}`}
                                onClick={!hasEvidence ? (e) => { e.stopPropagation(); onEditLO(lo.id, part.id); } : undefined}
                              >
                                {part.text}
                              </span>
                            );
                          }
                        });
                        return newElements;
                      });
                    });
                    return elements;
                  };

                  return (
                    <div key={lo.id} className="bg-white rounded-xl border border-black/5 shadow-sm border-l-4 border-l-[var(--color-accent)] overflow-hidden transition-all">
                      <div 
                        className="p-4 flex items-center justify-between cursor-pointer hover:bg-black/5 transition-colors"
                        onClick={() => toggleLO(lo.id)}
                      >
                        <div className="flex items-center gap-4 flex-1 pr-4">
                          <span className="bg-[var(--color-accent)] text-white px-2 py-1 rounded text-sm font-bold shrink-0">{lo.id}</span>
                        </div>
                        <div className="flex items-center gap-4 shrink-0">
                          <div className="flex gap-1">
                            {THE_4_PS.map(pt => {
                              const isUsed = usedProxyTypes.includes(pt.id);
                              if (!isUsed) return null;
                              return (
                                <div key={pt.id} className={`px-2 py-1 rounded text-xs font-bold ${pt.colorClass}`} title={pt.label}>
                                  {pt.label}
                                </div>
                              );
                            })}
                          </div>
                          {isExpanded ? <ChevronUp className="w-5 h-5 opacity-50" /> : <ChevronDown className="w-5 h-5 opacity-50" />}
                        </div>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-black/5 bg-black/[0.02]"
                          >
                            <div className="p-6">
                              <div className="w-full">
                                <div className="font-medium opacity-90 leading-relaxed text-base">{renderHighlightedLO()}</div>
                                {partsWithoutEvidenceCount > 0 && (
                                  <div className="mt-3 bg-amber-50 border border-amber-200 text-amber-800 px-3 py-2 rounded-lg text-sm flex items-start gap-2">
                                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                                    <span>Let op: niet alle LUK-onderdelen zijn van bewijs voorzien!</span>
                                  </div>
                                )}
                                <div className="w-full flex justify-end mt-2">
                                  <button 
                                    onClick={() => onEditLO(lo.id)}
                                    className="text-xs font-bold text-[var(--color-accent)] hover:underline flex items-center gap-1"
                                  >
                                    Bewerk deze Leeruitkomst <ChevronRight className="w-3 h-3 inline" />
                                  </button>
                                </div>
                              </div>

                              <div className="mt-6 mb-4 flex flex-col md:flex-row gap-3">
                                {THE_4_PS.map(pt => {
                                  const isUsed = usedProxyTypes.includes(pt.id);
                                  const Icon = pt.icon;
                                  return (
                                    <button
                                      key={pt.id}
                                      onClick={() => setSelectedProxyInfoType(pt.id)}
                                      className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 font-bold text-sm cursor-pointer transition-colors ${
                                        isUsed ? pt.colorClass + ' hover:opacity-80' : 'border-black/5 bg-black/5 text-black/40 hover:border-black/10 hover:bg-black/10'
                                      }`}
                                    >
                                      <Icon className="w-4 h-4 shrink-0" /> {pt.label}
                                    </button>
                                  );
                                })}
                              </div>

                              <div className="grid md:grid-cols-2 gap-8 mt-6">
                                <div>
                                  <h4 className="text-xs font-bold uppercase tracking-wider opacity-50 mb-3">Voordelen van ingezette proxies</h4>
                                  <ul className="space-y-3">
                                    {usedProxyTypes.map(uid => {
                                      const pt = THE_4_PS.find(p => p.id === uid);
                                      if (!pt) return null;
                                      return (
                                        <li key={pt.id} className="text-sm">
                                          <strong className={pt.colorClass.split(' ')[1]}>{pt.label}:</strong> <span className="opacity-80">{pt.voordelen}</span>
                                        </li>
                                      );
                                    })}
                                    {usedProxyTypes.length === 0 && <li className="text-sm opacity-60 italic">Nog geen proxies ingezet.</li>}
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="text-xs font-bold uppercase tracking-wider opacity-50 mb-3">Nadelen van ingezette proxies</h4>
                                  <ul className="space-y-3">
                                    {usedProxyTypes.map(uid => {
                                      const pt = THE_4_PS.find(p => p.id === uid);
                                      if (!pt) return null;
                                      return (
                                        <li key={pt.id} className="text-sm">
                                          <strong className={pt.colorClass.split(' ')[1]}>{pt.label}:</strong> <span className="opacity-80">{pt.beperkingen}</span>
                                        </li>
                                      );
                                    })}
                                    {usedProxyTypes.length === 0 && <li className="text-sm opacity-60 italic">Nog geen proxies ingezet.</li>}
                                  </ul>
                                </div>
                              </div>

                              <div className="mt-8 space-y-6">
                                <div>
                                  <h4 className="text-xs font-bold uppercase tracking-wider opacity-50 mb-3">Bewijsmaterialen</h4>
                                  {loEvidence.length > 0 ? (
                                    <ul className="space-y-2 text-sm max-h-[300px] overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                                      {loEvidence.map(e => {
                                        const typeInfo = THE_4_PS.find(p=>p.id===e.type);
                                        return (
                                          <li key={e.id} className="flex flex-col border border-black/5 p-3 rounded-lg bg-white shadow-sm">
                                            <span className="font-bold">{e.name}</span>
                                            <span className="text-xs opacity-70">({typeInfo?.label})</span>
                                          </li>
                                        )
                                      })}
                                    </ul>
                                  ) : (
                                    <span className="text-sm opacity-60 italic">Geen bewijsmateriaal gekoppeld.</span>
                                  )}
                                </div>

                                <div>
                                  <h4 className="text-xs font-bold uppercase tracking-wider opacity-50 mb-3">Betrokken stakeholders</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {loStakeholders.length > 0 ? (
                                      loStakeholders.map((sh, idx) => (
                                        <span key={idx} className="bg-white border rounded-full px-3 py-1 text-sm shadow-sm font-medium">{sh}</span>
                                      ))
                                    ) : (
                                      <span className="text-sm opacity-60 italic">Geen stakeholders gekoppeld.</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8 pb-10">
        <button onClick={onBack} className="btn-primary">
          Terug naar EvL-overzicht
        </button>
      </div>

      <AnimatePresence>
        {showCoverageModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm cursor-pointer"
            onClick={() => setShowCoverageModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="glass-panel p-6 max-w-lg w-full relative bg-white/95 max-h-[80vh] overflow-y-auto cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setShowCoverageModal(false)} className="absolute top-4 right-4 p-2 hover:bg-black/5 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-bold mb-4">Ongedekte LUK-onderdelen</h3>
              {uncoveredParts.length > 0 ? (
                <ul className="space-y-4">
                  {uncoveredParts.map((p, idx) => (
                    <li key={idx} className="text-sm p-3 bg-red-50/50 border border-red-200 rounded-lg">
                      <strong className="block text-red-800 mb-1">{p.loId}</strong>
                      <span className="opacity-90">{p.text}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm opacity-80 text-green-700 font-bold bg-green-50 p-4 rounded-lg border border-green-200">
                  Alle LUK-onderdelen zijn succesvol van bewijs voorzien!
                </p>
              )}
            </motion.div>
          </motion.div>
        )}

        {showStakeholdersModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm cursor-pointer"
            onClick={() => setShowStakeholdersModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="glass-panel p-6 max-w-lg w-full relative bg-white/95 max-h-[80vh] overflow-y-auto cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setShowStakeholdersModal(false)} className="absolute top-4 right-4 p-2 hover:bg-black/5 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-bold mb-4">Stakeholder Betrokkenheid</h3>
              {Object.keys(stakeholderUsage).length > 0 ? (
                <ul className="space-y-3">
                  {Object.entries(stakeholderUsage).map(([sh, loIds]) => (
                    <li key={sh} className="text-sm p-3 bg-white border border-black/10 rounded-lg shadow-sm">
                      <strong className="block mb-1 text-[var(--color-accent)]">{sh}</strong>
                      <span className="opacity-80 text-xs text-black/70">
                        Betrokken bij LUKs: {Array.from(loIds as Set<string>).join(', ')}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm opacity-80 italic">Er zijn nog geen stakeholders gekoppeld.</p>
              )}
            </motion.div>
          </motion.div>
        )}

        {selectedProxyInfoType && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm cursor-pointer"
            onClick={() => setSelectedProxyInfoType(null)}
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="glass-panel p-6 max-w-lg w-full relative bg-white/95 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedProxyInfoType(null)} className="absolute top-4 right-4 p-2 hover:bg-black/5 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
              {(() => {
                const pt = THE_4_PS.find(p => p.id === selectedProxyInfoType);
                if (!pt) return null;
                const Icon = pt.icon;
                return (
                  <div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border mb-4 ${pt.colorClass}`}>
                      {Icon && <Icon className="w-5 h-5" />}
                      <h3 className="text-lg font-bold">{pt.label}</h3>
                    </div>
                    <div className="space-y-3 text-sm">
                      <p><strong>Beschrijving:</strong> {pt.beschrijving}</p>
                      <p><strong>Focus:</strong> {pt.focus}</p>
                      <p><strong>Voorbeelden:</strong> {pt.voorbeelden}</p>
                      <p><strong>Voordelen:</strong> {pt.voordelen}</p>
                      <p><strong>Beperkingen:</strong> {pt.beperkingen}</p>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
    </>
  );
}
