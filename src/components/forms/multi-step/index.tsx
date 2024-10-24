"use client";

import React, {
  HTMLProps,
  useMemo,
  useState,
  useEffect,
  useRef,
  ComponentType,
  ReactElement,
  PropsWithChildren,
} from "react";

import { Slot, Slottable } from "@radix-ui/react-slot";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { cn } from "~/lib/utils";
import { Step, useMultiStepForm } from "./hooks";
import { MultiStepFormContext } from "./context";

interface MultiStepFormProps<T extends z.ZodType> {
  schema: T;
  form: UseFormReturn<z.infer<T>>;
  onSubmit: (data: z.infer<T>) => void;
  useStepTransition?: boolean;
  className?: string;
  steps: Step[];
}

type StepProps = PropsWithChildren<
  {
    asChild?: boolean;
    subStep?: string;
  } & React.HTMLProps<HTMLDivElement>
>;

const findChildByTypeAndName = (
  children: React.ReactNode,
  type: ComponentType,
  name?: string,
): React.ReactElement | undefined =>
  React.Children.toArray(children).find(
    (child): child is React.ReactElement =>
      React.isValidElement(child) &&
      child.type === type &&
      (name === undefined || child.props.name === name),
  );

const createForwardRef = <T, P extends object>(
  render: (
    props: P & React.RefAttributes<T>,
    ref: React.ForwardedRef<T>,
  ) => ReactElement | null,
) => React.forwardRef<T, any>(render);

export function MultiStepForm<T extends z.ZodType>({
  schema,
  form,
  onSubmit,
  children,
  className,
  steps,
}: PropsWithChildren<MultiStepFormProps<T>>) {
  const multiStepForm = useMultiStepForm(schema, form, steps);
  const header = useMemo(
    () => findChildByTypeAndName(children, MultiStepFormHeader),
    [children],
  );
  const footer = useMemo(
    () => findChildByTypeAndName(children, MultiStepFormFooter),
    [children],
  );

  const renderSubSteps = (step: Step, stepIndex: number) => {
    const subSteps = step.subSteps ?? [step.name];
    return subSteps.map((subStep, subStepIndex) => {
      const isActive =
        stepIndex === multiStepForm.currentStepIndex &&
        subStepIndex === multiStepForm.currentSubStepIndex;
      const index = stepIndex * subSteps.length + subStepIndex;
      const currentIndex =
        multiStepForm.currentStepIndex * subSteps.length +
        multiStepForm.currentSubStepIndex;

      return (
        <AnimatedStep
          key={`${step.name}-${subStep}`}
          direction={multiStepForm.direction}
          isActive={isActive}
          index={index}
          currentIndex={currentIndex}
        >
          {findChildByTypeAndName(
            children,
            MultiStepFormStep,
            `${step.name}-${subStep}`,
          )}
        </AnimatedStep>
      );
    });
  };

  return (
    <MultiStepFormContext.Provider value={multiStepForm}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn(className)}>
        {header}
        <div className="relative bg-background transition-transform duration-500">
          {steps.flatMap(renderSubSteps)}
        </div>
        {footer}
      </form>
    </MultiStepFormContext.Provider>
  );
}

export const MultiStepFormStep = createForwardRef<HTMLDivElement, StepProps>(
  ({ children, asChild, ...props }, ref) => {
    const Cmp = asChild ? Slot : "div";

    return (
      <Cmp ref={ref} {...props}>
        <Slottable>{children}</Slottable>
      </Cmp>
    );
  },
);

export const MultiStepFormHeader = createForwardRef<
  HTMLDivElement,
  { asChild?: boolean } & HTMLProps<HTMLDivElement>
>(({ children, asChild, ...props }, ref) => {
  const Cmp = asChild ? Slot : "div";
  return (
    <Cmp ref={ref} {...props}>
      <Slottable>{children}</Slottable>
    </Cmp>
  );
});

export const MultiStepFormFooter = createForwardRef<
  HTMLDivElement,
  { asChild?: boolean } & HTMLProps<HTMLDivElement>
>(({ children, asChild, ...props }, ref) => {
  const Cmp = asChild ? Slot : "div";
  return (
    <Cmp ref={ref} {...props}>
      <Slottable>{children}</Slottable>
    </Cmp>
  );
});

interface AnimatedStepProps {
  direction: "forward" | "backward" | undefined;
  isActive: boolean;
  index: number;
  currentIndex: number;
}

function AnimatedStep({
  isActive,
  direction,
  children,
  index,
  currentIndex,
}: PropsWithChildren<AnimatedStepProps>) {
  const [shouldRender, setShouldRender] = useState(isActive);
  const stepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), 300);

      return () => clearTimeout(timer);
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive && stepRef.current) {
      const focusableElement = stepRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      if (focusableElement) {
        (focusableElement as HTMLElement).focus();
      }
    }
  }, [isActive]);

  if (!shouldRender) {
    return null;
  }

  const baseClasses =
    " top-0 left-0 w-full bg-background h-full transition-all duration-300 ease-in-out animate-in fade-in zoom-in-95";

  const visibilityClasses = isActive ? "opacity-100" : "opacity-0 absolute";

  const transformClasses = cn(
    "translate-x-0",
    isActive
      ? {}
      : {
          "-translate-x-full": direction === "forward" || index < currentIndex,
          "translate-x-full": direction === "backward" || index > currentIndex,
        },
  );

  const className = cn(baseClasses, visibilityClasses, transformClasses);

  return (
    <div ref={stepRef} className={className} aria-hidden={!isActive}>
      {children}
    </div>
  );
}
