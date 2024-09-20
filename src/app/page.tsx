import LandingView from "~/views/landing-view";

export async function generateMetadata() {
  return {
    title: "title",
    description: "meta description",
  };
}

const featuredProperties = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    location: "New York, NY",
    size: 1200,
    bedrooms: 2,
    bathrooms: 2,
    price: 750000,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Suburban Family Home",
    location: "Austin, TX",
    size: 2500,
    bedrooms: 4,
    bathrooms: 3,
    price: 550000,
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Beachfront Condo",
    location: "Miami, FL",
    size: 1800,
    bedrooms: 3,
    bathrooms: 2,
    price: 900000,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  },
];

const popularLocations = [
  {
    id: 1,
    name: "New York",
    properties: 1500,
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Los Angeles",
    properties: 1200,
    image:
      "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Chicago",
    properties: 900,
    image:
      "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Houston",
    properties: 800,
    image:
      "https://images.unsplash.com/photo-1530089711124-9ca31fb9e863?auto=format&fit=crop&w=800&q=80",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, NY",
    comment:
      "Apart made it so easy to find my dream apartment. The search features are intuitive and the listings are always up-to-date.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "San Francisco, CA",
    comment:
      "As a first-time homebuyer, I appreciated the wealth of information Apart provided. It helped me make an informed decision.",
    rating: 4,
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    location: "Miami, FL",
    comment:
      "The virtual tours feature saved me so much time. I was able to narrow down my choices before even leaving my house!",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=3",
  },
];

export default function LandingPage() {
  // unstable_setRequestLocale(props.params.locale);

  return (
    <LandingView
      featuredProperties={featuredProperties}
      popularLocations={popularLocations}
      testimonials={testimonials}
    />
  );
}
