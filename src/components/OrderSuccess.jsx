import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  CheckCircle, 
  Package, 
  Truck, 
  Mail, 
  Phone,
  ArrowRight,
  Download,
  Home
} from 'lucide-react';

const OrderSuccess = ({ orderData, onContinueShopping }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(price).replace('BDT', '৳');
  };

  const getPaymentMethodName = (method) => {
    const methods = {
      card: 'Credit/Debit Card',
      bkash: 'bKash',
      cod: 'Cash on Delivery'
    };
    return methods[method] || method;
  };

  const getEstimatedDelivery = () => {
    const today = new Date();
    const deliveryDays = orderData.city === 'dhaka' ? 2 : 4;
    const deliveryDate = new Date(today.getTime() + deliveryDays * 24 * 60 * 60 * 1000);
    
    return deliveryDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 text-lg">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="space-y-6">
            {/* Order Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Order Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Order Number</span>
                  <Badge variant="outline" className="font-mono text-sm">
                    {orderData.orderId}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Order Date</span>
                  <span className="font-medium">
                    {new Date().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium">
                    {getPaymentMethodName(orderData.paymentMethod)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="font-bold text-lg text-primary">
                    {formatPrice(orderData.total)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
                  <div className="text-gray-600 space-y-1">
                    <p>{orderData.firstName} {orderData.lastName}</p>
                    <p>{orderData.address}</p>
                    <p>{orderData.city.charAt(0).toUpperCase() + orderData.city.slice(1)}, {orderData.postalCode}</p>
                    <p>Bangladesh</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Estimated Delivery</h4>
                  <p className="text-blue-700 font-medium">{getEstimatedDelivery()}</p>
                  <p className="text-sm text-blue-600 mt-1">
                    {orderData.city === 'dhaka' ? '1-2 business days' : '3-4 business days'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{orderData.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{orderData.phone}</span>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-md p-4 mt-4">
                  <p className="text-sm text-green-700">
                    📧 A confirmation email has been sent to your email address with order details and tracking information.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Items */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderData.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 border-b pb-4 last:border-b-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-500">{item.brand}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                        {item.originalPrice > item.price && (
                          <p className="text-xs text-gray-500 line-through">
                            {formatPrice(item.originalPrice * item.quantity)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle>What's Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Order Processing</h4>
                      <p className="text-sm text-gray-600">We'll prepare your items for shipment</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Shipping</h4>
                      <p className="text-sm text-gray-600">Your order will be shipped to your address</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Delivery</h4>
                      <p className="text-sm text-gray-600">Enjoy your new products!</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                className="w-full btn-primary text-white"
                onClick={onContinueShopping}
              >
                <Home className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
              
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Invoice
              </Button>
            </div>
          </div>
        </div>

        {/* Support Information */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                If you have any questions about your order, please don't hesitate to contact us.
              </p>
              <div className="flex justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>info@siacollections.shop</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+880 1XXX-XXXXXX</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderSuccess;

