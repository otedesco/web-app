// import { useTheme } from "next-themes";
// import { Button } from "../ui";
// import { Progress } from "../ui/progress";
// import { cn } from "~/lib/utils";

import { z } from "zod";
import {
  MultiStepForm,
  MultiStepFormFooter,
  MultiStepFormStep,
} from "../forms/multi-step";
import { useForm } from "react-hook-form";
import { Step, useMultiStepFormContext } from "../forms/multi-step/hooks";
import { MultiStepFormContextProvider } from "../forms/multi-step/context";
import { Progress } from "../ui/progress";
import { Button } from "../ui";
import { cn } from "~/lib/utils";
import { useTheme } from "next-themes";

const Stepper = ({
  totalSteps,
  nextStep,
  prevStep,
  ...props
}: ReturnType<typeof useMultiStepFormContext>) => {
  const { currentStepIndex, currentSubStepIndex, steps } = props;

  const calculateProgress = (stepIndex: number) => {
    const step = steps[stepIndex];
    if (!step?.subSteps) {
      return stepIndex < currentStepIndex ? 100 : 0;
    }

    if (stepIndex < currentStepIndex) {
      return 100;
    } else if (stepIndex > currentStepIndex) {
      return 0;
    } else {
      return ((currentSubStepIndex + 1) / step.subSteps.length) * 100;
    }
  };

  const ProgressBar = [...Array(totalSteps)].map((_, index) => (
    <Progress
      key={index}
      value={calculateProgress(index)}
      className="h-1 rounded-none bg-muted-foreground [&>*]:bg-brand-primary"
    />
  ));
  return (
    <div className="mt-auto flex min-h-24 w-full flex-col">
      <div className="flex w-full flex-row gap-2">{ProgressBar}</div>
      <div className="my-auto flex h-full w-full flex-row items-center px-4">
        <Button variant="link" onClick={prevStep}>
          Back
        </Button>
        <Button className="ml-auto" onClick={nextStep}>
          Next
        </Button>
      </div>
    </div>
  );
};

const PropertyBasicInfoStep = () => {
  const { theme } = useTheme();
  return (
    <div className="mx-auto flex h-full min-h-full max-w-screen-lg flex-col items-center gap-4 px-4 md:flex-row">
      <div className="order-last flex flex-col gap-2 md:order-first md:w-1/2">
        <h3 className="text-base text-primary md:text-[1.125rem]">Step 1</h3>
        <h2 className="text-[2rem] leading-none md:text-[3rem]">
          Tell us about your place
        </h2>
        <p className="text-muted-foreground">
          In this step, we&apos;ll ask you which type of property you have and
          if guests will book the entire place or just a room. Then let us know
          the location and how many guests can stay.
        </p>
      </div>
      <div className="relative overflow-hidden rounded-lg md:w-1/2">
        <div
          className={cn(
            "absolute left-0 top-0 z-10 h-full w-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))]",
            theme === "dark" &&
              "from-background/10 via-background/60 to-background",
            theme === "light" &&
              "from-black/30 via-background/20 to-background/80",
          )}
        />
        <video
          className="w-full rounded-lg"
          width="320"
          height="240"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
        >
          <source src="/images/interior-video.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

// const PropertyWizard = () => {
//   const { theme } = useTheme();

//   return (
//     <div className="flex min-h-[calc(100vh-4rem)] w-full flex-col bg-background">
//
//       <Stepper />
//     </div>
//   );
// };

// export default PropertyWizard;

const schema = z.object({
  name: z.string(),
});

const PropertyWizard = () => {
  const form = useForm<z.infer<typeof schema>>();
  const handleSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);
  };

  const steps: Step[] = [
    {
      name: "propertyBasicInfo",
      subSteps: ["stepDescription", "basicInfo", "location"],
    },
    { name: "multimedia", subSteps: ["stepDescription", "multimedia"] },
    { name: "extraInfo", subSteps: ["stepDescription", "extraInfo"] },
  ];

  return (
    <MultiStepForm
      className="flex min-h-[calc(100dvh-4rem)] w-full flex-col overflow-hidden bg-background [&>*:first-child]:h-full"
      schema={schema}
      form={form}
      onSubmit={handleSubmit}
      steps={steps}
    >
      <MultiStepFormStep
        asChild
        name={`${steps[0]?.name}-${steps[0]?.subSteps?.[0]}`}
      >
        <PropertyBasicInfoStep />
      </MultiStepFormStep>
      <MultiStepFormStep
        asChild
        name={`${steps[0]?.name}-${steps[0]?.subSteps?.[1]}`}
      >
        <div>Step 1.2</div>
      </MultiStepFormStep>
      <MultiStepFormStep
        asChild
        name={`${steps[0]?.name}-${steps[0]?.subSteps?.[2]}`}
      >
        <div>Step 1.3</div>
      </MultiStepFormStep>
      <MultiStepFormStep
        asChild
        name={`${steps[1]?.name}-${steps[1]?.subSteps?.[0]}`}
      >
        <div>Step 2.1</div>
      </MultiStepFormStep>
      <MultiStepFormStep
        asChild
        name={`${steps[1]?.name}-${steps[1]?.subSteps?.[1]}`}
      >
        <div>Step 2.2</div>
      </MultiStepFormStep>
      <MultiStepFormStep
        asChild
        name={`${steps[2]?.name}-${steps[2]?.subSteps?.[0]}`}
      >
        <div>Step 3.1</div>
      </MultiStepFormStep>
      <MultiStepFormStep
        asChild
        name={`${steps[2]?.name}-${steps[2]?.subSteps?.[1]}`}
      >
        <div>Step 3.2</div>
      </MultiStepFormStep>
      <MultiStepFormFooter asChild>
        <MultiStepFormContextProvider>
          {(ctx) => <Stepper {...ctx} />}
        </MultiStepFormContextProvider>
      </MultiStepFormFooter>
    </MultiStepForm>
  );
};

export default PropertyWizard;
