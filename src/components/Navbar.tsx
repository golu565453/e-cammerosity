
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, User } from 'lucide-react';
import { categories } from '../lib/data';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Check scroll position to apply styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mock cart count for demo purposes
  useEffect(() => {
    // This would normally come from a cart state or context
    setCartCount(2);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-lg shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="font-semibold text-xl md:text-2xl tracking-tight">
            ELEGANCE
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-primary hover:text-primary/80 transition-colors px-3 py-2">
              Home
            </Link>
            {categories.map((category) => (
              <Link 
                key={category.id}
                to={`/category/${category.slug}`} 
                className="text-primary hover:text-primary/80 transition-colors px-3 py-2"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Search, Cart, Account & Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 rounded-full text-primary hover:bg-secondary transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            <Link 
              to="/cart" 
              className="p-2 rounded-full text-primary hover:bg-secondary transition-colors relative"
              aria-label="Shopping Cart"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <Link 
              to="/login" 
              className="p-2 rounded-full text-primary hover:bg-secondary transition-colors"
              aria-label="Login"
            >
              <User size={20} />
            </Link>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 rounded-full text-primary hover:bg-secondary transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="px-4 py-4 space-y-1">
          <Link 
            to="/" 
            className="block px-4 py-2 rounded-md hover:bg-secondary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/category/${category.slug}`} 
              className="block px-4 py-2 rounded-md hover:bg-secondary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {category.name}
            </Link>
          ))}
          <Link 
            to="/login" 
            className="block px-4 py-2 rounded-md hover:bg-secondary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
