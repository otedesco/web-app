import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

interface Property {
  id: number;
  title: string;
  location: string;
  size: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  image: string;
}

export interface PropertyCardProps {
  property: Property;
}

export const PropertyCard = ({ property }: PropertyCardProps) => (
  <Card>
    {/* eslint-disable-next-line @next/next/no-img-element */}
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
