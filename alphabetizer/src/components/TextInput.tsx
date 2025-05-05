import React from 'react';
import { X } from 'lucide-react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({ 
  value, 
  onChange, 
  onClear,
  placeholder = 'Enter or paste your text here...' 
}) => {
  return (
    <div className="relative">
      <textarea
        className="w-full h-64 p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-y transition-all"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button 
          onClick={onClear} 
          className="absolute top-3 right-3 p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          aria-label="Clear text"
        >
          <X className="h-4 w-4 text-gray-700" />
        </button>
      )}
      <div className="mt-2 text-right text-sm text-gray-500">
        {value.length} characters | {value.split(/\n/).filter(line => line.trim()).length} lines
      </div>
    </div>
  );
};

export default TextInput;