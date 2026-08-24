import React, { useState } from 'react';
import { Wifi, Battery, Signal, Smartphone, Maximize2, Minimize2 } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
  theme?: 'dark' | 'light' | 'auto';
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children, theme = 'dark' }) => {
  const [isFrameEnabled, setIsFrameEnabled] = useState(true);

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center p-0 sm:p-4 md:p-6 transition-colors duration-300 ${theme === 'light' ? 'bg-slate-100 text-slate-900' : 'bg-slate-950 text-slate-100'}`}>
      
      {/* Top Device Switcher Toolbar for desktop convenience */}
      <div className="hidden sm:flex items-center justify-between w-full max-w-[430px] mb-3 px-2 text-xs font-medium text-slate-400">
        <div className="flex items-center gap-1.5">
          <Smartphone size={14} className="text-cyan-400" />
          <span>SocialMeet • Cotonou, Bénin</span>
        </div>
        <button
          onClick={() => setIsFrameEnabled(!isFrameEnabled)}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition-all cursor-pointer text-[11px]"
          title="Basculer entre vue téléphone et plein écran"
        >
          {isFrameEnabled ? (
            <>
              <Maximize2 size={11} /> Plein écran
            </>
          ) : (
            <>
              <Minimize2 size={11} /> Vue iPhone
            </>
          )}
        </button>
      </div>

      {/* Main Container */}
      <div
        className={`w-full relative flex flex-col transition-all duration-300 overflow-hidden ${
          isFrameEnabled
            ? 'max-w-[412px] h-[890px] max-h-[95vh] rounded-[48px] border-[8px] border-slate-800 shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_0_2px_rgba(255,255,255,0.08)] ring-1 ring-cyan-500/20'
            : 'max-w-xl min-h-screen sm:min-h-[92vh] sm:rounded-3xl sm:border sm:border-slate-800/80 shadow-2xl'
        } ${theme === 'light' ? 'bg-white' : 'bg-[#0b121e]'}`}
      >
        {/* iOS Status Bar */}
        <div className="sticky top-0 z-50 w-full px-7 pt-3 pb-1 flex items-center justify-between text-xs font-semibold select-none backdrop-blur-md bg-[#0b121e]/90 text-white">
          <span className="text-[13px] tracking-tight">13:47</span>
          
          {/* Dynamic Island Notch in Phone Mode */}
          {isFrameEnabled && (
            <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-24 h-5 bg-black rounded-full flex items-center justify-end px-2 gap-1.5 shadow-inner">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700/50" />
            </div>
          )}

          <div className="flex items-center gap-1.5 text-slate-200">
            <Signal size={13} strokeWidth={2.5} />
            <Wifi size={13} strokeWidth={2.5} />
            <div className="flex items-center gap-0.5">
              <span className="text-[10px] mr-0.5">85%</span>
              <Battery size={15} strokeWidth={2.5} className="rotate-90 text-white fill-white" />
            </div>
          </div>
        </div>

        {/* Inner Scrollable Screen Content */}
        <div className="flex-1 w-full overflow-y-auto no-scrollbar flex flex-col relative">
          {children}
        </div>

        {/* iOS Home Bar Indicator */}
        {isFrameEnabled && (
          <div className="w-full pb-2 pt-1 flex justify-center bg-[#0b121e]/95 pointer-events-none">
            <div className="w-32 h-1 bg-slate-500/60 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};
