import { ICity, ICountry, IState } from "country-state-city";

export interface LocationContextType {
  selectedCountry: ICountry | null;
  selectedState: IState | null;
  selectedCity: ICity | null;
  setSelectedCountry: (country: ICountry) => void;
  setSelectedState: (state: IState) => void;
  setSelectedCity: (city: ICity) => void;
}

export interface SelectProps<T> {
  items: T[];
  value: T | null;
  placeholder: string;
  disabled?: boolean;
  onSelect: (item: T) => void;
  getItemLabel: (item: T) => string;
  getItemKey: (item: T) => string;
  renderItemDetails?: (item: T) => React.ReactNode;
  customStyles?: string;
  className?: string;
}
