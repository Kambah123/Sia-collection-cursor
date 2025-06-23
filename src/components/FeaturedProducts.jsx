import React, { useState, useEffect, useCallback } from 'react';
import ProductCard from './ProductCard';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { supabaseHelpers } from '../lib/supabase';

// Import product images for fallback
import makeupKit1 from '../assets/images/makeup-kit-1.jpg';
import makeupKit2 from '../assets/images/makeup-kit-2.jpg';
import skincareSet1 from '../assets/images/skincare-set-1.jpg';
import skincareSet2 from '../assets/images/skincare-set-2.jpg';
import candle1 from '../assets/images/candle-1.jpg';
import candle2 from '../assets/images/candle-2.jpg';
import shoes1 from '../assets/images/shoes-1.jpg';
import shoes2 from '../assets/images/shoes-2.jpg';
import handbag1 from '../assets/images/handbag-1.jpg';
import handbag2 from '../assets/images/handbag-2.jpg';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFeaturedProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabaseHelpers.getProducts();
      
      if (error) {
        console.error('Error loading products from Supabase:', error);
        setError('Using sample data - Supabase connection failed');
        // Fallback to mock data
        setProducts(getMockProducts());
      } else if (data && data.length > 0) {
        // Transform Supabase data to match component expectations
        const transformedProducts = data.map(product => ({
          id: product.id,
          name: product.name,
          price: product.price,
          salePrice: product.sale_price,
          image: product.product_images?.[0]?.image_url || getDefaultImage(product.name),
          rating: 4.5 + (Math.random() * 0.5), // Generate random rating for demo
          reviewCount: Math.floor(Math.random() * 200) + 20,
          isOnSale: !!product.sale_price,
          isFeatured: product.is_featured,
          stockQuantity: product.stock_quantity,
          brand: product.brand,
          sku: product.sku
        }));
        setProducts(transformedProducts);
      } else {
        // No data from Supabase, use mock data
        setProducts(getMockProducts());
      }
    } catch (err) {
      console.error('Error connecting to Supabase:', err);
      setError('Using sample data - Database connection failed');
      setProducts(getMockProducts());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFeaturedProducts();
  }, [loadFeaturedProducts]);

  const getDefaultImage = (productName) => {
    const name = productName.toLowerCase();
    if (name.includes('makeup') || name.includes('cosmetic')) {
      return name.includes('holiday') || name.includes('gift') ? makeupKit2 : makeupKit1;
    }
    if (name.includes('skincare') || name.includes('vitamin')) {
      return name.includes('perfecting') || name.includes('step') ? skincareSet2 : skincareSet1;
    }
    if (name.includes('candle')) {
      return name.includes('cashmere') || name.includes('vanilla') ? candle2 : candle1;
    }
    if (name.includes('shoe') || name.includes('boot')) {
      return name.includes('stylish') ? shoes2 : shoes1;
    }
    if (name.includes('bag') || name.includes('handbag')) {
      return name.includes('crossbody') ? handbag2 : handbag1;
    }
    return makeupKit1; // Default fallback
  };

  const getMockProducts = () => [
    {
      id: 1,
      name: 'Professional Makeup Kit Set',
      price: 2500,
      salePrice: 2000,
      image: makeupKit1,
      rating: 4.8,
      reviewCount: 124,
      isOnSale: true,
      isFeatured: true,
      stockQuantity: 25,
      brand: 'SIA Beauty',
      sku: 'MK001'
    },
    {
      id: 2,
      name: 'Vitamin C Skin Care Set',
      price: 1800,
      salePrice: 1500,
      image: skincareSet1,
      rating: 4.7,
      reviewCount: 89,
      isOnSale: true,
      isFeatured: true,
      stockQuantity: 30,
      brand: 'SIA Skincare',
      sku: 'SK001'
    },
    {
      id: 3,
      name: 'Luxury Scented Candle - Velvet Rose & Oud',
      price: 1200,
      salePrice: 1000,
      image: candle1,
      rating: 4.9,
      reviewCount: 67,
      isOnSale: true,
      isFeatured: true,
      stockQuantity: 40,
      brand: 'Home Lights',
      sku: 'HC001'
    },
    {
      id: 4,
      name: 'Women Block High Heels Ankle Boots',
      price: 3500,
      salePrice: 3000,
      image: shoes1,
      rating: 4.6,
      reviewCount: 45,
      isOnSale: true,
      isFeatured: true,
      stockQuantity: 12,
      brand: 'SIA Fashion',
      sku: 'SH001'
    },
    {
      id: 5,
      name: 'All-in-One Makeup Holiday Gift Set',
      price: 3200,
      salePrice: 2800,
      image: makeupKit2,
      rating: 4.8,
      reviewCount: 156,
      isOnSale: true,
      isFeatured: true,
      stockQuantity: 15,
      brand: 'SIA Beauty',
      sku: 'MK002'
    },
    {
      id: 6,
      name: 'Designer Embroidery Jacquard Handbag',
      price: 4200,
      salePrice: 3800,
      image: handbag1,
      rating: 4.9,
      reviewCount: 78,
      isOnSale: true,
      isFeatured: true,
      stockQuantity: 8,
      brand: 'SIA Luxury',
      sku: 'HB001'
    },
    {
      id: 7,
      name: 'Perfecting 4 Step Skincare Kit',
      price: 2200,
      image: skincareSet2,
      rating: 4.5,
      reviewCount: 92,
      isFeatured: true,
      stockQuantity: 20,
      brand: 'SIA Skincare',
      sku: 'SK002'
    },
    {
      id: 8,
      name: 'Cashmere & Vanilla Luxury Candle',
      price: 1400,
      image: candle2,
      rating: 4.7,
      reviewCount: 34,
      isFeatured: true,
      stockQuantity: 35,
      brand: 'Applewood',
      sku: 'HC002'
    }
  ];

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured <span className="sia-text-gradient">Products</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Loading our handpicked selection of premium beauty and fashion products...
            </p>
          </div>
          <div className="product-grid">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md h-96 animate-pulse">
                <div className="bg-gray-200 h-64 rounded-t-lg"></div>
                <div className="p-4 space-y-3">
                  <div className="bg-gray-200 h-4 rounded"></div>
                  <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                  <div className="bg-gray-200 h-6 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="sia-text-gradient">Products</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium beauty and fashion products. 
            From makeup essentials to designer accessories, find everything you need to elevate your style.
          </p>
          {error && (
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-md max-w-md mx-auto">
              <p className="text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="product-grid mb-12">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            variant="outline"
            className="px-8 py-3 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            View All Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

