import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database table names
export const TABLES = {
  PRODUCTS: 'products',
  ORDERS: 'orders',
  ORDER_ITEMS: 'order_items',
  CUSTOMERS: 'customers',
  CATEGORIES: 'categories',
  ADMIN_USERS: 'admin_users'
};

// Helper functions for common operations
export const supabaseHelpers = {
  // Products
  async getProducts(category = null, limit = 50) {
    let query = supabase
      .from(TABLES.PRODUCTS)
      .select('*')
      .eq('active', true)
      .limit(limit);
    
    if (category) {
      query = query.eq('category', category);
    }
    
    return query;
  },

  async getProduct(id) {
    return supabase
      .from(TABLES.PRODUCTS)
      .select('*')
      .eq('id', id)
      .single();
  },

  // Orders
  async createOrder(orderData) {
    return supabase
      .from(TABLES.ORDERS)
      .insert(orderData)
      .select()
      .single();
  },

  async createOrderItems(orderItems) {
    return supabase
      .from(TABLES.ORDER_ITEMS)
      .insert(orderItems);
  },

  // Admin authentication
  async signInAdmin(email, password) {
    return supabase.auth.signInWithPassword({
      email,
      password
    });
  },

  async signOutAdmin() {
    return supabase.auth.signOut();
  },

  async getCurrentUser() {
    return supabase.auth.getUser();
  }
};

