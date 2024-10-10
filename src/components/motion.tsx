import {
  AnimatePresence,
  AnimatePresenceProps,
  LazyMotion,
  LazyProps,
  Variants,
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
