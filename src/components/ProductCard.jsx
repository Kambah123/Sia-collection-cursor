import React, { useState } from 'react';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useCart } from '../hooks/use-cart';

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useCart();

  const {
    id,
    name,
    price,
    salePrice,
    image,
    rating = 4.5,
    reviewCount = 0,
    isOnSale = false,
    isFeatured = false,
    stockQuantity = 0,
    brand = 'SIA Collections',
    sku = `SKU${id}`
  } = product;

  const handleAddToCart = async () => {
    setIsLoading(true);
    
    try {
      // Add to cart
      addToCart({
        id,
        name,
        price,
        salePrice,
        image,
        brand,
        sku,
        stockQuantity
      });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    // Add to wishlist logic here
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(price).replace('BDT', '৳');
  };

  const discountPercentage = salePrice ? Math.round(((price - salePrice) / price) * 100) : 0;

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden sia-card-shadow sia-hover-scale transition-all duration-300">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isOnSale && (
            <Badge className="bg-red-500 text-white px-2 py-1 text-xs font-semibold">
              -{discountPercentage}%
            </Badge>
          )}
          {isFeatured && (
            <Badge className="bg-primary text-white px-2 py-1 text-xs font-semibold">
              Featured
            </Badge>
          )}
          {stockQuantity <= 5 && stockQuantity > 0 && (
            <Badge variant="outline" className="bg-white text-orange-600 border-orange-600 px-2 py-1 text-xs">
              Low Stock
            </Badge>
          )}
          {stockQuantity === 0 && (
            <Badge variant="outline" className="bg-white text-red-600 border-red-600 px-2 py-1 text-xs">
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="sm"
          className={`absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 ${
            isWishlisted ? 'text-red-500' : 'text-gray-600'
          }`}
          onClick={handleWishlistToggle}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </Button>

        {/* Quick View Button - Shows on Hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            variant="secondary"
            size="sm"
            className="bg-white text-black hover:bg-gray-100"
          >
            <Eye className="h-4 w-4 mr-2" />
            Quick View
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Brand */}
        <p className="text-xs text-gray-500 uppercase tracking-wide">{brand}</p>

        {/* Product Name */}
        <h3 className="font-semibold text-sm line-clamp-2 text-gray-900 group-hover:text-primary transition-colors">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(rating) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            {rating} {reviewCount > 0 && `(${reviewCount})`}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2">
          {salePrice ? (
            <>
              <span className="text-lg font-bold text-primary">
                {formatPrice(salePrice)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(price)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(price)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          className="w-full btn-primary text-white font-semibold py-2"
          onClick={handleAddToCart}
          disabled={stockQuantity === 0 || isLoading}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Adding...</span>
            </div>
          ) : stockQuantity === 0 ? (
            'Out of Stock'
          ) : (
            <>
              <ShoppingBag className="h-4 w-4 mr-2" />
              Add to Cart
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;

