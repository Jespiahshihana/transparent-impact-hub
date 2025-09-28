import { Shield, Star, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustBadgeProps {
  tier: "bronze" | "silver" | "gold";
  className?: string;
}

const tierConfig = {
  bronze: {
    icon: Shield,
    label: "Bronze Verified",
    className: "tier-bronze",
  },
  silver: {
    icon: Star,
    label: "Silver Verified",
    className: "tier-silver",
  },
  gold: {
    icon: Award,
    label: "Gold Verified",
    className: "tier-gold",
  },
};

export const TrustBadge = ({ tier, className }: TrustBadgeProps) => {
  const config = tierConfig[tier];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium",
        config.className,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </div>
  );
};