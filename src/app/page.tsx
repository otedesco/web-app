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
    <main className="mb-8 mt-16 md:mb-0">
      <LandingView
        featuredProperties={featuredProperties}
        popularLocations={popularLocations}
        testimonials={testimonials}
      />
    </main>
  );
};

export default LandingPage;
