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
  Drawer,
  DrawerContent,
  DrawerTrigger,
  ScrollArea,
} from "~/components/ui";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "~/lib/utils";
import { useMediaQuery } from "~/hooks/useMediaQuery";

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
  const isMobile = useMediaQuery("(max-width: 768px)");

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

  const Wrapper = isMobile ? Drawer : Popover;
  const Trigger = isMobile ? DrawerTrigger : PopoverTrigger;
  const Content = isMobile ? DrawerContent : PopoverContent;

  return (
    <Wrapper open={isOpen} onOpenChange={setOpen} handleOnly>
      <Trigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className={cn("w-full justify-between", className)}
          disabled={disabled}
        >
          {value ? (
            <div className="flex items-end gap-2">
              {renderItemDetails
                ? renderItemDetails(value)
                : getItemLabel(value)}
            </div>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </Trigger>

      <Content className="p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Search..."
            onValueChange={handleInputChange}
            value={searchTerm}
          />
          <CommandList>
            <CommandEmpty>No data found.</CommandEmpty>
            <ScrollArea className="[&>[data-radix-scroll-area-viewport]]:max-h-[300px]">
              <CommandGroup>
                {filteredItems.map((item) => (
                  <CommandItem
                    key={getItemKey(item)}
                    value={getItemLabel(item)}
                    onSelect={() => handleSelect(item)}
                    className={cn(
                      "flex cursor-pointer items-center justify-between",
                      isMobile ? "text-md" : "text-sm",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {renderItemDetails
                        ? renderItemDetails(item)
                        : getItemLabel(item)}
                    </div>
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value && getItemKey(value) === getItemKey(item)
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
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
