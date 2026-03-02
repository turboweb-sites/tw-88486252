// Page navigation types
export type PageType = 'home' | 'services' | 'pricing' | 'gallery' | 'contact';

// Service & Package types
export interface Service {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  price: number;
  priceLabel?: string;
  duration: string;
  icon?: string;
  image?: string;
  features: string[];
  popular?: boolean;
  category?: string;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  priceLabel?: string;
  duration: string;
  features: string[];
  popular?: boolean;
  image?: string;
  category?: string;
  includes?: string[];
}

// Booking types
export interface TimeSlot {
  time: string;
  available: boolean;
  label?: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  packageId?: string;
  date: string;
  time: string;
  vehicleType?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: string;
  vehicleColor?: string;
  notes?: string;
  addOns?: string[];
}

export interface BookingRecord {
  id?: string;
  created_at?: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  package_id?: string;
  date: string;
  time: string;
  vehicle_type?: string;
  vehicle_make?: string;
  vehicle_model?: string;
  vehicle_year?: string;
  vehicle_color?: string;
  notes?: string;
  add_ons?: string[];
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface BlockedSlot {
  id?: string;
  date: string;
  time: string;
  reason?: string;
}

// Quote types
export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  vehicleType?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: string;
  vehicleColor?: string;
  servicesInterested?: string[];
  currentCondition?: string;
  message?: string;
  photos?: string[];
  budget?: string;
}

// Contact types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

// GoHighLevel CRM types
export interface GHLContact {
  id?: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  tags?: string[];
  source?: string;
  customField?: Record<string, string>;
}

export interface GHLOpportunity {
  id?: string;
  title: string;
  contactId: string;
  pipelineId: string;
  pipelineStageId: string;
  monetaryValue?: number;
  status?: string;
  source?: string;
  customFields?: Record<string, string>;
}

// Gallery types
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  title?: string;
  description?: string;
  beforeSrc?: string;
}

// Review types
export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
  service?: string;
  verified?: boolean;
}

// CTA Button types
export interface CTAButtonProps {
  text: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  href?: string;
}