
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  cta: string;
  image: string;
  link: string;
}

const slides: HeroSlide[] = [
  {
    id: 1,
    title: "Premium Quality",
    subtitle: "Discover our new collection of premium products designed for modern living",
    cta: "Shop Now",
    image: "https://images.unsplash.com/photo-1511370235399-1802cae1d32f?q=80&w=2555&auto=format&fit=crop",
    link: "/category/electronics"
  },
  {
    id: 2,
    title: "Summer Essentials",
    subtitle: "Elevate your style with our curated collection of summer essentials",
    cta: "Explore Collection",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2670&auto=format&fit=crop",
    link: "/category/fashion"
  },
  {
    id: 3,
    title: "Home Comfort",
    subtitle: "Transform your space with our premium furniture and home decor",
    cta: "Discover More",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2558&auto=format&fit=crop",
    link: "/category/furniture"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    // Set initial load state
    setIsLoaded(true);
    
    // Auto-rotate slides
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setIsChanging(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsChanging(false);
    }, 500);
  };

  const prevSlide = () => {
    setIsChanging(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setIsChanging(false);
    }, 500);
  };

  const goToSlide = (index: number) => {
    if (index === currentSlide) return;
    
    setIsChanging(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsChanging(false);
    }, 500);
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      {slides.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide 
              ? 'opacity-100' 
              : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src={s.image}
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}
      
      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-10">
          <div 
            className={`max-w-lg transition-all duration-500 ${
              isChanging ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
            } ${isLoaded ? 'animate-fade-in' : ''}`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {slide.title}
            </h1>
            <p className="text-xl text-white/90 mb-8">
              {slide.subtitle}
            </p>
            <Link 
              to={slide.link} 
              className="inline-flex items-center bg-white text-primary px-6 py-3 rounded-md hover:bg-white/90 transition-colors group"
            >
              {slide.cta}
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
}
