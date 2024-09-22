import LandingView from "~/views/landing-view";
import { cookies } from "next/headers";
import {
  Cog,
  Heart,
  HelpCircle,
  History,
  LogIn,
  LogOut,
  MessageSquare,
  MessageSquareMore,
  Newspaper,
  Phone,
  Search,
  User,
  UserPlus,
} from "lucide-react";
import { MainNav, MobileMenu } from "~/components/navigation-menu";
import { MainFooter } from "~/components/footer";
import memoize from "lodash/memoize";

// Generate metadata
export async function generateMetadata() {
  return {
    title: "title",
    description: "meta description",
  };
}

// Mobile menu options based on login status
const getMobileMenuOptions = memoize((isLoggedIn: boolean) => {
  const baseOptions = [
    {
      label: "Explore",
      href: "/",
      icon: <Search className="mb-1 h-6 w-6" />,
    },
    {
      label: "Wishlist",
      href: "/wishlist",
      icon: <Heart className="mb-1 h-6 w-6" />,
    },
  ];

  return isLoggedIn
    ? [
        ...baseOptions,
        {
          label: "History",
          href: "/history",
          icon: <History className="mb-1 h-6 w-6" />,
        },
        {
          label: "Messages",
          href: "/mesages",
          icon: <MessageSquareMore className="mb-1 h-6 w-6" />,
        },
        {
          label: "Profile",
          href: "/profile",
          icon: <User className="mb-1 h-6 w-6" />,
        },
      ]
    : [
        ...baseOptions,
        {
          label: "Log in",
          href: "/auth/login",
          icon: <User className="mb-1 h-6 w-6" />,
        },
      ];
});

// Main menu options based on login status
const getMenuOptions = memoize((isLoggedIn: boolean) => {
  const commonOptions = [
    {
      label: "Help Center",
      href: "/help",
      linkProps: { target: "_blank", rel: "noreferrer" },
      icon: <HelpCircle className="mr-2 h-4 w-4" />,
    },
    {
      label: "Contact Us",
      href: "/contact-us",
      linkProps: { target: "_blank", rel: "noreferrer" },
      icon: <Phone className="mr-2 h-4 w-4" />,
    },
    {
      label: "News",
      href: "/news",
      linkProps: { target: "_blank", rel: "noreferrer" },
      icon: <Newspaper className="mr-2 h-4 w-4" />,
    },
  ];

  return isLoggedIn
    ? {
        highlightedOptions: [
          {
            label: "Messages",
            href: "/messages",
            icon: <MessageSquare className="mr-2 h-4 w-4" />,
          },
          {
            label: "Wishlist",
            href: "/wishlist",
            icon: <Heart className="mr-2 h-4 w-4" />,
          },
          {
            label: "Settings",
            href: "/settings",
            icon: <Cog className="mr-2 h-4 w-4" />,
          },
        ],
        options: [
          ...commonOptions,
          {
            label: "Log out",
            href: "/logout",
            icon: <LogOut className="mr-2 h-4 w-4" />,
          },
        ],
      }
    : {
        highlightedOptions: [
          {
            label: "Log in",
            href: "/auth/login",
            icon: <LogIn className="mr-2 h-4 w-4" />,
          },
          {
            label: "Sign up",
            href: "/auth/signup",
            icon: <UserPlus className="mr-2 h-4 w-4" />,
          },
        ],
        options: commonOptions,
      };
});

// Static data for the landing page
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

// Landing page component
const LandingPage = () => {
  const isLoggedIn = cookies().get("isLoggedIn")?.value === "true";

  const menuOptions = getMenuOptions(isLoggedIn);
  const mobileMenuOptions = getMobileMenuOptions(isLoggedIn);

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav menuOptions={menuOptions} />
      <LandingView
        featuredProperties={featuredProperties}
        popularLocations={popularLocations}
        testimonials={testimonials}
      />
      <MainFooter className="mb-8 md:mb-0" />
      <MobileMenu menuOptions={mobileMenuOptions} />
    </div>
  );
};

export default LandingPage;
