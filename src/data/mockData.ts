import { Outing, EventTicket, ViberUser, UserProfile, WithdrawalRecord, AppNotification } from '../types';

export const initialCurrentUser: UserProfile = {
  id: 'user-dine',
  name: 'Dine',
  email: 'dinelemblematique@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  initials: 'D',
  bio: 'Passionné de découvertes culturelles, sorties plage et musique live à Cotonou ! ✨',
  location: 'Cotonou, Bénin',
  interests: ['Sorties', 'Musique', 'Plage', 'Festivals'],
  role: 'particular', // Can switch to 'promoter'
  memberSince: 'août 2026',
  organizedCount: 2,
  joinedCount: 5,
  theme: 'dark',
  phone: '+229 96 12 34 56',
};

export const initialOutings: Outing[] = [
  {
    id: 'out-1',
    title: 'Soirée Salsa',
    category: 'drink',
    categoryLabel: 'Boire un verre',
    location: 'Place des Arts, Abomey-Calavi',
    neighborhood: 'Abomey-Calavi',
    date: 'Sam. 22 août',
    time: '20h00',
    paymentType: 'chacun_sa_conso',
    paymentLabel: 'Chacun paie sa conso',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80',
    hostName: 'Kofi M.',
    hostEmail: 'kofi.m@gmail.com',
    hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    hostInitials: 'K',
    maxParticipants: 100,
    isUnlimited: false,
    isPopular: true,
    rank: 1,
    description: 'Une superbe soirée d\'initiation et danse Salsa & Bachata sous les étoiles à la Place des Arts ! Ambiance conviviale garantie.',
    participants: [
      { id: 'u1', name: 'Dine', initials: 'D', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80' },
      { id: 'u2', name: 'Farid T.', initials: 'F', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80' },
      { id: 'u3', name: 'Amina K.', initials: 'A', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80' },
      { id: 'u4', name: 'Leo B.', initials: 'L', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80' },
    ],
    pendingRequests: [
      { id: 'req-1', name: 'AZK', initials: 'A', requestedAt: 'Il y a 10 min' }
    ],
    comments: [
      { id: 'c1', authorName: 'Farid T.', authorInitials: 'F', text: 'Trop hâte d\'y être ! Qui est chaud pour covoiturer ?', time: '17:45' },
      { id: 'c2', authorName: 'Amina K.', authorInitials: 'A', text: 'Moi je pars de Cadjèhoun ! 🚗', time: '17:52' },
      { id: 'c3', authorName: 'AZK', authorInitials: 'A', text: 'Cc', time: '18:01' }
    ]
  },
  {
    id: 'out-2',
    title: 'Bord de plage & grillades',
    category: 'outdoor',
    categoryLabel: 'Plein air',
    location: 'Plage de Fidjrossè',
    neighborhood: 'Fidjrossè',
    date: 'Sam. 22 août',
    time: '16h00',
    paymentType: 'chacun_sa_conso',
    paymentLabel: 'Chacun paie sa conso',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    hostName: 'Dine',
    hostEmail: 'dinelemblematique@gmail.com',
    hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    hostInitials: 'D',
    maxParticipants: 15,
    isUnlimited: false,
    description: 'Après-midi détente au bord de l\'océan avec coucher de soleil, poissons braisés, brochettes et bonne musique.',
    participants: [
      { id: 'u1', name: 'Dine', initials: 'D', isHost: true, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80' },
      { id: 'u2', name: 'Farid T.', initials: 'F', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80' },
      { id: 'u5', name: 'Chloe D.', initials: 'C', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80' },
      { id: 'u6', name: 'Testeur Claude', initials: 'T', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80' },
    ],
    pendingRequests: [
      { id: 'req-azk', name: 'AZK', initials: 'A', requestedAt: 'Il y a 5 min' }
    ],
    comments: [
      { id: 'cm-1', authorName: 'Farid T.', authorInitials: 'F', text: 'Hi', time: '17:50' },
      { id: 'cm-2', authorName: 'AZK', authorInitials: 'A', text: 'Cc', time: '18:02' }
    ]
  },
  {
    id: 'out-3',
    title: 'Cinéma en plein air',
    category: 'culture',
    categoryLabel: 'Culture',
    location: 'Place des Arts, Abomey-Calavi',
    neighborhood: 'Abomey-Calavi',
    date: 'Sam. 22 août',
    time: '20h00',
    paymentType: 'gratuit',
    paymentLabel: 'Gratuit',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80',
    hostName: 'Amina K.',
    hostEmail: 'amina.k@gmail.com',
    hostAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    hostInitials: 'A',
    maxParticipants: 30,
    isUnlimited: false,
    description: 'Projection nocturne d\'un grand classique du cinéma africain avec pop-corn et rafraîchissements.',
    participants: [
      { id: 'u1', name: 'Dine', initials: 'D', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80' },
      { id: 'u3', name: 'Amina K.', initials: 'A', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80' },
    ],
    pendingRequests: [],
    comments: [
      { id: 'c-cine', authorName: 'Leo B.', authorInitials: 'L', text: 'Prenez vos nattes et vos pulls légers !', time: '19:15' }
    ]
  },
  {
    id: 'out-4',
    title: 'Afterwork Jazz Session',
    category: 'drink',
    categoryLabel: 'Boire un verre',
    location: 'Le Jardin Créole, Haie Vive, Cotonou',
    neighborhood: 'Haie Vive',
    date: 'Ven. 21 août',
    time: '19h00',
    paymentType: 'chacun_sa_conso',
    paymentLabel: 'Chacun paie sa conso',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&auto=format&fit=crop&q=80',
    hostName: 'Farid T.',
    hostEmail: 'farid.t@gmail.com',
    hostAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    hostInitials: 'F',
    maxParticipants: 25,
    isUnlimited: false,
    isPopular: true,
    rank: 2,
    description: 'Décompression jazz en live avec cocktail signature et tapas.',
    participants: [
      { id: 'u1', name: 'Dine', initials: 'D', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80' },
    ],
    pendingRequests: [],
    comments: []
  },
  {
    id: 'out-5',
    title: 'Rooftop Chill & Deep House',
    category: 'drink',
    categoryLabel: 'Boire un verre',
    location: 'Sky Lounge, Ganhi, Cotonou',
    neighborhood: 'Ganhi',
    date: 'Sam. 22 août',
    time: '21h00',
    paymentType: 'chacun_sa_conso',
    paymentLabel: 'Chacun paie sa conso',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&auto=format&fit=crop&q=80',
    hostName: 'Leo B.',
    hostEmail: 'leo.b@gmail.com',
    hostAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
    hostInitials: 'L',
    maxParticipants: 20,
    isUnlimited: false,
    isPopular: true,
    rank: 3,
    description: 'Vue imprenable sur le port et l\'océan, cocktails tropicaux et DJ set.',
    participants: [],
    pendingRequests: [],
    comments: []
  },
  {
    id: 'out-6',
    title: 'Soirée Jeux de société & Cocktails',
    category: 'games',
    categoryLabel: 'Jeux',
    location: 'Café Nomad, Cadjèhoun',
    neighborhood: 'Cadjèhoun',
    date: 'Dim. 23 août',
    time: '17h00',
    paymentType: 'chacun_sa_conso',
    paymentLabel: 'Chacun paie sa conso',
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&auto=format&fit=crop&q=80',
    hostName: 'Chloe D.',
    hostEmail: 'chloe.d@gmail.com',
    hostAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
    hostInitials: 'C',
    maxParticipants: 16,
    isUnlimited: false,
    description: 'Loup-Garou, Catan, Uno et rires au rendez-vous.',
    participants: [],
    pendingRequests: [],
    comments: []
  }
];

export const initialEvents: EventTicket[] = [
  {
    id: 'ev-1',
    title: 'Festival Culture Vodun',
    price: 10000,
    date: 'Samedi 29 août',
    time: '15h00',
    location: 'Place Chacha, Ouidah • Ouidah',
    neighborhood: 'Ouidah',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
    promoterName: 'Testeur Claude',
    promoterInitials: 'T',
    promoterAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80',
    isVerifiedPromoter: true,
    ticketsSold: 120,
    totalTickets: 300,
    description: 'Danses traditionnelles, artisanat local et concerts jusqu\'au bout de la nuit pour célébrer le patrimoine vodun.',
    paymentMethods: {
      mobileMoney: '+229 96 12 34 56',
      wave: '+229 53 18 90 20',
      onSite: true
    },
    rating: 4.8,
    reviewsCount: 24,
    category: 'Festival',
    pricingTiers: [
      { name: 'Pass Standard', price: 10000, available: 180 },
      { name: 'Pass VIP & Backstage', price: 25000, available: 25 }
    ]
  },
  {
    id: 'ev-2',
    title: 'Concert Dadju & Franglish',
    price: 5000,
    date: 'Sam. 26 sept.',
    time: '21h00',
    location: 'Stade GMK, Cotonou',
    neighborhood: 'Cotonou',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80',
    promoterName: 'Empire Events Bénin',
    promoterInitials: 'E',
    isVerifiedPromoter: true,
    ticketsSold: 250,
    totalTickets: 500,
    description: 'Le méga concert urbain de l\'année au Stade de l\'Amitié Général Mathieu Kérékou.',
    paymentMethods: {
      mobileMoney: '+229 97 00 11 22',
      wave: '+229 61 22 33 44',
      onSite: true
    },
    rating: 4.9,
    reviewsCount: 88,
    category: 'Concert'
  },
  {
    id: 'ev-3',
    title: 'Festival Vodun Arts',
    price: 2000,
    date: 'Dim. 27 sept.',
    time: '15h00',
    location: 'Place des Martyrs, Cotonou',
    neighborhood: 'Cotonou',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop&q=80',
    promoterName: 'Association Bénin Art & Culture',
    promoterInitials: 'A',
    isVerifiedPromoter: true,
    ticketsSold: 80,
    totalTickets: 150,
    description: 'Exposition vivante, percussions béninoises, défilé de mode traditionnelle et dégustations.',
    paymentMethods: {
      mobileMoney: '+229 95 44 33 22',
      wave: '+229 50 11 22 33',
      onSite: true
    },
    rating: 4.6,
    reviewsCount: 15,
    category: 'Festival'
  }
];

export const initialVibers: ViberUser[] = [
  {
    id: 'vib-1',
    name: 'Amina K.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    metAt: 'Rencontrée à Bord de plage & grillades',
    status: 'pending_received',
    bio: 'Photographe & amoureuse des couchers de soleil'
  },
  {
    id: 'vib-2',
    name: 'Kofi M.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    metAt: 'Rencontré à Cinéma en plein air',
    status: 'pending_received',
    bio: 'Cinéphile & organisateur d\'événements'
  },
  {
    id: 'vib-3',
    name: 'Farid T.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    metAt: 'Rencontré à Afterwork Jazz Session',
    status: 'suggested',
    bio: 'Tech enthusiast & amateur de saxophone'
  },
  {
    id: 'vib-4',
    name: 'Chloe D.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
    metAt: 'Rencontrée à Festival Culture Vodun',
    status: 'suggested',
    bio: 'Danseuse contemporaine & globe-trotteuse'
  },
  {
    id: 'vib-5',
    name: 'Leo B.',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
    metAt: 'Rencontré à Soirée Salsa',
    status: 'suggested',
    bio: 'Professeur de danse latine à Cotonou'
  },
  {
    id: 'vib-6',
    name: 'Testeur Claude',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80',
    metAt: 'Rencontré à Sortie',
    status: 'friend',
    bio: 'Promoteur culturel et passionné de festivals'
  },
  {
    id: 'vib-7',
    name: 'Dinelemblematique',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    metAt: 'Rencontrée à Afterwork Jazz Session',
    status: 'friend',
    bio: 'Explore les meilleurs spots de Cotonou'
  }
];

export const initialWithdrawals: WithdrawalRecord[] = [
  {
    id: 'w-1',
    amount: 150000,
    method: 'MTN Mobile Money',
    date: '29 Aug 2026',
    status: 'pending',
    accountDetails: '+229 96 12 34 56'
  },
  {
    id: 'w-2',
    amount: 100000,
    method: 'Moov Money',
    date: '22 Aug 2026',
    status: 'completed',
    accountDetails: '+229 95 88 77 66'
  },
  {
    id: 'w-3',
    amount: 200000,
    method: 'Bank Transfer',
    date: '15 Aug 2026',
    status: 'completed',
    accountDetails: 'BGFI Bank - BJ061 01001 00012345678'
  }
];

export const initialNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Nouvelle demande pour votre sortie',
    message: 'AZK souhaite rejoindre votre sortie « Bord de plage & grillades »',
    time: 'Il y a 5 min',
    read: false,
    type: 'invite'
  },
  {
    id: 'notif-2',
    title: 'Invitation de Viber',
    message: 'Amina K. vous a envoyé une demande de Viber.',
    time: 'Il y a 2h',
    read: false,
    type: 'invite'
  },
  {
    id: 'notif-3',
    title: 'Billet confirmé',
    message: 'Votre réservation pour « Festival Culture Vodun » est enregistrée.',
    time: 'Hier',
    read: true,
    type: 'event'
  }
];
