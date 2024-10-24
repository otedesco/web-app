import { useCallback, useContext, useMemo, useState } from "react";
import { Path, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { MultiStepFormContext } from "./context";
/**
 * @name useMultiStepForm
 * @description Hook for multi-step forms
 * @param schema
 * @param form
 * @param stepNames
 */
// Add this new type
export type Step = {
  name: string;
  subSteps?: string[];
};

export function useMultiStepForm<Schema extends z.ZodType>(
  schema: Schema,
  form: UseFormReturn<z.infer<Schema>>,
  steps: Step[],
) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentSubStepIndex, setCurrentSubStepIndex] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">();

  const flattenedSteps = useMemo(() => {
    return steps.flatMap((step) =>
      step.subSteps
        ? step.subSteps.map((subStep) => `${step.name}.${subStep}`)
        : [step.name],
    );
  }, [steps]);

  const isStepValid = useCallback(() => {
    const currentStepName = flattenedSteps[currentStepIndex] as Path<
      z.TypeOf<Schema>
    >;

    if (schema instanceof z.ZodObject) {
      const currentStepSchema = schema.shape[currentStepName] as z.ZodType;

      // the user may not want to validate the current step
      // or the step doesn't contain any form field
      if (!currentStepSchema) {
        return true;
      }

      const currentStepData = form.getValues(currentStepName) ?? {};
      const result = currentStepSchema.safeParse(currentStepData);

      return result.success;
    }

    throw new Error(`Unsupported schema type: ${schema.constructor.name}`);
  }, [schema, form, flattenedSteps, currentStepIndex]);

  const nextStep = useCallback(
    <Ev extends React.SyntheticEvent>(e: Ev) => {
      e.preventDefault();
      if (isStepValid()) {
        const currentStep = steps[currentStepIndex];
        if (
          currentStep?.subSteps &&
          currentSubStepIndex < currentStep.subSteps.length - 1
        ) {
          setCurrentSubStepIndex((prev) => prev + 1);
        } else {
          if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex((prev) => prev + 1);
            setCurrentSubStepIndex(0);
          }
        }
        setDirection("forward");
      } else {
        const currentStepName = flattenedSteps[currentStepIndex] as Path<
          z.TypeOf<Schema>
        >;

        if (schema instanceof z.ZodObject) {
          const currentStepSchema = schema.shape[currentStepName] as z.ZodType;

          if (currentStepSchema) {
            const fields = Object.keys(
              (currentStepSchema as z.ZodObject<never>).shape,
            );
            const keys = fields.map((field) => `${currentStepName}.${field}`);

            // trigger validation for all fields in the current step
            for (const key of keys) {
              void form.trigger(key as Path<z.TypeOf<Schema>>);
            }
          }
        }
      }
    },
    [
      isStepValid,
      currentStepIndex,
      currentSubStepIndex,
      steps,
      flattenedSteps,
      schema,
      form,
    ],
  );

  const prevStep = useCallback(
    <Ev extends React.SyntheticEvent>(e: Ev) => {
      e.preventDefault();
      const currentStep = steps[currentStepIndex];
      if (currentStep?.subSteps && currentSubStepIndex > 0) {
        setCurrentSubStepIndex((prev) => prev - 1);
      } else {
        if (currentStepIndex > 0) {
          setCurrentStepIndex((prev) => prev - 1);
          const prevStep = steps[currentStepIndex - 1];
          setCurrentSubStepIndex(
            prevStep?.subSteps ? prevStep.subSteps.length - 1 : 0,
          );
        }
      }
      setDirection("backward");
    },
    [currentStepIndex, currentSubStepIndex, steps],
  );

  const goToStep = useCallback(
    (stepIndex: number, subStepIndex = 0) => {
      if (stepIndex >= 0 && stepIndex < steps.length && isStepValid()) {
        setDirection(stepIndex > currentStepIndex ? "forward" : "backward");
        setCurrentStepIndex(stepIndex);
        setCurrentSubStepIndex(subStepIndex);
      }
    },
    [isStepValid, steps.length, currentStepIndex],
  );

  const isValid = form.formState.isValid;
  const errors = form.formState.errors;

  return useMemo(
    () => ({
      steps,
      form,
      currentStep: steps[currentStepIndex]?.name,
      currentSubStep: steps[currentStepIndex]?.subSteps?.[currentSubStepIndex],
      currentStepIndex,
      currentSubStepIndex,
      totalSteps: steps.length,
      totalSubSteps: steps[currentStepIndex]?.subSteps?.length ?? 0,
      isFirstStep: currentStepIndex === 0 && currentSubStepIndex === 0,
      isLastStep:
        currentStepIndex === steps.length - 1 &&
        currentSubStepIndex ===
          (steps[currentStepIndex]?.subSteps?.length ?? 1) - 1,
      nextStep,
      prevStep,
      goToStep,
      direction,
      isStepValid,
      isValid,
      errors,
    }),
    [
      form,
      steps,
      currentStepIndex,
      currentSubStepIndex,
      nextStep,
      prevStep,
      goToStep,
      direction,
      isStepValid,
      isValid,
      errors,
    ],
  );
}

export function useMultiStepFormContext<Schema extends z.ZodType>() {
  const context = useContext(MultiStepFormContext) as ReturnType<
    typeof useMultiStepForm<Schema>
  >;

  if (!context) {
    throw new Error(
      "useMultiStepFormContext must be used within a MultiStepForm",
    );
  }

  return context;
}
