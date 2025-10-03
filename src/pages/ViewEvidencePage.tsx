import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { EvidenceViewer } from "@/components/EvidenceViewer";
import { 
  CheckCircle, 
  Clock, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  FileText,
  Image as ImageIcon,
  Video,
  Download,
  ExternalLink
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useCampaigns } from "@/contexts/CampaignContext";
import { cn } from "@/lib/utils";

// Mock milestone and evidence data
const mockMilestones = [
  {
    id: 1,
    name: "Initial Assessment & Planning",
    dateCompleted: "2024-01-15",
    status: "verified" as const,
    description: "Conducted needs assessment and finalized implementation plan",
    fundsUsed: 50000,
    evidence: [
      { type: "pdf" as const, url: "#", title: "Assessment Report", description: "Detailed needs analysis" },
      { type: "image" as const, url: "/placeholder.svg", title: "Planning Meeting", description: "Team coordination session" }
    ]
  },
  {
    id: 2,
    name: "Laptop Procurement",
    dateCompleted: "2024-02-20",
    status: "verified" as const,
    description: "Purchased 20 laptops from verified vendor",
    fundsUsed: 300000,
    evidence: [
      { type: "pdf" as const, url: "#", title: "Purchase Invoice", description: "Official vendor invoice" },
      { type: "image" as const, url: "/placeholder.svg", title: "Laptop Inventory", description: "All 20 units received" },
      { type: "image" as const, url: "/placeholder.svg", title: "Quality Check", description: "Hardware verification" }
    ]
  },
  {
    id: 3,
    name: "Installation & Setup",
    dateCompleted: "2024-03-10",
    status: "pending" as const,
    description: "Installing laptops in 3 schools with necessary software",
    fundsUsed: 50000,
    evidence: [
      { type: "image" as const, url: "/placeholder.svg", title: "Installation Photo 1", description: "School A setup" },
      { type: "image" as const, url: "/placeholder.svg", title: "Installation Photo 2", description: "School B setup" },
      { type: "image" as const, url: "/placeholder.svg", title: "Installation Photo 3", description: "School C setup" },
      { type: "image" as const, url: "/placeholder.svg", title: "Installation Photo 4", description: "Software configuration" },
      { type: "image" as const, url: "/placeholder.svg", title: "Installation Photo 5", description: "Final testing" },
      { type: "video" as const, url: "#", title: "Installation Process", description: "Time-lapse of setup" },
      { type: "pdf" as const, url: "#", title: "Installation Checklist", description: "Completed verification form" }
    ]
  }
];

const spendingBreakdown = [
  { category: "Hardware (Laptops)", amount: 300000, percentage: 75 },
  { category: "Installation & Setup", amount: 50000, percentage: 12.5 },
  { category: "Planning & Assessment", amount: 50000, percentage: 12.5 }
];

export const ViewEvidencePage = () => {
  const { campaignId } = useParams();
  const { campaigns } = useCampaigns();
  const [selectedMilestone, setSelectedMilestone] = useState<typeof mockMilestones[0] | null>(null);
  const [isEvidenceViewerOpen, setIsEvidenceViewerOpen] = useState(false);

  const campaign = campaigns.find(c => c.id === campaignId);

  if (!campaign) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold">Campaign not found</h1>
        </div>
      </div>
    );
  }

  const totalFundsUsed = mockMilestones.reduce((sum, m) => sum + m.fundsUsed, 0);
  const fundsRemaining = campaign.currentAmount - totalFundsUsed;
  const completionPercentage = 60;

  const handleViewEvidence = (milestone: typeof mockMilestones[0]) => {
    setSelectedMilestone(milestone);
    setIsEvidenceViewerOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">View Evidence: {campaign.title}</h1>
          <p className="text-muted-foreground">{campaign.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Status Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Project Status Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Overall Status</p>
                    <Badge variant="secondary" className="text-sm">
                      <Clock className="h-3 w-3 mr-1" />
                      In Progress
                    </Badge>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm text-muted-foreground">Completion</p>
                    <p className="text-2xl font-bold">{completionPercentage}%</p>
                  </div>
                </div>
                <Progress value={completionPercentage} />
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Estimated Completion: June 2024</span>
                </div>
              </CardContent>
            </Card>

            {/* Financial Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Fund Status & Financials</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Fundraising Goal</p>
                    <p className="text-xl font-bold">₹{campaign.goalAmount.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Funds Raised</p>
                    <p className="text-xl font-bold text-primary">₹{campaign.currentAmount.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Funds Used</p>
                    <p className="text-xl font-bold text-orange-600">₹{totalFundsUsed.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Funds Remaining</p>
                    <p className="text-xl font-bold text-green-600">₹{fundsRemaining.toLocaleString()}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Spending Breakdown
                  </h4>
                  <div className="space-y-3">
                    {spendingBreakdown.map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{item.category}</span>
                          <span className="font-medium">₹{item.amount.toLocaleString()}</span>
                        </div>
                        <Progress value={item.percentage} />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Completed Milestones */}
            <Card>
              <CardHeader>
                <CardTitle>Completed Steps & Milestones</CardTitle>
                <CardDescription>Chronological progress with verified evidence</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockMilestones.map((milestone, index) => (
                  <div key={milestone.id}>
                    {index > 0 && <Separator className="my-4" />}
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h4 className="font-semibold">{milestone.name}</h4>
                          <p className="text-sm text-muted-foreground">{milestone.description}</p>
                        </div>
                        <Badge
                          variant={milestone.status === "verified" ? "default" : "secondary"}
                          className={cn(
                            milestone.status === "verified" && "bg-green-600 hover:bg-green-700"
                          )}
                        >
                          {milestone.status === "verified" ? (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </>
                          ) : (
                            <>
                              <Clock className="h-3 w-3 mr-1" />
                              Pending Review
                            </>
                          )}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(milestone.dateCompleted).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span>₹{milestone.fundsUsed.toLocaleString()} used</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          <span>{milestone.evidence.length} evidence items</span>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewEvidence(milestone)}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Evidence
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Evidence Gallery Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Evidence Gallery</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 border rounded-lg text-center">
                    <ImageIcon className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-xs text-muted-foreground">Photos</p>
                  </div>
                  <div className="p-3 border rounded-lg text-center">
                    <Video className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-2xl font-bold">1</p>
                    <p className="text-xs text-muted-foreground">Videos</p>
                  </div>
                  <div className="p-3 border rounded-lg text-center">
                    <FileText className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-2xl font-bold">4</p>
                    <p className="text-xs text-muted-foreground">Documents</p>
                  </div>
                  <div className="p-3 border rounded-lg text-center">
                    <CheckCircle className="h-6 w-6 mx-auto mb-1 text-green-600" />
                    <p className="text-2xl font-bold">2</p>
                    <p className="text-xs text-muted-foreground">Verified</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download All Evidence
                </Button>
              </CardContent>
            </Card>

            {/* NGO Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">NGO Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Organization</p>
                  <p className="font-semibold">{campaign.ngoName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tier Status</p>
                  <Badge variant="secondary" className="capitalize">{campaign.ngoTier}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-semibold">{campaign.location}</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Download Summary
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Evidence Viewer Modal */}
      {selectedMilestone && (
        <EvidenceViewer
          isOpen={isEvidenceViewerOpen}
          onOpenChange={setIsEvidenceViewerOpen}
          milestoneTitle={selectedMilestone.name}
          evidence={selectedMilestone.evidence}
          blockchainTxHash="0x1234567890abcdef"
        />
      )}
    </div>
  );
};
