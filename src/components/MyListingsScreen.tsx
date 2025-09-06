import { ArrowLeft, Edit, Trash2, Eye, MoreVertical, TrendingUp, Heart, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { EcoScore } from "./EcoScore";

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
  status: "active" | "sold" | "pending";
  views: number;
  likes: number;
  createdAt: string;
  ecoScore: number;
}

interface MyListingsScreenProps {
  onBack: () => void;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
  onAddNew: () => void;
}

const sampleListings: Product[] = [
  {
    id: "1",
    title: "Vintage Leather Jacket",
    price: 85,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1540940699048-79bd2993bb0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwc2Vjb25kJTIwaGFuZCUyMGNsb3RoaW5nfGVufDF8fHx8MTc1NzEyODExN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "active",
    views: 47,
    likes: 12,
    createdAt: "2024-01-15",
    ecoScore: 85
  },
  {
    id: "2",
    title: "Mid-Century Modern Chair",
    price: 250,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1706209792857-b93902bac0e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZnVybml0dXJlJTIwc2Vjb25kJTIwaGFuZHxlbnwxfHx8fDE3NTcxMjgxMjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "sold",
    views: 89,
    likes: 23,
    createdAt: "2024-01-10",
    ecoScore: 92
  },
  {
    id: "3",
    title: "Vintage Camera Collection",
    price: 120,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1743741031690-9b4358532806?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZWxlY3Ryb25pY3MlMjBnYWRnZXRzfGVufDF8fHx8MTc1NzEyODEyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "pending",
    views: 32,
    likes: 8,
    createdAt: "2024-01-20",
    ecoScore: 78
  }
];

export function MyListingsScreen({ onBack, onEdit, onDelete, onAddNew }: MyListingsScreenProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-300 dark:border-green-700";
      case "sold": return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-300 dark:border-gray-700";
      case "pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return "🟢";
      case "sold": return "✅";
      case "pending": return "⏳";
      default: return "📦";
    }
  };

  const activeListings = sampleListings.filter(item => item.status === "active");
  const soldListings = sampleListings.filter(item => item.status === "sold");
  const pendingListings = sampleListings.filter(item => item.status === "pending");

  const renderProductCard = (product: Product) => (
    <Card key={product.id} className="group glass-card border-border/50 hover-lift overflow-hidden">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <ImageWithFallback
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <Badge className={`${getStatusColor(product.status)} font-medium`}>
              {getStatusIcon(product.status)} {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
            </Badge>
          </div>
          
          {/* EcoScore */}
          <div className="absolute top-4 right-4">
            <EcoScore score={product.ecoScore} />
          </div>
          
          {/* Actions Menu */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="glass-card hover:scale-110 transition-transform">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-card border-border/50">
                <DropdownMenuItem onClick={() => onEdit(product)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Listing
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete(product.id)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Listing
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-semibold text-lg text-foreground line-clamp-1 group-hover:text-accent dark:group-hover:text-primary transition-colors">
              {product.title}
            </h3>
            <span className="text-xl font-bold bg-gradient-to-r from-accent to-primary dark:from-primary dark:to-accent bg-clip-text text-transparent ml-2">
              ${product.price}
            </span>
          </div>
          <Badge variant="secondary" className="mb-4 bg-muted/50 text-muted-foreground border border-border/50">
            {product.category}
          </Badge>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {product.views}
              </span>
              <span className="flex items-center">
                <Heart className="w-4 h-4 mr-1" />
                {product.likes}
              </span>
            </div>
            <span>{new Date(product.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="glass-card border-b border-border/50 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={onBack} className="hover:scale-110 transition-transform">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-accent to-primary dark:from-primary dark:to-accent bg-clip-text text-transparent">
                  My Listings
                </h1>
                <p className="text-muted-foreground">Manage your sustainable marketplace items</p>
              </div>
            </div>
            <Button 
              onClick={onAddNew}
              className="gradient-button text-white shadow-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Listing
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <Card className="glass-card border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 hover-lift">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-700 dark:text-green-400 mb-2">{activeListings.length}</div>
              <div className="text-green-600 dark:text-green-500 font-medium">Active Listings</div>
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-500 mx-auto mt-2" />
            </CardContent>
          </Card>
          <Card className="glass-card border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 hover-lift">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-2">{soldListings.length}</div>
              <div className="text-blue-600 dark:text-blue-500 font-medium">Sold Items</div>
              <div className="text-2xl mt-2">💰</div>
            </CardContent>
          </Card>
          <Card className="glass-card border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20 hover-lift">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-yellow-700 dark:text-yellow-400 mb-2">{pendingListings.length}</div>
              <div className="text-yellow-600 dark:text-yellow-500 font-medium">Pending Review</div>
              <div className="text-2xl mt-2">⏳</div>
            </CardContent>
          </Card>
        </div>

        {/* Active Listings */}
        {activeListings.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
              <span className="mr-2">🟢</span>
              Active Listings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {activeListings.map(renderProductCard)}
            </div>
          </section>
        )}

        {/* Pending Listings */}
        {pendingListings.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
              <span className="mr-2">⏳</span>
              Pending Review
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {pendingListings.map(renderProductCard)}
            </div>
          </section>
        )}

        {/* Sold Listings */}
        {soldListings.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
              <span className="mr-2">✅</span>
              Sold Items
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {soldListings.map(renderProductCard)}
            </div>
          </section>
        )}

        {/* Empty State */}
        {sampleListings.length === 0 && (
          <div className="text-center py-16">
            <div className="w-32 h-32 glass-card rounded-full flex items-center justify-center mx-auto mb-6 glow-effect">
              <span className="text-6xl">📦</span>
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">No listings yet</h3>
            <p className="text-muted-foreground text-lg mb-8">Start sharing your sustainable finds with the community</p>
            <Button 
              onClick={onAddNew}
              className="gradient-button text-white shadow-lg px-8 py-3"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Listing
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}