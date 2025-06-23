import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Sparkles, Heart, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="text-center md:text-left space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start space-x-2 text-primary">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-medium">New Collection</span>
                <Sparkles className="h-5 w-5" />
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Discover Your
                <span className="block sia-text-gradient">
                  Beauty & Style
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 max-w-lg">
                From premium makeup and skincare to designer handbags and shoes. 
                Find everything you need to express your unique style.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button 
                size="lg" 
                className="btn-primary text-white px-8 py-3 text-lg font-semibold"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-3 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white"
              >
                View Collections
              </Button>
            </div>

            {/* Stats */}
            <div className="flex justify-center md:justify-start space-x-8 pt-8">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-primary">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-bold text-lg">4.9</span>
                </div>
                <p className="text-sm text-gray-600">Customer Rating</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-primary">
                  <Heart className="h-4 w-4 fill-current" />
                  <span className="font-bold text-lg">10K+</span>
                </div>
                <p className="text-sm text-gray-600">Happy Customers</p>
              </div>
              
              <div className="text-center">
                <div className="text-primary">
                  <span className="font-bold text-lg">500+</span>
                </div>
                <p className="text-sm text-gray-600">Products</p>
              </div>
            </div>
          </div>

          {/* Right Content - Featured Products Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Featured Product 1 */}
              <div className="sia-card-shadow rounded-lg overflow-hidden bg-white p-4 sia-hover-scale">
                <div className="aspect-square bg-gradient-to-br from-pink-100 to-pink-50 rounded-lg mb-3 flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold text-sm">Makeup Kits</h3>
                <p className="text-xs text-gray-600">From ৳2000</p>
              </div>

              {/* Featured Product 2 */}
              <div className="sia-card-shadow rounded-lg overflow-hidden bg-white p-4 sia-hover-scale mt-8">
                <div className="aspect-square bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg mb-3 flex items-center justify-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <Heart className="h-8 w-8 text-purple-500" />
                  </div>
                </div>
                <h3 className="font-semibold text-sm">Skincare</h3>
                <p className="text-xs text-gray-600">From ৳1500</p>
              </div>

              {/* Featured Product 3 */}
              <div className="sia-card-shadow rounded-lg overflow-hidden bg-white p-4 sia-hover-scale">
                <div className="aspect-square bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg mb-3 flex items-center justify-center">
                  <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center">
                    <Star className="h-8 w-8 text-amber-500" />
                  </div>
                </div>
                <h3 className="font-semibold text-sm">Designer Bags</h3>
                <p className="text-xs text-gray-600">From ৳2500</p>
              </div>

              {/* Featured Product 4 */}
              <div className="sia-card-shadow rounded-lg overflow-hidden bg-white p-4 sia-hover-scale mt-8">
                <div className="aspect-square bg-gradient-to-br from-rose-100 to-rose-50 rounded-lg mb-3 flex items-center justify-center">
                  <div className="w-16 h-16 bg-rose-500/20 rounded-full flex items-center justify-center">
                    <ArrowRight className="h-8 w-8 text-rose-500" />
                  </div>
                </div>
                <h3 className="font-semibold text-sm">Shoes</h3>
                <p className="text-xs text-gray-600">From ৳2800</p>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

