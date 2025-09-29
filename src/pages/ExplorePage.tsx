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
import { useCampaigns } from "@/contexts/CampaignContext";

const CAUSES = ["Education", "Water & Sanitation", "Nutrition", "Healthcare", "Women's Empowerment", "Environment"];
const LOCATIONS = ["Chennai, Tamil Nadu", "Rajasthan", "Karnataka", "Odisha", "West Bengal", "Madhya Pradesh"];
const NGO_TIERS = ["bronze", "silver", "gold"];
const SDGS = ["Quality Education", "Clean Water and Sanitation", "Zero Hunger", "Good Health and Well-being", "Gender Equality", "Affordable and Clean Energy"];

export const ExplorePage = () => {
  const { campaigns } = useCampaigns();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCause, setSelectedCause] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTier, setSelectedTier] = useState("");
  const [selectedSDG, setSelectedSDG] = useState("");
  const [donationModal, setDonationModal] = useState<{
    isOpen: boolean;
    campaign?: typeof campaigns[0];
  }>({ isOpen: false });

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campaign.ngoName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = !selectedLocation || campaign.location === selectedLocation;
    const matchesTier = !selectedTier || campaign.ngoTier === selectedTier;

    return matchesSearch && matchesLocation && matchesTier;
  });

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCause("");
    setSelectedLocation("");
    setSelectedTier("");
    setSelectedSDG("");
  };

  const handleDonate = (campaign: typeof campaigns[0]) => {
    setDonationModal({ isOpen: true, campaign });
  };

  const activeFilters = [
    selectedCause && { label: selectedCause, clear: () => setSelectedCause("") },
    selectedLocation && { label: selectedLocation, clear: () => setSelectedLocation("") },
    selectedTier && { label: `${selectedTier} tier`, clear: () => setSelectedTier("") },
    selectedSDG && { label: selectedSDG, clear: () => setSelectedSDG("") },
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Explore All Campaigns
          </h1>
          <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto">
            Discover verified campaigns making real impact worldwide. Every donation is tracked and transparently reported.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-muted/30 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search campaigns by title, description, or NGO name..."
                className="pl-12 h-12 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="grid md:grid-cols-4 gap-4">
              <Select value={selectedCause} onValueChange={setSelectedCause}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Cause" />
                </SelectTrigger>
                <SelectContent>
                  {CAUSES.map((cause) => (
                    <SelectItem key={cause} value={cause}>
                      {cause}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  {LOCATIONS.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedTier} onValueChange={setSelectedTier}>
                <SelectTrigger>
                  <SelectValue placeholder="NGO Tier" />
                </SelectTrigger>
                <SelectContent>
                  {NGO_TIERS.map((tier) => (
                    <SelectItem key={tier} value={tier}>
                      {tier.charAt(0).toUpperCase() + tier.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSDG} onValueChange={setSelectedSDG}>
                <SelectTrigger>
                  <SelectValue placeholder="UN SDG" />
                </SelectTrigger>
                <SelectContent>
                  {SDGS.map((sdg) => (
                    <SelectItem key={sdg} value={sdg}>
                      {sdg}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {activeFilters.map((filter, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {filter.label}
                    <X 
                      className="h-3 w-3 cursor-pointer hover:text-destructive" 
                      onClick={filter.clear}
                    />
                  </Badge>
                ))}
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Campaigns Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {filteredCampaigns.length} Campaign{filteredCampaigns.length !== 1 ? 's' : ''} Found
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              Showing verified campaigns only
            </div>
          </div>

          {filteredCampaigns.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No campaigns found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or filters
              </p>
              <Button onClick={clearFilters}>Clear all filters</Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCampaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  {...campaign}
                  onClick={() => handleDonate(campaign)}
                />
              ))}
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
          campaignId={donationModal.campaign.id}
        />
      )}
    </div>
  );
};