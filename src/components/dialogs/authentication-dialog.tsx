import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SignInForm from "../forms/sign-in-form";
import ResponsiveDialog from "../responsive-dialog";
import { Button } from "../ui";
import SignUpForm from "../forms/sign-up-form";
import { SetUpProfileForm } from "../forms/set-up-profile-form";
import VerifyAccountForm from "../forms/verify-account-form";
import { VerificationMethod } from "~/lib/cerberus/types";

enum AuthFlow {
  REGISTER,
  LOGIN,
}

type StepsProps = {
  onSuccess: () => void;
};

const SignInStep = ({ onSuccess }: StepsProps) => (
  <SignInForm className="my-auto min-h-full" onSuccess={onSuccess} />
);

const SignUpStep = ({ onSuccess }: StepsProps) => (
  <SignUpForm className="my-auto min-h-full" onSuccess={onSuccess} />
);

const SetUpProfileStep = ({ onSuccess }: StepsProps) => (
  <SetUpProfileForm className="my-auto min-h-full" onSuccess={onSuccess} />
);

const VerifyAccountStep = ({ onSuccess }: StepsProps) => (
  <VerifyAccountForm
    className="my-auto min-h-full"
    verificationMethod={VerificationMethod.EMAIL}
    onSuccess={onSuccess}
  />
);

const Steps = {
  [AuthFlow.LOGIN]: [SignInStep],
  [AuthFlow.REGISTER]: [SignUpStep, SetUpProfileStep, VerifyAccountStep],
};

const Content = ({
  selectedFlow,
  onFinish,
  onStarted,
}: {
  selectedFlow: AuthFlow;
  onStarted: () => void;
  onFinish: () => void;
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const CurrentComponent = Steps[selectedFlow][currentStepIndex];

  const handleSuccess = () => {
    if (currentStepIndex < Steps[selectedFlow].length - 1) {
      onStarted();
      setCurrentStepIndex((prevIndex) => prevIndex + 1);
    } else {
      // Handle completion of the flow
      onFinish();
    }
  };

  return (
    <div className="my-auto flex flex-col gap-4 py-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedFlow}-${currentStepIndex}`}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
        >
          {CurrentComponent && <CurrentComponent onSuccess={handleSuccess} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const AuthenticationDialog = ({
  isOpen,
  onFinish,
}: {
  isOpen: boolean;
  onFinish: () => void;
}) => {
  const [selectedFlow, setSelectedFlow] = useState<AuthFlow>(AuthFlow.LOGIN);
  const [isStarted, setIsStarted] = useState<boolean>(false);

  const handleStartedFlow = () => {
    setIsStarted(true);
  };

  const handleFlowChange = (flow: AuthFlow) => {
    setSelectedFlow(flow);
  };

  const loginFooter = (
    <span className="mx-auto flex items-center px-4 text-muted-foreground md:mx-0 md:mr-auto">
      Don&apos;t have an account?
      <Button
        className="px-1 md:no-underline"
        onClick={() => handleFlowChange(AuthFlow.REGISTER)}
        variant="link"
      >
        Sign Up
      </Button>
    </span>
  );

  const registerFooter = (
    <span className="mx-auto flex items-center px-4 text-muted-foreground md:mx-0 md:mr-auto">
      Already have an account?
      <Button
        className="px-1 md:no-underline"
        onClick={() => handleFlowChange(AuthFlow.LOGIN)}
        variant="link"
      >
        Sign In
      </Button>
    </span>
  );

  const Footer = selectedFlow === AuthFlow.LOGIN ? loginFooter : registerFooter;

  return (
    <ResponsiveDialog
      className="min-h-[500px] overflow-hidden p-0"
      isOpen={isOpen}
      Content={
        <Content
          selectedFlow={selectedFlow}
          onStarted={handleStartedFlow}
          onFinish={onFinish}
        />
      }
      Footer={
        !isStarted && (
          <div className="w-full justify-center border-t p-4">{Footer}</div>
        )
      }
    />
  );
};

export default AuthenticationDialog;
