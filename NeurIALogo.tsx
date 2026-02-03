
import React, { useState, useEffect } from 'react';
import { generateAppLogo } from '../geminiService';
import { Sparkles, Loader2 } from 'lucide-react';

interface NeurIALogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const NeurIALogo: React.FC<NeurIALogoProps> = ({ className = '', size = 'md' }) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(localStorage.getItem('neuria_generated_logo'));
  const [loading, setLoading] = useState(false);

  const fetchLogo = async () => {
    setLoading(true);
    const newLogo = await generateAppLogo();
    if (newLogo) {
      setLogoUrl(newLogo);
      localStorage.setItem('neuria_generated_logo', newLogo);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!logoUrl) {
      fetchLogo();
    }
  }, [logoUrl]);

  const sizeClasses = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-12 h-12 rounded-xl',
    lg: 'w-20 h-20 rounded-3xl'
  };

  if (loading && !logoUrl) {
    return (
      <div className={`${sizeClasses[size]} bg-violet-600/20 flex items-center justify-center animate-pulse ${className}`}>
        <Loader2 className="w-1/2 h-1/2 text-violet-500 animate-spin" />
      </div>
    );
  }

  if (!logoUrl) {
    return (
      <div className={`${sizeClasses[size]} bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg ${className}`}>
        <Sparkles className="w-1/2 h-1/2 text-white" />
      </div>
    );
  }

  return (
    <div className="relative group cursor-pointer" onClick={fetchLogo} title="Re-generate Branding">
      <img 
        src={logoUrl} 
        alt="NeurIA Logo" 
        className={`${sizeClasses[size]} object-cover shadow-2xl shadow-violet-500/20 border border-white/10 group-hover:scale-105 transition-transform ${className}`}
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-inherit">
        <Sparkles className="w-4 h-4 text-white" />
      </div>
    </div>
  );
};
