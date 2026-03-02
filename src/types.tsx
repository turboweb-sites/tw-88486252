export type PageType = 'home' | 'services' | 'pricing' | 'gallery' | 'contact';

export interface NavigateProps {
  navigateTo: (page: PageType) => void;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  process: string[];
  startingPrice: number;
  priceLabel: string;
  icon: string;
  image: string;
  popular: boolean;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  priceLabel?: string;
  duration?: string;
  features: string[];
  popular?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  vehicleType: string;
  serviceType: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
  vehicleType?: string;
}

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
  vehicleType: string;
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

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

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
  pipelineStageId?: string;
  stageId?: string;
  monetaryValue?: number;
  status?: string;
  source?: string;
  customFields?: Record<string, string>;
}

export interface CTAButtonProps {
  text: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'call';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  href?: string;
}