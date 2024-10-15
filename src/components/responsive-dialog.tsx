import React from "react";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui";

export type ResponsiveDialogProps = {
  Trigger: React.ReactNode;
  Content?: React.ReactNode;
  Footer?: React.ReactNode;
  title?: string | React.ReactNode;
  asChild?: boolean;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const ResponsiveDialog: React.FC<ResponsiveDialogProps> = ({
  Trigger,
  Content,
  Footer,
  title,
  isOpen,
  onOpenChange,
  asChild = false,
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const Container = isMobile ? Drawer : Dialog;
  const TriggerWrapper = isMobile ? DrawerTrigger : DialogTrigger;
  const ContentWrapper = isMobile ? DrawerContent : DialogContent;
  const FooterWrapper = isMobile ? DrawerFooter : DialogFooter;
  const Header = isMobile ? DrawerHeader : DialogHeader;
  const Title = isMobile ? DrawerTitle : DialogTitle;
  return (
    <Container handleOnly open={isOpen} onOpenChange={onOpenChange}>
      <TriggerWrapper asChild={asChild}>{Trigger}</TriggerWrapper>
      <ContentWrapper>
        {typeof title === "string" ? (
          <Header>
            <Title className="text-center">{title}</Title>
          </Header>
        ) : (
          <Header>{title}</Header>
        )}
        {Content && Content}
        <FooterWrapper>{Footer}</FooterWrapper>
      </ContentWrapper>
    </Container>
  );
};

export default ResponsiveDialog;
