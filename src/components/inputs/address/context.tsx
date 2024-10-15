import { ICity, ICountry, IState } from "country-state-city";
import { createContext, useContext, useState } from "react";
import { LocationContextType } from "./types";

// Create the context
const LocationContext = createContext<LocationContextType | undefined>(
  undefined,
);

// Provide the context to the component tree
export const LocationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
  const [selectedState, setSelectedState] = useState<IState | null>(null);
  const [selectedCity, setSelectedCity] = useState<ICity | null>(null);

  return (
    <LocationContext.Provider
      value={{
        selectedCountry,
        selectedState,
        selectedCity,
        setSelectedCountry,
        setSelectedState,
        setSelectedCity,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

// Custom hook to use the location context
export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
