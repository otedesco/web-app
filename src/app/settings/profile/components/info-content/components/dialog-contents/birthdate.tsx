import CustomCalendar from "~/components/custom-calendar";

const BirthdateDialogContent = ({
  item,
}: {
  item: { title: string; description: string; value: string };
}) => {
  return (
    <div className="flex flex-col p-5">
      <h2 className="mb-4 text-3xl font-semibold">{item.title}</h2>
      <p className="text-md text-muted-foreground">{item.description}</p>
      <CustomCalendar />
    </div>
  );
};

export default BirthdateDialogContent;
