"use client";

import React, { useState } from "react";
import { Search, X, Check, Loader2 } from "lucide-react";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import { useDebounce } from "use-debounce";
import { useSearchPlaces } from "~/lib/hooks/useSearchPlaces";
import { cn } from "~/lib/utils";
import { DialogContentProps } from "./types";

interface Place {
  place_id: string;
  description: string;
  terms: { offset: number; value: string }[];
}

export default function LocationSelector({
  item,
  onChange,
}: DialogContentProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const { places, isLoading, error } = useSearchPlaces(debouncedSearchTerm);

  const handleSelectPlace = (place: Place) => {
    setSelectedPlace(place);
    const value = place.terms.slice(-2).map((term) => term.value);

    onChange(value.join(", "));
  };

  return (
    <div className="p-5">
      <h2 className="mb-4 text-3xl font-semibold">{item.title}</h2>

      <div className="relative mt-8">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for a place"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
        {searchTerm && (
          <X
            className="absolute right-2 top-2.5 h-4 w-4 cursor-pointer text-muted-foreground"
            onClick={() => {
              setSearchTerm("");
              setSelectedPlace(null);
            }}
          />
        )}
      </div>

      <ScrollArea className="mt-6 h-[300px] pr-4">
        {isLoading ? (
          <div className="flex h-full items-center justify-center text-center">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="flex h-full items-center justify-center text-center">
            Error fetching places
          </div>
        ) : places.length > 0 ? (
          (places as Place[]).map((place) => (
            <div
              key={place.place_id}
              className={cn(
                "z-10 flex cursor-pointer items-center space-x-2 border-b px-4 py-6 last:border-b-0",
                selectedPlace?.place_id === place.place_id && "bg-muted",
              )}
              onClick={() => handleSelectPlace(place)}
            >
              <span className="text-md mr-auto leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {place.description}
              </span>
              {selectedPlace?.place_id === place.place_id && (
                <Check className="mr-4 h-4 w-4 text-primary" />
              )}
            </div>
          ))
        ) : (
          <div className="flex h-full items-center justify-center text-center">
            No places found
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
