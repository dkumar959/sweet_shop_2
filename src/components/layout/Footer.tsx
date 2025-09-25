import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-50 to-purple-50 border-t-4 border-pink-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Sweet Shop</h3>
          <p className="text-gray-600 mb-4">Spreading sweetness, one candy at a time! 🍭</p>
          <div className="flex items-center justify-center space-x-1 text-sm text-gray-500">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>by Sweet Shop Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;