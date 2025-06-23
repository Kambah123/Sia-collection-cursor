import React from 'react';
import { useCart } from '../hooks/use-cart';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  X,
  ArrowRight,
  ShoppingCart
} from 'lucide-react';

const Cart = ({ isOpen, onClose, onCheckout }) => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, getCartItemCount } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(price).replace('BDT', '৳');
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 py-4">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Shopping Cart</h2>
              {cart.items.length > 0 && (
                <Badge className="bg-primary text-white">
                  {getCartItemCount()}
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {cart.items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Add some products to get started</p>
                <Button onClick={onClose} className="btn-primary text-white">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                    {/* Product Image */}
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500">{item.brand}</p>
                      <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-1">
                          <span className="text-sm font-semibold text-primary">
                            {formatPrice(item.price)}
                          </span>
                          {item.originalPrice > item.price && (
                            <span className="text-xs text-gray-500 line-through">
                              {formatPrice(item.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end space-y-2">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 p-1"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.items.length > 0 && (
            <div className="border-t px-6 py-4 space-y-4">
              {/* Subtotal */}
              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-gray-900">Subtotal</span>
                <span className="text-lg font-semibold text-primary">
                  {formatPrice(getCartTotal())}
                </span>
              </div>

              {/* Shipping Note */}
              <p className="text-xs text-gray-500">
                Shipping and taxes calculated at checkout
              </p>

              {/* Checkout Button */}
              <Button 
                className="w-full btn-primary text-white py-3 text-base font-semibold"
                onClick={() => {
                  onCheckout();
                  onClose();
                }}
              >
                Proceed to Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              {/* Continue Shopping */}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={onClose}
              >
                Continue Shopping
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

