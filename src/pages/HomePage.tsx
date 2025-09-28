import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CampaignCard } from "@/components/CampaignCard";
import { DonationModal } from "@/components/DonationModal";
import { EvidenceViewer } from "@/components/EvidenceViewer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Users, TrendingUp } from "lucide-react";
import laptopImage from "@/assets/laptop-installation.jpg";

const FEATURED_CAMPAIGNS = [
  {
    id: "digital-classroom",
    title: "Digital Classroom for Girls",
    description: "Providing 20 new laptops to enable digital learning for underprivileged girls in Chennai government schools.",
    ngoName: "Nalam Foundation",
    ngoTier: "gold" as const,
    location: "Chennai, Tamil Nadu",
    image: laptopImage,
    currentAmount: 380000,
    goalAmount: 400000,
    donorsCount: 47,
  },
  {
    id: "clean-water",
    title: "Clean Water Access Project",
    description: "Installing water purification systems in 5 rural villages to provide safe drinking water.",
    ngoName: "Water for Life NGO",
    ngoTier: "silver" as const,
    location: "Rajasthan",
    image: laptopImage, // Placeholder - would generate specific image
    currentAmount: 250000,
    goalAmount: 500000,
    donorsCount: 23,
  },
  {
    id: "school-meals",
    title: "Nutritious School Meals",
    description: "Providing nutritious midday meals to 200 children for an entire academic year.",
    ngoName: "Child Nutrition Trust",
    ngoTier: "bronze" as const,
    location: "Karnataka",
    image: laptopImage, // Placeholder - would generate specific image
    currentAmount: 180000,
    goalAmount: 300000,
    donorsCount: 65,
  },
];

const MOCK_EVIDENCE = [
  {
    type: "pdf" as const,
    url: "/sample-invoice.pdf",
    title: "Purchase Invoice",
    description: "Official invoice for 20 laptops - ₹4,00,000",
  },
  {
    type: "image" as const,
    url: laptopImage,
    title: "Installation Photo 1",
    description: "Laptops being set up in classroom",
  },
  {
    type: "image" as const,
    url: laptopImage,
    title: "Installation Photo 2",
    description: "Teacher with verification code AZ-179",
  },
  {
    type: "video" as const,
    url: "/sample-video.mp4",
    title: "Student Experience Video",
    description: "30-second video of students using new laptops",
  },
];

export const HomePage = () => {
  const [donationModal, setDonationModal] = useState<{
    isOpen: boolean;
    campaign?: typeof FEATURED_CAMPAIGNS[0];
  }>({ isOpen: false });
  
  const [evidenceModal, setEvidenceModal] = useState(false);

  const handleDonate = (campaign: typeof FEATURED_CAMPAIGNS[0]) => {
    setDonationModal({ isOpen: true, campaign });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      {/* Featured Campaigns Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Featured Campaigns
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hand-picked campaigns with verified impact and transparent fund usage
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {FEATURED_CAMPAIGNS.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                {...campaign}
                onClick={() => handleDonate(campaign)}
              />
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg">
              View All Campaigns
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Demo Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              See Your Impact in Action
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every milestone completion is verified with evidence and recorded on the blockchain
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-card max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  Digital Classroom - Milestone Completed
                </h3>
                <p className="text-muted-foreground mb-6">
                  20 laptops have been successfully purchased and installed in the classroom. 
                  See the evidence that proves your donation's impact.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Target className="h-5 w-5 text-success" />
                    <span className="text-sm">Laptops purchased and verified</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-success" />
                    <span className="text-sm">Students actively using equipment</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-success" />
                    <span className="text-sm">Funds released to NGO</span>
                  </div>
                </div>

                <Button
                  variant="hero"
                  onClick={() => setEvidenceModal(true)}
                >
                  View Evidence & Proof
                </Button>
              </div>

              <div className="relative">
                <img
                  src={laptopImage}
                  alt="Completed milestone evidence"
                  className="w-full rounded-lg shadow-card"
                />
                <div className="absolute top-4 right-4 bg-success text-success-foreground px-3 py-1 rounded-full text-sm font-medium">
                  ✓ Verified
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">₹12.5M</div>
              <div className="text-muted-foreground">Total Donated</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-accent">2,847</div>
              <div className="text-muted-foreground">Lives Impacted</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-success">94%</div>
              <div className="text-muted-foreground">Campaign Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      {donationModal.campaign && (
        <DonationModal
          isOpen={donationModal.isOpen}
          onOpenChange={(isOpen) => setDonationModal({ isOpen })}
          campaignTitle={donationModal.campaign.title}
          ngoName={donationModal.campaign.ngoName}
        />
      )}

      <EvidenceViewer
        isOpen={evidenceModal}
        onOpenChange={setEvidenceModal}
        milestoneTitle="Digital Classroom - Laptop Installation"
        evidence={MOCK_EVIDENCE}
        blockchainTxHash="0x1234567890abcdef1234567890abcdef12345678"
      />
    </div>
  );
};