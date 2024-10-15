import {
  City,
  Country,
  ICity,
  ICountry,
  IState,
  State,
} from "country-state-city";
import { Select } from "./selector";
import { useLocation } from "./context";
import { useCallback } from "react";

export const CitySelect = ({
  disabled,
  className,
  onSelect,
  currentValue,
}: {
  disabled?: boolean;
  className?: string;
  onSelect?: (city: ICity) => void;
  currentValue?: string;
}) => {
  const { selectedCountry, selectedState, selectedCity, setSelectedCity } =
    useLocation();

  const isDisabled = !selectedCountry || !selectedState || disabled;
  const cities = !isDisabled
    ? City.getCitiesOfState(selectedCountry?.isoCode, selectedState?.isoCode)
    : [];

  const handleSelect = useCallback(
    (city: ICity) => {
      setSelectedCity(city);
      onSelect?.(city);
    },
    [onSelect, setSelectedCity],
  );

  return (
    <Select
      className={className}
      items={cities}
      value={selectedCity}
      placeholder={currentValue ?? ""}
      disabled={isDisabled}
      onSelect={handleSelect}
      getItemLabel={(city) => city.name}
      getItemKey={(city) => city.name}
    />
  );
};

export const StateSelect = ({
  disabled,
  className,
  onSelect,
  currentValue,
}: {
  disabled?: boolean;
  className?: string;
  onSelect?: (state: IState) => void;
  currentValue?: string;
}) => {
  const { selectedCountry, selectedState, setSelectedState } = useLocation();
  const isDisabled = !selectedCountry || disabled;

  const states = !isDisabled
    ? State.getStatesOfCountry(selectedCountry.isoCode)
    : [];

  const handleSelect = useCallback(
    (state: IState) => {
      setSelectedState(state);
      onSelect?.(state);
    },
    [onSelect, setSelectedState],
  );

  return (
    <Select
      className={className}
      items={states}
      value={selectedState}
      placeholder={currentValue ?? ""}
      disabled={isDisabled}
      onSelect={handleSelect}
      getItemLabel={(state) => state.name}
      getItemKey={(state) => state.isoCode}
    />
  );
};

export const CountrySelect = ({
  disabled,
  className,
  onSelect,
  currentValue,
}: {
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  currentValue?: string;
  onSelect?: (country: ICountry) => void;
}) => {
  const { selectedCountry, setSelectedCountry } = useLocation();
  const countries = Country.getAllCountries();

  const handleSelect = useCallback(
    (country: ICountry) => {
      setSelectedCountry(country);
      onSelect?.(country);
    },
    [onSelect, setSelectedCountry],
  );

  return (
    <Select
      className={className}
      items={countries}
      value={selectedCountry}
      placeholder={currentValue ?? ""}
      disabled={disabled}
      onSelect={handleSelect}
      getItemLabel={(country) => country.name}
      getItemKey={(country) => country.isoCode}
      renderItemDetails={(country) => (
        <>
          {country.flag} {country.name}
        </>
      )}
      customStyles="w-[250px]"
    />
  );
};
