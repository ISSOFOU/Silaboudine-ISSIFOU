import React, { useState } from 'react';
import { PhoneFrame } from './components/PhoneFrame';
import { BottomNav } from './components/BottomNav';
import { WelcomeView } from './views/WelcomeView';
import { SortiesView } from './views/SortiesView';
import { EventsView } from './views/EventsView';
import { SortieDetailView } from './views/SortieDetailView';
import { EventDetailView } from './views/EventDetailView';
import { VibersView } from './views/VibersView';
import { ProfileView } from './views/ProfileView';
import { PromoterDashboardView } from './views/PromoterDashboardView';
import { CreateOutingView } from './views/CreateOutingView';
import { PayoutsView } from './views/PayoutsView';
import { DirectMessageModal } from './components/DirectMessageModal';
import { QRScannerModal } from './components/QRScannerModal';
import { MapModal } from './components/MapModal';
import { TicketPurchaseModal } from './components/TicketPurchaseModal';

import {
  initialCurrentUser,
  initialOutings,
  initialEvents,
  initialVibers,
  initialWithdrawals,
  initialNotifications,
} from './data/mockData';
import { TabType, Outing, EventTicket, ViberUser, UserProfile, WithdrawalRecord } from './types';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile>(initialCurrentUser);
  const [outings, setOutings] = useState<Outing[]>(initialOutings);
  const [events, setEvents] = useState<EventTicket[]>(initialEvents);
  const [vibers, setVibers] = useState<ViberUser[]>(initialVibers);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRecord[]>(initialWithdrawals);
  const [notifications, setNotifications] = useState(initialNotifications);

  // Navigation State
  const [currentTab, setCurrentTab] = useState<TabType | 'welcome' | 'sortie_detail' | 'event_detail'>('welcome');
  const [selectedOuting, setSelectedOuting] = useState<Outing | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventTicket | null>(null);

  // Modals state
  const [activeChatViber, setActiveChatViber] = useState<ViberUser | null>(null);
  const [qrScannerEventName, setQrScannerEventName] = useState<string | null>(null);
  const [mapModalData, setMapModalData] = useState<{ location: string; neighborhood: string } | null>(null);
  const [ticketModalEvent, setTicketModalEvent] = useState<EventTicket | null>(null);

  // Outing selection
  const handleSelectOuting = (outing: Outing) => {
    setSelectedOuting(outing);
    setCurrentTab('sortie_detail');
  };

  // Event selection
  const handleSelectEvent = (event: EventTicket) => {
    setSelectedEvent(event);
    setCurrentTab('event_detail');
  };

  // Update Outing in live state
  const handleUpdateOuting = (updated: Outing) => {
    setOutings((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
    if (selectedOuting && selectedOuting.id === updated.id) {
      setSelectedOuting(updated);
    }
  };

  // Add newly created outing
  const handleCreateOuting = (newOuting: Outing) => {
    setOutings((prev) => [newOuting, ...prev]);
    setCurrentUser((prev) => ({ ...prev, organizedCount: prev.organizedCount + 1 }));
    setSelectedOuting(newOuting);
    setCurrentTab('sortie_detail');
  };

  // Viber social handlers
  const handleAcceptViber = (id: string) => {
    setVibers((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: 'friend' } : v))
    );
  };

  const handleRefuseViber = (id: string) => {
    setVibers((prev) => prev.filter((v) => v.id !== id));
  };

  const handleInviteViber = (id: string) => {
    setVibers((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: 'friend' } : v))
    );
  };

  // Withdrawal handler
  const handleAddWithdrawal = (record: WithdrawalRecord) => {
    setWithdrawals((prev) => [record, ...prev]);
  };

  // Tab switching from bottom bar
  const handleBottomTabChange = (tab: TabType) => {
    setCurrentTab(tab);
    setSelectedOuting(null);
    setSelectedEvent(null);
  };

  const unreadVibersCount = vibers.filter((v) => v.status === 'pending_received').length;

  return (
    <PhoneFrame theme={currentUser.theme}>
      {/* 1. Welcome Screen (Image 1) */}
      {currentTab === 'welcome' && (
        <WelcomeView onContinue={() => setCurrentTab('sorties')} />
      )}

      {/* 2. Sorties Libres (Image 2) */}
      {currentTab === 'sorties' && (
        <SortiesView
          outings={outings}
          onSelectOuting={handleSelectOuting}
          userName={currentUser.name}
        />
      )}

      {/* 3. Événements (Image 3) */}
      {currentTab === 'events' && (
        <EventsView
          events={events}
          onSelectEvent={handleSelectEvent}
        />
      )}

      {/* 4. Sortie Detail (Image 4) */}
      {currentTab === 'sortie_detail' && selectedOuting && (
        <SortieDetailView
          outing={selectedOuting}
          currentUser={currentUser}
          onBack={() => setCurrentTab('sorties')}
          onOpenMap={(loc, neigh) => setMapModalData({ location: loc, neighborhood: neigh })}
          onUpdateOuting={handleUpdateOuting}
        />
      )}

      {/* 5. Event Detail (Image 5) */}
      {currentTab === 'event_detail' && selectedEvent && (
        <EventDetailView
          event={selectedEvent}
          onBack={() => setCurrentTab('events')}
          onOpenTicketModal={(ev) => setTicketModalEvent(ev)}
        />
      )}

      {/* 6. Vibers (Image 6) */}
      {currentTab === 'vibers' && (
        <VibersView
          vibers={vibers}
          onBack={() => setCurrentTab('sorties')}
          onOpenChat={(v) => setActiveChatViber(v)}
          onAcceptViber={handleAcceptViber}
          onRefuseViber={handleRefuseViber}
          onInviteViber={handleInviteViber}
          onOpenProfile={() => setCurrentTab('profile')}
        />
      )}

      {/* 7. Profil & Settings (Image 7) */}
      {currentTab === 'profile' && (
        <ProfileView
          user={currentUser}
          notifications={notifications}
          onBack={() => setCurrentTab('sorties')}
          onUpdateUser={setCurrentUser}
          onOpenPromoterDashboard={() => setCurrentTab('promoter_dashboard')}
          onLogout={() => setCurrentTab('welcome')}
        />
      )}

      {/* 8. Tableau de bord Promoteur (Image 8) */}
      {currentTab === 'promoter_dashboard' && (
        <PromoterDashboardView
          events={events}
          onBack={() => setCurrentTab('profile')}
          onOpenPayouts={() => setCurrentTab('payouts')}
          onOpenQRScanner={(eventName) => setQrScannerEventName(eventName)}
          onOpenCreateEvent={() => setCurrentTab('create')}
        />
      )}

      {/* 9. Créer une sortie (Image 9) */}
      {currentTab === 'create' && (
        <CreateOutingView
          currentUser={currentUser}
          onBack={() => setCurrentTab('sorties')}
          onCreateOuting={handleCreateOuting}
        />
      )}

      {/* 10. Finances & Payouts (Image 10) */}
      {currentTab === 'payouts' && (
        <PayoutsView
          withdrawals={withdrawals}
          onBack={() => setCurrentTab('promoter_dashboard')}
          onAddWithdrawal={handleAddWithdrawal}
        />
      )}

      {/* Bottom Nav Bar (Hidden on Welcome screen and Detail views) */}
      {currentTab !== 'welcome' &&
        currentTab !== 'sortie_detail' &&
        currentTab !== 'event_detail' && (
          <BottomNav
            currentTab={
              currentTab === 'payouts' || currentTab === 'promoter_dashboard'
                ? 'promoter_dashboard'
                : (currentTab as TabType)
            }
            onTabChange={handleBottomTabChange}
            userRole={currentUser.role}
            vibersBadgeCount={unreadVibersCount}
          />
        )}

      {/* Modals & Dialogs */}
      {activeChatViber && (
        <DirectMessageModal
          viber={activeChatViber}
          onClose={() => setActiveChatViber(null)}
        />
      )}

      {qrScannerEventName && (
        <QRScannerModal
          eventName={qrScannerEventName}
          onClose={() => setQrScannerEventName(null)}
        />
      )}

      {mapModalData && (
        <MapModal
          locationName={mapModalData.location}
          neighborhood={mapModalData.neighborhood}
          onClose={() => setMapModalData(null)}
        />
      )}

      {ticketModalEvent && (
        <TicketPurchaseModal
          event={ticketModalEvent}
          onClose={() => setTicketModalEvent(null)}
          onTicketPurchased={() => {
            setEvents((prev) =>
              prev.map((e) =>
                e.id === ticketModalEvent.id
                  ? { ...e, ticketsSold: e.ticketsSold + 1 }
                  : e
              )
            );
          }}
        />
      )}
    </PhoneFrame>
  );
}
