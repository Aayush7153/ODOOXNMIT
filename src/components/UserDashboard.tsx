import { ArrowLeft, Edit, Camera, MapPin, Mail, Phone, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

interface UserDashboardProps {
  onBack: () => void;
  onSave: (userData: any) => void;
}

export function UserDashboard({ onBack, onSave }: UserDashboardProps) {
  const userData = {
    name: "Sarah Martinez",
    email: "sarah.martinez@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Passionate about sustainable living and finding new homes for pre-loved items. I believe in the power of circular economy and reducing waste.",
    joinDate: "January 2023",
    totalListings: 23,
    totalSales: 18,
    rating: 4.8,
    badges: ["Verified Seller", "Eco Champion", "Top Rated"]
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(userData);
  };

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
              <h1 className="text-xl font-semibold font-heading text-foreground">My Profile</h1>
              <p className="text-sm text-muted-foreground">Manage your account settings</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-accent text-accent-foreground text-2xl">
                      {userData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-card border-2 border-background"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                
                <h2 className="text-xl font-semibold font-heading text-foreground mb-1">{userData.name}</h2>
                <p className="text-muted-foreground mb-4 flex items-center justify-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Member since {userData.joinDate}
                </p>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">{userData.totalListings}</div>
                    <div className="text-xs text-muted-foreground">Listings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">{userData.totalSales}</div>
                    <div className="text-xs text-muted-foreground">Sales</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">{userData.rating}</div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </div>
                </div>
                
                {/* Badges */}
                <div className="space-y-2">
                  {userData.badges.map((badge, index) => (
                    <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Edit className="w-5 h-5" />
                  <span>Profile Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="font-medium font-heading text-foreground">Personal Information</h3>
                    <Separator />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          type="text"
                          defaultValue="Sarah"
                          className="bg-input-background border-border/50 focus:border-accent transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          type="text"
                          defaultValue="Martinez"
                          className="bg-input-background border-border/50 focus:border-accent transition-colors"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        defaultValue={userData.bio}
                        className="bg-input-background border-border/50 focus:border-accent transition-colors min-h-[100px]"
                        placeholder="Tell others about yourself and your passion for sustainable living..."
                      />
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="font-medium font-heading text-foreground">Contact Information</h3>
                    <Separator />
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue={userData.email}
                          className="bg-input-background border-border/50 focus:border-accent transition-colors"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          defaultValue={userData.phone}
                          className="bg-input-background border-border/50 focus:border-accent transition-colors"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="location" className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          Location
                        </Label>
                        <Input
                          id="location"
                          type="text"
                          defaultValue={userData.location}
                          className="bg-input-background border-border/50 focus:border-accent transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Preferences */}
                  <div className="space-y-4">
                    <h3 className="font-medium font-heading text-foreground">Preferences</h3>
                    <Separator />
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive updates about your listings and messages</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Public Profile</Label>
                          <p className="text-sm text-muted-foreground">Allow others to view your profile and ratings</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Marketing Communications</Label>
                          <p className="text-sm text-muted-foreground">Receive tips and updates about sustainable living</p>
                        </div>
                        <input type="checkbox" className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="pt-6">
                    <Button 
                      type="submit" 
                      className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-200 transform hover:scale-[1.02]"
                    >
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Account Actions */}
        <div className="mt-8">
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-destructive">Account Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Deactivate Account</Label>
                  <p className="text-sm text-muted-foreground">Temporarily disable your account</p>
                </div>
                <Button variant="destructive" size="sm">
                  Deactivate
                </Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Delete Account</Label>
                  <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                </div>
                <Button variant="destructive" size="sm">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}