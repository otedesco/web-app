import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ResponsiveDialog from "~/components/responsive-dialog";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "~/components/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AvatarField from "~/components/forms/form-fields/avatar-field";
import { cn } from "~/lib/utils";

const Item = ({
  title,
  description,
  icon: Icon,
  img,
  className = "",
  cardClassName = "",
  imageClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  children,
  ...props
}: {
  title: string;
  description: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  img: string;
  className?: string;
  cardClassName?: string;
  imageClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`relative max-w-96 transition-all duration-300 md:h-96 md:w-1/3 ${className}`}
    {...props}
  >
    <div className="absolute z-0 h-full w-full scale-[0.80] rounded-lg bg-brand-primary/50 blur-3xl" />
    <Card
      className={`group/card relative z-10 flex h-full flex-col justify-end border-none drop-shadow-lg transition-all duration-300 hover:z-20 md:hover:scale-110 ${cardClassName}`}
    >
      <Image
        src={img}
        alt="roles-card-bg"
        width={1200}
        height={800}
        quality={85}
        loading="lazy"
        className={`absolute -z-10 h-full w-full rounded-lg object-cover ${imageClassName}`}
      />
      <div className="absolute left-0 top-0 -z-10 h-full w-full rounded-lg bg-gradient-to-b from-transparent via-black/90 to-black opacity-100" />
      <CardHeader className="z-10">
        <CardTitle className="z-10 flex items-center gap-2">
          <h3
            className={`text-xl font-semibold text-white dark:text-gray-100 ${titleClassName}`}
          >
            {title}
          </h3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p
          className={`z-10 text-sm text-gray-200 group-hover/card:text-white dark:text-gray-300 dark:group-hover/card:text-gray-100 ${descriptionClassName}`}
        >
          {description}
        </p>
        {children}
      </CardContent>
    </Card>
  </div>
);

const professionalProfileSchema = z.object({
  avatarUrl: z.string().optional(),
});

const ProfessionalProfileForm = () => {
  const form = useForm<z.infer<typeof professionalProfileSchema>>();
  const onSubmit = async (
    values: z.infer<typeof professionalProfileSchema>,
  ) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form
        className="mb-5 flex w-full flex-col items-center gap-8 px-8 md:px-10 md:py-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <p className="text-sm text-gray-500">
          Don&apos;t worry, you can change this later.
        </p>
        <AvatarField control={form.control} name="avatarUrl" />
        <Button className="mb-4 min-w-24">Done</Button>
      </form>
    </Form>
  );
};

const ProfileCard = ({
  title,
  description,
  img,
  dialogTitle,
}: {
  title: string;
  description: string;
  img: string;
  dialogTitle: string;
}) => {
  const [open, setOpen] = useState(false);
  const Content = <ProfessionalProfileForm />;

  return (
    <>
      <ResponsiveDialog
        isOpen={open}
        Content={Content}
        title={dialogTitle}
        onOpenChange={setOpen}
      />
      <Item
        onClick={() => setOpen(true)}
        title={title}
        description={description}
        icon={User}
        img={img}
      />
    </>
  );
};

const LandLordCard = () => (
  <ProfileCard
    title="Rent or Sell Your Property"
    description="Got a property to list? Whether you're renting or selling, we make it easy for you to connect with the right people. Manage your listings, track offers, and find the perfect tenants or buyers—all in one place."
    img="/images/owner.jpg"
    dialogTitle="Setup your professional profile avatar"
  />
);

const RealtorCard = () => (
  <ProfileCard
    title="Manage Your Property Portfolio"
    description="For agents managing properties on their own, streamline your business. Showcase your listings, manage inquiries, and grow your client base with powerful tools designed just for you."
    img="/images/realtor.jpg"
    dialogTitle="Setup your professional profile"
  />
);

const companyProfileSchema = z.object({
  logoUrl: z.string().optional(),
  name: z
    .string({ required_error: "The company name is required" })
    .min(2, { message: "Name must be at least 2 characters." }),
  country: z
    .string({ required_error: "The country is required" })
    .min(2, { message: "Country must be at least 2 characters." }),
});

const CompanyProfileForm = () => {
  const form = useForm<z.infer<typeof companyProfileSchema>>();
  const onSubmit = async (values: z.infer<typeof companyProfileSchema>) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form
        className="mb-5 flex w-full flex-col items-center gap-8 px-8 md:px-10 md:py-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <p className="text-sm text-muted-foreground">
          <strong className="text-md text-foreground">Set your Logo</strong>
          <br />
          Don&apos;t worry, you can change this later.
        </p>
        <AvatarField control={form.control} name="avatarUrl" />
        <div className="flex w-full flex-col gap-4 md:w-2/3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company name</FormLabel>
                <FormControl>
                  <Input className="w-full" {...field} />
                </FormControl>
                <FormMessage
                  className={cn(
                    "text-xs text-red-500 opacity-0",
                    form.formState.errors.name && "opacity-1",
                  )}
                >
                  {form.formState.errors.name?.message ?? "Name"}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input className="w-full" {...field} />
                </FormControl>
                <FormMessage
                  className={cn(
                    "text-xs text-red-500 opacity-0",
                    form.formState.errors.country && "opacity-1",
                  )}
                >
                  {form.formState.errors.country?.message ?? "Country"}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>
        <Button className="mb-4 min-w-24">Done</Button>
      </form>
    </Form>
  );
};

const CompanyCard = () => {
  const [open, setOpen] = useState(false);
  const title = (
    <h2 className="text-xl font-semibold">Setup your company profile</h2>
  );
  const Content = <CompanyProfileForm />;

  return (
    <>
      <ResponsiveDialog
        isOpen={open}
        Content={Content}
        title={title}
        onOpenChange={setOpen}
      />
      <Item
        onClick={() => setOpen(true)}
        title="Grow Your Real Estate Business"
        description="As a real estate company, bring your team together. Manage multiple agents, properties, and clients all in one place. Scale your business with powerful tools built for growing agencies."
        img="/images/company.jpg"
      />
    </>
  );
};

const RolesCards = () => (
  <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center gap-4 md:min-h-[calc(100vh-4rem)] md:flex-row">
    <LandLordCard />
    <RealtorCard />
    <CompanyCard />
  </div>
);

export default RolesCards;
