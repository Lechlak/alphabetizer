import React from 'react';
import { AlignJustify, Type } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Type className="h-6 w-6" />
          <h1 className="text-xl md:text-2xl font-bold">Alphabetizer</h1>
        </div>
        <nav>
          <button className="p-2 rounded-md hover:bg-blue-500 transition-colors">
            <AlignJustify className="h-5 w-5" />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;