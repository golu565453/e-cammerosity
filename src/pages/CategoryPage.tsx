
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import { products, categories } from '../lib/data';

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  
  // Find the category by slug
  const category = categories.find(cat => cat.slug === slug);
  
  // Capitalize first letter for title display
  const categoryName = category ? category.name : slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : '';
  
  return (
    <>
      <Helmet>
        <title>{categoryName} | ELEGANCE</title>
        <meta name="description" content={`Shop our collection of premium ${categoryName.toLowerCase()} products`} />
      </Helmet>
      
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight">{categoryName}</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore our collection of {categoryName.toLowerCase()} products
            </p>
          </div>
        </div>
        
        <ProductGrid 
          products={products} 
          category={slug}
        />
      </main>
      
      <Footer />
    </>
  );
}
