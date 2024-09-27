export type LinkProps = {
  target?: string;
  rel?: string;
};

export interface MenuOption {
  label: string;
  href: string;
  linkProps?: LinkProps;
  icon?: React.ReactNode;
}

export type MenuDialogProps = {
  isLoggedIn: boolean;
  onLogout: () => void;
  options?: MenuOption[];
  loggedOptions?: MenuOption[];
  highlightedOptions?: MenuOption[];
  loggedHighlightedOptions?: MenuOption[];
};
