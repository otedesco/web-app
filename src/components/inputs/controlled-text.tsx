"use client";

import { Input, InputProps } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";

const ControlledTextInput = ({
  id,
  label,
  className,
  onChange,
  value,
  maxLength,
}: {
  id?: string;
  label?: string;
  value?: string;
  maxLength: number;
} & InputProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    if (newText.length <= maxLength) {
      onChange?.(e);
    }
  };

  return (
    <div className={cn(className)}>
      {label && id && <Label htmlFor={id}>{label}</Label>}
      <div className="flex min-w-full flex-row">
        <Input
          id="character-input"
          placeholder="Type here..."
          value={value}
          onChange={handleInputChange}
          maxLength={maxLength}
        />
        <div className="ml-2 content-center px-2 text-sm text-muted-foreground">
          {!value ? 0 : value.length}/{maxLength}
        </div>
      </div>
    </div>
  );
};

export default ControlledTextInput;
