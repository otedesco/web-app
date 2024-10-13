import { domAnimation, HTMLMotionProps, m } from "framer-motion";
import { animationHandler, LazyAnimatePresence } from "./motion";
import { Skeleton } from "./ui";
import { useRef } from "react";

const AnimationWrapper: React.FC<HTMLMotionProps<"div">> = ({
  children,
  ...props
}) => (
  <m.div
    layout="preserve-aspect"
    className="relative animate-appear opacity-0 will-change-[opacity]"
    {...props}
  >
    {children}
  </m.div>
);

const SkeletonWrapper = ({ isDataReady, children, ...props }: any) => {
  const animationRef = useRef<HTMLDivElement>(null);
  return (
    <LazyAnimatePresence features={domAnimation}>
      {isDataReady && (
        <AnimationWrapper
          onAnimationStart={() => animationHandler(animationRef.current)}
          transition={{ duration: 10 }}
          key="content"
        >
          {children}
        </AnimationWrapper>
      )}
      {!isDataReady && (
        <AnimationWrapper
          key="skeleton"
          onAnimationStart={() => animationHandler(animationRef.current)}
          transition={{ duration: 10 }}
        >
          <Skeleton {...props} />
        </AnimationWrapper>
      )}
    </LazyAnimatePresence>
  );
};

export default SkeletonWrapper;
