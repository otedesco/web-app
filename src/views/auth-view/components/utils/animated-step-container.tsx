import { motion } from "framer-motion";
import React, { memo } from "react";
import { cn } from "~/lib/utils";

export interface AnimatedStepContainerProps {
  className?: string;
}

const AnimatedStepContainer: React.FC<
  React.PropsWithChildren<AnimatedStepContainerProps>
> = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className={cn("flex flex-col items-center", props.className)}
    >
      {props.children}
    </motion.div>
  );
};

export default memo(AnimatedStepContainer);