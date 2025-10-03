import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, Camera, Video, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCampaigns } from "@/contexts/CampaignContext";

export const NGOPortalPage = () => {
  const navigate = useNavigate();
  const { campaigns } = useCampaigns();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">NGO Portal</h1>
          <p className="text-muted-foreground">
            Manage your projects, upload evidence, and track fund utilization
          </p>
        </div>

        {/* Active Projects */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Active Projects</h2>
            <div className="grid gap-6">
              {campaigns.map((campaign) => (
                <Card key={campaign.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{campaign.title}</CardTitle>
                        <CardDescription>{campaign.description}</CardDescription>
                      </div>
                      <Badge variant="secondary">In Progress</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Funds Progress</span>
                        <span className="font-medium">
                          ₹{campaign.currentAmount.toLocaleString()} / ₹{campaign.goalAmount.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={(campaign.currentAmount / campaign.goalAmount) * 100} />
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate(`/evidence/${campaign.id}`)}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        View Evidence
                      </Button>
                      <Button size="sm" variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Evidence
                      </Button>
                      <Button size="sm" variant="outline">
                        <Camera className="h-4 w-4 mr-2" />
                        Add Photos
                      </Button>
                      <Button size="sm" variant="outline">
                        <Video className="h-4 w-4 mr-2" />
                        Add Video
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
