import React from "react";
import { DollarSign, MapPin, Maximize2, Search } from "lucide-react";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useTranslations } from "next-intl";

export interface SearchModalProps {
  isSearchOpen: boolean;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  Trigger?: (props: object) => React.JSX.Element;
}

export interface DefaultTriggerProps {
  location?: string;
  size?: string;
  price?: string;
}

const DefaultTrigger = ({
  location,
  size,
  price,
  ...rest
}: DefaultTriggerProps) => {
  const t = useTranslations("components->search-modal");
  return (
    <Button
      variant="outline"
      className="w-full justify-between bg-background text-left font-normal shadow-sm transition-colors hover:bg-accent/50"
      {...rest}
    >
      <div className="flex items-center space-x-4">
        <div className="flex flex-col">
          <span className="text-sm font-medium">{t("Find properties")}</span>
          <span className="text-xs text-muted-foreground">
            {t(location)} • {t(size)} • {t(price)}
          </span>
        </div>
      </div>
      <div className="rounded-full bg-primary p-2 text-primary-foreground">
        <Search className="h-4 w-4" />
      </div>
    </Button>
  );
};

DefaultTrigger.defaultProps = {
  location: "Any location",
  size: "Any size",
  price: "Any Price",
};

const SearchModal = ({
  Trigger,
  setIsSearchOpen,
  isSearchOpen,
}: SearchModalProps) => {
  const TriggerComponent = Trigger ?? DefaultTrigger;

  return (
    <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
      <DialogTrigger asChild>
        <TriggerComponent />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Search for properties</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <div className="flex items-center space-x-2 rounded-md bg-accent/50 p-3">
              <MapPin className="h-5 w-5 text-primary" />
              <Input
                placeholder="Enter location"
                className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div className="flex items-center space-x-2 rounded-md bg-accent/50 p-3">
              <Maximize2 className="h-5 w-5 text-primary" />
              <Select>
                <SelectTrigger className="border-none bg-transparent focus:ring-0">
                  <SelectValue placeholder="Property size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">
                    Small (up to 1000 sq ft)
                  </SelectItem>
                  <SelectItem value="medium">
                    Medium (1000-2000 sq ft)
                  </SelectItem>
                  <SelectItem value="large">Large (2000-3000 sq ft)</SelectItem>
                  <SelectItem value="xlarge">
                    Extra Large (3000+ sq ft)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2 rounded-md bg-accent/50 p-3">
              <DollarSign className="h-5 w-5 text-primary" />
              <Select>
                <SelectTrigger className="border-none bg-transparent focus:ring-0">
                  <SelectValue placeholder="Price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-100k">$0 - $100,000</SelectItem>
                  <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                  <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
                  <SelectItem value="500k+">$500,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end space-x-2">
          <Button variant="outline" onClick={() => setIsSearchOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsSearchOpen(false)}>Search</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default SearchModal;
