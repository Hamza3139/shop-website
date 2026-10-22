/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { AdCampaignBanner } from './components/AdCampaignBanner';
import { Hero } from './components/Hero';
import { BlindSimulator } from './components/BlindSimulator';
import { CustomBlindCalculator } from './components/CustomBlindCalculator';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { TechnicianBookingModal } from './components/TechnicianBookingModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { AdCampaignTester } from './components/AdCampaignTester';
import { BlindProduct, CustomerOrder } from './types';

function MainApp() {
  const [lastPlacedOrder, setLastPlacedOrder] = useState<CustomerOrder | null>(null);
  const [trackingTargetId, setTrackingTargetId] = useState<string>('');
  const { setIsTrackingModalOpen } = useApp();

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCustomizeProduct = (product: BlindProduct) => {
    scrollToSection('custom-calculator');
  };

  const handleOrderSuccess = (order: CustomerOrder) => {
    setLastPlacedOrder(order);
  };

  const handleTrackOrderFromSuccess = (orderId: string) => {
    setTrackingTargetId(orderId);
    setIsTrackingModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 selection:bg-emerald-600 selection:text-white">
      {/* Dynamic Ad Campaign Urgency Top Banner */}
      <AdCampaignBanner />

      {/* Main Header */}
      <Header onScrollToSection={scrollToSection} />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero onScrollToSection={scrollToSection} />

        {/* Section 1: Interactive Pull-Cord Simulator */}
        <section id="simulator" className="py-12 md:py-16 px-4 sm:px-6 max-w-7xl mx-auto">
          <BlindSimulator onOpenCalculator={() => scrollToSection('custom-calculator')} />
        </section>

        {/* Section 2: Custom Blind Size & Price Calculator */}
        <section id="calculator" className="py-8 md:py-12 px-4 sm:px-6 max-w-7xl mx-auto">
          <CustomBlindCalculator />
        </section>

        {/* Section 3: Full Roller Blinds Catalog */}
        <ProductCatalog onCustomizeProduct={handleCustomizeProduct} />

        {/* Section 4: Why Choose Us / Saudi Standards */}
        <WhyChooseUs />

        {/* Section 5: Customer Reviews */}
        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer onScrollToSection={scrollToSection} />

      {/* Modals & Floating Tools */}
      <CartDrawer />

      <CheckoutModal onOrderSuccess={handleOrderSuccess} />

      <OrderSuccessModal
        order={lastPlacedOrder}
        onClose={() => setLastPlacedOrder(null)}
        onTrackOrder={handleTrackOrderFromSuccess}
      />

      <OrderTrackingModal initialOrderId={trackingTargetId} />

      <TechnicianBookingModal />

      <ProductDetailModal onCustomize={handleCustomizeProduct} />

      {/* Direct WhatsApp Consultation Widget */}
      <WhatsAppFloatingButton />

      {/* Ad Campaign URL Generator & Source Simulator for Website Owner */}
      <AdCampaignTester />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
