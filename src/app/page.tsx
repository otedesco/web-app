import LandingView from "~/views/landing-view";
import { featuredProperties, popularLocations, testimonials } from "./data";

// Generate metadata
export async function generateMetadata() {
  return {
    title: "title",
    description: "meta description",
  };
}

// Landing page component
const LandingPage = () => {
  return (
    <LandingView
      featuredProperties={featuredProperties}
      popularLocations={popularLocations}
      testimonials={testimonials}
    />
  );
};

export default LandingPage;
