import { ArrowLeft, Package, Star, MessageSquare, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PurchaseItem {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
  seller: string;
  purchaseDate: string;
  status: "delivered" | "shipped" | "processing";
  orderNumber: string;
  rating?: number;
  reviewed: boolean;
}

interface PurchaseHistoryScreenProps {
  onBack: () => void;
  onRateItem: (itemId: string) => void;
  onReorder: (itemId: string) => void;
  onContactSeller: (sellerId: string) => void;
}

const samplePurchases: PurchaseItem[] = [
  {
    id: "1",
    title: "Vintage Leather Jacket",
    price: 85,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1540940699048-79bd2993bb0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwc2Vjb25kJTIwaGFuZCUyMGNsb3RoaW5nfGVufDF8fHx8MTc1NzEyODExN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    seller: "Sarah M.",
    purchaseDate: "2024-01-20",
    status: "delivered",
    orderNumber: "ECO-2024-001",
    rating: 5,
    reviewed: true
  },
  {
    id: "2",
    title: "Mid-Century Modern Chair",
    price: 250,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1706209792857-b93902bac0e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZnVybml0dXJlJTIwc2Vjb25kJTIwaGFuZHxlbnwxfHx8fDE3NTcxMjgxMjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    seller: "Mike R.",
    purchaseDate: "2024-01-15",
    status: "delivered",
    orderNumber: "ECO-2024-002",
    reviewed: false
  },
  {
    id: "3",
    title: "Classic Literature Set",
    price: 45,
    category: "Books",
    image: "https://images.unsplash.com/photo-1692742593570-ca989f1febd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYm9va3MlMjBjb2xsZWN0aW9ufGVufDF8fHx8MTc1NzA3NDgyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    seller: "Anna L.",
    purchaseDate: "2024-01-25",
    status: "shipped",
    orderNumber: "ECO-2024-003",
    reviewed: false
  },
  {
    id: "4",
    title: "Vintage Camera Collection",
    price: 120,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1743741031690-9b4358532806?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZWxlY3Ryb25pY3MlMjBnYWRnZXRzfGVufDF8fHx8MTc1NzEyODEyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    seller: "David K.",
    purchaseDate: "2024-01-28",
    status: "processing",
    orderNumber: "ECO-2024-004",
    reviewed: false
  }
];

export function PurchaseHistoryScreen({ onBack, onRateItem, onReorder, onContactSeller }: PurchaseHistoryScreenProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "shipped": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "processing": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered": return "✅";
      case "shipped": return "🚛";
      case "processing": return "⏳";
      default: return "📦";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border/50 sticky top-0 z-10 backdrop-blur-sm bg-card/95">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Purchase History</h1>
                <p className="text-sm text-muted-foreground">{samplePurchases.length} order{samplePurchases.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="mt-4">
            <Input
              type="text"
              placeholder="Search your purchases..."
              className="bg-input-background border-border/50 focus:border-accent"
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-700">
                {samplePurchases.filter(p => p.status === "delivered").length}
              </div>
              <div className="text-sm text-green-600">Delivered Orders</div>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-700">
                ${samplePurchases.reduce((sum, p) => sum + p.price, 0)}
              </div>
              <div className="text-sm text-blue-600">Total Spent</div>
            </CardContent>
          </Card>
          <Card className="bg-accent/10 border-accent/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">
                {samplePurchases.length}
              </div>
              <div className="text-sm text-accent">Items Saved from Waste</div>
            </CardContent>
          </Card>
        </div>

        {/* Purchase List */}
        <div className="space-y-4">
          {samplePurchases.map((purchase) => (
            <Card key={purchase.id} className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <ImageWithFallback
                      src={purchase.image}
                      alt={purchase.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-foreground line-clamp-1 mb-1">{purchase.title}</h3>
                        <div className="flex items-center space-x-3 text-sm text-muted-foreground mb-2">
                          <span>Order #{purchase.orderNumber}</span>
                          <span>•</span>
                          <span>by {purchase.seller}</span>
                          <span>•</span>
                          <span>{new Date(purchase.purchaseDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-accent mb-1">${purchase.price}</p>
                        <Badge className={getStatusColor(purchase.status)}>
                          {getStatusIcon(purchase.status)} {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Rating Display */}
                    {purchase.rating && (
                      <div className="flex items-center space-x-1 mb-3">
                        <span className="text-sm text-muted-foreground">Your rating:</span>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= purchase.rating! 
                                  ? "text-yellow-400 fill-current" 
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <Separator className="my-3" />
                    
                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onContactSeller(purchase.seller)}
                          className="flex items-center space-x-1"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Contact Seller</span>
                        </Button>
                        
                        {purchase.status === "delivered" && !purchase.reviewed && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onRateItem(purchase.id)}
                            className="flex items-center space-x-1"
                          >
                            <Star className="w-4 h-4" />
                            <span>Rate Item</span>
                          </Button>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onReorder(purchase.id)}
                          className="flex items-center space-x-1"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Find Similar</span>
                        </Button>
                        
                        {purchase.status === "shipped" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center space-x-1"
                          >
                            <Package className="w-4 h-4" />
                            <span>Track Package</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {samplePurchases.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No purchases yet</h3>
            <p className="text-muted-foreground mb-6">
              Start exploring our sustainable marketplace to find amazing second-hand treasures
            </p>
            <Button 
              onClick={onBack}
              className="bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-200 transform hover:scale-105"
            >
              Start Shopping
            </Button>
          </div>
        )}

        {/* Sustainability Impact */}
        <Card className="mt-8 bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="font-semibold text-green-800 mb-2 flex items-center justify-center">
                <span className="mr-2">🌱</span>
                Your Sustainability Impact
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div>
                  <div className="text-2xl font-bold text-green-700">{samplePurchases.length}</div>
                  <div className="text-sm text-green-600">Items Saved from Waste</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-700">~15kg</div>
                  <div className="text-sm text-green-600">CO₂ Emissions Prevented</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-700">~800L</div>
                  <div className="text-sm text-green-600">Water Saved</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}