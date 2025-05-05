import React from 'react';

interface AdBannerProps {
  placement: 'top' | 'sidebar' | 'bottom';
}

const AdBanner: React.FC<AdBannerProps> = ({ placement }) => {
  // In a real application, you would integrate Google AdSense code here
  const getAdSize = () => {
    switch (placement) {
      case 'top':
        return 'h-[90px] w-full md:h-[90px]';
      case 'sidebar':
        return 'h-[600px] w-[300px]';
      case 'bottom':
        return 'h-[90px] w-full md:h-[90px]';
      default:
        return 'h-[250px] w-full md:h-[90px]';
    }
  };

  return (
    <div className={`bg-gray-200 flex items-center justify-center ${getAdSize()} mt-6 mb-6 rounded`}>
      <span className="text-gray-400 text-sm font-medium">Advertisement</span>
    </div>
  );
};

export default AdBanner;