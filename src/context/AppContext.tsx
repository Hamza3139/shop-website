import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  BlindProduct,
  CartItem,
  CustomerOrder,
  TechnicianVisitRequest,
  AdSourceInfo
} from '../types';
import { BLINDS_PRODUCTS, CAMPAIGN_PRESETS } from '../data/blindsData';
import confetti from 'canvas-confetti';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: 'rtl' | 'ltr';
  t: (ar: string, en: string) => string;
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'cartItemId'>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  deliveryFee: number;
  cartTotal: number;
  vatAmount: number;
  couponCode: string;
  setCouponCode: (code: string) => void;
  couponDiscountPercent: number;
  applyCoupon: (code: string) => boolean;
  activeAdSource: AdSourceInfo;
  setAdSourceByPreset: (presetId: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isTechnicianModalOpen: boolean;
  setIsTechnicianModalOpen: (open: boolean) => void;
  isTrackingModalOpen: boolean;
  setIsTrackingModalOpen: (open: boolean) => void;
  isAdTesterOpen: boolean;
  setIsAdTesterOpen: (open: boolean) => void;
  selectedProductForDetail: BlindProduct | null;
  setSelectedProductForDetail: (prod: BlindProduct | null) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  orders: CustomerOrder[];
  submitOrder: (orderData: Omit<CustomerOrder, 'orderId' | 'date' | 'trackingNumber' | 'zatcaQrCodeValue'>) => CustomerOrder;
  technicianRequests: TechnicianVisitRequest[];
  bookTechnician: (req: Omit<TechnicianVisitRequest, 'id' | 'status'>) => TechnicianVisitRequest;
  formatSAR: (amount: number) => string;
  triggerCelebration: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ar');
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sadeel_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<CustomerOrder[]>(() => {
    try {
      const saved = localStorage.getItem('sadeel_orders');
      if (saved) return JSON.parse(saved);
      // Default sample order so tracking works right away if tested!
      return [{
        orderId: 'KSA-78291',
        date: '2026-10-15',
        customerName: 'عبدالله السبيعي',
        phone: '0551234567',
        email: 'customer@example.sa',
        city: 'الرياض',
        district: 'حي الملقا',
        address: 'شارع أنس بن مالك، فيلا 14',
        items: [],
        subtotal: 660,
        discount: 165,
        deliveryFee: 0,
        installationFee: 0,
        vatAmount: 74.25,
        total: 569.25,
        paymentMethod: 'mada',
        paymentStatus: 'paid',
        orderStatus: 'manufacturing',
        trackingNumber: 'SA-BLIND-78291',
        zatcaQrCodeValue: 'ZATCA-QR-SADEEL-VAT310294829100003-AMOUNT569.25'
      }];
    } catch {
      return [];
    }
  });

  const [technicianRequests, setTechnicianRequests] = useState<TechnicianVisitRequest[]>([]);
  const [couponCode, setCouponCode] = useState<string>('KSA30');
  const [couponDiscountPercent, setCouponDiscountPercent] = useState<number>(30);

  // Ad campaign tracking state
  const [activeAdSource, setActiveAdSource] = useState<AdSourceInfo>(CAMPAIGN_PRESETS[0]); // default Snapchat promo

  // Modal states
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isTechnicianModalOpen, setIsTechnicianModalOpen] = useState<boolean>(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState<boolean>(false);
  const [isAdTesterOpen, setIsAdTesterOpen] = useState<boolean>(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<BlindProduct | null>(null);
  const [activeTab, setActiveTab] = useState<string>('catalog');

  const dir: 'rtl' | 'ltr' = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [language, dir]);

  // Check URL query parameters on initial load for ad tracking
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get('utm_source')?.toLowerCase();
      const utmCampaign = urlParams.get('utm_campaign')?.toLowerCase();
      const adParam = urlParams.get('ad')?.toLowerCase();

      if (utmSource === 'snapchat' || adParam === 'snapchat') {
        setAdSourceByPreset('snapchat');
      } else if (utmSource === 'tiktok' || adParam === 'tiktok') {
        setAdSourceByPreset('tiktok');
      } else if (utmSource === 'google' || adParam === 'google') {
        setAdSourceByPreset('google');
      } else if (utmSource === 'instagram' || adParam === 'instagram') {
        setAdSourceByPreset('instagram');
      }
    } catch {
      // url param parsing ignore
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sadeel_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Save orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sadeel_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (ar: string, en: string) => {
    return language === 'ar' ? ar : en;
  };

  const setAdSourceByPreset = (presetId: string) => {
    const found = CAMPAIGN_PRESETS.find(p => p.id === presetId || p.source === presetId);
    if (found) {
      setActiveAdSource(found);
      setCouponCode(found.discountCode);
      setCouponDiscountPercent(found.discountAmountPercent);
    }
  };

  const applyCoupon = (code: string): boolean => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'KSA30' || normalized === 'SNAP30') {
      setCouponCode(normalized);
      setCouponDiscountPercent(30);
      return true;
    }
    if (normalized === 'TIKTOK35') {
      setCouponCode(normalized);
      setCouponDiscountPercent(35);
      return true;
    }
    if (normalized === 'GOOGLE25' || normalized === 'SADEEL25') {
      setCouponCode(normalized);
      setCouponDiscountPercent(25);
      return true;
    }
    if (normalized === 'INSTA28') {
      setCouponCode(normalized);
      setCouponDiscountPercent(28);
      return true;
    }
    if (normalized === 'RAMADAN' || normalized === 'BLINDS20') {
      setCouponCode(normalized);
      setCouponDiscountPercent(20);
      return true;
    }
    return false;
  };

  const addToCart = (itemData: Omit<CartItem, 'cartItemId'>) => {
    const newItem: CartItem = {
      ...itemData,
      cartItemId: 'item_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7)
    };
    setCart(prev => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              totalPrice: item.unitPrice * newQty
            };
          }
          return item;
        })
        .filter((i): i is CartItem => i !== null)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const cartDiscount = (cartSubtotal * couponDiscountPercent) / 100;
  // Free delivery across KSA for orders over 250 SAR or if promotional coupon is active
  const deliveryFee = cartSubtotal > 250 || couponDiscountPercent > 0 ? 0 : 35;
  const taxableAmount = Math.max(0, cartSubtotal - cartDiscount + deliveryFee);
  // ZATCA VAT 15% is included in Saudi standard pricing (or calculated transparently)
  const vatAmount = (taxableAmount * 15) / 115;
  const cartTotal = taxableAmount;

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const submitOrder = (orderData: Omit<CustomerOrder, 'orderId' | 'date' | 'trackingNumber' | 'zatcaQrCodeValue'>): CustomerOrder => {
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const orderId = `KSA-${randomDigits}`;
    const trackingNumber = `SA-BLIND-${randomDigits}`;
    const today = new Date().toISOString().split('T')[0];
    const zatcaQrCode = `ZATCA-INVOICE-${orderId}-${orderData.total.toFixed(2)}-SAR-VAT15%`;

    const completedOrder: CustomerOrder = {
      ...orderData,
      orderId,
      date: today,
      trackingNumber,
      zatcaQrCodeValue: zatcaQrCode
    };

    setOrders(prev => [completedOrder, ...prev]);
    clearCart();
    triggerCelebration();
    return completedOrder;
  };

  const bookTechnician = (req: Omit<TechnicianVisitRequest, 'id' | 'status'>): TechnicianVisitRequest => {
    const newReq: TechnicianVisitRequest = {
      ...req,
      id: 'TECH-' + Math.floor(1000 + Math.random() * 9000),
      status: 'confirmed'
    };
    setTechnicianRequests(prev => [newReq, ...prev]);
    triggerCelebration();
    return newReq;
  };

  const formatSAR = (amount: number) => {
    const formatted = amount.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
    return language === 'ar' ? `${formatted} ر.س` : `${formatted} SAR`;
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        dir,
        t,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartDiscount,
        deliveryFee,
        cartTotal,
        vatAmount,
        couponCode,
        setCouponCode,
        couponDiscountPercent,
        applyCoupon,
        activeAdSource,
        setAdSourceByPreset,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isTechnicianModalOpen,
        setIsTechnicianModalOpen,
        isTrackingModalOpen,
        setIsTrackingModalOpen,
        isAdTesterOpen,
        setIsAdTesterOpen,
        selectedProductForDetail,
        setSelectedProductForDetail,
        activeTab,
        setActiveTab,
        orders,
        submitOrder,
        technicianRequests,
        bookTechnician,
        formatSAR,
        triggerCelebration
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
