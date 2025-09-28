import { cn } from "@/lib/utils";

interface ProgressBarProps {
  current: number;
  goal: number;
  className?: string;
}

export const ProgressBar = ({ current, goal, className }: ProgressBarProps) => {
  const percentage = Math.min((current / goal) * 100, 100);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-foreground">
          ₹{current.toLocaleString()} raised
        </span>
        <span className="text-sm text-muted-foreground">
          of ₹{goal.toLocaleString()}
        </span>
      </div>
      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
        <div
          className="h-full gradient-donation transition-all duration-700 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="mt-2 text-center">
        <span className="text-lg font-bold text-accent">
          {percentage.toFixed(0)}% Complete
        </span>
      </div>
    </div>
  );
};