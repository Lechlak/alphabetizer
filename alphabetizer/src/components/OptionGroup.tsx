import React from 'react';

interface OptionGroupProps {
  title: string;
  children: React.ReactNode;
}

const OptionGroup: React.FC<OptionGroupProps> = ({ title, children }) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {children}
      </div>
    </div>
  );
};

export default OptionGroup;