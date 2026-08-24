export type TabType = 'sorties' | 'events' | 'create' | 'vibers' | 'profile' | 'promoter_dashboard' | 'payouts';

export type AccountType = 'particular' | 'promoter';

export type PaymentType = 'gratuit' | 'chacun_sa_conso' | 'payant';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  initials: string;
  bio: string;
  location: string;
  interests: string[];
  role: AccountType;
  memberSince: string;
  organizedCount: number;
  joinedCount: number;
  theme: 'dark' | 'light' | 'auto';
  phone: string;
}

export interface Participant {
  id: string;
  name: string;
  avatar: string;
  initials: string;
  email?: string;
  isHost?: boolean;
}

export interface PendingRequest {
  id: string;
  name: string;
  initials: string;
  avatar?: string;
  requestedAt: string;
}

export interface CommentItem {
  id: string;
  authorName: string;
  authorInitials: string;
  authorAvatar?: string;
  text: string;
  time: string;
  isHost?: boolean;
}

export interface Outing {
  id: string;
  title: string;
  category: 'drink' | 'food' | 'culture' | 'outdoor' | 'walk' | 'games' | 'workshops';
  categoryLabel: string;
  location: string;
  neighborhood: string;
  mapCoords?: { lat: number; lng: number };
  date: string;
  time: string;
  paymentType: PaymentType;
  paymentLabel: string;
  image: string;
  hostName: string;
  hostEmail: string;
  hostAvatar: string;
  hostInitials: string;
  maxParticipants: number;
  isUnlimited: boolean;
  participants: Participant[];
  pendingRequests: PendingRequest[];
  comments: CommentItem[];
  isPopular?: boolean;
  rank?: number;
  description?: string;
  whatsappGroupUrl?: string;
}

export interface EventTicket {
  id: string;
  title: string;
  price: number; // In FCFA
  date: string;
  time: string;
  location: string;
  neighborhood: string;
  image: string;
  promoterName: string;
  promoterInitials: string;
  promoterAvatar?: string;
  isVerifiedPromoter: boolean;
  ticketsSold: number;
  totalTickets: number;
  description: string;
  paymentMethods: {
    mobileMoney: string;
    wave: string;
    onSite: boolean;
  };
  rating: number;
  reviewsCount: number;
  category: string;
  pricingTiers?: { name: string; price: number; available: number }[];
}

export interface ViberUser {
  id: string;
  name: string;
  avatar: string;
  metAt: string;
  status: 'friend' | 'pending_received' | 'suggested';
  unreadCount?: number;
  bio?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface WithdrawalRecord {
  id: string;
  amount: number;
  method: 'MTN Mobile Money' | 'Moov Money' | 'Wave' | 'Bank Transfer';
  date: string;
  status: 'pending' | 'completed' | 'failed';
  accountDetails: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'invite' | 'event' | 'system';
}
