import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CafeOffer {
  description: string;
  discountPct: number;
  isActive: boolean;
  createdAt: string;
}

interface OfferContextType {
  offer: CafeOffer | null;
  isOfferActive: boolean;
  releaseOffer: (description: string, discountPct: number) => void;
  endOffer: () => void;
  isOfferModalOpen: boolean;
  openOfferModal: () => void;
  closeOfferModal: () => void;
}

const OfferContext = createContext<OfferContextType | undefined>(undefined);

const STORAGE_KEY = 'ember_bean_active_offer';

export const OfferProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [offer, setOffer] = useState<CafeOffer | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CafeOffer;
        if (parsed && parsed.isActive) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load active offer from storage:', e);
    }
    return null;
  });

  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  const releaseOffer = (description: string, discountPct: number) => {
    const newOffer: CafeOffer = {
      description: description.trim(),
      discountPct: Math.max(1, Math.min(100, Math.round(discountPct))),
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    setOffer(newOffer);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newOffer));
    } catch (e) {
      console.error('Failed to persist offer:', e);
    }
  };

  const endOffer = () => {
    setOffer(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear offer from storage:', e);
    }
  };

  const openOfferModal = () => setIsOfferModalOpen(true);
  const closeOfferModal = () => setIsOfferModalOpen(false);

  return (
    <OfferContext.Provider
      value={{
        offer,
        isOfferActive: Boolean(offer && offer.isActive),
        releaseOffer,
        endOffer,
        isOfferModalOpen,
        openOfferModal,
        closeOfferModal,
      }}
    >
      {children}
    </OfferContext.Provider>
  );
};

export const useOffer = (): OfferContextType => {
  const context = useContext(OfferContext);
  if (!context) {
    throw new Error('useOffer must be used within an OfferProvider');
  }
  return context;
};
