import { useState } from "react";
import { ArrowLeft, Upload, X, Sparkles, Camera, Wand2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface AddProductScreenProps {
  onBack: () => void;
  onSubmit: (product: any) => void;
}

export function AddProductScreen({ onBack, onSubmit }: AddProductScreenProps) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    condition: "",
    images: [] as string[]
  });

  const categories = ["Clothing", "Furniture", "Electronics", "Books", "Home & Garden", "Sports", "Toys", "Other"];
  const conditions = ["Like New", "Good", "Fair", "Needs Repair"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, this would handle actual file upload
    const files = Array.from(e.target.files || []);
    const imageUrls = files.map((file, index) => `placeholder-image-${index}.jpg`);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls]
    }));
  };

  const handleAiAssist = () => {
    // Mock AI assistance
    setFormData(prev => ({
      ...prev,
      title: "Vintage Denim Jacket - Classic Blue",
      description: "Authentic vintage denim jacket in excellent condition. Features classic button closure, chest pockets, and timeless design. Perfect for layering and adding a retro touch to any outfit. Shows minimal wear with beautiful fading that adds character."
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-card border-b border-border/50 sticky top-0 z-10 shadow-lg">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={onBack} className="hover:scale-110 transition-transform">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-accent to-primary dark:from-primary dark:to-accent bg-clip-text text-transparent">
                Add New Listing
              </h1>
              <p className="text-muted-foreground">Share your sustainable finds with the community</p>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-3xl mx-auto px-6 py-8">
        <Card className="glass-card border-border/50 shadow-2xl hover-lift">
          <CardHeader className="pb-8">
            <CardTitle className="flex items-center space-x-3 text-2xl">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary dark:from-primary dark:to-accent rounded-xl flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <span>Product Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Product Images */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Product Images</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="w-full h-28 glass-card rounded-xl flex items-center justify-center hover-lift">
                        <span className="text-sm text-muted-foreground">Image {index + 1}</span>
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            images: prev.images.filter((_, i) => i !== index)
                          }));
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  
                  {formData.images.length < 5 && (
                    <label className="w-full h-28 border-2 border-dashed border-border hover:border-accent dark:hover:border-primary transition-all duration-300 rounded-xl flex flex-col items-center justify-center cursor-pointer group hover-lift">
                      <Upload className="w-8 h-8 text-muted-foreground group-hover:text-accent dark:group-hover:text-primary transition-colors" />
                      <span className="text-sm text-muted-foreground mt-2 group-hover:text-accent dark:group-hover:text-primary transition-colors">
                        Add Photo
                      </span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">Add up to 5 high-quality photos of your item</p>
              </div>

              {/* Product Title with AI Assist */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="title" className="text-lg font-semibold">Product Title *</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAiAssist}
                    className="glass-card border-border/50 hover:border-accent dark:hover:border-primary transition-all duration-300 glow-effect"
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                    AI Assist
                  </Button>
                </div>
                <Input
                  id="title"
                  type="text"
                  placeholder="e.g., Vintage Denim Jacket - Classic Blue"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="h-12 rounded-xl glass-card border-border/50 focus:border-accent dark:focus:border-primary transition-all duration-300 focus:glow-effect"
                  required
                />
              </div>

              {/* Category and Condition */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-lg font-semibold">Category *</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="h-12 rounded-xl glass-card border-border/50 focus:border-accent dark:focus:border-primary">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="glass-card border-border/50">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-lg font-semibold">Condition *</Label>
                  <Select 
                    value={formData.condition} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, condition: value }))}
                  >
                    <SelectTrigger className="h-12 rounded-xl glass-card border-border/50 focus:border-accent dark:focus:border-primary">
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent className="glass-card border-border/50">
                      {conditions.map((condition) => (
                        <SelectItem key={condition} value={condition}>
                          {condition}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description with AI Assist */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="description" className="text-lg font-semibold">Description *</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAiAssist}
                    className="glass-card border-border/50 hover:border-accent dark:hover:border-primary transition-all duration-300 glow-effect"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    AI Enhance
                  </Button>
                </div>
                <Textarea
                  id="description"
                  placeholder="Describe your item's features, history, condition, and any unique details..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="min-h-[120px] rounded-xl glass-card border-border/50 focus:border-accent dark:focus:border-primary transition-all duration-300 focus:glow-effect resize-none"
                  required
                />
              </div>

              {/* Price */}
              <div className="space-y-3">
                <Label htmlFor="price" className="text-lg font-semibold">Price (USD) *</Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground text-lg">$</span>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    className="pl-10 h-12 rounded-xl glass-card border-border/50 focus:border-accent dark:focus:border-primary transition-all duration-300 focus:glow-effect"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button 
                  type="submit" 
                  className="w-full h-14 rounded-xl gradient-button text-white text-lg font-semibold shadow-2xl"
                  size="lg"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Submit Listing
                </Button>
                <p className="text-center text-muted-foreground mt-4">
                  Your listing will be reviewed and published within 24 hours
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}