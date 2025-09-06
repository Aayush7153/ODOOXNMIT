import { ArrowLeft, Heart, Share, MapPin, Clock, Shield, ShoppingCart, MessageCircle, Leaf, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { EcoScore } from "./EcoScore";

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
  description?: string;
  condition?: string;
  location?: string;
  postedDate?: string;
  ecoScore?: number;
  seller?: {
    name: string;
    avatar: string;
    rating: number;
    totalSales: number;
  };
  specifications?: { [key: string]: string };
}

interface ProductDetailScreenProps {
  product: Product;
  onBack: () => void;
  onBuyNow: () => void;
  onAddToCart: () => void;
  onContactSeller: () => void;
}

export function ProductDetailScreen({ 
  product, 
  onBack, 
  onBuyNow, 
  onAddToCart, 
  onContactSeller 
}: ProductDetailScreenProps) {
  const sampleProduct: Product = {
    id: "1",
    title: "Vintage Leather Jacket - Genuine Brown Leather",
    price: 85,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1540940699048-79bd2993bb0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwc2Vjb25kJTIwaGFuZCUyMGNsb3RoaW5nfGVufDF8fHx8MTc1NzEyODExN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Beautiful vintage brown leather jacket in excellent condition. This classic piece features a timeless design with authentic leather construction. Perfect for adding a touch of vintage style to your wardrobe while supporting sustainable fashion. The jacket has been well-maintained and shows minimal signs of wear. All zippers and buttons are functional.",
    condition: "Good",
    location: "San Francisco, CA",
    postedDate: "2024-01-15",
    ecoScore: 85,
    seller: {
      name: "Sarah M.",
      avatar: "",
      rating: 4.8,
      totalSales: 47
    },
    specifications: {
      "Size": "Medium",
      "Material": "Genuine Leather",
      "Color": "Brown",
      "Brand": "Vintage",
      "Era": "1980s"
    }
  };

  const currentProduct = product ? {
    ...sampleProduct,
    ...product,
    seller: product.seller || sampleProduct.seller
  } : sampleProduct;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="glass-card border-b border-border/50 sticky top-0 z-10 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={onBack} className="hover:scale-110 transition-transform">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-foreground line-clamp-1">{currentProduct.title}</h1>
                <p className="text-muted-foreground">Product Details</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
                <Share className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform text-red-500">
                <Heart className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-3xl glass-card border-border/50 hover-lift">
              <ImageWithFallback
                src={currentProduct.image}
                alt={currentProduct.title}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              
              {/* EcoScore Badge */}
              <div className="absolute top-6 left-6">
                <EcoScore score={currentProduct.ecoScore || 85} />
              </div>
              
              {/* Heart Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-6 right-6 glass-card hover:scale-110 transition-all duration-300 text-red-500"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Additional thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square glass-card rounded-2xl flex items-center justify-center hover-lift cursor-pointer">
                  <span className="text-sm text-muted-foreground">+{i}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Title and Price */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-foreground leading-tight">{currentProduct.title}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-4xl font-bold bg-gradient-to-r from-accent to-primary dark:from-primary dark:to-accent bg-clip-text text-transparent">
                  ${currentProduct.price}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge variant="secondary" className="px-4 py-2 bg-muted/50 text-muted-foreground border border-border/50">
                  {currentProduct.category}
                </Badge>
                <Badge className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-300 dark:border-green-700">
                  {currentProduct.condition || "Good"}
                </Badge>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                <span className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  {currentProduct.location || "San Francisco, CA"}
                </span>
                <span className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Listed {new Date(currentProduct.postedDate || "2024-01-15").toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Seller Info */}
            <Card className="glass-card border-border/50 hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={currentProduct.seller.avatar} />
                    <AvatarFallback className="gradient-button text-white text-xl font-semibold">
                      {currentProduct.seller.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground">{currentProduct.seller.name}</h3>
                    <div className="flex items-center space-x-4 text-muted-foreground mt-2">
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                        {currentProduct.seller.rating}/5
                      </span>
                      <span>•</span>
                      <span>{currentProduct.seller.totalSales} sales</span>
                      <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={onContactSeller}
                    className="glass-card border-border/50 hover:border-accent dark:hover:border-primary px-6"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button 
                onClick={onBuyNow}
                className="w-full h-14 gradient-button text-white text-lg font-semibold shadow-2xl"
                size="lg"
              >
                Buy Now - ${currentProduct.price}
              </Button>
              <Button 
                variant="outline" 
                onClick={onAddToCart}
                className="w-full h-14 glass-card border-border/50 hover:border-accent dark:hover:border-primary text-lg font-medium"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
            </div>

            {/* Specifications */}
            {currentProduct.specifications && (
              <Card className="glass-card border-border/50 hover-lift">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg text-foreground mb-4 flex items-center">
                    <span className="mr-2">📋</span>
                    Specifications
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(currentProduct.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-border/30 last:border-b-0">
                        <span className="text-muted-foreground font-medium">{key}:</span>
                        <span className="text-foreground font-semibold">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Sustainability Info */}
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 hover-lift">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-green-800 dark:text-green-400 mb-4 flex items-center">
                  <Leaf className="w-6 h-6 mr-3 text-green-600 dark:text-green-400" />
                  Sustainability Impact
                </h3>
                <div className="space-y-3 text-green-700 dark:text-green-300">
                  <p className="flex items-start">
                    <span className="mr-3 text-green-500">✓</span>
                    Extends product lifecycle by giving it a second life
                  </p>
                  <p className="flex items-start">
                    <span className="mr-3 text-green-500">✓</span>
                    Reduces textile waste and environmental impact
                  </p>
                  <p className="flex items-start">
                    <span className="mr-3 text-green-500">✓</span>
                    Supports circular economy principles
                  </p>
                  <div className="mt-4 p-4 bg-green-100 dark:bg-green-800/20 rounded-xl">
                    <p className="text-sm font-medium text-green-800 dark:text-green-400">
                      🌍 Environmental Savings: ~4.2kg CO₂ • 170L Water • 0.8m² Land
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Description */}
        <div className="mt-12">
          <Card className="glass-card border-border/50 hover-lift">
            <CardContent className="p-8">
              <h3 className="font-semibold text-xl text-foreground mb-6 flex items-center">
                <span className="mr-3">📝</span>
                Description
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {currentProduct.description || sampleProduct.description}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Similar Items Section */}
        <div className="mt-12">
          <h3 className="font-semibold text-xl text-foreground mb-8 flex items-center">
            <span className="mr-3">💡</span>
            Similar Items You Might Like
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="group cursor-pointer glass-card border-border/50 hover-lift overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-square bg-gradient-to-br from-muted/50 to-muted rounded-t-xl flex items-center justify-center relative">
                    <span className="text-muted-foreground font-medium">Similar {i}</span>
                    <div className="absolute top-3 right-3">
                      <EcoScore score={80 + i * 2} showTooltip={false} />
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-foreground line-clamp-1 group-hover:text-accent dark:group-hover:text-primary transition-colors">
                      Similar Item {i}
                    </p>
                    <p className="text-lg font-bold bg-gradient-to-r from-accent to-primary dark:from-primary dark:to-accent bg-clip-text text-transparent">
                      ${65 + i * 5}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}