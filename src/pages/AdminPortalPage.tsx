import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, ExternalLink, Users, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCampaigns } from "@/contexts/CampaignContext";

export const AdminPortalPage = () => {
  const navigate = useNavigate();
  const { campaigns } = useCampaigns();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Portal</h1>
          <p className="text-muted-foreground">
            System oversight, evidence verification, and user management
          </p>
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pending Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <p className="text-sm text-muted-foreground">Evidence submissions awaiting approval</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{campaigns.length}</div>
              <p className="text-sm text-muted-foreground">Currently running campaigns</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">247</div>
              <p className="text-sm text-muted-foreground">Registered donors and NGOs</p>
            </CardContent>
          </Card>
        </div>

        {/* Evidence Review Queue */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Evidence Review Queue</h2>
            <div className="grid gap-4">
              {campaigns.map((campaign) => (
                <Card key={campaign.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{campaign.title}</CardTitle>
                        <CardDescription>{campaign.ngoName}</CardDescription>
                      </div>
                      <Badge variant="secondary">
                        <Clock className="h-3 w-3 mr-1" />
                        Pending Review
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        size="sm"
                        onClick={() => navigate(`/evidence/${campaign.id}`)}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Review Evidence
                      </Button>
                      <Button size="sm" variant="outline">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve All
                      </Button>
                      <Button size="sm" variant="outline">
                        <XCircle className="h-4 w-4 mr-2" />
                        Request Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* System Management */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">System Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    User Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Manage Users & Roles
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    System Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Configure Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
