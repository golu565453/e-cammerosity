
import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import { products } from '../lib/data';

export default function Index() {
  // Get featured and trending products
  const featuredProducts = products.slice(0, 4);
  const trendingProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 8);
  
  return (
    <>
      <Helmet>
        <title>ELEGANCE | Premium Online Shopping</title>
        <meta name="description" content="Discover premium products with elegant design and exceptional quality." />
      </Helmet>
      
      <Navbar />
      <main className="pt-16"> {/* Add padding to account for the fixed navbar */}
        <Hero />
        
        {/* Featured Products */}
        <ProductGrid 
          products={featuredProducts} 
          title="Featured Products" 
          subtitle="Discover our handpicked selection of premium products"
        />
        
        {/* Promotional Banner */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/70 opacity-90" />
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2670&auto=format&fit=crop"
              alt=""
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 flex items-center">
              <div className="px-8 sm:px-12 md:px-16 max-w-2xl">
                <span className="inline-block bg-white/90 text-primary px-4 py-1 text-sm font-medium rounded-full mb-4">
                  Special Offer
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Summer Sale Up To 50% Off
                </h2>
                <p className="text-white/90 text-lg mb-6">
                  Limited time offer on our premium collection. Upgrade your style with exclusive discounts on selected items.
                </p>
                <a 
                  href="/sale" 
                  className="inline-block bg-white text-primary px-6 py-3 rounded-md font-medium hover:bg-white/90 transition-colors"
                >
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Trending Products */}
        <ProductGrid 
          products={trendingProducts} 
          title="Trending Now" 
          subtitle="Explore our most popular products loved by our customers"
        />
        
        {/* Features Highlight */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Shipping */}
            <div className="text-center p-6 border border-border rounded-lg hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-muted-foreground">
                Free shipping on all orders over $50
              </p>
            </div>
            
            {/* Secure Payment */}
            <div className="text-center p-6 border border-border rounded-lg hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-muted-foreground">
                100% secure payment methods
              </p>
            </div>
            
            {/* 24/7 Support */}
            <div className="text-center p-6 border border-border rounded-lg hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">
                Dedicated support anytime you need
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
