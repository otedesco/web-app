import { ControlledTextInput } from "~/components/inputs";
import { DialogContentProps } from "./types";
import { useCallback } from "react";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui";

const GenderDialogContent = (props: DialogContentProps) => {
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
          <RadioGroupItem value="male" id="male" />
          <Label htmlFor="male">Male</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="female" id="female" />
          <Label htmlFor="female">Female</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="non-binary" id="non-binary" />
          <Label htmlFor="non-binary">Non-binary</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="other" id="other" />
          <Label htmlFor="other">Other</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default GenderDialogContent;
