import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sweet } from '../../store/slices/sweetsSlice';

interface RestockFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (quantity: number) => void;
  sweet: Sweet | null;
}

const RestockForm: React.FC<RestockFormProps> = ({ isOpen, onClose, onSubmit, sweet }) => {
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const qty = Number(quantity);
    if (isNaN(qty) || qty <= 0) {
      setError('Please enter a valid positive number');
      return;
    }

    onSubmit(qty);
    setQuantity('');
    setError('');
    onClose();
  };

  const handleClose = () => {
    setQuantity('');
    setError('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Restock Sweet</DialogTitle>
        </DialogHeader>

        {sweet && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800">{sweet.name}</h3>
              <p className="text-sm text-gray-600">Current Stock: {sweet.stock} units</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity to Add</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                    setError('');
                  }}
                  className={error ? 'border-red-500' : ''}
                />
                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  Add Stock
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RestockForm;