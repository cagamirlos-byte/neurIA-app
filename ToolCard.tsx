
import React, { useState } from 'react';
import { AICategory, AITool } from './types';
import { ExternalLink, CreditCard, Sparkles, Twitter, Linkedin, Share2, Crown, BadgeCheck, Gem, Coins } from 'lucide-react';
import { translations } from './translations';

interface ToolCardProps {
  tool: AITool;
  lang: 'es' | 'en';
}

const CATEGORY_PLACEHOLDERS: Record<string, string> = {
  [AICategory.TEXT]: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600',
  [AICategory.IMAGE]: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=600',
  [AICategory.AUDIO]: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=600',
  [AICategory.VIDEO]: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=600',
  [AICategory.CODING]: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600',
  [AICategory.RESEARCH]: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600',
  [AICategory.MARKETING]: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
  [AICategory.PREMIUM]: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600',
};

export const ToolCard: React.FC<ToolCardProps> = ({ tool, lang }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(tool.imageUrl || CATEGORY_PLACEHOLDERS[tool.category]);
  const [hasError, setHasError] = useState(false);
  const t = translations[lang];

  const getPricingBadge = () => {
    switch (tool.pricingType) {
      case 'Free':
        return <span className="bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-md font-black text-[10px] uppercase">GRATIS</span>;
      case 'Freemium':
        return <span className="bg-fuchsia-500/20 text-fuchsia-400 px-2 py-0.5 rounded-md font-black text-[10px] uppercase">FREEMIUM</span>;
      case 'Paid':
        return <span className="bg-pink-500/20 text-pink-500 px-2 py-0.5 rounded-md font-black text-[10px] flex items-center gap-1 uppercase"><CreditCard className="w-3 h-3"/> {t.premium}</span>;
      default:
        return null;
    }
  };

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(CATEGORY_PLACEHOLDERS[tool.category] || CATEGORY_PLACEHOLDERS[AICategory.TEXT]);
    }
  };

  const shareText = encodeURIComponent(`Check this AI tool out: ${tool.name}`);
  const shareUrl = encodeURIComponent(tool.url);

  const isPaid = tool.pricingType === 'Paid';
  const isFreeOrFreemium = tool.pricingType === 'Free' || tool.pricingType === 'Freemium';

  return (
    <div 
      className={`
        group relative glass-morphism rounded-[2rem] overflow-hidden transition-all duration-500 hover:scale-[1.03] flex flex-col h-full border 
        ${isPaid ? 'border-pink-500/40 border-t-4 border-t-pink-500 shadow-xl shadow-pink-500/10' : 
          isFreeOrFreemium ? 'border-violet-500/30 border-t-4 border-t-violet-500' : 'border-slate-800'} 
        hover:shadow-2xl
      `}
    >
      {isPaid && (
        <div className="absolute top-0 left-0 z-20 bg-gradient-to-r from-pink-500 to-rose-600 text-white text-[10px] font-black px-4 py-1.5 rounded-br-2xl shadow-lg flex items-center gap-1.5 tracking-tighter uppercase">
          <Crown className="w-3 h-3" />
          {t.premium}
        </div>
      )}

      <div className="relative h-48 overflow-hidden bg-slate-900">
        {!imageLoaded && <div className="absolute inset-0 bg-gradient-to-r from-violet-950 via-fuchsia-950 to-violet-950 animate-pulse z-10" />}
        <img 
          src={imgSrc} 
          alt={tool.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={handleImageError}
          className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${imageLoaded ? 'opacity-50' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05010d] via-transparent to-transparent opacity-90" />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-black text-white group-hover:text-cyan-400 transition-colors tracking-tighter">
              {tool.name}
            </h3>
            {isPaid && <BadgeCheck className="w-4 h-4 text-pink-400" />}
          </div>
          {isPaid && <Sparkles className="w-5 h-5 text-pink-500 animate-pulse" />}
        </div>
        
        <p className="text-slate-400 text-xs mb-4 flex-grow line-clamp-3 leading-relaxed">
          {tool.description}
        </p>
        
        <div className="mt-auto space-y-4">
          <div className="flex flex-col gap-1">
            <div className="text-[9px] font-black uppercase tracking-widest text-slate-500">{t.pricingPlan}</div>
            <div className="flex items-center gap-3">
              {getPricingBadge()}
              <span className="text-slate-500 text-[10px] font-medium italic truncate">{tool.pricingNote}</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <a 
              href={tool.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`block w-full text-center font-black py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 text-xs ${
                isPaid 
                ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white hover:brightness-110 shadow-lg shadow-pink-600/20' 
                : 'bg-violet-600 text-white hover:bg-violet-500 shadow-lg shadow-violet-600/20'
              }`}
            >
              {isPaid ? <CreditCard className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
              {isPaid ? t.upgradeBtn : t.openTool}
            </a>

            {isPaid && (
              <a 
                href={tool.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full text-center font-black py-2.5 rounded-xl transition-all border border-pink-500/30 text-pink-500 hover:bg-pink-500/10 active:scale-95 flex items-center justify-center gap-2 text-[10px]"
              >
                <Coins className="w-3 h-3" />
                {t.pagoUnico}
              </a>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-slate-800/50 mt-2">
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{t.shared}</span>
              <div className="flex gap-2">
                <a href={`https://twitter.com/intent/tweet?url=${shareUrl}`} target="_blank" className="text-slate-500 hover:text-cyan-400"><Twitter className="w-4 h-4" /></a>
                <a href={`https://linkedin.com/share?url=${shareUrl}`} target="_blank" className="text-slate-500 hover:text-cyan-400"><Linkedin className="w-4 h-4" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
