export type PageType = 'home' | 'services' | 'pricing' | 'gallery' | 'contact';

export interface NavigateProps {
  navigateTo: (page: PageType) => void;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  icon: string;
  features: string[];
  image?: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
  title?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  preferredDate?: string;
  preferredTime?: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
}

export interface BookingSlot {
  date: string;
  time: string;
  available: boolean;
}