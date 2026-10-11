import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { BeansMerchShopSection } from '../components/shop/BeansMerchShopSection';

interface ShopPageProps {
  onBackToHome: () => void;
  onOpenBrewGuides: () => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  onBackToHome,
  onOpenBrewGuides,
}) => {
  return (
    <div className="min-h-screen bg-[#1E1410] text-[#F5EDE0]">
      <PageHeader
        badge="Fresh Weekly Roasts & Goods"
        title="Whole Beans Pantry & Lifestyle Merch"
        description="Small-batch roasted coffee delivered anywhere in India. Choose whole bean or precision grind for your exact brew method, or subscribe for monthly savings."
        onBackToHome={onBackToHome}
        breadcrumbs={['Beans & Merch']}
      />

      <BeansMerchShopSection
        onOpenBrewGuides={onOpenBrewGuides}
      />
    </div>
  );
};
