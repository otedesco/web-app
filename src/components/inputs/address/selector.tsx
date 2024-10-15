import { useCallback, useMemo, useState } from "react";
import { SelectProps } from "./types";
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "~/lib/utils";

export const Select = <T extends object>({
  items,
  value,
  placeholder,
  disabled,
  onSelect,
  getItemLabel,
  getItemKey,
  renderItemDetails,
  className,
}: SelectProps<T>) => {
  const [isOpen, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (value: string) => setSearchTerm(value);

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      getItemLabel(item).toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [items, searchTerm, getItemLabel]);

  const handleSelect = useCallback(
    (item: T) => {
      onSelect(item);
      setOpen(false);
    },
    [onSelect],
  );

  return (
    <Popover open={isOpen} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className={cn("justify-between", className)}
          disabled={disabled}
        >
          <span>
            {value ? (
              <div className="flex items-end gap-2">
                {renderItemDetails
                  ? renderItemDetails(value)
                  : getItemLabel(value)}
              </div>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className={`rounded-[6px] p-0`}>
        <Command>
          <CommandInput
            placeholder={`Search...`}
            onValueChange={handleInputChange}
            value={searchTerm}
          />
          <CommandList>
            <CommandEmpty>No data found.</CommandEmpty>
            <CommandGroup>
              {filteredItems.map((item) => (
                <CommandItem
                  key={getItemKey(item)}
                  value={getItemLabel(item)}
                  onSelect={() => handleSelect(item)}
                  className="flex cursor-pointer items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    {renderItemDetails
                      ? renderItemDetails(item)
                      : getItemLabel(item)}
                  </div>
                  <Check
                    className={`mr-2 h-4 w-4 ${value && getItemKey(value) === getItemKey(item) ? "opacity-100" : "opacity-0"}`}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
