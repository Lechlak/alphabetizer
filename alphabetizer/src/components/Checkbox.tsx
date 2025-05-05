import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled = false
}) => {
  return (
    <label className={`flex items-center space-x-2 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <div className="relative flex items-center">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
        <div
          className={`w-5 h-5 border rounded flex items-center justify-center transition-colors ${
            checked ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-300'
          }`}
        >
          {checked && <Check className="h-3 w-3 text-white" />}
        </div>
      </div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </label>
  );
};

export default Checkbox;