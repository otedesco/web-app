"use client";

import { useState, useEffect } from "react";
import {
  Heart,
  Search,
  User,
  Sun,
  Moon,
  Laptop,
  Menu,
  MapPin,
  DollarSign,
  Maximize2,
  Star,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { BrandLogo, BrandLogoWithText } from "../brand-icon";

export default function BaseTemplate() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // if (!mounted) {
  //   return null;
  // }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <BrandLogoWithText className="hidden lg:block" />
              <BrandLogo className="lg:hidden" />
            </div>
            <div className="mx-4 max-w-2xl flex-1">
              <SearchButton
                isSearchOpen={isSearchOpen}
                setIsSearchOpen={setIsSearchOpen}
              />
            </div>
            <div className="hidden items-center space-x-4 md:flex">
              <Button variant="ghost" className="text-sm font-medium">
                Become an Agent
              </Button>
              <ThemeToggle />
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
          <section className="py-12 text-center">
            <h1 className="mb-4 text-4xl font-bold">
              Find Your Dream Property
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              Discover the perfect space in your ideal location
            </p>
            <Button size="lg" className="px-8 text-lg">
              Start Your Search
            </Button>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-semibold">Featured Properties</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-semibold">Popular Locations</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {popularLocations.map((location) => (
                <Card key={location.id} className="overflow-hidden">
                  <img
                    src={location.image}
                    alt={location.name}
                    className="h-40 w-full object-cover"
                  />
                  <CardHeader>
                    <CardTitle>{location.name}</CardTitle>
                    <CardDescription>
                      {location.properties} properties
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>

          <section className="rounded-lg bg-accent p-8">
            <h2 className="mb-6 text-center text-2xl font-semibold">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id}>
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage
                          src={testimonial.avatar}
                          alt={testimonial.name}
                        />
                        <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{testimonial.name}</CardTitle>
                        <CardDescription>
                          {testimonial.location}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{testimonial.comment}</p>
                  </CardContent>
                  <CardFooter>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-4">
              {/* <LogoWithTextIcon /> */}
              <p className="text-sm text-muted-foreground">
                Find your perfect property with ease. Apart is your trusted
                partner in real estate.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <span className="sr-only">Facebook</span>
                  <Facebook size={24} />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <span className="sr-only">Twitter</span>
                  <Twitter size={24} />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <span className="sr-only">Instagram</span>
                  <Instagram size={24} />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Search</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Buy Property
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Rent Property
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Commercial Property
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    New Developments
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Find an Agent
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">List Property</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Sell Your Property
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Rent Your Property
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Property Valuation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Advertise with Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Buying Guide
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Renting Guide
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Property News
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Market Insights
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Mortgage Calculator
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">About Us</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Our Story
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Press
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-8">
            <form className="mx-auto max-w-md">
              <h3 className="mb-4 text-center text-lg font-semibold">
                Subscribe to our newsletter
              </h3>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow"
                />
                <Button type="submit">
                  <Mail className="mr-2 h-4 w-4" /> Subscribe
                </Button>
              </div>
            </form>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Apart. All rights reserved.
          </div>
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/80 backdrop-blur-md md:hidden">
        <div className="flex justify-around py-2">
          <Button variant="ghost" className="flex flex-col items-center py-0">
            <Search className="mb-1 h-6 w-6" />
            <span className="text-xs">Search</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center py-0">
            <Heart className="mb-1 h-6 w-6" />
            <span className="text-xs">Saved</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center py-0">
            <User className="mb-1 h-6 w-6" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

function SearchButton({ isSearchOpen, setIsSearchOpen }) {
  return (
    <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between bg-background text-left font-normal shadow-sm transition-colors hover:bg-accent/50"
        >
          <div className="flex items-center space-x-4">
            <Search className="h-4 w-4 text-primary" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">Find properties</span>
              <span className="text-xs text-muted-foreground">
                Any location • Any size • Any price
              </span>
            </div>
          </div>
          <div className="rounded-full bg-primary p-2 text-primary-foreground">
            <Search className="h-4 w-4" />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Search for properties</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <div className="flex items-center space-x-2 rounded-md bg-accent/50 p-3">
              <MapPin className="h-5 w-5 text-primary" />
              <Input
                placeholder="Enter location"
                className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div className="flex items-center space-x-2 rounded-md bg-accent/50 p-3">
              <Maximize2 className="h-5 w-5 text-primary" />
              <Select>
                <SelectTrigger className="border-none bg-transparent focus:ring-0">
                  <SelectValue placeholder="Property size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">
                    Small (up to 1000 sq ft)
                  </SelectItem>
                  <SelectItem value="medium">
                    Medium (1000-2000 sq ft)
                  </SelectItem>
                  <SelectItem value="large">Large (2000-3000 sq ft)</SelectItem>
                  <SelectItem value="xlarge">
                    Extra Large (3000+ sq ft)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2 rounded-md bg-accent/50 p-3">
              <DollarSign className="h-5 w-5 text-primary" />
              <Select>
                <SelectTrigger className="border-none bg-transparent focus:ring-0">
                  <SelectValue placeholder="Price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-100k">$0 - $100,000</SelectItem>
                  <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                  <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
                  <SelectItem value="500k+">$500,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end space-x-2">
          <Button variant="outline" onClick={() => setIsSearchOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsSearchOpen(false)}>Search</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Laptop className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative flex items-center space-x-2 rounded-full p-2 hover:bg-accent"
        >
          <Menu className="h-5 w-5" />
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="/placeholder.svg?height=32&width=32"
              alt="User avatar"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Heart className="mr-2 h-4 w-4" />
          <span>Saved Properties</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <DollarSign className="mr-2 h-4 w-4" />
          <span>My Investments</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function PropertyCard({ property }) {
  return (
    <Card>
      <img
        src={property.image}
        alt={property.title}
        className="h-48 w-full object-cover"
      />
      <CardHeader>
        <CardTitle>{property.title}</CardTitle>
        <CardDescription>{property.location}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm">
          <span>{property.size} sq ft</span>
          <span>{property.bedrooms} beds</span>
          <span>{property.bathrooms} baths</span>
        </div>
        <p className="mt-2 font-semibold">${property.price.toLocaleString()}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  );
}

const featuredProperties = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    location: "New York, NY",
    size: 1200,
    bedrooms: 2,
    bathrooms: 2,
    price: 750000,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Suburban Family Home",
    location: "Austin, TX",
    size: 2500,
    bedrooms: 4,
    bathrooms: 3,
    price: 550000,
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Beachfront Condo",
    location: "Miami, FL",
    size: 1800,
    bedrooms: 3,
    bathrooms: 2,
    price: 900000,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  },
];

const popularLocations = [
  {
    id: 1,
    name: "New York",
    properties: 1500,
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Los Angeles",
    properties: 1200,
    image:
      "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Chicago",
    properties: 900,
    image:
      "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Houston",
    properties: 800,
    image:
      "https://images.unsplash.com/photo-1530089711124-9ca31fb9e863?auto=format&fit=crop&w=800&q=80",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, NY",
    comment:
      "Apart made it so easy to find my dream apartment. The search features are intuitive and the listings are always up-to-date.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "San Francisco, CA",
    comment:
      "As a first-time homebuyer, I appreciated the wealth of information Apart provided. It helped me make an informed decision.",
    rating: 4,
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    location: "Miami, FL",
    comment:
      "The virtual tours feature saved me so much time. I was able to narrow down my choices before even leaving my house!",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=3",
  },
];
