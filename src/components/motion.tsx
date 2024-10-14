import {
  AnimatePresence,
  AnimatePresenceProps,
  LazyMotion,
  LazyProps,
  m,
} from "framer-motion";
import { FC } from "react";

export const LazyAnimatePresence: FC<
  React.PropsWithChildren<LazyProps & AnimatePresenceProps>
> = (props) => {
  return (
    <LazyMotion features={props.features} strict>
      <AnimatePresence {...props}>{props.children}</AnimatePresence>
    </LazyMotion>
  );
};

const defaultAnimationMap = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 1 },
  transition: { duration: 0.5 },
};

export const LazyAnimatePresenceWithMotion: FC<
  React.PropsWithChildren<LazyProps & AnimatePresenceProps>
> = (props) => {
  return (
    <LazyMotion features={props.features} strict>
      <AnimatePresence {...props}>
        <m.div {...defaultAnimationMap}>{props.children}</m.div>
      </AnimatePresence>
    </LazyMotion>
  );
};

export const animationHandler = (element: HTMLElement | null) => {
  if (!element) return;
  if (element.classList.contains("animate-appear")) {
    element.classList.remove("animate-appear");
    element.classList.add("animate-disappear");
  } else {
    element.classList.remove("animate-disappear");
    element.classList.add("animate-appear");
  }
};
