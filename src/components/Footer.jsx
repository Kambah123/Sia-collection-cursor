import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, CreditCard, Truck, Shield, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      {/* Features Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-1">Free Shipping</h3>
              <p className="text-sm text-gray-400">Inside Dhaka on orders over ৳2000</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-1">Secure Payment</h3>
              <p className="text-sm text-gray-400">Multiple payment options</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-1">Fast Delivery</h3>
              <p className="text-sm text-gray-400">1-3 days delivery in Bangladesh</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-1">Easy Returns</h3>
              <p className="text-sm text-gray-400">7-day return policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold sia-text-gradient">SIA Collections</h2>
            <p className="text-gray-400 text-sm">
              Your trusted destination for premium beauty, fashion, and lifestyle products in Bangladesh. 
              We bring you the latest trends and highest quality items.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-gray-400">Gulshan, Dhaka 1212, Bangladesh</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-gray-400">+880 1XXX-XXXXXX</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-gray-400">info@siacollections.shop</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-800">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-800">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-800">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-800">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Track Your Order</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Makeup</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Skincare</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Shoes</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Handbags</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Accessories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Designer</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for exclusive offers and latest updates.
            </p>
            
            <div className="space-y-3">
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 rounded-r-none"
                />
                <Button className="btn-primary rounded-l-none px-4">
                  Subscribe
                </Button>
              </div>
              
              <p className="text-xs text-gray-500">
                By subscribing, you agree to our Privacy Policy and Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods & Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Payment Methods */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">We Accept:</span>
              <div className="flex items-center space-x-2">
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-xs font-bold text-black">VISA</span>
                </div>
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-xs font-bold text-black">MC</span>
                </div>
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-xs font-bold text-black">AMEX</span>
                </div>
                <div className="bg-green-600 rounded px-2 py-1">
                  <span className="text-xs font-bold text-white">bKash</span>
                </div>
                <div className="bg-gray-600 rounded px-2 py-1">
                  <span className="text-xs font-bold text-white">COD</span>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-sm text-gray-400 text-center md:text-right">
              <p>&copy; 2025 SIA Collections. All rights reserved.</p>
              <div className="flex space-x-4 mt-1">
                <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

