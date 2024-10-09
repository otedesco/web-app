import { ControlledTextInput } from "~/components/inputs";
import { DialogContentProps } from "./types";
import { useCallback } from "react";

const WorkDialogContent = (props: DialogContentProps) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    props.onChange(e.target.value);
  }, []);
  return (
    <div className="flex flex-col p-5">
      <h2 className="mb-4 text-3xl font-semibold">{props.item.title}</h2>
      <p className="text-md text-muted-foreground">{props.item.description}</p>
      <ControlledTextInput
        maxLength={40}
        value={props.value as string}
        className="mt-8"
        onChange={handleChange}
      />
    </div>
  );
};

export default WorkDialogContent;
