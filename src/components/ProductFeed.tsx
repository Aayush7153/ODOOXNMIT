import { Search, Heart, ShoppingCart, Leaf } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ThemeToggle } from "./ThemeToggle";
import { EcoScore } from "./EcoScore";

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-card border-b border-border/50 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent to-primary dark:from-primary dark:to-accent rounded-2xl flex items-center justify-center shadow-lg glow-effect">
                <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold font-heading bg-gradient-to-r from-accent to-primary dark:from-primary dark:to-accent bg-clip-text text-transparent">
                  EcoFinds
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground">Sustainable Marketplace</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <ThemeToggle />
              <Button variant="ghost" size="icon" className="relative hover:scale-110 transition-transform hidden sm:flex">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative hover:scale-110 transition-transform">
                <ShoppingCart className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center p-0 gradient-button text-white text-xs">
                  2
                </Badge>
              </Button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-4 sm:mb-6">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 sm:w-5 sm:h-5" />
            <Input
              type="text"
              placeholder="Search for sustainable finds..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 sm:pl-12 h-12 sm:h-14 rounded-2xl glass-card border-border/50 focus:border-accent dark:focus:border-primary text-base sm:text-lg transition-all duration-300 focus:glow-effect"
            />
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="lg"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-6 py-2 transition-all duration-300 ${
                  selectedCategory === category 
                    ? "gradient-button text-white shadow-lg" 
                    : "glass-card border-border/50 hover:border-accent dark:hover:border-primary hover:glow-effect"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </header>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <Card 
              key={product.id} 
              className="group cursor-pointer glass-card border-border/50 hover-lift overflow-hidden"
              onClick={() => onProductSelect(product)}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.title}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Heart Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`absolute top-4 right-4 glass-card hover:scale-110 transition-all duration-300 ${
                      product.liked ? "text-red-500" : "text-white"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle like toggle
                    }}
                  >
                    <Heart className={`w-5 h-5 ${product.liked ? "fill-current" : ""}`} />
                  </Button>
                  
                  {/* EcoScore Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <EcoScore score={product.ecoScore} variant="overlay" />
                  </div>
                </div>
                
                <div className="p-6">
                  <Badge variant="secondary" className="mb-3 bg-muted/50 text-muted-foreground border border-border/50">
                    {product.category}
                  </Badge>
                  <h3 className="font-semibold font-heading text-lg text-foreground mb-2 line-clamp-2 group-hover:text-accent dark:group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-2xl font-bold bg-gradient-to-r from-accent to-primary dark:from-primary dark:to-accent bg-clip-text text-transparent">
                    ${product.price}
                  </p>
                </div>
              </CardContent>
              
              <CardFooter className="p-6 pt-0">
                <Button
                  size="lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCartAdd(product);
                  }}
                  className="w-full gradient-button text-white shadow-lg"
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-32 h-32 glass-card rounded-full flex items-center justify-center mx-auto mb-6 glow-effect">
              <Search className="w-16 h-16 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-semibold font-heading text-foreground mb-3">No products found</h3>
            <p className="text-muted-foreground text-lg">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>
    </div>
  );
}