import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Sparkles, Heart, Home, ShoppingBag, Shirt, Baby, User, Package, Crown } from 'lucide-react';

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: 'Sale',
      description: 'Up to 50% off',
      icon: Sparkles,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      count: '200+ items'
    },
    {
      id: 2,
      name: 'Makeup',
      description: 'Beauty essentials',
      icon: Heart,
      color: 'bg-pink-500',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600',
      count: '150+ items'
    },
    {
      id: 3,
      name: 'Skincare',
      description: 'Glow & care',
      icon: Sparkles,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      count: '120+ items'
    },
    {
      id: 4,
      name: 'Home',
      description: 'Candles & fragrance',
      icon: Home,
      color: 'bg-amber-500',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      count: '80+ items'
    },
    {
      id: 5,
      name: 'Shoes',
      description: 'Step in style',
      icon: Package,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      count: '90+ items'
    },
    {
      id: 6,
      name: 'Handbags',
      description: 'Designer collection',
      icon: ShoppingBag,
      color: 'bg-indigo-500',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      count: '75+ items'
    },
    {
      id: 7,
      name: 'Accessories',
      description: 'Complete your look',
      icon: Crown,
      color: 'bg-emerald-500',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      count: '100+ items'
    },
    {
      id: 8,
      name: 'Clothing',
      description: 'Fashion forward',
      icon: Shirt,
      color: 'bg-rose-500',
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-600',
      count: '200+ items'
    },
    {
      id: 9,
      name: 'Kids',
      description: 'Little ones',
      icon: Baby,
      color: 'bg-cyan-500',
      bgColor: 'bg-cyan-50',
      textColor: 'text-cyan-600',
      count: '60+ items'
    },
    {
      id: 10,
      name: 'Men',
      description: 'Gentleman\'s choice',
      icon: User,
      color: 'bg-gray-500',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-600',
      count: '85+ items'
    },
    {
      id: 11,
      name: 'Minis',
      description: 'Travel size',
      icon: Package,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      count: '45+ items'
    },
    {
      id: 12,
      name: 'Designer',
      description: 'Luxury brands',
      icon: Crown,
      color: 'bg-violet-500',
      bgColor: 'bg-violet-50',
      textColor: 'text-violet-600',
      count: '30+ items'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Shop by <span className="sia-text-gradient">Category</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our diverse collection across multiple categories. 
            From beauty essentials to fashion accessories, we have everything you need.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className="group cursor-pointer"
              >
                <div className={`${category.bgColor} rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:scale-105`}>
                  {/* Icon */}
                  <div className={`${category.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  
                  {/* Category Name */}
                  <h3 className={`font-semibold text-lg mb-1 ${category.textColor} group-hover:text-opacity-80`}>
                    {category.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-2">
                    {category.description}
                  </p>
                  
                  {/* Item Count */}
                  <p className="text-xs text-gray-500">
                    {category.count}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Special Offers Section */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {/* Sale Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 p-8 text-white">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Summer Sale</h3>
              <p className="text-red-100 mb-4">Up to 50% off on selected items</p>
              <Button 
                variant="secondary" 
                className="bg-white text-red-500 hover:bg-gray-100"
              >
                Shop Sale
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          </div>

          {/* New Arrivals Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 p-8 text-white">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">New Arrivals</h3>
              <p className="text-purple-100 mb-4">Latest trends in beauty & fashion</p>
              <Button 
                variant="secondary" 
                className="bg-white text-purple-500 hover:bg-gray-100"
              >
                Explore New
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;

