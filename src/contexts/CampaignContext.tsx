import React, { createContext, useContext, useState, ReactNode } from 'react';
import laptopImage from "@/assets/laptop-installation.jpg";
import waterImage from "@/assets/water-purification.jpg";
import mealsImage from "@/assets/school-meals.jpg";

interface Campaign {
  id: string;
  title: string;
  description: string;
  ngoName: string;
  ngoTier: "bronze" | "silver" | "gold";
  location: string;
  image: string;
  currentAmount: number;
  goalAmount: number;
  donorsCount: number;
}

interface CampaignContextType {
  campaigns: Campaign[];
  updateCampaignFunding: (campaignId: string, donationAmount: number) => void;
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export const useCampaigns = () => {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error('useCampaigns must be used within a CampaignProvider');
  }
  return context;
};

interface CampaignProviderProps {
  children: ReactNode;
}

export const CampaignProvider: React.FC<CampaignProviderProps> = ({ children }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "digital-classroom",
      title: "Digital Classroom for Girls",
      description: "Providing 20 new laptops to enable digital learning for underprivileged girls in Chennai government schools.",
      ngoName: "Nalam Foundation",
      ngoTier: "gold" as const,
      location: "Chennai, Tamil Nadu",
      image: laptopImage,
      currentAmount: 200000,
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
      image: waterImage,
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
      image: mealsImage,
      currentAmount: 180000,
      goalAmount: 300000,
      donorsCount: 65,
    },
  ]);

  const updateCampaignFunding = (campaignId: string, donationAmount: number) => {
    setCampaigns(prevCampaigns =>
      prevCampaigns.map(campaign =>
        campaign.id === campaignId
          ? {
              ...campaign,
              currentAmount: campaign.currentAmount + donationAmount,
              donorsCount: campaign.donorsCount + 1,
            }
          : campaign
      )
    );
  };

  return (
    <CampaignContext.Provider value={{ campaigns, updateCampaignFunding }}>
      {children}
    </CampaignContext.Provider>
  );
};