"use client";

import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, Card, CardContent, CardFooter } from "~/components/ui";
import { Badge } from "~/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { ScrollArea } from "~/components/ui/scroll-area";

const properties = [
  {
    id: 2,
    title: "Modern Loft",
    price: 300000,
    description: "City Center",
    highlightedFeatures: ["1 bedroom", "1 bath", "open plan"],
    image: "https://picsum.photos/300",
  },
  {
    id: 3,
    title: "Beachside Villa",
    price: 750000,
    description: "Ocean View",
    highlightedFeatures: ["3 bedrooms", "3 baths", "private pool"],
    image: "https://picsum.photos/300",
  },
  {
    id: 4,
    title: "Rustic Cottage",
    price: 180000,
    description: "Countryside",
    highlightedFeatures: ["2 bedrooms", "1 bath", "large garden"],
    image: "https://picsum.photos/300",
  },
  {
    id: 5,
    title: "Luxury Penthouse",
    price: 1200000,
    description: "Downtown Skyline View",
    highlightedFeatures: ["4 bedrooms", "4 baths", "roof terrace"],
    image: "https://picsum.photos/300",
  },
  {
    id: 6,
    title: "Suburban Family Home",
    price: 400000,
    description: "Quiet Neighborhood",
    highlightedFeatures: ["3 bedrooms", "2 baths", "garage"],
    image: "https://picsum.photos/300",
  },
  {
    id: 7,
    title: "Eco-Friendly Home",
    price: 350000,
    description: "Energy Efficient",
    highlightedFeatures: ["3 bedrooms", "2 baths", "solar panels"],
    image: "https://picsum.photos/300",
  },
  {
    id: 8,
    title: "Downtown Studio",
    price: 220000,
    description: "Perfect for Professionals",
    highlightedFeatures: ["Studio apartment", "1 bath", "close to amenities"],
    image: "https://picsum.photos/300",
  },
  {
    id: 9,
    title: "Mountain Cabin",
    price: 275000,
    description: "Secluded Retreat",
    highlightedFeatures: ["2 bedrooms", "2 baths", "fireplace"],
    image: "https://picsum.photos/300",
  },
  {
    id: 10,
    title: "Luxury Townhouse",
    price: 500000,
    description: "Modern Design",
    highlightedFeatures: ["3 bedrooms", "3 baths", "2-car garage"],
    image: "https://picsum.photos/300",
  },
  {
    id: 11,
    title: "Lakefront Cabin",
    price: 350000,
    description: "Scenic View",
    highlightedFeatures: ["3 bedrooms", "2 baths", "private dock"],
    image: "https://picsum.photos/300",
  },
  {
    id: 12,
    title: "Historic Mansion",
    price: 2500000,
    description: "Architectural Landmark",
    highlightedFeatures: ["6 bedrooms", "5 baths", "library"],
    image: "https://picsum.photos/300",
  },
  {
    id: 13,
    title: "Country Farmhouse",
    price: 450000,
    description: "Expansive Land",
    highlightedFeatures: ["4 bedrooms", "3 baths", "barn"],
    image: "https://picsum.photos/300",
  },
  {
    id: 14,
    title: "Ski Lodge",
    price: 800000,
    description: "Ski-In/Ski-Out",
    highlightedFeatures: ["5 bedrooms", "4 baths", "heated floors"],
    image: "https://picsum.photos/300",
  },
  {
    id: 15,
    title: "Urban Condo",
    price: 350000,
    description: "High-Rise Living",
    highlightedFeatures: ["2 bedrooms", "2 baths", "balcony"],
    image: "https://picsum.photos/300",
  },
  {
    id: 16,
    title: "Desert Retreat",
    price: 450000,
    description: "Isolated Haven",
    highlightedFeatures: ["3 bedrooms", "2 baths", "outdoor oasis"],
    image: "https://picsum.photos/300",
  },
  {
    id: 17,
    title: "Cliffside Residence",
    price: 1500000,
    description: "Breathtaking Views",
    highlightedFeatures: ["4 bedrooms", "3 baths", "infinity pool"],
    image: "https://picsum.photos/300",
  },
  {
    id: 18,
    title: "Secluded Ranch",
    price: 650000,
    description: "Nature Surroundings",
    highlightedFeatures: ["4 bedrooms", "3 baths", "horse stables"],
    image: "https://picsum.photos/300",
  },
  {
    id: 19,
    title: "Tropical Bungalow",
    price: 350000,
    description: "Beachfront",
    highlightedFeatures: ["2 bedrooms", "2 baths", "hammock garden"],
    image: "https://picsum.photos/300",
  },
  {
    id: 20,
    title: "Metropolitan Apartment",
    price: 275000,
    description: "Close to Transport",
    highlightedFeatures: ["1 bedroom", "1 bath", "modern kitchen"],
    image: "https://picsum.photos/300",
  },
];

