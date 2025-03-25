
// Mock product data
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  rating: number;
  images: string[];
  stock: number;
  tags: string[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    description: "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions.",
    price: 299.99,
    discountPrice: 249.99,
    category: "electronics",
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?q=80&w=2574&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524678714210-9917a6c619c2?q=80&w=2669&auto=format&fit=crop"
    ],
    stock: 50,
    tags: ["headphones", "wireless", "premium", "audio"]
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    description: "Track your fitness goals with precision. This premium smart watch monitors heart rate, sleep patterns, and various workout activities. Connects seamlessly to your smartphone.",
    price: 199.99,
    discountPrice: 169.99,
    category: "electronics",
    rating: 4.6,
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2672&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=2674&auto=format&fit=crop"
    ],
    stock: 75,
    tags: ["watch", "fitness", "smart", "wearable"]
  },
  {
    id: 3,
    name: "Ultra-Slim Laptop",
    description: "Powerful performance meets elegant design in our ultra-slim laptop. Featuring a stunning 4K display, lightning-fast processor, and all-day battery life.",
    price: 1299.99,
    discountPrice: 1199.99,
    category: "electronics",
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2671&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2620&auto=format&fit=crop"
    ],
    stock: 30,
    tags: ["laptop", "computer", "premium", "ultrabook"]
  },
  {
    id: 4,
    name: "Designer Sunglasses",
    description: "Protect your eyes in style with our designer sunglasses. Featuring UV protection, premium materials, and a timeless design that complements any outfit.",
    price: 159.99,
    discountPrice: 129.99,
    category: "fashion",
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2580&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=2670&auto=format&fit=crop"
    ],
    stock: 100,
    tags: ["sunglasses", "accessories", "designer", "fashion"]
  },
  {
    id: 5,
    name: "Premium Leather Wallet",
    description: "Crafted from genuine leather, this premium wallet combines elegance with functionality. Features multiple card slots, bill compartments, and RFID blocking technology.",
    price: 79.99,
    discountPrice: 69.99,
    category: "fashion",
    rating: 4.5,
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=2574&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606422713656-178663f67ad9?q=80&w=2574&auto=format&fit=crop"
    ],
    stock: 120,
    tags: ["wallet", "leather", "accessories", "premium"]
  },
  {
    id: 6,
    name: "Smart Home Speaker",
    description: "Transform your home with our intelligent smart speaker. Voice-activated controls, premium sound quality, and seamless integration with your smart home ecosystem.",
    price: 129.99,
    discountPrice: 99.99,
    category: "electronics",
    rating: 4.4,
    images: [
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=2564&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558089687-f282ffcbc126?q=80&w=2561&auto=format&fit=crop"
    ],
    stock: 45,
    tags: ["speaker", "smart home", "audio", "voice control"]
  },
  {
    id: 7,
    name: "Ergonomic Office Chair",
    description: "Experience comfort during long work hours with our ergonomic office chair. Adjustable height, lumbar support, premium materials, and sleek design.",
    price: 249.99,
    discountPrice: 199.99,
    category: "furniture",
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?q=80&w=2562&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=2500&auto=format&fit=crop"
    ],
    stock: 25,
    tags: ["chair", "office", "ergonomic", "furniture"]
  },
  {
    id: 8,
    name: "Minimalist Analog Watch",
    description: "Timeless elegance meets precision engineering in our minimalist analog watch. Swiss movement, premium materials, and water-resistant design.",
    price: 199.99,
    discountPrice: 179.99,
    category: "fashion",
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=2689&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2671&auto=format&fit=crop"
    ],
    stock: 60,
    tags: ["watch", "analog", "minimalist", "fashion"]
  }
];

export const categories: Category[] = [
  {
    id: 1,
    name: "Electronics",
    slug: "electronics"
  },
  {
    id: 2,
    name: "Fashion",
    slug: "fashion"
  },
  {
    id: 3,
    name: "Furniture",
    slug: "furniture"
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category.toLowerCase());
};

// Utility functions
export function formatPrice(price: number): string {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });
}
