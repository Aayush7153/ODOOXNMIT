import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CartItem {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
  quantity: number;
  seller: string;
}

interface CartScreenProps {
  onBack: () => void;
  onCheckout: () => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

const sampleCartItems: CartItem[] = [
  {
    id: "1",
    title: "Vintage Leather Jacket",
    price: 85,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1540940699048-79bd2993bb0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwc2Vjb25kJTIwaGFuZCUyMGNsb3RoaW5nfGVufDF8fHx8MTc1NzEyODExN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    quantity: 1,
    seller: "Sarah M."
  },
  {
    id: "2",
    title: "Classic Literature Set",
    price: 45,
    category: "Books",
    image: "https://images.unsplash.com/photo-1692742593570-ca989f1febd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYm9va3MlMjBjb2xsZWN0aW9ufGVufDF8fHx8MTc1NzA3NDgyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    quantity: 1,
    seller: "John D."
  }
];

export function CartScreen({ onBack, onCheckout, onUpdateQuantity, onRemoveItem }: CartScreenProps) {
  const subtotal = sampleCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border/50 sticky top-0 z-10 backdrop-blur-sm bg-card/95">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Shopping Cart</h1>
              <p className="text-sm text-muted-foreground">{sampleCartItems.length} item{sampleCartItems.length !== 1 ? 's' : ''} in your cart</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {sampleCartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {sampleCartItems.map((item) => (
                <Card key={item.id} className="border-border/50 bg-card/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-foreground line-clamp-1 mb-1">{item.title}</h3>
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="secondary" className="bg-secondary/80 text-xs">
                                {item.category}
                              </Badge>
                              <span className="text-sm text-muted-foreground">by {item.seller}</span>
                            </div>
                            <p className="font-semibold text-accent">${item.price}</p>
                          </div>
                          
                          {/* Remove Button */}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onRemoveItem(item.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3 mt-3">
                          <span className="text-sm text-muted-foreground">Quantity:</span>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-8 h-8"
                              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-8 h-8"
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border-border/50 bg-card/80 backdrop-blur-sm sticky top-24">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `$${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between text-base">
                      <span className="font-semibold">Total</span>
                      <span className="font-semibold text-accent">${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {shipping > 0 && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-700">
                        💡 Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                      </p>
                    </div>
                  )}
                  
                  <Button
                    onClick={onCheckout}
                    className="w-full mt-6 bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-200 transform hover:scale-[1.02] py-3"
                    size="lg"
                  >
                    Proceed to Checkout
                  </Button>
                  
                  {/* Sustainability Note */}
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <span className="text-green-600">🌱</span>
                      <div>
                        <p className="text-sm font-medium text-green-800">Eco-Friendly Purchase</p>
                        <p className="text-xs text-green-700 mt-1">
                          Your purchase helps reduce waste and supports sustainable commerce.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          // Empty Cart State
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">
              Discover amazing sustainable finds in our marketplace
            </p>
            <Button 
              onClick={onBack}
              className="bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-200 transform hover:scale-105"
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}