
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../lib/data';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  category?: string;
}

export default function ProductGrid({ products, title, subtitle, category }: ProductGridProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Filter products by category if specified
  const filteredProducts = category 
    ? products.filter(product => product.category === category.toLowerCase())
    : products;
  
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {category ? (
                <Link to={`/category/${category}`} className="hover:text-primary transition-colors">
                  {title}
                </Link>
              ) : (
                title
              )}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      {/* Products Grid */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-opacity duration-500 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="animate-fade-in"
              style={{ 
                animationDelay: `${(filteredProducts.indexOf(product) % 4) * 100}ms` 
              }}
            >
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
