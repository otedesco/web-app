import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { PropertyCard } from "~/components/property-card";
import BaseTemplate from "~/components/templates/base-template";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

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

export default function LandingPage(props: { params: { locale: string } }) {
  unstable_setRequestLocale(props.params.locale);
  const t = useTranslations("pages->landing-page");

  return (
    <BaseTemplate>
      <main className="flex-grow">
        <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
          <section className="py-12 text-center">
            <h1 className="mb-4 text-4xl font-bold">
              {t("Find Your Dream Property")}
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              {t("Discover the perfect space in your ideal location")}
            </p>
            <Button size="lg" className="px-8 text-lg">
              {t("Start Your Search")}
            </Button>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-semibold">
              {t("Featured Properties")}
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-semibold">
              {t("Popular Locations")}
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {popularLocations.map((location) => (
                <Card key={location.id} className="overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={location.image}
                    alt={location.name}
                    className="h-40 w-full object-cover"
                  />
                  <CardHeader>
                    <CardTitle>{location.name}</CardTitle>
                    <CardDescription>
                      {t("properties-count", {
                        count: location.properties,
                      })}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>

          <section className="rounded-lg bg-accent p-8">
            <h2 className="mb-6 text-center text-2xl font-semibold">
              {t("What Our Users Say")}
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id}>
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage
                          src={testimonial.avatar}
                          alt={testimonial.name}
                        />
                        <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{testimonial.name}</CardTitle>
                        <CardDescription>
                          {testimonial.location}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{testimonial.comment}</p>
                  </CardContent>
                  <CardFooter>
                    <div className="flex items-center">
                      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
    </BaseTemplate>
  );
}
