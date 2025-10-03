import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrustBadge } from "./TrustBadge";
import { useNavigate } from "react-router-dom";
import { 
  Heart, 
  TrendingUp, 
  Users, 
  Eye, 
  Share2, 
  Download,
  Calendar,
  MapPin
} from "lucide-react";

interface DonationHistory {
  id: string;
  campaignTitle: string;
  ngoName: string;
  ngoTier: "bronze" | "silver" | "gold";
  amount: number;
  date: string;
  status: "pending" | "active" | "completed";
  impactProven?: boolean;
}

const MOCK_DONATIONS: DonationHistory[] = [
  {
    id: "1",
    campaignTitle: "Digital Classroom for Girls",
    ngoName: "Nalam Foundation",
    ngoTier: "gold",
    amount: 20000,
    date: "2024-03-15",
    status: "completed",
    impactProven: true,
  },
  {
    id: "2",
    campaignTitle: "Clean Water Access Project",
    ngoName: "Water for Life NGO",
    ngoTier: "silver",
    amount: 15000,
    date: "2024-03-10",
    status: "active",
  },
  {
    id: "3",
    campaignTitle: "Nutritious School Meals",
    ngoName: "Child Nutrition Trust",
    ngoTier: "bronze",
    amount: 5000,
    date: "2024-03-01",
    status: "pending",
  },
];

export const DonorDashboard = () => {
  const navigate = useNavigate();
  const totalDonated = MOCK_DONATIONS.reduce((sum, donation) => sum + donation.amount, 0);
  const completedDonations = MOCK_DONATIONS.filter(d => d.status === "completed").length;
  const impactProvenCount = MOCK_DONATIONS.filter(d => d.impactProven).length;

  return (
    <div className="space-y-6">
      {/* Impact Portfolio Summary */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Total Donated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              ₹{totalDonated.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Campaigns Supported
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {MOCK_DONATIONS.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4" />
              Lives Impacted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              47
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Impact Proven
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {impactProvenCount}/{MOCK_DONATIONS.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Impact Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Your Impact Portfolio</CardTitle>
          <p className="text-sm text-muted-foreground">
            Visual summary of your collective impact across all supported campaigns
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-3xl mb-2">🏫</div>
              <div className="font-semibold">2 Schools</div>
              <div className="text-sm text-muted-foreground">Equipped with technology</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-3xl mb-2">💧</div>
              <div className="font-semibold">500 People</div>
              <div className="text-sm text-muted-foreground">Access to clean water</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-3xl mb-2">🍽️</div>
              <div className="font-semibold">1,200 Meals</div>
              <div className="text-sm text-muted-foreground">Provided to children</div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <Button variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share Your Impact
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Donation History */}
      <Card>
        <CardHeader>
          <CardTitle>Donation History</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {MOCK_DONATIONS.map((donation) => (
              <div
                key={donation.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-smooth"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{donation.campaignTitle}</h4>
                    <TrustBadge tier={donation.ngoTier} />
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{donation.ngoName}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(donation.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-semibold">₹{donation.amount.toLocaleString()}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant={
                        donation.status === "completed"
                          ? "default"
                          : donation.status === "active"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {donation.status}
                    </Badge>
                    {donation.impactProven && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate('/evidence/digital-classroom')}
                      >
                        <Eye className="h-3 w-3" />
                        View Evidence
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};