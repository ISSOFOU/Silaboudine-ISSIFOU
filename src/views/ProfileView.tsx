import React, { useState } from 'react';
import { ArrowLeft, Settings, Calendar, Bell, ChevronRight, Check, Sparkles, LogOut, Trash2 } from 'lucide-react';
import { UserProfile, AppNotification } from '../types';
import confetti from 'canvas-confetti';

interface ProfileViewProps {
  user: UserProfile;
  notifications: AppNotification[];
  onBack: () => void;
  onUpdateUser: (updatedUser: UserProfile) => void;
  onOpenPromoterDashboard: () => void;
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  notifications,
  onBack,
  onUpdateUser,
  onOpenPromoterDashboard,
  onLogout,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState(user.bio);
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark' | 'auto'>(user.theme);

  const unreadNotifs = notifications.filter((n) => !n.read).length;

  const handleToggleRole = () => {
    const newRole = user.role === 'particular' ? 'promoter' : 'particular';
    onUpdateUser({
      ...user,
      role: newRole,
    });
    if (newRole === 'promoter') {
      try {
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.5 } });
      } catch {}
      onOpenPromoterDashboard();
    }
  };

  const handleSaveBio = () => {
    onUpdateUser({
      ...user,
      bio: bioInput,
    });
    setIsEditingBio(false);
  };

  const handleThemeChange = (t: 'light' | 'dark' | 'auto') => {
    setActiveTheme(t);
    onUpdateUser({
      ...user,
      theme: t,
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0b121e] text-white pb-6">
      
      {/* Header matching Image 7 */}
      <div className="px-4 py-3 bg-[#0f1726] border-b border-slate-800/80 flex items-center justify-between sticky top-0 z-30">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-slate-300 hover:text-white text-xs font-semibold transition"
        >
          <ArrowLeft size={16} />
          <span>Paramètres</span>
        </button>

        <h1 className="font-extrabold text-sm text-white font-display">Profil</h1>

        <button className="p-1 rounded-full text-slate-300 hover:text-white">
          <Settings size={18} />
        </button>
      </div>

      <div className="px-4 py-4 space-y-4">
        
        {/* Profile Card Header matching Image 7 */}
        <div className="flex flex-col items-center text-center space-y-1.5 pt-1">
          {/* Avatar Circle */}
          <div className="w-18 h-18 rounded-full bg-cyan-500 text-slate-950 font-black text-2xl flex items-center justify-center shadow-xl border-4 border-[#141e2e]">
            {user.initials || 'D'}
          </div>

          <h2 className="font-bold text-sm text-white pt-1">{user.email}</h2>
          <p className="text-xs text-slate-400">Membre depuis {user.memberSince}</p>
        </div>

        {/* Stats Row matching Image 7 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#141e2e] border border-slate-700/60 rounded-2xl p-3.5 text-center shadow-md">
            <span className="text-xl font-extrabold text-white block">
              {user.organizedCount}
            </span>
            <span className="text-xs text-slate-400 font-medium mt-0.5">Organisées</span>
          </div>

          <div className="bg-[#141e2e] border border-slate-700/60 rounded-2xl p-3.5 text-center shadow-md">
            <span className="text-xl font-extrabold text-white block">
              {user.joinedCount}
            </span>
            <span className="text-xs text-slate-400 font-medium mt-0.5">Rejointes</span>
          </div>
        </div>

        {/* Banner: Compte Particulier / Passer Promoteur matching Image 7 */}
        <div className="bg-gradient-to-r from-[#9d174d] via-[#be185d] to-[#db2777] rounded-2xl p-4 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10 space-y-1">
            <h3 className="font-extrabold text-sm">
              {user.role === 'promoter' ? 'Compte Promoteur Actif' : 'Compte Particulier'}
            </h3>
            <p className="text-[11px] text-pink-100 leading-tight pr-14">
              {user.role === 'promoter'
                ? 'Gérez vos billetteries payantes, scanner QR et virements Mobile Money.'
                : 'Passez Promoteur pour organiser des événements payants'}
            </p>
            <button
              onClick={handleToggleRole}
              className="mt-2.5 px-4 py-1.5 bg-white hover:bg-pink-50 text-slate-950 font-bold text-xs rounded-full transition cursor-pointer shadow-md"
            >
              {user.role === 'promoter' ? 'Tableau de bord' : 'Changer'}
            </button>
          </div>
          
          {/* Subtle graphic wave in corner */}
          <div className="absolute -right-4 -bottom-6 w-28 h-28 bg-white/10 rounded-full blur-sm pointer-events-none" />
        </div>

        {/* Section: Mes activités et Notifications matching Image 7 */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-300">Mes activités et Notifications</h3>

          <div className="bg-[#141e2e] border border-slate-700/60 rounded-2xl overflow-hidden divide-y divide-slate-800">
            {/* Mes activités */}
            <button
              onClick={() => setShowActivities(!showActivities)}
              className="w-full p-3.5 flex items-center justify-between hover:bg-[#182436] transition text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Calendar size={16} className="text-slate-400" />
                <span className="text-xs font-medium text-white">Mes activités</span>
              </div>
              <ChevronRight size={16} className="text-slate-400" />
            </button>

            {showActivities && (
              <div className="p-3 bg-[#0f1726] text-xs text-slate-300 space-y-2">
                <p className="font-semibold text-cyan-400">Sorties récentes :</p>
                <div className="p-2 bg-[#182333] rounded-xl border border-slate-700">
                  <p className="font-bold text-white">Bord de plage & grillades</p>
                  <p className="text-[11px] text-slate-400">Plage de Fidjrossè • Sam. 22 août</p>
                </div>
                <div className="p-2 bg-[#182333] rounded-xl border border-slate-700">
                  <p className="font-bold text-white">Soirée Salsa</p>
                  <p className="text-[11px] text-slate-400">Place des Arts Calavi • Sam. 22 août</p>
                </div>
              </div>
            )}

            {/* Notifications */}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-full p-3.5 flex items-center justify-between hover:bg-[#182436] transition text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Bell size={16} className="text-slate-400" />
                <span className="text-xs font-medium text-white">Notifications</span>
              </div>
              <div className="flex items-center gap-1.5">
                {unreadNotifs > 0 && (
                  <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {unreadNotifs}
                  </span>
                )}
                <ChevronRight size={16} className="text-slate-400" />
              </div>
            </button>

            {showNotifications && (
              <div className="p-3 bg-[#0f1726] text-xs text-slate-300 space-y-2">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2 bg-[#182333] rounded-xl border border-slate-700">
                    <p className="font-bold text-white text-[11px]">{n.title}</p>
                    <p className="text-[10px] text-slate-300">{n.message}</p>
                    <span className="text-[9px] text-slate-500">{n.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Section: Paramètres du compte matching Image 7 */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-300">Paramètres du compte</h3>

          <div className="bg-[#141e2e] border border-slate-700/60 rounded-2xl p-3.5 space-y-3">
            {/* À propos */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">À propos</span>
              {isEditingBio ? (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={bioInput}
                    onChange={(e) => setBioInput(e.target.value)}
                    className="bg-[#0f1726] border border-slate-700 rounded px-2 py-0.5 text-xs text-white"
                  />
                  <button onClick={handleSaveBio} className="text-cyan-400 font-bold text-xs">
                    OK
                  </button>
                </div>
              ) : (
                <span
                  onClick={() => setIsEditingBio(true)}
                  className="text-slate-200 cursor-pointer hover:text-cyan-400"
                >
                  {user.bio || 'bio'}
                </span>
              )}
            </div>

            {/* Localisation */}
            <div className="flex items-center justify-between text-xs border-t border-slate-800 pt-2.5">
              <span className="text-slate-400">Localisation</span>
              <span className="text-slate-200 font-medium">{user.location}</span>
            </div>

            {/* Centres d'intérêt */}
            <div className="flex items-center justify-between text-xs border-t border-slate-800 pt-2.5">
              <span className="text-slate-400">Centres d'intérêt</span>
              <span className="text-slate-200 font-medium">{user.interests.join(', ')}</span>
            </div>

            {/* Thème buttons matching Image 7: [Clair | Sombre | Auto] */}
            <div className="flex items-center justify-between text-xs border-t border-slate-800 pt-2.5">
              <span className="text-slate-400">Thème</span>
              <div className="flex items-center bg-[#0e1624] p-0.5 rounded-xl border border-slate-700">
                <button
                  onClick={() => handleThemeChange('light')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition ${
                    activeTheme === 'light'
                      ? 'bg-slate-700 text-white font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Clair
                </button>
                <button
                  onClick={() => handleThemeChange('dark')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition ${
                    activeTheme === 'dark'
                      ? 'bg-slate-700 text-white font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Sombre
                </button>
                <button
                  onClick={() => handleThemeChange('auto')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition ${
                    activeTheme === 'auto'
                      ? 'bg-slate-700 text-white font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Auto
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Red Outlined Action Buttons matching Image 7 */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={onLogout}
            className="py-2.5 px-3 rounded-2xl border border-rose-500/80 text-rose-400 hover:bg-rose-500/10 font-semibold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <LogOut size={14} /> Déconnexion
          </button>
          <button
            onClick={() => {
              if (confirm('Voulez-vous vraiment supprimer votre compte ?')) {
                onLogout();
              }
            }}
            className="py-2.5 px-3 rounded-2xl border border-rose-500/80 text-rose-400 hover:bg-rose-500/10 font-semibold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <Trash2 size={14} /> Supprimer le compte
          </button>
        </div>

      </div>

    </div>
  );
};
