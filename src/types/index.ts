export type Language = 'ar' | 'en';

export type BlindCategory = 'all' | 'blackout' | 'sunscreen' | 'zebra' | 'motorized' | 'office';

export interface BlindColor {
  id: string;
  nameAr: string;
  nameEn: string;
  hex: string;
  fabricImage?: string;
}

export interface BlindProduct {
  id: string;
  titleAr: string;
  titleEn: string;
  category: 'blackout' | 'sunscreen' | 'zebra' | 'motorized' | 'office';
  basePrice: number; // Base price in SAR per square meter or standard unit (e.g. 100x150cm)
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery: string[];
  descriptionAr: string;
  descriptionEn: string;
  featuresAr: string[];
  featuresEn: string[];
  lightBlockingPercent: number; // e.g. 100 for blackout, 95, 70, etc.
  uvProtectionPercent: number;
  thermalInsulation: string; // e.g. 'عزل حراري فائق 95%'
  warrantyYears: number; // e.g. 5
  colors: BlindColor[];
  operationTypes: ('manual_chain' | 'smart_motor')[];
  inStock: boolean;
  isBestSeller?: boolean;
  isPopularInSaudi?: boolean;
}

export interface CustomBlindConfig {
  blindId: string;
  blindTitle: string;
  color: BlindColor;
  widthCm: number;
  heightCm: number;
  operationType: 'manual_chain' | 'smart_motor';
  chainSide: 'right' | 'left';
  mountType: 'inside_frame' | 'outside_wall';
  motorType?: 'rechargeable_battery' | 'hardwired_somfy';
  smartHubOption?: boolean; // Works with Alexa / Tuya / Google
  unitPrice: number;
  totalPrice: number;
  quantity: number;
}

export interface CartItem {
  cartItemId: string;
  product: BlindProduct;
  selectedColor: BlindColor;
  widthCm: number;
  heightCm: number;
  operationType: 'manual_chain' | 'smart_motor';
  chainSide: 'right' | 'left';
  mountType: 'inside_frame' | 'outside_wall';
  motorDetails?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export type PaymentMethod = 'mada' | 'apple_pay' | 'stc_pay' | 'tamara' | 'tabby' | 'visa' | 'cod';

export interface CustomerOrder {
  orderId: string;
  date: string;
  customerName: string;
  phone: string;
  email: string;
  city: string;
  district: string;
  address: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  installationFee: number;
  vatAmount: number; // 15% ZATCA VAT
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pending_cod';
  orderStatus: 'received' | 'manufacturing' | 'technician_assigned' | 'delivered_and_installed';
  trackingNumber: string;
  zatcaQrCodeValue: string;
}

export interface TechnicianVisitRequest {
  id: string;
  customerName: string;
  phone: string;
  city: string;
  district: string;
  preferredDate: string;
  preferredTime: string;
  windowCount: number;
  notes?: string;
  status: 'confirmed' | 'contacted';
}

export interface AdSourceInfo {
  id?: string;
  source: 'direct' | 'snapchat' | 'tiktok' | 'google' | 'instagram';
  campaignName: string;
  headlineAr: string;
  headlineEn: string;
  discountCode: string;
  discountAmountPercent: number;
  badgeAr: string;
  badgeEn: string;
}
