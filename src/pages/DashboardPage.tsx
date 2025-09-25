import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import FilterBar from '../components/sweets/FilterBar';
import SweetCard from '../components/sweets/SweetCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { setSweetsLoading, setSweetsSuccess, setSweetsError } from '../store/slices/sweetsSlice';
import { sweetsService } from '../services/sweetsService';
import { toast } from 'sonner';

const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filteredSweets, isLoading, searchTerm, selectedCategory } = useAppSelector((state) => state.sweets);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchSweets = async () => {
      dispatch(setSweetsLoading(true));
      try {
        const response = await sweetsService.getSweets();
        dispatch(setSweetsSuccess(response.data));
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to load sweets';
        dispatch(setSweetsError(message));
        toast.error(`Failed to load sweets: ${message}`);
      }
    };

    fetchSweets();
  }, [dispatch]);

  const getEmptyStateProps = () => {
    if (searchTerm || selectedCategory) {
      return {
        title: 'No Sweets Found',
        description: 'No sweets match your current filters. Try adjusting your search or category selection.',
        type: 'search' as const,
      };
    }
    return {
      title: 'No Sweets Available',
      description: 'There are no sweets available at the moment. Please check back later!',
      type: 'products' as const,
    };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <LoadingSpinner size="lg" className="min-h-[400px]" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Sweet Dashboard 🍭
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {user 
              ? `Welcome back, ${user.name}! Discover and purchase your favorite sweets.`
              : 'Discover our amazing collection of delicious sweets! Login to start purchasing.'
            }
          </p>
        </motion.div>

        <FilterBar />

        {filteredSweets.length === 0 ? (
          <EmptyState {...getEmptyStateProps()} />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredSweets.map((sweet) => (
              <motion.div key={sweet.id} variants={itemVariants}>
                <SweetCard sweet={sweet} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {filteredSweets.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-600">
              Showing {filteredSweets.length} sweet{filteredSweets.length !== 1 ? 's' : ''} 
              {(searchTerm || selectedCategory) && ' matching your filters'}
            </p>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default DashboardPage;