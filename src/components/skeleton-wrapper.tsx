import { domAnimation, domMax, HTMLMotionProps, m } from "framer-motion";
import { LazyAnimatePresence } from "./motion";
import { Skeleton } from "./ui";

const AnimationWrapper: React.FC<HTMLMotionProps<"div">> = ({
  children,
  ...props
}) => (
  <m.div
    className="relative animate-appear opacity-0 will-change-[opacity]"
    {...props}
  >
    {children}
  </m.div>
);

const SkeletonWrapper = ({ isDataReady, children, ...props }: any) => {
  return (
    <LazyAnimatePresence features={domAnimation}>
      {isDataReady && (
        <AnimationWrapper
          transition={{ duration: 1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          key="content"
        >
          {children}
        </AnimationWrapper>
      )}
      {!isDataReady && (
        <AnimationWrapper key="skeleton">
          <Skeleton {...props} />
        </AnimationWrapper>
      )}
    </LazyAnimatePresence>
  );
};

export default SkeletonWrapper;
