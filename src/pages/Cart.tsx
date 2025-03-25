
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Trash2, Minus, Plus, ShoppingBag, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Product, formatPrice, products } from '../lib/data';

// Mock cart item interface
interface CartItem {
  product: Product;
  quantity: number;
}

export default function Cart() {
  // Mock cart data (would normally come from context/state management)
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Add some sample items to the cart
  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setCartItems([
        { product: products[0], quantity: 1 },
        { product: products[2], quantity: 2 },
      ]);
      setIsLoading(false);
    }, 800);
  }, []);
  
  // Calculate cart totals
  const subtotal = cartItems.reduce(
    (total, item) => total + (item.product.discountPrice || item.product.price) * item.quantity,
    0
  );
  
  const shipping = subtotal > 0 ? (subtotal >= 50 ? 0 : 5.99) : 0;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;
  
  // Cart actions
  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item => 
      item.product.id === productId
        ? { ...item, quantity: Math.min(newQuantity, item.product.stock) }
        : item
    );
    
    setCartItems(updatedCart);
  };
  
  const removeItem = (productId: number) => {
    const updatedCart = cartItems.filter(item => item.product.id !== productId);
    setCartItems(updatedCart);
    toast.success('Item removed from cart');
  };
  
  const handleCheckout = () => {
    toast.success('Checkout functionality would be implemented here');
  };
  
  return (
    <>
      <Helmet>
        <title>Your Cart | ELEGANCE</title>
        <meta name="description" content="Review and manage your shopping cart" />
      </Helmet>
      
      <Navbar />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        
        {isLoading ? (
          // Loading skeleton
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {[1, 2].map(i => (
                <div key={i} className="rounded-lg border p-4 animate-pulse space-y-4">
                  <div className="flex space-x-4">
                    <div className="w-24 h-24 bg-secondary rounded-md"></div>
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-4 bg-secondary rounded w-3/4"></div>
                      <div className="h-4 bg-secondary rounded w-1/2"></div>
                      <div className="h-4 bg-secondary rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="h-64 bg-secondary/50 rounded-lg animate-pulse"></div>
          </div>
        ) : cartItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item.product.id} 
                  className="animate-fade-in rounded-lg border p-4"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <Link 
                      to={`/product/${item.product.id}`}
                      className="rounded-md overflow-hidden bg-secondary/20 w-full sm:w-24 h-24 flex-shrink-0"
                    >
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    
                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div>
                          <Link 
                            to={`/product/${item.product.id}`}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          
                          <div className="mt-1 text-sm text-muted-foreground">
                            Category: <span className="capitalize">{item.product.category}</span>
                          </div>
                        </div>
                        
                        <div className="mt-2 sm:mt-0 font-medium">
                          {formatPrice((item.product.discountPrice || item.product.price) * item.quantity)}
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        {/* Quantity controls */}
                        <div className="flex items-center">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 rounded-md hover:bg-secondary transition-colors"
                            aria-label="Decrease quantity"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 rounded-md hover:bg-secondary transition-colors"
                            aria-label="Increase quantity"
                            disabled={item.quantity >= item.product.stock}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        {/* Remove button */}
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Order Summary */}
            <div className="animate-fade-in rounded-lg border p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleCheckout}
                className="w-full bg-primary text-white py-3 rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} />
                <span>Proceed to Checkout</span>
              </button>
              
              <div className="mt-6">
                <Link 
                  to="/" 
                  className="flex items-center justify-center text-primary hover:text-primary/80 transition-colors"
                >
                  <span>Continue Shopping</span>
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          // Empty cart
          <div className="text-center py-12">
            <div className="flex justify-center mb-4">
              <ShoppingBag size={64} className="text-muted" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link 
              to="/" 
              className="btn-primary"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </main>
      
      <Footer />
    </>
  );
}
