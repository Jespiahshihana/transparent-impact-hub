import { useState } from "react";
import { Header } from "@/components/Header";
import { CampaignCard } from "@/components/CampaignCard";
import { DonationModal } from "@/components/DonationModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";
import laptopImage from "@/assets/laptop-installation.jpg";

const ALL_CAMPAIGNS = [
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
    cause: "Education",
    sdg: "Quality Education",
  },
  {
    id: "clean-water",
    title: "Clean Water Access Project",
    description: "Installing water purification systems in 5 rural villages to provide safe drinking water.",
    ngoName: "Water for Life NGO",
    ngoTier: "silver" as const,
    location: "Rajasthan",
    image: laptopImage,
    currentAmount: 250000,
    goalAmount: 500000,
    donorsCount: 23,
    cause: "Water & Sanitation",
    sdg: "Clean Water and Sanitation",
  },
  {
    id: "school-meals",
    title: "Nutritious School Meals",
    description: "Providing nutritious midday meals to 200 children for an entire academic year.",
    ngoName: "Child Nutrition Trust",
    ngoTier: "bronze" as const,
    location: "Karnataka",
    image: laptopImage,
    currentAmount: 180000,
    goalAmount: 300000,
    donorsCount: 65,
    cause: "Nutrition",
    sdg: "Zero Hunger",
  },
  {
    id: "rural-healthcare",
    title: "Mobile Healthcare Units",
    description: "Deploying 3 mobile healthcare units to serve remote tribal communities.",
    ngoName: "Health Access Foundation",
    ngoTier: "gold" as const,
    location: "Odisha",
    image: laptopImage,
    currentAmount: 720000,
    goalAmount: 900000,
    donorsCount: 89,
    cause: "Healthcare",
    sdg: "Good Health and Well-being",
  },
  {
    id: "skill-training",
    title: "Women's Skill Development",
    description: "Training 100 women in vocational skills like tailoring, handicrafts, and digital literacy.",
    ngoName: "Empowerment Trust",
    ngoTier: "silver" as const,
    location: "West Bengal",
    image: laptopImage,
    currentAmount: 150000,
    goalAmount: 350000,
    donorsCount: 34,
    cause: "Women's Empowerment",
    sdg: "Gender Equality",
  },
  {
    id: "solar-energy",
    title: "Solar Power for Schools",
    description: "Installing solar panels in 10 rural schools to ensure uninterrupted power supply.",
    ngoName: "Green Energy Foundation",
    ngoTier: "bronze" as const,
    location: "Madhya Pradesh",
    image: laptopImage,
    currentAmount: 480000,
    goalAmount: 600000,
    donorsCount: 56,
    cause: "Environment",
    sdg: "Affordable and Clean Energy",
  },
];

const CAUSES = ["Education", "Water & Sanitation", "Nutrition", "Healthcare", "Women's Empowerment", "Environment"];
const LOCATIONS = ["Chennai, Tamil Nadu", "Rajasthan", "Karnataka", "Odisha", "West Bengal", "Madhya Pradesh"];
const NGO_TIERS = ["bronze", "silver", "gold"];
const SDGS = ["Quality Education", "Clean Water and Sanitation", "Zero Hunger", "Good Health and Well-being", "Gender Equality", "Affordable and Clean Energy"];

export const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCause, setSelectedCause] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTier, setSelectedTier] = useState("");
  const [selectedSDG, setSelectedSDG] = useState("");
  const [donationModal, setDonationModal] = useState<{
    isOpen: boolean;
    campaign?: typeof ALL_CAMPAIGNS[0];
  }>({ isOpen: false });

  const filteredCampaigns = ALL_CAMPAIGNS.filter((campaign) => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campaign.ngoName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCause = !selectedCause || campaign.cause === selectedCause;
    const matchesLocation = !selectedLocation || campaign.location === selectedLocation;
    const matchesTier = !selectedTier || campaign.ngoTier === selectedTier;
    const matchesSDG = !selectedSDG || campaign.sdg === selectedSDG;

    return matchesSearch && matchesCause && matchesLocation && matchesTier && matchesSDG;
  });

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCause("");
    setSelectedLocation("");
    setSelectedTier("");
    setSelectedSDG("");
  };

  const hasActiveFilters = searchQuery || selectedCause || selectedLocation || selectedTier || selectedSDG;

  const handleDonate = (campaign: typeof ALL_CAMPAIGNS[0]) => {
    setDonationModal({ isOpen: true, campaign });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Explore Campaigns
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover verified campaigns making real impact across India
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search campaigns, NGOs, or causes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-lg"
              />
            </div>

            {/* Filters */}
            <div className="grid md:grid-cols-4 gap-4">
              <Select value={selectedCause} onValueChange={setSelectedCause}>
                <SelectTrigger>
                  <SelectValue placeholder="Cause" />
                </SelectTrigger>
                <SelectContent>
                  {CAUSES.map((cause) => (
                    <SelectItem key={cause} value={cause}>{cause}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSDG} onValueChange={setSelectedSDG}>
                <SelectTrigger>
                  <SelectValue placeholder="UN SDG" />
                </SelectTrigger>
                <SelectContent>
                  {SDGS.map((sdg) => (
                    <SelectItem key={sdg} value={sdg}>{sdg}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {LOCATIONS.map((location) => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedTier} onValueChange={setSelectedTier}>
                <SelectTrigger>
                  <SelectValue placeholder="NGO Tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bronze">Bronze</SelectItem>
                  <SelectItem value="silver">Silver</SelectItem>
                  <SelectItem value="gold">Gold</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {searchQuery && (
                  <Badge variant="secondary" className="gap-1">
                    Search: {searchQuery}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                  </Badge>
                )}
                {selectedCause && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedCause}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCause("")} />
                  </Badge>
                )}
                {selectedLocation && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedLocation}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedLocation("")} />
                  </Badge>
                )}
                {selectedTier && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1)}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedTier("")} />
                  </Badge>
                )}
                {selectedSDG && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedSDG}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedSDG("")} />
                  </Badge>
                )}
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">
              {filteredCampaigns.length} Campaign{filteredCampaigns.length !== 1 ? 's' : ''} Found
            </h2>
            <p className="text-muted-foreground">
              Verified campaigns with transparent fund usage and blockchain tracking
            </p>
          </div>

          {filteredCampaigns.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCampaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  {...campaign}
                  onClick={() => handleDonate(campaign)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No campaigns found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or clearing filters
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Donation Modal */}
      {donationModal.campaign && (
        <DonationModal
          isOpen={donationModal.isOpen}
          onOpenChange={(isOpen) => setDonationModal({ isOpen })}
          campaignTitle={donationModal.campaign.title}
          ngoName={donationModal.campaign.ngoName}
        />
      )}
    </div>
  );
};