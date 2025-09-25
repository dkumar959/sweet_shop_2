import React from 'react';
import { motion } from 'framer-motion';
import { Candy, Search, ShoppingBag } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  type?: 'search' | 'products' | 'generic';
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, description, type = 'generic' }) => {
  const getIcon = () => {
    switch (type) {
      case 'search':
        return <Search className="h-16 w-16 text-pink-300" />;
      case 'products':
        return <ShoppingBag className="h-16 w-16 text-pink-300" />;
      default:
        return <Candy className="h-16 w-16 text-pink-300" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mb-6"
      >
        {getIcon()}
      </motion.div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 max-w-md">{description}</p>
    </motion.div>
  );
};

export default EmptyState;