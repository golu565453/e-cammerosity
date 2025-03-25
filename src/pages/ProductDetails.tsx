
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  ChevronLeft, 
  ChevronRight, 
  Star,
  Check,
  Truck 
} from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import { getProductById, formatPrice, products } from '../lib/data';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(Number(id));
  const [selectedImage, setSelectedImage] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Similar products (random selection for demo)
  const similarProducts = products
    .filter(p => p.id !== Number(id) && p.category === product?.category)
    .slice(0, 4);
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsImageLoaded(false);
    setSelectedImage(0);
  }, [id]);
  
  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Link 
              to="/" 
              className="btn-primary"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  const handlePrevImage = () => {
    setIsImageLoaded(false);
    setSelectedImage((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };
  
  const handleNextImage = () => {
    setIsImageLoaded(false);
    setSelectedImage((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const handleThumbnailClick = (index: number) => {
    if (index === selectedImage) return;
    setIsImageLoaded(false);
    setSelectedImage(index);
  };
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };
  
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    toast.success(`Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to your cart`);
  };
  
  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      }).catch((err) => {
        console.error('Error sharing:', err);
      });
    } else {
      // Fallback if Web Share API is not supported
      toast.success('Link copied to clipboard!');
      navigator.clipboard.writeText(window.location.href);
    }
  };
  
  // Calculate discount percentage if applicable
  const discountPercentage = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100) 
    : 0;
  
  return (
    <>
      <Helmet>
        <title>{product.name} | ELEGANCE</title>
        <meta name="description" content={product.description} />
      </Helmet>
      
      <Navbar />
      <main className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li className="text-muted-foreground">
              <span>/</span>
            </li>
            <li>
              <Link to={`/category/${product.category}`} className="text-muted-foreground hover:text-primary transition-colors capitalize">
                {product.category}
              </Link>
            </li>
            <li className="text-muted-foreground">
              <span>/</span>
            </li>
            <li className="text-primary font-medium truncate max-w-[200px]">
              {product.name}
            </li>
          </ol>
        </nav>
        
        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-secondary/30 rounded-lg overflow-hidden">
              {/* Loading placeholder */}
              {!isImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-secondary animate-pulse">
                  <span className="sr-only">Loading...</span>
                </div>
              )}
              
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  isImageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setIsImageLoaded(true)}
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-sm"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-sm"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
              
              {/* Discount Badge */}
              {discountPercentage > 0 && (
                <div className="absolute top-4 left-4 bg-primary text-white text-sm font-medium px-2 py-1 rounded">
                  {discountPercentage}% OFF
                </div>
              )}
            </div>
            
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto px-1 pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className={`relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden transition-all ${
                      selectedImage === index 
                        ? 'ring-2 ring-primary' 
                        : 'ring-1 ring-border hover:ring-primary/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                      className={i < Math.floor(product.rating) ? "text-amber-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground ml-2">
                  {product.rating.toFixed(1)} rating
                </span>
              </div>
              
              {/* Price */}
              <div className="flex items-end gap-2 mb-4">
                {product.discountPrice ? (
                  <>
                    <span className="text-2xl font-bold">
                      {formatPrice(product.discountPrice)}
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-sm font-medium text-green-600 ml-2">
                      Save {formatPrice(product.price - product.discountPrice)}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
              
              {/* Description */}
              <p className="text-muted-foreground mb-6">
                {product.description}
              </p>
              
              {/* Availability */}
              <div className="flex items-center text-sm mb-6">
                <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
                {product.stock > 0 && (
                  <span className="text-muted-foreground ml-2">
                    ({product.stock} available)
                  </span>
                )}
              </div>
              
              {/* Quantity Selector */}
              {product.stock > 0 && (
                <div className="flex items-center space-x-4 mb-6">
                  <label htmlFor="quantity" className="font-medium">
                    Quantity:
                  </label>
                  <div className="flex items-center">
                    <button
                      onClick={decrementQuantity}
                      className="px-3 py-2 border border-r-0 rounded-l-md hover:bg-secondary transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <input
                      id="quantity"
                      type="number"
                      min="1"
                      max={product.stock}
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-16 text-center border py-2 focus:outline-none focus:ring-0"
                    />
                    <button
                      onClick={incrementQuantity}
                      className="px-3 py-2 border border-l-0 rounded-r-md hover:bg-secondary transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className={`flex-1 min-w-[180px] flex items-center justify-center gap-2 py-3 rounded-md font-medium transition-colors ${
                    product.stock > 0
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart size={20} />
                  <span>{product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
                
                <button
                  onClick={handleToggleFavorite}
                  className={`flex items-center justify-center w-12 h-12 rounded-md border transition-colors ${
                    isFavorite
                      ? 'bg-primary text-white border-primary hover:bg-primary/90'
                      : 'hover:bg-secondary'
                  }`}
                  aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                </button>
                
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center w-12 h-12 rounded-md border hover:bg-secondary transition-colors"
                  aria-label="Share product"
                >
                  <Share2 size={20} />
                </button>
              </div>
              
              {/* Delivery Info */}
              <div className="border-t pt-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <Truck className="text-primary flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-medium">Free Delivery</h4>
                    <p className="text-sm text-muted-foreground">
                      Free shipping on orders over $50. Delivery estimated within 3-5 business days.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Check className="text-primary flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-medium">Returns Policy</h4>
                    <p className="text-sm text-muted-foreground">
                      Easy 30-day returns. Return or exchange items within 30 days of delivery.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Tags */}
        <div className="mt-12">
          <h3 className="text-lg font-medium mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <Link
                key={tag}
                to={`/search?tag=${tag}`}
                className="bg-secondary px-3 py-1 rounded-full text-sm text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
        
        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((product) => (
                <div key={product.id} className="animate-fade-in">
                  <Link 
                    to={`/product/${product.id}`}
                    className="group"
                  >
                    <div className="card-premium overflow-hidden">
                      {/* Product Image */}
                      <div className="relative aspect-square overflow-hidden bg-secondary/30 rounded-md mb-4">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                        />
                      </div>
                      
                      {/* Product Info */}
                      <div className="space-y-1">
                        <h3 className="font-medium text-base line-clamp-1 group-hover:text-primary transition-colors">
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
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </>
  );
}
