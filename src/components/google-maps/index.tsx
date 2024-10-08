/* eslint-disable @typescript-eslint/no-unsafe-call */
import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import { useCallback, useRef } from "react";
import { Button } from "../ui";
import { ArrowLeft, ArrowRight } from "lucide-react";

const MapComponent: React.FC<any> = ({ properties, onToggle, isExpanded }) => {
  const mapRef = useRef<google.maps.Map | null>(null);

  const center = useCallback(() => {
    return { lat: properties[0].lat, lng: properties[0].lng };
  }, [properties]);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  return (
    <div className="sticky h-full w-full">
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
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "100%",
          position: "sticky",
          top: 0,
        }}
        center={center()}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          fullscreenControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "poi.business",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
          ],
        }}
      >
        {/* // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-call */}
        {properties?.map((property: any) => (
          <Marker
            key={property.id}
            position={{ lat: property.lat, lng: property.lng }}
            title={property.title}
          />
        ))}
      </GoogleMap>
    </div>
  );
};
export default MapComponent;
