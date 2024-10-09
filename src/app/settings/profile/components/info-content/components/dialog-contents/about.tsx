import { ControlledTextInput } from "~/components/inputs";
import { DialogContentProps } from "./types";
import { useCallback } from "react";
import { Textarea } from "~/components/ui/textarea";

const AboutDialogContent = (props: DialogContentProps) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      e.preventDefault();

      props.onChange(e.target.value);
    },
    [],
  );

  return (
    <div className="flex flex-col p-5">
      <h2 className="mb-4 text-3xl font-semibold">{props.item.title}</h2>
      <p className="text-md text-muted-foreground">{props.item.description}</p>
      <Textarea
        maxLength={400}
        value={props.value as string}
        className="mt-8"
        onChange={handleChange}
      />
    </div>
  );
};

export default AboutDialogContent;
