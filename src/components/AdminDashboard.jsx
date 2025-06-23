import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Plus,
  Eye,
  Edit,
  Trash2,
  LogOut,
  Search,
  Filter
} from 'lucide-react';
import { Input } from './ui/input';

const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sample data
  const stats = {
    totalProducts: 156,
    totalOrders: 342,
    totalCustomers: 1247,
    totalRevenue: 125000
  };

  const recentOrders = [
    {
      id: 'SIA20250623001',
      customer: 'Fatima Rahman',
      total: 3500,
      status: 'processing',
      date: '2025-06-23'
    },
    {
      id: 'SIA20250623002',
      customer: 'Ahmed Hassan',
      total: 2200,
      status: 'shipped',
      date: '2025-06-23'
    },
    {
      id: 'SIA20250622003',
      customer: 'Nadia Khan',
      total: 1800,
      status: 'delivered',
      date: '2025-06-22'
    }
  ];

  const products = [
    {
      id: 1,
      name: 'Professional Makeup Kit Set',
      sku: 'MK001',
      price: 2500,
      salePrice: 2000,
      stock: 25,
      status: 'active',
      category: 'Makeup'
    },
    {
      id: 2,
      name: 'Vitamin C Skin Care Set',
      sku: 'SK001',
      price: 1800,
      salePrice: 1500,
      stock: 30,
      status: 'active',
      category: 'Skincare'
    },
    {
      id: 3,
      name: 'Luxury Scented Candle',
      sku: 'HC001',
      price: 1200,
      salePrice: 1000,
      stock: 5,
      status: 'low_stock',
      category: 'Home'
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(price).replace('BDT', '৳');
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', text: 'Active' },
      low_stock: { color: 'bg-yellow-100 text-yellow-800', text: 'Low Stock' },
      out_of_stock: { color: 'bg-red-100 text-red-800', text: 'Out of Stock' },
      processing: { color: 'bg-blue-100 text-blue-800', text: 'Processing' },
      shipped: { color: 'bg-purple-100 text-purple-800', text: 'Shipped' },
      delivered: { color: 'bg-green-100 text-green-800', text: 'Delivered' }
    };

    const config = statusConfig[status] || statusConfig.active;
    return (
      <Badge className={`${config.color} border-0`}>
        {config.text}
      </Badge>
    );
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold">{stats.totalProducts}</p>
              </div>
              <Package className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold">{stats.totalOrders}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold">{stats.totalCustomers}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">{formatPrice(stats.totalRevenue)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest orders from your customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-semibold">{order.id}</p>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                  <p className="text-xs text-gray-500">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatPrice(order.total)}</p>
                  {getStatusBadge(order.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Products</h2>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        <Button className="btn-primary text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <Input
            placeholder="Search products..."
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SKU
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        {product.salePrice ? (
                          <>
                            <p className="font-medium text-primary">{formatPrice(product.salePrice)}</p>
                            <p className="text-sm text-gray-500 line-through">{formatPrice(product.price)}</p>
                          </>
                        ) : (
                          <p className="font-medium">{formatPrice(product.price)}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(product.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Orders</h2>
        <p className="text-gray-600">Manage customer orders and fulfillment</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <p className="text-center text-gray-500">Orders management interface coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'customers', label: 'Customers', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold sia-text-gradient">SIA Collections Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.name}</span>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 mr-8">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      activeTab === tab.id ? 'btn-primary text-white' : ''
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <IconComponent className="h-4 w-4 mr-3" />
                    {tab.label}
                  </Button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'products' && renderProducts()}
            {activeTab === 'orders' && renderOrders()}
            {activeTab === 'customers' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Customers</h2>
                  <p className="text-gray-600">Manage customer accounts and information</p>
                </div>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-center text-gray-500">Customer management interface coming soon...</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

