"use client";

import { useEffect, useState } from "react";
import Pagination from "~/components/pagination";
import PropertyCardV2 from "~/components/property-card-v2";

import { useMediaQuery } from "~/hooks/useMediaQuery";
import properties from "./data";
import GoogleMaps from "~/components/google-maps";

export default function ListingPage() {
  const isMobile = useMediaQuery("(max-width: 768px)");
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
    if (isMobile) {
      setIsExpanded(false);
    }
  }, [isMobile]);

  const PropertyCardsList = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {currentProperties.map((property) => (
        <PropertyCardV2 key={property.id} {...property} />
      ))}
    </div>
  );

  // TODO: floating button to show map on small screens and hide the property cards, then show the property as a drawer
  // or modal, if the drawer option is the one find the way to show the menu over the drawer

  // TODO: Fix overflow issue on mobile
  return (
    <main className="mb-14 flex md:mb-0">
      <div
        className={`transition-all duration-300 ease-in-out ${
          isExpanded ? "w-0 opacity-0" : "w-full opacity-100 md:w-1/2 xl:w-3/5"
        } `}
      >
        <div className="flex-grow p-4">
          <PropertyCardsList />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isExpanded ? "w-full" : "hidden md:block md:w-1/2 xl:w-2/5"
        } sticky top-16 h-[calc(100vh-4rem)]`}
      >
        <GoogleMaps
          properties={currentProperties}
          onToggle={() => setIsExpanded(!isExpanded)}
          isExpanded={isExpanded}
        />
      </div>
    </main>
  );
}
