import { useState, useEffect } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { ProductFeed } from "./components/ProductFeed";
import { AddProductScreen } from "./components/AddProductScreen";
import { MyListingsScreen } from "./components/MyListingsScreen";
import { ProductDetailScreen } from "./components/ProductDetailScreen";
import { UserDashboard } from "./components/UserDashboard";
import { CartScreen } from "./components/CartScreen";
import { PurchaseHistoryScreen } from "./components/PurchaseHistoryScreen";
import { EcoLoginBackground } from "./components/EcoLoginBackground";
import { Button } from "./components/ui/button";
import { User, ShoppingCart, Package, PlusCircle, Heart, Settings, Home } from "lucide-react";

type Screen = 
  | "login" 
  | "feed" 
  | "add-product" 
  | "my-listings" 
  | "product-detail" 
  | "dashboard" 
  | "cart" 
  | "purchases";

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
  liked?: boolean;
  ecoScore?: number;
  description?: string;
  condition?: string;
  location?: string;
  postedDate?: string;
  seller?: {
    name: string;
    avatar: string;
    rating: number;
    totalSales: number;
  };
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login");
  const [isSignup, setIsSignup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Initialize theme on app start
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen("feed");
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen("product-detail");
  };

  const handleCartAdd = (product: Product) => {
    // In a real app, this would add to cart state
    console.log("Added to cart:", product);
  };

  const handleBuyNow = () => {
    setCurrentScreen("cart");
  };

  const handleAddToCart = () => {
    // Add to cart logic
    console.log("Added to cart");
  };

  const handleContactSeller = () => {
    // Contact seller logic
    console.log("Contact seller");
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    // Update cart quantity logic
    console.log("Update quantity:", itemId, quantity);
  };

  const handleRemoveItem = (itemId: string) => {
    // Remove from cart logic
    console.log("Remove item:", itemId);
  };

  const handleCheckout = () => {
    // Checkout logic
    console.log("Proceed to checkout");
  };

  const handleProductSubmit = (productData: any) => {
    // Handle new product submission
    console.log("New product:", productData);
    setCurrentScreen("my-listings");
  };

  const handleEditListing = (product: any) => {
    // Edit listing logic
    console.log("Edit listing:", product);
  };

  const handleDeleteListing = (productId: string) => {
    // Delete listing logic
    console.log("Delete listing:", productId);
  };

  const handleSaveProfile = (userData: any) => {
    // Save profile logic
    console.log("Save profile:", userData);
  };

  const handleRateItem = (itemId: string) => {
    // Rate item logic
    console.log("Rate item:", itemId);
  };

  const handleReorder = (itemId: string) => {
    // Reorder logic
    console.log("Reorder item:", itemId);
    setCurrentScreen("feed");
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "login":
        return (
          <LoginScreen 
            onLogin={handleLogin}
            isSignup={isSignup}
            setIsSignup={setIsSignup}
          />
        );
      case "feed":
        return (
          <ProductFeed
            onProductSelect={handleProductSelect}
            onCartAdd={handleCartAdd}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        );
      case "add-product":
        return (
          <AddProductScreen
            onBack={() => setCurrentScreen("feed")}
            onSubmit={handleProductSubmit}
          />
        );
      case "my-listings":
        return (
          <MyListingsScreen
            onBack={() => setCurrentScreen("feed")}
            onEdit={handleEditListing}
            onDelete={handleDeleteListing}
            onAddNew={() => setCurrentScreen("add-product")}
          />
        );
      case "product-detail":
        return (
          <ProductDetailScreen
            product={selectedProduct!}
            onBack={() => setCurrentScreen("feed")}
            onBuyNow={handleBuyNow}
            onAddToCart={handleAddToCart}
            onContactSeller={handleContactSeller}
          />
        );
      case "dashboard":
        return (
          <UserDashboard
            onBack={() => setCurrentScreen("feed")}
            onSave={handleSaveProfile}
          />
        );
      case "cart":
        return (
          <CartScreen
            onBack={() => setCurrentScreen("feed")}
            onCheckout={handleCheckout}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
        );
      case "purchases":
        return (
          <PurchaseHistoryScreen
            onBack={() => setCurrentScreen("feed")}
            onRateItem={handleRateItem}
            onReorder={handleReorder}
            onContactSeller={handleContactSeller}
          />
        );
      default:
        return null;
    }
  };

  // Show navigation only when logged in and not on login screen
  const showNavigation = isLoggedIn && currentScreen !== "login";

  return (
    <div className="min-h-screen bg-background relative">
      {/* Eco Login Animated Background */}
      <EcoLoginBackground />
      
      {renderScreen()}
      
      {/* Bottom Navigation */}
      {showNavigation && (
        <nav className="fixed bottom-0 left-0 right-0 glass-card border-t border-border/50 z-50 shadow-2xl">
          <div className="max-w-md mx-auto px-6 py-4">
            <div className="flex items-center justify-around">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentScreen("feed")}
                className={`flex flex-col items-center space-y-2 h-auto py-3 px-4 rounded-2xl transition-all duration-300 ${
                  currentScreen === "feed" 
                    ? "gradient-button text-white shadow-lg" 
                    : "text-muted-foreground hover:text-foreground hover:scale-110"
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="text-xs font-medium">Home</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentScreen("cart")}
                className={`flex flex-col items-center space-y-2 h-auto py-3 px-4 rounded-2xl transition-all duration-300 relative ${
                  currentScreen === "cart" 
                    ? "gradient-button text-white shadow-lg" 
                    : "text-muted-foreground hover:text-foreground hover:scale-110"
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="text-xs font-medium">Cart</span>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-xs text-white font-bold">2</span>
                </div>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentScreen("add-product")}
                className={`flex flex-col items-center space-y-2 h-auto py-3 px-4 rounded-2xl transition-all duration-300 ${
                  currentScreen === "add-product" 
                    ? "gradient-button text-white shadow-lg" 
                    : "text-muted-foreground hover:text-foreground hover:scale-110"
                }`}
              >
                <PlusCircle className="w-5 h-5" />
                <span className="text-xs font-medium">Sell</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentScreen("my-listings")}
                className={`flex flex-col items-center space-y-2 h-auto py-3 px-4 rounded-2xl transition-all duration-300 ${
                  currentScreen === "my-listings" 
                    ? "gradient-button text-white shadow-lg" 
                    : "text-muted-foreground hover:text-foreground hover:scale-110"
                }`}
              >
                <Heart className="w-5 h-5" />
                <span className="text-xs font-medium">Saved</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentScreen("dashboard")}
                className={`flex flex-col items-center space-y-2 h-auto py-3 px-4 rounded-2xl transition-all duration-300 ${
                  currentScreen === "dashboard" 
                    ? "gradient-button text-white shadow-lg" 
                    : "text-muted-foreground hover:text-foreground hover:scale-110"
                }`}
              >
                <User className="w-5 h-5" />
                <span className="text-xs font-medium">Profile</span>
              </Button>
            </div>
          </div>
        </nav>
      )}
      
      {/* Quick Action Buttons */}
      {showNavigation && currentScreen === "feed" && (
        <div className="fixed bottom-24 right-6 z-40 flex flex-col space-y-3">
          <Button
            size="icon"
            onClick={() => setCurrentScreen("purchases")}
            className="w-14 h-14 rounded-full glass-card border-border/50 hover:border-accent dark:hover:border-primary shadow-lg hover-lift glow-effect"
          >
            <Package className="w-6 h-6" />
          </Button>
        </div>
      )}
    </div>
  );
}