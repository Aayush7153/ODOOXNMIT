"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabase-client"; // ✅ don't touch imports
import { Search, Heart, ShoppingCart, Leaf } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ThemeToggle } from "./ThemeToggle";
import { EcoScore } from "./EcoScore";
import { InteractiveHeart } from "./InteractiveHeart";

interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  condition: string;
  price: number;
  image_url: string;
  created_by: string;
}

interface ProductFeedProps {
  onProductSelect: (product: Product) => void;
  onCartAdd: (product: Product) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const categories = [
  "All",
  "Clothing",
  "Furniture",
  "Electronics",
  "Books",
  "Home & Garden",
];

export function ProductFeed({
  onProductSelect,
  onCartAdd,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}: ProductFeedProps) {
  const [products, setProducts] = useState<Product[]>([]);

  // 🔥 Fetch + subscribe to realtime changes
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("listing").select("*");
      if (error) {
        console.error("Error fetching listings:", error.message);
      } else {
        setProducts(data as Product[]);
      }
    };

    fetchProducts();

    const channel = supabase
      .channel("listing-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "listing" },
        (payload) => {
          console.log("Realtime change:", payload);

          if (payload.eventType === "INSERT") {
            setProducts((prev) => [...prev, payload.new as Product]);
          } else if (payload.eventType === "UPDATE") {
            setProducts((prev) =>
              prev.map((p) =>
                p.id === payload.new.id ? (payload.new as Product) : p
              )
            );
          } else if (payload.eventType === "DELETE") {
            setProducts((prev) =>
              prev.filter((p) => p.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // ✅ Filtering with search + category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="screen-wrapper min-h-screen bg-background">
      {/* ✅ Header with logo + search + actions */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-green-500" />
            <span className="font-bold text-lg">EcoFinds</span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <ThemeToggle />
          </div>
        </div>

        {/* ✅ Category filter row */}
        <div className="flex gap-2 px-4 py-2 overflow-x-auto border-t">
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              className="cursor-pointer whitespace-nowrap"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </header>

      {/* ✅ Main product feed */}
      <main className="scrollable-main flex-1 overflow-auto">
        <div className="product-container px-4">
          <div className="main-product-section">
            <div className="section-header">
              <h2 className="section-title">
                {selectedCategory === "All" ? "All Products" : selectedCategory}
              </h2>
              <p className="section-subtitle">
                {filteredProducts.length} items found
              </p>
            </div>

            <div className="optimized-product-grid">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="optimized-product-card group cursor-pointer"
                  onClick={() => onProductSelect(product)}
                >
                  <CardContent className="p-0 relative">
                    <div className="relative overflow-hidden product-image-container">
                      <ImageWithFallback
                        src={product.image_url}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      <div className="absolute top-3 left-3 z-10">
                        <EcoScore score={80} showTooltip={false} />
                      </div>

                      <div className="absolute top-3 right-3 z-10">
                        <InteractiveHeart
                          initialState={false}
                          onToggle={(isFavorited) => {
                            console.log(
                              "Favorited:",
                              isFavorited,
                              product.id
                            );
                          }}
                          size="sm"
                          className="enhanced-heart-button"
                        />
                      </div>
                    </div>

                    <div className="optimized-product-content">
                      <div className="product-text-container">
                        <h3 className="optimized-product-title">
                          {product.title}
                        </h3>
                        <p className="optimized-product-price">
                          ${product.price}
                        </p>
                      </div>

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

          {filteredProducts.length === 0 && (
            <div className="no-results-container">
              <div className="no-results-content">
                <Search className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="no-results-title">No products found</h3>
                <p className="no-results-subtitle">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