const PropertyCard = ({
  title,
  price,
  highlightedFeatures,
  description,
  image,
}: any) => (
  <Card className="p-3max-w-sm flex h-full w-full flex-col overflow-hidden rounded-none border-none shadow-none">
    <CardContent className="flex-grow">
      <div className="relative mb-2 aspect-square w-full overflow-hidden rounded-md">
        <img src={image} alt={title} className="h-full w-full object-cover" />
        <Badge className="absolute left-2 top-2 rounded-sm bg-white text-black">
          Hot 🔥
        </Badge>
        <button className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-gray-600 hover:text-red-500">
          {/** TODO: if it's a client favorite fill the heart with red */}
          <Heart className="h-5 w-5" fill={"none"} />
        </button>
      </div>
      {/* <div className="relative">
        <img src={image} alt={title} className="h-64 w-full object-cover" />
      </div> */}
      <p className="text-md font-semibold">{title}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
      <p className="text-sm text-muted-foreground">
        {(highlightedFeatures as string[]).join(" • ")}
      </p>
      <span className="text-[0.94rem] font-semibold">
        {typeof price === "number"
          ? `$${price.toLocaleString()}`
          : "Price not available"}
      </span>
    </CardContent>
    <CardFooter></CardFooter>
  </Card>
);
const MapPlaceholder = ({ onToggle, isExpanded }: any) => (
  <div className="relative flex h-full w-full items-center justify-center bg-gray-200">
    <Button
      variant="outline"
      size="icon"
      className="z-8 absolute left-4 top-4 h-10 w-10 p-2 shadow-md"
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

const PaginationComponent: React.FC<any> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => (
  <Pagination className="mt-8 items-end">
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious
          href="#"
          onClick={(e) => {
            e.preventDefault();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            onPageChange?.(Math.max(1, currentPage - 1));
          }}
        />
      </PaginationItem>
      {[...Array(totalPages)].map((_, i) => (
        <PaginationItem key={i}>
          <PaginationLink
            className="rounded-full"
            href="#"
            onClick={(e: any) => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call
              e?.preventDefault();
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call
              onPageChange(i + 1);
            }}
            isActive={currentPage === i + 1}
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem>
        <PaginationNext
          href="#"
          onClick={(e) => {
            e.preventDefault();

            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument
            onPageChange?.(Math.min(totalPages, currentPage + 1));
          }}
        />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
);

export default function HelpCenterPage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 18;
  const totalPages = Math.ceil(properties.length / propertiesPerPage);
  const currentProperties = properties.slice(
    (currentPage - 1) * propertiesPerPage,
    currentPage * propertiesPerPage,
  );

  // use the hook i made for this rezise issue
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsExpanded(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const PropertyCardsList = () => (
    <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {currentProperties.map((property) => (
        <PropertyCard key={property.id} {...property} />
      ))}
    </div>
  );

  // TODO: floating button to show map on small screens and hide the property cards, then show the property as a drawer
  // or modal, if the drawer option is the one find the way to show the menu over the drawer

  // TODO: Fix overflow issue on mobile
  return (
    <main className="mb-14 flex flex-grow overflow-hidden md:mb-0">
      <div
        className={`transition-all duration-300 ease-in-out ${
          isExpanded ? "w-0 opacity-0" : "w-full opacity-100 md:w-1/2 xl:w-3/5"
        } h-[calc(100vh-4rem)] overflow-hidden`}
      >
        <ScrollArea className="h-full">
          <div className="flex-grow p-4">
            <PropertyCardsList />
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
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
