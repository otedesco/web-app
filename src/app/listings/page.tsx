"use client";

import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui";
import { ScrollArea } from "~/components/ui/scroll-area";

const properties = [
  {
    id: 1,
    title: "Cozy Apartment",
    price: 250000,
    location: "Downtown",
    image: "https://picsum.photos/300",
  },
  {
    id: 2,
    title: "Spacious House",
    price: 450000,
    location: "Suburbs",
    image: "https://picsum.photos/300",
  },
  {
    id: 3,
    title: "Modern Loft",
    price: 350000,
    location: "City Center",
    image: "https://picsum.photos/300",
  },
  {
    id: 4,
    title: "Rustic Cabin",
    price: 200000,
    location: "Mountains",
    image: "https://picsum.photos/300",
  },
  {
    id: 5,
    title: "Beachfront Villa",
    price: 750000,
    location: "Coastal Area",
    image: "https://picsum.photos/300",
  },
  {
    id: 6,
    title: "Urban Townhouse",
    price: 400000,
    location: "Metropolitan Area",
    image: "https://picsum.photos/300",
  },
  {
    id: 7,
    title: "Price on Request",
    location: "Exclusive Area",
    image: "https://picsum.photos/300",
  },
  {
    id: 8,
    title: "Luxury Penthouse",
    price: 1200000,
    location: "City Skyline",
    image: "https://picsum.photos/300",
  },
  {
    id: 9,
    title: "Country Estate",
    price: 900000,
    location: "Rural Area",
    image: "https://picsum.photos/300",
  },
  {
    id: 10,
    title: "Seaside Cottage",
    price: 300000,
    location: "Coastal Village",
    image: "https://picsum.photos/300",
  },
];

const PropertyCard = ({ title, price, location, image }: any) => (
  <Card className="flex h-full flex-col">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-grow">
      <div className="mb-2 aspect-square w-full overflow-hidden rounded-md">
        <img src={image} alt={title} className="h-full w-full object-cover" />
      </div>
      <p className="text-2xl font-bold">
        {typeof price === "number"
          ? `$${price.toLocaleString()}`
          : "Price not available"}
      </p>
      <p className="text-gray-500">{location}</p>
    </CardContent>
    <CardFooter>
      <Button variant="outline" className="w-full">
        <Heart className="mr-2 h-4 w-4" /> Save
      </Button>
    </CardFooter>
  </Card>
);
const MapPlaceholder = ({ onToggle, isExpanded }: any) => (
  <div className="relative flex h-full w-full items-center justify-center bg-gray-200">
    <Button
      variant="outline"
      size="icon"
      className="absolute left-4 top-4 z-10 h-10 w-10 p-2 shadow-md"
      onClick={onToggle}
    >
      {!isExpanded ? (
        <ArrowLeft className="h-6 w-6" />
      ) : (
        <ArrowRight className="h-6 w-6" />
      )}
    </Button>
    <span className="text-2xl text-gray-500">Map Placeholder</span>
  </div>
);
export default function HelpCenterPage() {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsExpanded(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // TODO: floating button to show map on small screens and hide the property cards, then show the property as a drawer
  // or modal, if the drawer option is the one find the way to show the menu over the drawer

  return (
    <main className="mb-14 flex flex-grow overflow-hidden md:mb-0">
      <div
        className={`transition-all duration-300 ease-in-out ${
          isExpanded ? "w-0 opacity-0" : "w-full opacity-100 md:w-1/2 xl:w-3/5"
        } h-[calc(100vh-4rem)] overflow-hidden`}
      >
        <ScrollArea className="h-full">
          <div className="p-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isExpanded ? "w-full" : "hidden md:block md:w-1/2 xl:w-2/5"
        } h-[calc(100vh-4rem)]`}
      >
        <MapPlaceholder
          onToggle={() => setIsExpanded(!isExpanded)}
          isExpanded={isExpanded}
        />
      </div>
    </main>
  );
}
