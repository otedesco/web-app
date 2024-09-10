"use client";

import { useState, useEffect } from "react";
import { Heart, Search, User, Sun, Moon, Laptop } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function NavigationMenu() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <nav className="fixed left-0 right-0 top-0 z-10 bg-background/30 backdrop-blur-md">
        <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="hidden items-center md:flex">
              <Link className="text-2xl font-bold" href="/">
                Logo
              </Link>
            </div>
            <div className="w-full md:w-1/2 lg:w-2/5 xl:w-1/3">
              <SearchButton
                isSearchOpen={isSearchOpen}
                setIsSearchOpen={setIsSearchOpen}
              />
            </div>
            <div className="hidden items-center space-x-4 md:flex">
              <Button variant="ghost">Become a Host</Button>
              <ThemeToggle />
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>
      <main className="mt-16 flex-grow p-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-3xl font-bold">Welcome to Our Platform</h1>
          {[...Array(20)].map((_, i) => (
            <p key={i} className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          ))}
        </div>
      </main>
      <BottomMenu />
    </div>
  );
}

function SearchButton({ isSearchOpen, setIsSearchOpen }) {
  return (
    <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
      <DialogTrigger asChild>
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Search destinations"
            className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Find your perfect stay</h4>
            <p className="text-sm text-muted-foreground">
              Enter your travel details below
            </p>
          </div>
          <div className="grid gap-2">
            <Input placeholder="Where are you going?" />
            <div className="grid grid-cols-2 gap-2">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Check-in" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="tomorrow">Tomorrow</SelectItem>
                  <SelectItem value="in-3-days">In 3 days</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Check-out" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tomorrow">Tomorrow</SelectItem>
                  <SelectItem value="in-3-days">In 3 days</SelectItem>
                  <SelectItem value="in-7-days">In 7 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Guests" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 guest</SelectItem>
                <SelectItem value="2">2 guests</SelectItem>
                <SelectItem value="3">3 guests</SelectItem>
                <SelectItem value="4">4+ guests</SelectItem>
              </SelectContent>
            </Select>
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
          <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-5 w-5" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-5 w-5" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Laptop className="mr-2 h-5 w-5" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function BottomMenu() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/30 backdrop-blur-md md:hidden">
      <div className="flex justify-around py-4">
        <Button variant="ghost" className="flex flex-col items-center py-0">
          <Heart className="mb-1 h-10 w-10" />
          <span className="text-xs">Wishlist</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center py-0">
          <Search className="mb-1 h-20 w-10" />
          <span className="text-xs">Explore</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center py-0">
          <User className="mb-1 h-10 w-10" />
          <span className="text-xs">Login</span>
        </Button>
      </div>
    </div>
  );
}
