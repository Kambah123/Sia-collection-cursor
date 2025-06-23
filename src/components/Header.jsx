import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Search, User, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useCart } from '../hooks/use-cart';
import Cart from './Cart';

const Header = ({ onCheckout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getCartItemCount } = useCart();

  const categories = [
    'Sale', 'Makeup', 'Skincare', 'Home', 'Shoes', 
    'Handbags', 'Accessories', 'Clothing', 'Kids', 
    'Men', 'Minis', 'Designer'
  ];

  const cartCount = getCartItemCount();

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    if (onCheckout) {
      onCheckout();
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md">
        {/* Top Bar */}
        <div className="bg-black text-white py-2 px-4 text-center text-sm">
          <p>Free shipping inside Dhaka on orders over ৳2000 | Outside Dhaka ৳200</p>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>

            {/* Logo */}
            <div className="flex-1 md:flex-none text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold sia-text-gradient">
                SIA Collections
              </h1>
              <p className="text-xs text-gray-600 hidden md:block">Beauty, Fashion & Lifestyle</p>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 w-full border-2 border-gray-200 focus:border-primary"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              {/* Search Icon - Mobile */}
              <Button variant="ghost" size="sm" className="md:hidden">
                <Search className="h-5 w-5" />
              </Button>

              {/* User Account */}
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <User className="h-5 w-5 mr-2" />
                <span className="hidden lg:inline">Account</span>
              </Button>

              {/* Wishlist */}
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <Heart className="h-5 w-5 mr-2" />
                <span className="hidden lg:inline">Wishlist</span>
              </Button>

              {/* Shopping Cart */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative"
                onClick={handleCartClick}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                <span className="hidden md:inline">Cart</span>
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-primary text-white text-xs h-5 w-5 flex items-center justify-center rounded-full p-0 min-w-[20px]">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Search Bar - Mobile */}
          <div className="md:hidden mt-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 w-full border-2 border-gray-200 focus:border-primary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Navigation Categories */}
        <nav className="border-t border-gray-200">
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="container mx-auto px-4">
              <div className="category-nav">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant="ghost"
                    className="px-4 py-2 text-sm font-medium hover:text-primary hover:bg-accent transition-colors"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200">
              <div className="container mx-auto px-4 py-4">
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant="ghost"
                      className="w-full justify-start px-4 py-3 text-left hover:text-primary hover:bg-accent"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category}
                    </Button>
                  ))}
                  
                  {/* Mobile Account Links */}
                  <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
                    <Button variant="ghost" className="w-full justify-start px-4 py-3">
                      <User className="h-4 w-4 mr-3" />
                      My Account
                    </Button>
                    <Button variant="ghost" className="w-full justify-start px-4 py-3">
                      <Heart className="h-4 w-4 mr-3" />
                      Wishlist
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Cart Sidebar */}
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />
    </>
  );
};

export default Header;

