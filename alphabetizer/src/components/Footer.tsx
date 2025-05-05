import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-4 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} Alphabetizer. All rights reserved.</p>
        <p className="mt-1">A powerful tool for sorting and formatting text.</p>
      </div>
    </footer>
  );
};

export default Footer;