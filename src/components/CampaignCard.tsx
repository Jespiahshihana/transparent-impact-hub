import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { TrustBadge } from "./TrustBadge";
import { ProgressBar } from "./ProgressBar";
import { MapPin, Users } from "lucide-react";

interface CampaignCardProps {
  id: string;
  title: string;
  description: string;
  ngoName: string;
  ngoTier: "bronze" | "silver" | "gold";
  location: string;
  image: string;
  currentAmount: number;
  goalAmount: number;
  donorsCount: number;
  onClick: () => void;
}

export const CampaignCard = ({
  title,
  description,
  ngoName,
  ngoTier,
  location,
  image,
  currentAmount,
  goalAmount,
  donorsCount,
  onClick,
}: CampaignCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-card transition-smooth cursor-pointer group" onClick={onClick}>
      <div className="aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-smooth">
            {title}
          </h3>
          <TrustBadge tier={ngoTier} />
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{ngoName}</p>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {location}
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardHeader>

      <CardContent className="pb-3">
        <ProgressBar current={currentAmount} goal={goalAmount} />
        
        <div className="flex items-center gap-1 mt-3 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          {donorsCount} donors
        </div>
      </CardContent>

      <CardFooter>
        <Button variant="donation" size="lg" className="w-full">
          Start Donating
        </Button>
      </CardFooter>
    </Card>
  );
};