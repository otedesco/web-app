import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { PropertyCard } from "~/components/property-card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui";
import LandingViewTemplate from "./components/template";

type Property = {
  id: number;
  title: string;
  location: string;
  size: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  image: string;
};

type Location = {
  id: number;
  name: string;
  properties: number;
  image: string;
};

type Testimonial = {
  id: number;
  name: string;
  location: string;
  comment: string;
  rating: number;
  avatar: string;
};

export type LandingViewProps = {
  featuredProperties: Property[];
  popularLocations: Location[];
  testimonials: Testimonial[];
};

const LandingView = ({
  featuredProperties,
  popularLocations,
  testimonials,
}: LandingViewProps) => {
  const t = useTranslations("pages->landing-page");
  return (
    <LandingViewTemplate>
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
    </LandingViewTemplate>
  );
};

export default LandingView;
