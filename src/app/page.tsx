import LandingView from "~/views/landing-view";
import { featuredProperties, popularLocations, testimonials } from "./data";
import PageContainer from "~/components/layout/page-container";

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
    <PageContainer>
      <LandingView
        featuredProperties={featuredProperties}
        popularLocations={popularLocations}
        testimonials={testimonials}
      />
    </PageContainer>
  );
};

export default LandingPage;
