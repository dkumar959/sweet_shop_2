import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Plus, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Sweet } from '../../store/slices/sweetsSlice';

interface AdminSweetCardProps {
  sweet: Sweet;
  onEdit: (sweet: Sweet) => void;
  onDelete: (id: string) => void;
  onRestock: (sweet: Sweet) => void;
}

const AdminSweetCard: React.FC<AdminSweetCardProps> = ({ sweet, onEdit, onDelete, onRestock }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const getStockStatus = () => {
    if (sweet.stock === 0) return { color: 'destructive', text: 'Out of Stock' };
    if (sweet.stock <= 5) return { color: 'secondary', text: 'Low Stock' };
    return { color: 'default', text: 'In Stock' };
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(sweet.id);
    } finally {
      setIsDeleting(false);
    }
  };

  const stockStatus = getStockStatus();

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm">
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

        <CardFooter className="pt-4 space-y-2">
          <div className="w-full grid grid-cols-3 gap-2">
            <Button
              onClick={() => onEdit(sweet)}
              variant="outline"
              size="sm"
              className="flex items-center justify-center"
            >
              <Edit className="h-4 w-4" />
            </Button>
            
            <Button
              onClick={() => onRestock(sweet)}
              variant="outline"
              size="sm"
              className="flex items-center justify-center"
            >
              <Plus className="h-4 w-4" />
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center justify-center border-red-200 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Sweet</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{sweet.name}"? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {isDeleting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Deleting...
                      </>
                    ) : (
                      'Delete'
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default AdminSweetCard;