import { Header } from "@/components/Header";
import { DonorDashboard } from "@/components/DonorDashboard";

export const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Impact Dashboard</h1>
          <p className="text-muted-foreground">
            Track your donations and see the verified impact you're making
          </p>
        </div>
        <DonorDashboard />
      </div>
    </div>
  );
};