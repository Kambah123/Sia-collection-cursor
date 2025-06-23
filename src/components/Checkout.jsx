import React, { useState } from 'react';
import { useCart } from '../hooks/use-cart';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Textarea } from './ui/textarea';
import { 
  CreditCard, 
  Smartphone, 
  Banknote, 
  MapPin, 
  User, 
  Mail, 
  Phone,
  Package,
  ArrowLeft,
  CheckCircle
} from 'lucide-react';

const Checkout = ({ onBack, onOrderComplete }) => {
  const { cart, getOrderTotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    // Customer Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Shipping Address
    address: '',
    city: 'dhaka',
    postalCode: '',
    
    // Payment
    paymentMethod: 'card',
    
    // Order Notes
    notes: ''
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(price).replace('BDT', '৳');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate order ID
      const orderId = `SIA${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
      
      // Clear cart
      clearCart();
      
      // Complete order
      onOrderComplete({
        orderId,
        ...formData,
        items: cart.items,
        total: orderSummary.total
      });
      
    } catch (error) {
      console.error('Order processing failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const orderSummary = getOrderTotal(formData.city, formData.paymentMethod);

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, Amex',
      icon: CreditCard
    },
    {
      id: 'bkash',
      name: 'bKash',
      description: 'Mobile payment',
      icon: Smartphone
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      description: 'Pay when you receive',
      icon: Banknote
    }
  ];

  const steps = [
    { id: 1, name: 'Information', icon: User },
    { id: 2, name: 'Shipping', icon: MapPin },
    { id: 3, name: 'Payment', icon: CreditCard },
    { id: 4, name: 'Review', icon: Package }
  ];

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {steps.map((step, index) => {
        const IconComponent = step.icon;
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;
        
        return (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              isActive ? 'border-primary bg-primary text-white' :
              isCompleted ? 'border-green-500 bg-green-500 text-white' :
              'border-gray-300 text-gray-400'
            }`}>
              {isCompleted ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <IconComponent className="h-5 w-5" />
              )}
            </div>
            <span className={`ml-2 text-sm font-medium ${
              isActive ? 'text-primary' :
              isCompleted ? 'text-green-600' :
              'text-gray-500'
            }`}>
              {step.name}
            </span>
            {index < steps.length - 1 && (
              <div className={`w-8 h-0.5 mx-4 ${
                isCompleted ? 'bg-green-500' : 'bg-gray-300'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );

  const renderCustomerInfo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="h-5 w-5 mr-2" />
          Customer Information
        </CardTitle>
        <CardDescription>Please provide your contact details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <div className="relative">
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="pl-10"
              required
            />
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
        
        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <div className="relative">
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              className="pl-10"
              placeholder="+880 1XXX-XXXXXX"
              required
            />
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderShippingInfo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="h-5 w-5 mr-2" />
          Shipping Address
        </CardTitle>
        <CardDescription>Where should we deliver your order?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="address">Street Address *</Label>
          <Textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="House/Flat number, Street name, Area"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City *</Label>
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="dhaka">Dhaka</option>
              <option value="chittagong">Chittagong</option>
              <option value="sylhet">Sylhet</option>
              <option value="rajshahi">Rajshahi</option>
              <option value="khulna">Khulna</option>
              <option value="barisal">Barisal</option>
              <option value="rangpur">Rangpur</option>
              <option value="mymensingh">Mymensingh</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              placeholder="1212"
            />
          </div>
        </div>

        {/* Shipping Cost Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Shipping Information</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Inside Dhaka: ৳100</li>
            <li>• Outside Dhaka: ৳200</li>
            <li>• Free shipping on orders over ৳2000 (inside Dhaka)</li>
            <li>• 1% COD charge applies for outside Dhaka</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );

  const renderPaymentInfo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="h-5 w-5 mr-2" />
          Payment Method
        </CardTitle>
        <CardDescription>Choose your preferred payment method</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={formData.paymentMethod}
          onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
          className="space-y-4"
        >
          {paymentMethods.map((method) => {
            const IconComponent = method.icon;
            return (
              <div key={method.id} className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-gray-50">
                <RadioGroupItem value={method.id} id={method.id} />
                <IconComponent className="h-5 w-5 text-gray-600" />
                <div className="flex-1">
                  <Label htmlFor={method.id} className="font-medium cursor-pointer">
                    {method.name}
                  </Label>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
              </div>
            );
          })}
        </RadioGroup>

        {formData.paymentMethod === 'cod' && formData.city !== 'dhaka' && (
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> 1% Cash on Delivery charge will be added to your order total.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderOrderReview = () => (
    <div className="space-y-6">
      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Order Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Order Notes (Optional)</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Any special instructions for your order..."
            rows={3}
          />
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Button>
            <h1 className="text-2xl font-bold">Checkout</h1>
          </div>
        </div>

        {/* Step Indicator */}
        {renderStepIndicator()}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {currentStep === 1 && renderCustomerInfo()}
              {currentStep === 2 && renderShippingInfo()}
              {currentStep === 3 && renderPaymentInfo()}
              {currentStep === 4 && renderOrderReview()}

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    Previous
                  </Button>
                )}
                
                {currentStep < 4 ? (
                  <Button
                    type="button"
                    className="btn-primary text-white ml-auto"
                    onClick={() => setCurrentStep(currentStep + 1)}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="btn-primary text-white ml-auto"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      'Place Order'
                    )}
                  </Button>
                )}
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Total</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(orderSummary.subtotal)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{formatPrice(orderSummary.shipping)}</span>
                </div>
                
                {orderSummary.codCharge > 0 && (
                  <div className="flex justify-between">
                    <span>COD Charge (1%)</span>
                    <span>{formatPrice(orderSummary.codCharge)}</span>
                  </div>
                )}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(orderSummary.total)}</span>
                  </div>
                </div>

                {/* Payment Method Badge */}
                {formData.paymentMethod && (
                  <div className="pt-4">
                    <Badge variant="outline" className="w-full justify-center py-2">
                      {paymentMethods.find(m => m.id === formData.paymentMethod)?.name}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

