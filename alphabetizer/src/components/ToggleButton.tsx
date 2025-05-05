import React from 'react';

interface ToggleButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  label,
  isActive,
  onClick,
  disabled = false
}) => {
  return (
    <button
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'bg-blue-500 text-white shadow-sm'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default ToggleButton;