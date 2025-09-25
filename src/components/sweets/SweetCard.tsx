import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, CircleAlert as AlertCircle, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sweet } from '../../store/slices/sweetsSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { purchaseSweet } from '../../store/slices/sweetsSlice';
import { sweetsService } from '../../services/sweetsService';
import { toast } from 'sonner';

interface SweetCardProps {
  sweet: Sweet;
}

const SweetCard: React.FC<SweetCardProps> = ({ sweet }) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isPurchasing, setIsPurchasing] = useState(false);

  const handlePurchase = async () => {
    if (!user) {
      toast.error('Please login to purchase sweets!');
      return;
    }

    if (sweet.stock === 0) {
      toast.error('This sweet is out of stock!');
      return;
    }

    setIsPurchasing(true);
    try {
      await sweetsService.purchaseSweet(sweet.id);
      dispatch(purchaseSweet({ id: sweet.id, quantity: 1 }));
      toast.success(`Successfully purchased ${sweet.name}! 🍭`, {
        description: `Stock remaining: ${sweet.stock - 1}`,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Purchase failed';
      toast.error(`Purchase failed: ${message}`);
    } finally {
      setIsPurchasing(false);
    }
  };

  const getStockStatus = () => {
    if (sweet.stock === 0) return { color: 'destructive', text: 'Out of Stock' };
    if (sweet.stock <= 5) return { color: 'secondary', text: 'Low Stock' };
    return { color: 'default', text: 'In Stock' };
  };

  const stockStatus = getStockStatus();

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-bold text-gray-800 line-clamp-2">
              {sweet.name}
            </CardTitle>
            <Badge variant={stockStatus.color as any} className="ml-2 flex items-center space-x-1">
              <Package className="h-3 w-3" />
              <span>{stockStatus.text}</span>
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="flex-grow">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">
                {sweet.category}
              </Badge>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  ${sweet.price.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500">
                  Stock: {sweet.stock}
                </div>
              </div>
            </div>

            {sweet.description && (
              <p className="text-sm text-gray-600 line-clamp-3">
                {sweet.description}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-4">
          <Button
            onClick={handlePurchase}
            disabled={sweet.stock === 0 || !user || isPurchasing}
            className="w-full"
            variant={sweet.stock === 0 ? "secondary" : "default"}
          >
            {isPurchasing ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Purchasing...
              </>
            ) : sweet.stock === 0 ? (
              <>
                <AlertCircle className="mr-2 h-4 w-4" />
                Out of Stock
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2 h-4 w-4" />
                {user ? 'Purchase' : 'Login to Purchase'}
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default SweetCard;