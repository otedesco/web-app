import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Drawer,
  DrawerContent,
  DrawerTrigger,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
} from "~/components/ui";
import { cn } from "~/lib/utils";
import { AsYouType, type CountryCode } from "libphonenumber-js";
import { Check, ChevronsUpDown } from "lucide-react";
import { FormEvent, useMemo, useRef, useState } from "react";
import { Country } from "country-state-city";
import { useMediaQuery } from "~/hooks/useMediaQuery";

interface UseStateHistoryHandlers<T> {
  set: (value: T) => void;
  back: (steps?: number) => void;
  forward: (steps?: number) => void;
}

interface StateHistory<T> {
  history: T[];
  current: number;
}

function useStateHistory<T>(
  initialValue: T,
): [T, UseStateHistoryHandlers<T>, StateHistory<T>] {
  const [state, setState] = useState<StateHistory<T>>({
    history: [initialValue],
    current: 0,
  });

  const handlers = useMemo(
    () => ({
      set: (val: T) =>
        setState((currentState) => {
          const nextState = [
            ...currentState.history.slice(0, currentState.current + 1),
            val,
          ];
          return { history: nextState, current: nextState.length - 1 };
        }),
      back: (steps = 1) =>
        setState((currentState) => ({
          ...currentState,
          current: Math.max(0, currentState.current - steps),
        })),
      forward: (steps = 1) =>
        setState((currentState) => ({
          ...currentState,
          current: Math.min(
            currentState.history.length - 1,
            currentState.current + steps,
          ),
        })),
    }),
    [],
  );

  return [state.history[state.current]!, handlers, state];
}

interface PhoneInputProps extends React.ComponentPropsWithoutRef<"input"> {
  value?: string;
  defaultCountry?: CountryCode;
}

export function PhoneInput({
  value: valueProp,
  defaultCountry = "US",
  className,
  id,
  required = true,
  ...rest
}: PhoneInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, handlers, history] = useStateHistory(valueProp);
  const countries = Country.getAllCountries();
  const [openCommand, setOpenCommand] = useState(false);
  const [countryCode, setCountryCode] = useState<CountryCode>(defaultCountry);
  const selectedCountry = countries.find(
    (country) => country.isoCode === countryCode,
  );
  const isMobile = useMediaQuery("(max-width: 768px)");

  const initializeDefaultValue = () =>
    value ?? `+${selectedCountry?.phonecode}`;

  const handlePhoneInput = (inputValue: string) => {
    const asYouType = new AsYouType();
    const formattedValue = asYouType.input(
      inputValue.startsWith("+") ? inputValue : `+${inputValue}`,
    );
    const number = asYouType.getNumber();
    setCountryCode(number?.country ?? defaultCountry);
    return formattedValue;
  };

  const updatePhoneValue = (newValue: string) => {
    if (inputRef.current) {
      inputRef.current.value = newValue;
      handlers.set(newValue);
    }
  };

  const handleOnInput = (event: FormEvent<HTMLInputElement>) => {
    const formattedValue = handlePhoneInput(event.currentTarget.value);
    updatePhoneValue(formattedValue);
  };

  const handleOnPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text/plain");
    const formattedValue = handlePhoneInput(pastedData);
    updatePhoneValue(formattedValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "z") {
      handlers.back();
      if (inputRef.current && history.current > 0) {
        event.preventDefault();
        inputRef.current.value = history.history[history.current - 1] ?? "";
      }
    }
  };

  const CountrySelector = ({ mobile }: { mobile: boolean }) => {
    const Wrapper = mobile ? Drawer : Popover;
    const Trigger = mobile ? DrawerTrigger : PopoverTrigger;
    const Content = mobile ? DrawerContent : PopoverContent;

    return (
      <Wrapper open={openCommand} onOpenChange={setOpenCommand}>
        <Trigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openCommand}
            className="w-max items-center justify-between whitespace-nowrap"
          >
            {selectedCountry?.name ? (
              <span className="relative top-0.5">{selectedCountry.flag}</span>
            ) : (
              "Select country"
            )}
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </Trigger>
        <Content className="p-0" align="start">
          <Command>
            <CommandInput placeholder="Search country..." />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <ScrollArea className="[&>[data-radix-scroll-area-viewport]]:max-h-[300px]">
                <CommandGroup>
                  {countries.map((country) => (
                    <CommandItem
                      key={country.isoCode}
                      className="text-md md:text-sm"
                      value={`${country.name} (+${country.phonecode})`}
                      onSelect={() => {
                        updatePhoneValue(`+${country.phonecode}`);
                        setCountryCode(country.isoCode as CountryCode);
                        setOpenCommand(false);
                        inputRef.current?.focus();
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 size-4",
                          countryCode === country.isoCode
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      <span className="flex items-center gap-2">
                        {country.flag}
                        <span className="ml-1">{country.name}</span>
                      </span>
                      <span className="ml-1">(+{country.phonecode})</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </ScrollArea>
            </CommandList>
          </Command>
        </Content>
      </Wrapper>
    );
  };

  return (
    <div className={cn("flex gap-2", className)}>
      <CountrySelector mobile={isMobile} />
      <Input
        ref={inputRef}
        type="text"
        pattern="^(\+)?[0-9\s]*$"
        name="phone"
        id={id}
        placeholder="Phone"
        defaultValue={initializeDefaultValue()}
        onInput={handleOnInput}
        onPaste={handleOnPaste}
        onKeyDown={handleKeyDown}
        required={required}
        aria-required={required}
        {...rest}
      />
    </div>
  );
}
