import React from 'react';
import { Compass, Calendar, Plus, Users, Settings, LayoutDashboard } from 'lucide-react';
import { TabType, AccountType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  userRole: AccountType;
  vibersBadgeCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  userRole,
  vibersBadgeCount = 2,
}) => {
  return (
    <div className="sticky bottom-0 z-40 w-full px-4 py-2.5 bg-[#0b121e]/95 backdrop-blur-lg border-t border-slate-800/80 flex items-center justify-around">
      
      {/* 1. Sorties */}
      <button
        onClick={() => onTabChange('sorties')}
        className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${
          currentTab === 'sorties' ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Compass size={22} className={currentTab === 'sorties' ? 'text-cyan-400 stroke-[2.5]' : 'stroke-2'} />
        <span className="text-[11px]">Sorties</span>
      </button>

      {/* 2. Événements */}
      <button
        onClick={() => onTabChange('events')}
        className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${
          currentTab === 'events' ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Calendar size={22} className={currentTab === 'events' ? 'text-cyan-400 stroke-[2.5]' : 'stroke-2'} />
        <span className="text-[11px]">Événements</span>
      </button>

      {/* 3. Center Create (+) Button */}
      <button
        onClick={() => onTabChange('create')}
        className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 to-sky-400 text-white shadow-lg shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer -mt-3 border-2 border-[#0b121e]"
        title="Créer une sortie ou un événement"
      >
        <Plus size={24} strokeWidth={2.8} />
      </button>

      {/* 4. Vibers */}
      <button
        onClick={() => onTabChange('vibers')}
        className={`flex flex-col items-center gap-1 relative transition-all cursor-pointer ${
          currentTab === 'vibers' ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Users size={22} className={currentTab === 'vibers' ? 'text-cyan-400 stroke-[2.5]' : 'stroke-2'} />
        {vibersBadgeCount > 0 && (
          <span className="absolute -top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-[#0b121e]">
            {vibersBadgeCount}
          </span>
        )}
        <span className="text-[11px]">Vibers</span>
      </button>

      {/* 5. Paramètres / Tableau de bord if promoter */}
      {userRole === 'promoter' ? (
        <button
          onClick={() => onTabChange('promoter_dashboard')}
          className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${
            currentTab === 'promoter_dashboard' ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <LayoutDashboard size={22} className={currentTab === 'promoter_dashboard' ? 'text-cyan-400 stroke-[2.5]' : 'stroke-2'} />
          <span className="text-[11px]">Tableau</span>
        </button>
      ) : (
        <button
          onClick={() => onTabChange('profile')}
          className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${
            currentTab === 'profile' ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Settings size={22} className={currentTab === 'profile' ? 'text-cyan-400 stroke-[2.5]' : 'stroke-2'} />
          <span className="text-[11px]">Paramètres</span>
        </button>
      )}
    </div>
  );
};
