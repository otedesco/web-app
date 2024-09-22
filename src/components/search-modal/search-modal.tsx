import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import { MapPin, Search, Home, Umbrella, ShoppingBag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Slider } from "~/components/ui/slider";
import { useRouter, useSearchParams } from "next/navigation";

// Type definitions for props and state
export interface SearchModalProps {
  Trigger?: (props: object) => React.JSX.Element;
}

export interface DefaultTriggerProps {
  location?: string;
  size?: string;
  price?: string;
}

// Default Trigger component with typed props
const DefaultTrigger: React.FC<DefaultTriggerProps> = ({
  location = "Any location", // Default values can be typed directly
  size = "Any size",
  price = "Any Price",
  ...rest
}) => {
  const t = useTranslations("components->search-modal");
  return (
    <Button
      variant="outline"
      className="w-full justify-between bg-background text-left font-normal shadow-sm transition-colors hover:bg-accent/50"
      {...rest}
    >
      <div className="flex items-center space-x-4">
        <div className="flex flex-col">
          <span className="text-sm font-medium">{t("Find properties")}</span>
          <span className="text-xs text-muted-foreground">
            {t(location)} • {t(size)} • {t(price)}
          </span>
        </div>
      </div>
      <div className="rounded-full bg-primary p-2 text-primary-foreground">
        <Search className="h-4 w-4" />
      </div>
    </Button>
  );
};

const locations: string[] = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
];

// Main SearchModal component
export default function SearchModal({ Trigger }: SearchModalProps) {
  const TriggerComponent = Trigger ?? DefaultTrigger;

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [operationType, setOperationType] = useState<string>("rent");
  const [location, setLocation] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [minSize, setMinSize] = useState<number>(0);
  const [maxSize, setMaxSize] = useState<number>(500);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000000]);

  const suggestionRef = useRef<HTMLUListElement | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.set("operationType", operationType);
    params.set("location", location);
    params.set("minSize", minSize.toString());
    params.set("maxSize", maxSize.toString());
    params.set("priceRange", priceRange.toString());
    router.push(`/listings?${params.toString()}`);
    setIsSearchOpen(false);
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);
    if (value.length > 0) {
      const filtered = locations.filter((loc) =>
        loc.toLowerCase().includes(value.toLowerCase()),
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setLocation(suggestion);
    setSuggestions([]);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
      <DialogTrigger asChild>
        <TriggerComponent />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Find Your Dream Property
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <Tabs defaultValue="rent" onValueChange={setOperationType}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="rent" className="flex items-center">
                <Home className="mr-2 h-4 w-4" />
                Rent
              </TabsTrigger>
              <TabsTrigger value="vacation" className="flex items-center">
                <Umbrella className="mr-2 h-4 w-4" />
                Vacation
              </TabsTrigger>
              <TabsTrigger value="buy" className="flex items-center">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Buy
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-4">
            <div className="rounded-md bg-accent/50 p-3">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
                <Input
                  type="text"
                  placeholder="Enter location"
                  value={location}
                  onChange={handleLocationChange}
                  className="pl-10"
                />
                {suggestions.length > 0 && (
                  <ul
                    ref={suggestionRef}
                    className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-accent"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="rounded-md bg-accent/50 p-3">
              <label className="mb-2 block text-sm font-medium">
                Property Size (sq mts)
              </label>
              <div className="flex items-center space-x-4">
                <Input
                  type="number"
                  placeholder="Min size"
                  value={minSize}
                  onChange={(e) => setMinSize(Number(e.target.value))}
                  className="w-1/2"
                />
                <Input
                  type="number"
                  placeholder="Max size"
                  value={maxSize}
                  onChange={(e) => setMaxSize(Number(e.target.value))}
                  className="w-1/2"
                />
              </div>
            </div>

            <div className="rounded-md bg-accent/50 p-3">
              <label className="mb-2 block text-sm font-medium">
                Price Range
              </label>
              <Slider
                min={0}
                max={1000000}
                step={1000}
                value={priceRange}
                onValueChange={setPriceRange}
                className="py-4"
              />
              <div className="flex justify-between text-sm">
                <span>{formatPrice(priceRange[0]!)}</span>
                <span>{formatPrice(priceRange[1]!)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end space-x-2">
          <Button variant="outline" onClick={() => setIsSearchOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSearch}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Search className="mr-2 h-4 w-4" />
            Search Properties
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
