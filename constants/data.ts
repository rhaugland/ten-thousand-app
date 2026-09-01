export type EventCategory = 'food' | 'fashion' | 'music';

export interface Event {
  id: string;
  title: string;
  category: EventCategory;
  time: string;
  location: string;
  description: string;
  origin: string;
}

export interface Vendor {
  id: string;
  name: string;
  category: EventCategory;
  origin: string;
  description: string;
  location: string;
}

export const SCHEDULE: Event[] = [
  { id: '1', title: 'Jollof Rice Cook-Off', category: 'food', time: '11:00 AM', location: 'Main Stage Kitchen', description: 'West African chefs compete for the best jollof.', origin: 'Nigeria' },
  { id: '2', title: 'Taiko Drumming', category: 'music', time: '12:00 PM', location: 'East Stage', description: 'Traditional Japanese percussion performance.', origin: 'Japan' },
  { id: '3', title: 'Oaxacan Street Tacos', category: 'food', time: '12:30 PM', location: 'Food Row A', description: 'Handmade tortillas, slow-cooked meats, fresh salsas.', origin: 'Mexico' },
  { id: '4', title: 'Ankara Fashion Walk', category: 'fashion', time: '1:00 PM', location: 'Runway', description: 'Modern African print designs on the main runway.', origin: 'Ghana' },
  { id: '5', title: 'K-Pop Dance Showcase', category: 'music', time: '2:00 PM', location: 'Main Stage', description: 'Local K-pop dance crews perform.', origin: 'Korea' },
  { id: '6', title: 'Handmade Pasta Demo', category: 'food', time: '2:30 PM', location: 'Main Stage Kitchen', description: 'Learn to make fresh pasta from scratch.', origin: 'Italy' },
  { id: '7', title: 'Sari Draping Workshop', category: 'fashion', time: '3:00 PM', location: 'Workshop Tent', description: 'Learn traditional and modern draping styles.', origin: 'India' },
  { id: '8', title: 'Afrobeats DJ Set', category: 'music', time: '4:00 PM', location: 'Main Stage', description: 'High-energy Afrobeats to close the afternoon.', origin: 'Nigeria' },
  { id: '9', title: 'Ethiopian Coffee Ceremony', category: 'food', time: '4:30 PM', location: 'Culture Corner', description: 'Traditional coffee roasting and brewing.', origin: 'Ethiopia' },
  { id: '10', title: 'Streetwear x Culture Panel', category: 'fashion', time: '5:00 PM', location: 'Workshop Tent', description: 'How heritage shapes modern streetwear.', origin: 'USA' },
];

export const VENDORS: Vendor[] = [
  { id: 'v1', name: 'Mama Nkechi\'s Kitchen', category: 'food', origin: 'Nigeria', description: 'Jollof rice, suya, puff puff', location: 'Food Row A' },
  { id: 'v2', name: 'Taqueria Oaxaca', category: 'food', origin: 'Mexico', description: 'Street tacos, elote, aguas frescas', location: 'Food Row A' },
  { id: 'v3', name: 'Nonna\'s Table', category: 'food', origin: 'Italy', description: 'Fresh pasta, arancini, cannoli', location: 'Food Row B' },
  { id: 'v4', name: 'Seoul Kitchen', category: 'food', origin: 'Korea', description: 'Bibimbap, tteokbokki, Korean corn dogs', location: 'Food Row B' },
  { id: 'v5', name: 'Addis Ababa Bites', category: 'food', origin: 'Ethiopia', description: 'Injera platters, doro wat, coffee', location: 'Food Row C' },
  { id: 'v6', name: 'Thali House', category: 'food', origin: 'India', description: 'Samosas, butter chicken, chai', location: 'Food Row C' },
  { id: 'v7', name: 'Wax & Thread', category: 'fashion', origin: 'Ghana', description: 'Ankara prints, custom tailoring', location: 'Fashion Alley' },
  { id: 'v8', name: 'Silk Road Vintage', category: 'fashion', origin: 'Japan', description: 'Vintage kimonos, streetwear fusion', location: 'Fashion Alley' },
];

export const MAP_ZONES = [
  { id: 'z1', name: 'Main Stage', category: 'music' as EventCategory },
  { id: 'z2', name: 'East Stage', category: 'music' as EventCategory },
  { id: 'z3', name: 'Food Row A-C', category: 'food' as EventCategory },
  { id: 'z4', name: 'Fashion Alley', category: 'fashion' as EventCategory },
  { id: 'z5', name: 'Runway', category: 'fashion' as EventCategory },
  { id: 'z6', name: 'Workshop Tent', category: 'fashion' as EventCategory },
  { id: 'z7', name: 'Culture Corner', category: 'food' as EventCategory },
];
