import { CheckIcon, ChevronRightIcon, MapPinIcon } from "lucide-react";
import { Button, Card } from "~/components/ui";

const ProfileInfoContent = () => {
  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col items-start justify-between">
        <h1 className="text-3xl font-bold">About Oswaldo</h1>
        <Button variant="outline" className="mt-4 hidden text-sm md:block">
          Edit profile
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <MapPinIcon className="h-5 w-5 text-gray-500" />
        <p>Lives in Caracas, Venezuela</p>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            What are saying about Oswaldo
          </h3>
          <ChevronRightIcon className="h-5 w-5 text-gray-500" />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {[
            {
              review:
                "Lorem ipsum odor amet, consectetuer adipiscing elit. Nascetur eu tortor elit luctus, consequat sollicitudin suspendisse. Lacinia montes mollis ipsum tempus euismod viverra ipsum auctor.",
              name: "Virgilio",
              date: "May 2024",
            },
            {
              review:
                "Lorem ipsum odor amet, consectetuer adipiscing elit. Nascetur eu tortor elit luctus, consequat sollicitudin suspendisse. Lacinia montes mollis ipsum tempus euismod viverra ipsum auctor.",
              name: "Aernoud",
              date: "February 2024",
            },
          ].map((review, index) => (
            <Card key={index} className="space-y-2 p-4">
              <p className="text-sm">{review.review}</p>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gray-200" />
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <Button variant="link" className="text-sm">
          Show all 4 reviews
        </Button>
      </div>

      <div>
        <h3 className="text-xl font-semibold">Reviews you&apos;ve written</h3>
      </div>
      <div className="block md:hidden">
        <h3 className="text-xl font-semibold">Oswaldo confirmed information</h3>
        <ul className="m-2 space-y-2">
          {["Identity", "Email address", "Phone number"].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <CheckIcon className="h-5 w-5 text-green-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <a href="#" className="text-sm text-gray-500 hover:underline">
          Learn about identity verification
        </a>
      </div>
    </div>
  );
};

export default ProfileInfoContent;
