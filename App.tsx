
import React, { useState, useMemo, useEffect } from 'react';
import { TOOLS } from './constants';
import { AICategory, AITool, DiscoveredTool, GroundingSource } from './types';
import { ToolCard } from './components/ToolCard';
import { NeurIALogo } from './components/NeurIALogo';
import { 
  Search, Layout, Sparkles, Filter, X, Zap, Gift, Globe, 
  Lock, Clock, CreditCard, Mail, ArrowRight, DollarSign, 
  Lightbulb, FileText, Palette, Music, Video, Code, BookOpen, TrendingUp, Crown,
  ShieldCheck, Star, Rocket, Download, Settings, Languages, Palette as PaletteIcon, Menu, HelpCircle, Smartphone, Globe2, ExternalLink, Copy, CheckCircle2, Wand2, Share2, Info
} from 'lucide-react';
import { discoverNewTools } from './services/geminiService';
import { translations } from './translations';

type PriceFilter = 'All' | 'Free' | 'Freemium' | 'Paid';
type Language = 'es' | 'en';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  [AICategory.TEXT]: FileText,
  [AICategory.IMAGE]: Palette,
  [AICategory.AUDIO]: Music,
  [AICategory.VIDEO]: Video,
  [AICategory.CODING]: Code,
  [AICategory.RESEARCH]: BookOpen,
  [AICategory.MARKETING]: TrendingUp,
  [AICategory.PREMIUM]: Crown,
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>((localStorage.getItem('ai_hub_lang') as Language) || 'es');
  const t = translations[lang];

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  const [userEmail, setUserEmail] = useState<string | null>(localStorage.getItem('ai_hub_user'));
  const [regDate, setRegDate] = useState<number | null>(Number(localStorage.getItem('ai_hub_reg_date')));
  const [isPaid, setIsPaid] = useState<boolean>(localStorage.getItem('ai_hub_is_paid') === 'true');
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [showSettings, setShowSettings] = useState(false);
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [copied, setCopied] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<AICategory | 'All'>('All');
  const [selectedPrice, setSelectedPrice] = useState<PriceFilter>('All');
  
  const [discoveredTools, setDiscoveredTools] = useState<DiscoveredTool[]>([]);
  const [groundingSources, setGroundingSources] = useState<GroundingSource[]>([]);
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const TRIAL_DURATION = 24 * 60 * 60 * 1000;

  useEffect(() => {
    localStorage.setItem('ai_hub_lang', lang);
  }, [lang]);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const copyUrl = () => {
    // Usamos el origen actual para asegurar que PWABuilder lo reciba bien
    const url = window.location.origin + window.location.pathname;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  useEffect(() => {
    if (regDate && !isPaid) {
      const timer = setInterval(() => {
        const now = Date.now();
        const diff = (regDate + TRIAL_DURATION) - now;
        if (diff <= 0) {
          setTimeLeft(t.expired);
          clearInterval(timer);
        } else {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          setTimeLeft(`${hours}h ${minutes}m`);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [regDate, isPaid, lang]);

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const now = Date.now();
    localStorage.setItem('ai_hub_user', email);
    localStorage.setItem('ai_hub_reg_date', now.toString());
    setUserEmail(email);
    setRegDate(now);
  };

  const categories = Object.values(AICategory);

  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           tool.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchesPrice = selectedPrice === 'All' || tool.pricingType === selectedPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchTerm, selectedCategory, selectedPrice]);

  const groupedTools = useMemo(() => {
    if (selectedCategory !== 'All' || searchTerm !== '') return null;
    const groups: Record<string, AITool[]> = {};
    categories.forEach(cat => {
      const toolsInCat = filteredTools.filter(t => t.category === cat);
      if (toolsInCat.length > 0) groups[cat] = toolsInCat;
    });
    return groups;
  }, [filteredTools, selectedCategory, searchTerm]);

  const handleDiscover = async () => {
    setIsDiscovering(true);
    setGroundingSources([]);
    const result = await discoverNewTools(searchTerm || "magic ai", selectedCategory);
    setDiscoveredTools(result.tools);
    setGroundingSources(result.sources);
    setIsDiscovering(false);
  };

  if (!userEmail) {
    return (
      <div className="min-h-screen bg-[#05010d] flex items-center justify-center p-6 selection:bg-fuchsia-500/30">
        <div className="max-w-md w-full glass-morphism p-10 rounded-[3rem] text-center shadow-2xl shadow-violet-500/20 animate-in zoom-in duration-500 border border-violet-500/20">
          <div className="mx-auto mb-6 flex justify-center">
            <NeurIALogo size="lg" className="rotate-3" />
          </div>
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500 mb-2 tracking-tighter drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">NeurIA</h1>
          <p className="text-slate-400 mb-8 leading-relaxed font-medium">{t.registerDesc}</p>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="relative text-left">
              <input name="email" type="email" required placeholder={t.emailPlaceholder} className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 px-6 text-white focus:ring-2 focus:ring-fuchsia-500 outline-none transition-all placeholder:text-slate-600" />
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:scale-[1.02] text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-fuchsia-600/20">
              {t.activateBtn} <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#05010d] text-slate-100 relative selection:bg-cyan-500/30">
      
      {/* MODAL GUÍA APK (CORREGIDO Y MEJORADO) */}
      {showInstallGuide && (
        <div className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-3xl flex items-center justify-center p-4 animate-in fade-in zoom-in duration-300">
          <div className="bg-[#0f0223] border border-cyan-500/40 w-full max-w-lg rounded-[3rem] p-8 shadow-2xl relative overflow-hidden flex flex-col gap-6">
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500"></div>
             <button onClick={() => setShowInstallGuide(false)} className="absolute top-6 right-6 p-2 bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors">
               <X className="w-6 h-6" />
             </button>
             
             <div className="text-center">
               <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/30">
                 <Smartphone className="text-white w-10 h-10 animate-pulse" />
               </div>
               <h2 className="text-3xl font-black text-white tracking-tighter">{t.guideTitle}</h2>
               <p className="text-slate-400 text-sm mt-1">Transforma NeurIA en una App Instalable</p>
             </div>

             <div className="space-y-4 relative">
                {/* Paso 1: COPIAR */}
                <div className={`relative z-10 flex gap-4 items-start p-5 rounded-3xl border transition-all duration-500 ${copied ? 'bg-cyan-500/10 border-cyan-500/50' : 'bg-white/5 border-white/5'}`}>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center font-black shadow-lg transition-colors ${copied ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-400'}`}>1</div>
                  <div className="flex-1">
                    <h3 className="text-base font-black text-white">{t.guideStep1}</h3>
                    <p className="text-slate-400 text-[11px] leading-relaxed mb-4">{t.guideStep1Desc}</p>
                    <button 
                      onClick={copyUrl} 
                      className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-xs font-black uppercase tracking-widest active:scale-95 transition-all shadow-xl ${copied ? 'bg-cyan-500 text-white shadow-cyan-500/20' : 'bg-white text-black hover:bg-slate-200'}`}
                    >
                      {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      {copied ? "¡ENLACE COPIADO!" : "COPIAR ENLACE DE LA APP"}
                    </button>
                  </div>
                </div>

                {/* Paso 2: IR A PWABUILDER */}
                <div className="relative z-10 flex gap-4 items-start bg-white/5 p-5 rounded-3xl border border-white/5">
                  <div className="flex-shrink-0 w-10 h-10 bg-violet-600 text-white rounded-2xl flex items-center justify-center font-black shadow-lg">2</div>
                  <div className="flex-1">
                    <h3 className="text-base font-black text-white">{t.guideStep2}</h3>
                    <p className="text-slate-400 text-[11px] leading-relaxed mb-4">{t.guideStep2Desc}</p>
                    <a 
                      href="https://www.pwabuilder.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-3 bg-violet-600/20 text-violet-400 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-violet-500/30 hover:bg-violet-600/30 transition-all"
                    >
                      <Globe2 className="w-4 h-4" /> ABRIR PWABUILDER.COM
                    </a>
                  </div>
                </div>

                {/* Paso 3: DESCARGAR */}
                <div className="relative z-10 flex gap-4 items-start bg-white/5 p-5 rounded-3xl border border-white/5">
                  <div className="flex-shrink-0 w-10 h-10 bg-fuchsia-600 text-white rounded-2xl flex items-center justify-center font-black shadow-lg">3</div>
                  <div className="flex-1">
                    <h3 className="text-base font-black text-white">{t.guideStep3}</h3>
                    <p className="text-slate-400 text-[11px] leading-relaxed">{t.guideStep3Desc}</p>
                  </div>
                </div>
             </div>

             <button onClick={() => setShowInstallGuide(false)} className="w-full mt-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-black py-4 rounded-2xl shadow-xl active:scale-95 transition-all">
               {t.close}
             </button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="z-40 bg-[#05010d]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 pb-2">
        <div className="max-w-[1400px] mx-auto px-6 py-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors md:hidden">
              <Menu className="w-6 h-6 text-violet-400" />
            </button>
            <div className="flex items-center gap-4 group cursor-default">
              <NeurIALogo size="md" />
              <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-300 to-fuchsia-400 tracking-tighter">
                NeurIA
              </h1>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
             <button onClick={() => setShowInstallGuide(true)} className="p-3 bg-cyan-500/10 rounded-2xl hover:bg-cyan-500/20 transition-colors text-cyan-400 font-bold flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-widest">{t.installGuideBtn}</span>
             </button>
             <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2 flex items-center gap-3">
                <Clock className="w-4 h-4 text-violet-400" />
                <span className="text-xs font-black tracking-widest uppercase text-slate-400">{isPaid ? t.unlimited : timeLeft}</span>
             </div>
             <button onClick={() => setShowSettings(true)} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                <Settings className="w-5 h-5 text-slate-400" />
             </button>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 pb-4 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-fuchsia-500 transition-colors" />
              <input 
                type="text" 
                placeholder={t.searchPlaceholder} 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:ring-2 focus:ring-fuchsia-500/50 outline-none text-sm font-bold transition-all" 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} 
              />
            </div>
            
            <button 
              onClick={handleDiscover} 
              disabled={isDiscovering} 
              className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-fuchsia-600/20 disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 min-w-[180px]"
            >
              {isDiscovering ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="animate-pulse">Buscando...</span>
                </div>
              ) : (
                <>
                  <Globe className="w-5 h-5" />
                  {t.discoverBtn}
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 mask-fade-right">
            <button 
              onClick={() => setSelectedCategory('All')} 
              className={`flex-shrink-0 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${selectedCategory === 'All' ? 'bg-white text-black shadow-lg shadow-white/10' : 'bg-white/5 text-slate-500 hover:bg-white/10'}`}
            >
              {t.all}
            </button>
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setSelectedCategory(cat)} 
                className={`flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${selectedCategory === cat ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' : 'bg-white/5 text-slate-500 hover:bg-white/10'}`}
              >
                {React.createElement(CATEGORY_ICONS[cat] || FileText, { className: "w-4 h-4" })}
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto no-scrollbar">
        <div className="max-w-[1400px] mx-auto p-6 md:p-10">
          
          {/* BANNER DE BIENVENIDA / APK CONVERSION */}
          <div className="mb-14 p-8 rounded-[2.5rem] bg-gradient-to-br from-violet-900/40 via-fuchsia-900/20 to-slate-900 border border-violet-500/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
               <Smartphone className="w-48 h-48 text-white rotate-12" />
            </div>
            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-2 bg-fuchsia-500/20 text-fuchsia-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-fuchsia-500/20">
                <Zap className="w-3 h-3" /> Tip de Pro
              </span>
              <h2 className="text-4xl font-black text-white tracking-tighter mb-4">¿Quieres NeurIA en tu móvil como una APK?</h2>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">Hemos preparado una guía mágica para que conviertas esta web en una aplicación real para Android en menos de 2 minutos.</p>
              <button 
                onClick={() => setShowInstallGuide(true)} 
                className="bg-white text-black font-black px-8 py-4 rounded-2xl flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-white/10 active:scale-95"
              >
                Ver Pasos para APK <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {discoveredTools && (discoveredTools as DiscoveredTool[]).length > 0 && (
            <section className="mb-14 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-fuchsia-500/20 rounded-2xl flex items-center justify-center">
                    <Sparkles className="text-fuchsia-500 w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-white tracking-tighter italic">Nuevos Hallazgos</h2>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Sugerido por IA</p>
                  </div>
                </div>
                <button onClick={() => { setDiscoveredTools([]); setGroundingSources([]); }} className="self-end md:self-center p-2 hover:bg-slate-900 rounded-full text-slate-500"><X className="w-6 h-6" /></button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {(discoveredTools as DiscoveredTool[]).map((tool, idx) => (
                  <div key={idx} className="glass-morphism rounded-[2.5rem] p-8 border-violet-500/20 shadow-2xl group hover:border-violet-500/50 transition-all hover:scale-[1.02] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                       <span className="text-[9px] font-black bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded-full border border-cyan-500/20 uppercase">{tool.pricingNote}</span>
                    </div>
                    <h3 className="text-2xl font-black text-cyan-400 mb-2 tracking-tighter">{tool.name}</h3>
                    <p className="text-slate-400 text-xs mb-8 line-clamp-3 leading-relaxed">{tool.description}</p>
                    <a href={tool.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-violet-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-violet-500 transition-all">{t.visitWeb} <ArrowRight className="w-4 h-4" /></a>
                  </div>
                ))}
              </div>

              {groundingSources.length > 0 && (
                <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="w-4 h-4 text-slate-500" />
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Fuentes consultadas</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {groundingSources.map((source, idx) => (
                      <a 
                        key={idx} 
                        href={source.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-slate-900/50 hover:bg-slate-800 border border-white/5 px-3 py-2 rounded-xl text-[10px] text-slate-400 transition-all hover:text-white"
                      >
                        <span className="truncate max-w-[150px]">{source.title}</span>
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {groupedTools ? (
            <div className="space-y-24">
              {(Object.entries(groupedTools) as [string, AITool[]][]).map(([category, tools]) => (
                <section key={category}>
                  <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-5">
                      <div className="p-4 bg-gradient-to-br from-violet-900/40 to-slate-900 rounded-[2rem] border border-violet-500/20">
                        {React.createElement(CATEGORY_ICONS[category] || FileText, { className: "w-8 h-8 text-fuchsia-400" })}
                      </div>
                      <div>
                        <h2 className="text-4xl font-black text-white tracking-tighter">{category}</h2>
                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">{tools.length} {t.toolsCount}</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {tools.map(tool => <ToolCard key={tool.id} tool={tool} lang={lang} />)}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
              {filteredTools.map(tool => <ToolCard key={tool.id} tool={tool} lang={lang} />)}
            </div>
          )}
        </div>
      </main>

      {/* SIDEBAR MÓVIL */}
      <aside className={`fixed inset-y-0 left-0 z-[60] w-72 glass-morphism transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-black text-white tracking-tighter">NeurIA</h2>
            <button onClick={() => setIsSidebarOpen(false)} className="text-slate-500"><X /></button>
          </div>
          <div className="space-y-4">
             <button onClick={() => { setShowInstallGuide(true); setIsSidebarOpen(false); }} className="w-full bg-cyan-500/20 border border-cyan-500/20 py-4 rounded-2xl font-black text-cyan-400 flex items-center justify-center gap-2 shadow-lg"><Smartphone className="w-5 h-5" /> {t.installGuideBtn}</button>
             <button onClick={() => { setShowSettings(true); setIsSidebarOpen(false); }} className="w-full bg-white/5 py-4 rounded-2xl font-black text-slate-300 flex items-center justify-center gap-2"><Settings className="w-5 h-5" /> {t.settings}</button>
          </div>
        </div>
      </aside>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .mask-fade-right {
          mask-image: linear-gradient(to right, black 85%, transparent 100%);
        }
      `}</style>
    </div>
  );
};

export default App;
