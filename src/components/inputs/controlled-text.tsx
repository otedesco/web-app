"use client";

import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";

const ControlledTextInput = ({
  id,
  label,
  className,
}: {
  id?: string;
  label?: string;
  className?: string;
}) => {
  const [text, setText] = useState("");
  const maxLength = 100;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    if (newText.length <= maxLength) {
      setText(newText);
    }
  };

  return (
    <div className={cn(className)}>
      {label && id && <Label htmlFor={id}>{label}</Label>}
      <div className="flex min-w-full flex-row">
        <Input
          id="character-input"
          placeholder="Type here..."
          value={text}
          onChange={handleInputChange}
          maxLength={maxLength}
        />
        <div className="ml-2 content-center px-2 text-sm text-muted-foreground">
          {text.length}/{maxLength}
        </div>
      </div>
    </div>
  );
};

export default ControlledTextInput;
