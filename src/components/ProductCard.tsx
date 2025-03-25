
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product, formatPrice } from '../lib/data';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const discount = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100) 
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`Added ${product.name} to your cart`);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? `Removed from favorites` : `Added to favorites`);
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-premium overflow-hidden">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-secondary/30 rounded-md mb-4">
          {/* Loading Placeholder */}
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-secondary animate-pulse">
              <span className="sr-only">Loading...</span>
            </div>
          )}
          
          {/* Product Image */}
          <img
            src={product.images[0]}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isHovered ? 'scale-105' : 'scale-100'
            } ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsImageLoaded(true)}
          />
          
          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-2 left-2 bg-primary text-white text-xs font-medium px-2 py-1 rounded">
              {discount}% OFF
            </div>
          )}
          
          {/* Quick Actions */}
          <div className={`absolute bottom-0 left-0 right-0 p-4 flex justify-between transition-all duration-300 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <button 
              onClick={handleAddToCart}
              className="p-2 bg-white rounded-full shadow-md hover:bg-primary hover:text-white transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingCart size={18} />
            </button>
            
            <button 
              onClick={handleToggleFavorite}
              className={`p-2 rounded-full shadow-md transition-colors ${
                isFavorite 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-primary hover:bg-primary hover:text-white'
              }`}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="space-y-1">
          <div className="flex items-center">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={14} 
                  fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                  className={i < Math.floor(product.rating) ? "text-amber-400" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-1">
              {product.rating.toFixed(1)}
            </span>
          </div>
          
          <h3 className="font-medium text-base md:text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-end gap-2">
            {product.discountPrice ? (
              <>
                <span className="font-semibold">
                  {formatPrice(product.discountPrice)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="font-semibold">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
