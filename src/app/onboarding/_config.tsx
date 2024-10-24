import { HeaderConfig } from "~/components/navigation-menu/main-nav";

// const extraComponent = (
//   <div className="flex items-center">
//     <PublishLink asText />
//     <Button variant="default" size="sm">
//       Get Started
//     </Button>
//   </div>
// );

export const headerConfig: HeaderConfig = {
  type: "minimal",
  hasUserMenu: false,
  hasThemeToggle: false,
  hasSearchBox: false,
  logoType: "auto",
  showRightSideOnMobile: false,
  showOnMobile: true,
  // extraComponent,
};
