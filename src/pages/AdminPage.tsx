import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '../components/layout/Layout';
import AdminSweetCard from '../components/admin/AdminSweetCard';
import SweetForm from '../components/admin/SweetForm';
import RestockForm from '../components/admin/RestockForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { setSweetsLoading, setSweetsSuccess, setSweetsError, addSweet, updateSweet, deleteSweet } from '../store/slices/sweetsSlice';
import { sweetsService } from '../services/sweetsService';
import { Sweet } from '../store/slices/sweetsSlice';
import { toast } from 'sonner';

const AdminPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sweets, isLoading } = useAppSelector((state) => state.sweets);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isRestockFormOpen, setIsRestockFormOpen] = useState(false);
  const [selectedSweet, setSelectedSweet] = useState<Sweet | null>(null);

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

  const handleAddSweet = async (sweetData: Omit<Sweet, 'id'>) => {
    try {
      const response = await sweetsService.addSweet(sweetData);
      dispatch(addSweet(response.data));
      toast.success(`Successfully added ${sweetData.name}! 🍭`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to add sweet';
      toast.error(`Failed to add sweet: ${message}`);
    }
  };

  const handleEditSweet = (sweet: Sweet) => {
    setSelectedSweet(sweet);
    setIsEditFormOpen(true);
  };

  const handleUpdateSweet = async (sweetData: Omit<Sweet, 'id'>) => {
    if (!selectedSweet) return;
    
    try {
      const response = await sweetsService.updateSweet(selectedSweet.id, sweetData);
      dispatch(updateSweet({ ...sweetData, id: selectedSweet.id }));
      toast.success(`Successfully updated ${sweetData.name}! ✨`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update sweet';
      toast.error(`Failed to update sweet: ${message}`);
    }
  };

  const handleDeleteSweet = async (id: string) => {
    const sweet = sweets.find(s => s.id === id);
    try {
      await sweetsService.deleteSweet(id);
      dispatch(deleteSweet(id));
      toast.success(`Successfully deleted ${sweet?.name || 'sweet'}! 🗑️`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete sweet';
      toast.error(`Failed to delete sweet: ${message}`);
    }
  };

  const handleRestockSweet = (sweet: Sweet) => {
    setSelectedSweet(sweet);
    setIsRestockFormOpen(true);
  };

  const handleRestock = async (quantity: number) => {
    if (!selectedSweet) return;
    
    try {
      const updatedSweet = { ...selectedSweet, stock: selectedSweet.stock + quantity };
      await sweetsService.updateSweet(selectedSweet.id, updatedSweet);
      dispatch(updateSweet(updatedSweet));
      toast.success(`Successfully restocked ${selectedSweet.name}! Added ${quantity} units. 📦`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to restock sweet';
      toast.error(`Failed to restock sweet: ${message}`);
    }
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
          <LoadingSpinner size="lg" className="min-h-[400px]" text="Loading admin dashboard..." />
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
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Admin Dashboard 👑
            </h1>
            <p className="text-xl text-gray-600">
              Manage your sweet inventory with ease
            </p>
          </div>
          <Button
            onClick={() => setIsAddFormOpen(true)}
            size="lg"
            className="flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Sweet</span>
          </Button>
        </motion.div>

        {sweets.length === 0 ? (
          <EmptyState
            title="No Sweets in Inventory"
            description="Start building your sweet collection by adding your first product!"
            type="products"
          />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {sweets.map((sweet) => (
              <motion.div key={sweet.id} variants={itemVariants}>
                <AdminSweetCard
                  sweet={sweet}
                  onEdit={handleEditSweet}
                  onDelete={handleDeleteSweet}
                  onRestock={handleRestockSweet}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {sweets.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-600">
              Total inventory: {sweets.length} sweet{sweets.length !== 1 ? 's' : ''}
            </p>
          </motion.div>
        )}

        {/* Forms */}
        <SweetForm
          isOpen={isAddFormOpen}
          onClose={() => setIsAddFormOpen(false)}
          onSubmit={handleAddSweet}
          title="Add New Sweet"
        />

        <SweetForm
          isOpen={isEditFormOpen}
          onClose={() => {
            setIsEditFormOpen(false);
            setSelectedSweet(null);
          }}
          onSubmit={handleUpdateSweet}
          sweet={selectedSweet}
          title="Edit Sweet"
        />

        <RestockForm
          isOpen={isRestockFormOpen}
          onClose={() => {
            setIsRestockFormOpen(false);
            setSelectedSweet(null);
          }}
          onSubmit={handleRestock}
          sweet={selectedSweet}
        />
      </div>
    </Layout>
  );
};

export default AdminPage;