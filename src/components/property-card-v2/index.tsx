import Image from "next/image";
import { Card, CardContent } from "../ui";
import { Badge } from "../ui/badge";
import { Heart } from "lucide-react";

export type PropertyCardV2Props = {
  title: string;
  price: number | string;
  highlightedFeatures: string[];
  description: string;
  image: string;
};

const PropertyCardV2 = ({
  title,
  price,
  highlightedFeatures,
  description,
  image,
}: PropertyCardV2Props) => (
  <Card className="p-3max-w-sm flex h-full w-full flex-col overflow-hidden rounded-none border-none shadow-none">
    <CardContent className="flex-grow">
      <div className="relative mb-2 aspect-square w-full overflow-hidden rounded-md">
        <Image src={image} alt={title} className="h-full w-full object-cover" />
        <Badge className="absolute left-2 top-2 rounded-sm bg-white text-black">
          Hot 🔥
        </Badge>
        <button className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-gray-600 hover:text-red-500">
          {/** TODO: if it's a client favorite fill the heart with red */}
          <Heart className="h-5 w-5" fill={"none"} />
        </button>
      </div>
      <p className="text-md font-semibold">{title}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
      <p className="text-sm text-muted-foreground">
        {highlightedFeatures.join(" • ")}
      </p>
      <span className="text-[0.94rem] font-semibold">
        {typeof price === "number"
          ? `$${price.toLocaleString()}`
          : "Price not available"}
      </span>
    </CardContent>
  </Card>
);

export default PropertyCardV2;
