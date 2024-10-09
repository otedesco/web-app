import CustomCalendar from "~/components/custom-calendar";
import { type DialogContentProps } from "./types";

const BirthdateDialogContent = (props: DialogContentProps) => {
  const handleSelectDate = (date: Date) => {
    props.onChange(date);
  };

  return (
    <div className="flex flex-col p-5">
      <h2 className="mb-4 text-3xl font-semibold">{props.item.title}</h2>
      <p className="text-md text-muted-foreground">{props.item.description}</p>
      <CustomCalendar
        onSelect={handleSelectDate}
        value={props.value ? new Date(props.value as string) : new Date()}
      />
    </div>
  );
};

export default BirthdateDialogContent;
