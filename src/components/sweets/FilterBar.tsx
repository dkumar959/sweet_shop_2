import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { setSearchTerm, setSelectedCategory, setPriceRange, clearFilters } from '../../store/slices/sweetsSlice';

const FilterBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchTerm, selectedCategory, priceRange, categories } = useAppSelector(
    (state) => state.sweets
  );

  const hasActiveFilters = searchTerm || selectedCategory || priceRange[0] > 0 || priceRange[1] < 100;

  return (
    <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Search */}
          <div className="flex-1">
            <Label htmlFor="search" className="text-sm font-medium text-gray-700 mb-2 block">
              Search Sweets
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="search"
                placeholder="Search for delicious sweets..."
                value={searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                className="pl-10"
                aria-label="Search sweets by name"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="lg:w-48">
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Category
            </Label>
            <Select 
              value={selectedCategory} 
              onValueChange={(value) => dispatch(setSelectedCategory(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div className="lg:w-64">
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </Label>
            <Slider
              value={priceRange}
              onValueChange={(value) => dispatch(setPriceRange(value as [number, number]))}
              max={100}
              min={0}
              step={1}
              className="mt-2"
              aria-label={`Price range from $${priceRange[0]} to $${priceRange[1]}`}
            />
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="flex items-end">
              <Button
                onClick={() => dispatch(clearFilters())}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
                aria-label="Clear all filters"
              >
                <X className="h-4 w-4" />
                <span>Clear</span>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterBar;