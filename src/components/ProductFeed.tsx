import { Search, Heart, ShoppingCart, Leaf } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ThemeToggle } from "./ThemeToggle";
import { EcoScore } from "./EcoScore";
import { InteractiveHeart } from "./InteractiveHeart";
import { PlaceholderCard } from "./PlaceholderCard";

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
  liked: boolean;
  ecoScore: number;
}

interface ProductFeedProps {
  onProductSelect: (product: Product) => void;
  onCartAdd: (product: Product) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const categories = ["All", "Clothing", "Furniture", "Electronics", "Books", "Home & Garden"];

const sampleProducts: Product[] = [
  {
    id: "1",
    title: "Vintage Leather Jacket",
    price: 85,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1540940699048-79bd2993bb0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwc2Vjb25kJTIwaGFuZCUyMGNsb3RoaW5nfGVufDF8fHx8MTc1NzEyODExN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    liked: false,
    ecoScore: 85
  },
  {
    id: "2",
    title: "Mid-Century Modern Chair",
    price: 250,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1706209792857-b93902bac0e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZnVybml0dXJlJTIwc2Vjb25kJTIwaGFuZHxlbnwxfHx8fDE3NTcxMjgxMjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    liked: true,
    ecoScore: 92
  },
  {
    id: "3",
    title: "Vintage Camera Collection",
    price: 120,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1743741031690-9b4358532806?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZWxlY3Ryb25pY3MlMjBnYWRnZXRzfGVufDF8fHx8MTc1NzEyODEyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    liked: false,
    ecoScore: 78
  },
  {
    id: "4",
    title: "Classic Literature Set",
    price: 45,
    category: "Books",
    image: "https://images.unsplash.com/photo-1692742593570-ca989f1febd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYm9va3MlMjBjb2xsZWN0aW9ufGVufDF8fHx8MTc1NzA3NDgyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    liked: false,
    ecoScore: 88
  }
];

export function ProductFeed({ 
  onProductSelect, 
  onCartAdd, 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory 
}: ProductFeedProps) {
  const filteredProducts = sampleProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="screen-wrapper min-h-screen bg-background">
      {/* Enhanced TopNavGroup Header */}
      <header className="top-nav-group sticky top-0 z-10">
        <div className="max-w-full mx-auto px-4">
          <div className="top-nav-content flex-col gap-4">
            {/* Top Row - Logo, Search, Actions */}
            <div className="flex items-center justify-between w-full gap-4">
              {/* Logo Section */}
              <div className="top-nav-logo flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent to-primary dark:from-primary dark:to-accent rounded-2xl flex items-center justify-center shadow-lg glow-effect">
                  <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl sm:text-2xl font-bold font-heading bg-gradient-to-r from-accent to-primary dark:from-primary dark:to-accent bg-clip-text text-transparent">
                    EcoFinds
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground">Sustainable Marketplace</p>
                </div>
              </div>

              {/* Enhanced Search Bar */}
              <div className="flex-1 max-w-lg relative">
                <Search className="enhanced-search-icon absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5" />
                <Input
                  type="text"
                  placeholder="Search sustainable finds..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="enhanced-search-input pl-10 sm:pl-12 h-12 rounded-2xl text-base transition-all duration-200 ease-in-out w-full"
                />
              </div>

              {/* Action Buttons */}
              <div className="top-nav-actions flex-shrink-0">
                <ThemeToggle />
                <Button variant="ghost" size="icon" className="relative hover:scale-110 transition-transform hidden sm:flex">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="relative hover:scale-110 transition-transform">
                  <ShoppingCart className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 gradient-button text-white text-xs">
                    2
                  </Badge>
                </Button>
              </div>
            </div>
            
            {/* Bottom Row - Horizontal Scrolling Category Filters */}
            <div className="w-full overflow-hidden">
              <div className="horizontal-category-scroll">
                <div className="category-scroll-wrapper">
                  {categories.map((category, index) => (
                    <div key={category} className="category-item">
                      <Button
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className={`category-button ${
                          selectedCategory === category 
                            ? "category-active" 
                            : "category-inactive"
                        }`}
                      >
                        {category}
                      </Button>
                    </div>
                  ))}
                </div>
                
                {/* Scroll Indicators */}
                <div className="scroll-indicators">
                  <div className="scroll-indicator-left"></div>
                  <div className="scroll-indicator-right"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Optimized Product Grid */}
      <main className="scrollable-main flex-1 overflow-auto">
        <div className="product-container px-4">
          
          {/* Main Product Grid Section */}
          <div className="main-product-section">
            <div className="section-header">
              <h2 className="section-title">
                {selectedCategory === "All" ? "All Products" : selectedCategory}
              </h2>
              <p className="section-subtitle">{filteredProducts.length} items found</p>
            </div>
            
            <div className="optimized-product-grid">
              {filteredProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className="optimized-product-card group cursor-pointer"
                  onClick={() => onProductSelect(product)}
                >
                  <CardContent className="p-0 relative">
                    {/* Product Image */}
                    <div className="relative overflow-hidden product-image-container">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Enhanced EcoScore Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <EcoScore score={product.ecoScore} showTooltip={false} />
                      </div>
                      
                      {/* Enhanced Interactive Heart */}
                      <div className="absolute top-3 right-3 z-10">
                        <InteractiveHeart
                          initialState={product.liked}
                          onToggle={(isFavorited) => {
                            console.log('Product favorited:', isFavorited, product.id);
                          }}
                          size="sm"
                          className="enhanced-heart-button"
                        />
                      </div>
                    </div>
                    
                    {/* Product Content */}
                    <div className="optimized-product-content">
                      <div className="product-text-container">
                        <h3 className="optimized-product-title">
                          {product.title}
                        </h3>
                        <p className="optimized-product-price">
                          ${product.price}
                        </p>
                      </div>
                      
                      {/* Add to Cart Button */}
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onCartAdd(product);
                        }}
                        className="optimized-add-to-cart-button w-full"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* No Results State */}
          {filteredProducts.length === 0 && (
            <div className="no-results-container">
              <div className="no-results-content">
                <Search className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="no-results-title">No products found</h3>
                <p className="no-results-subtitle">Try adjusting your search or filter criteria</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Vertical Scroll Indicator */}
        <div className="vertical-scroll-indicator">
          <div className="scroll-track">
            <div className="scroll-thumb"></div>
          </div>
        </div>
      </main>
    </div>
  );
}