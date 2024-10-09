import { ControlledTextInput } from "~/components/inputs";
import { DialogContentProps } from "./types";
import { useCallback } from "react";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui";

const MaritalStatusDialogContent = (props: DialogContentProps) => {
  const handleChange = useCallback((value: string) => {
    props.onChange(value);
  }, []);
  return (
    <div className="flex flex-col p-5">
      <h2 className="mb-4 text-3xl font-semibold">{props.item.title}</h2>
      <p className="text-md text-muted-foreground">{props.item.description}</p>
      <RadioGroup
        id="gender-selector"
        value={props.value as string}
        onValueChange={handleChange}
        className="mt-8 flex flex-col space-y-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="single" id="single" />
          <Label htmlFor="single">Single</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="married" id="married" />
          <Label htmlFor="married">Married</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="other" id="other" />
          <Label htmlFor="other">Other</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default MaritalStatusDialogContent;
