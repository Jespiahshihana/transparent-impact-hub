import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Shield, 
  FileText, 
  Brain, 
  CheckCircle2,
  Wallet,
  Upload,
  Eye,
  Zap,
  Users,
  Target,
  TrendingUp
} from "lucide-react";

const PROCESS_STEPS = [
  {
    step: 1,
    title: "Donation to Escrow",
    subtitle: "Smart Contract Security",
    description: "Your donation is immediately secured in a blockchain smart contract escrow, ensuring funds can only be released when milestones are verified.",
    icon: Shield,
    details: [
      "Funds locked in smart contract",
      "Immutable blockchain record",
      "Transparent transaction history",
      "No central authority control"
    ]
  },
  {
    step: 2,
    title: "NGO Proof Submission",
    subtitle: "Evidence Package Upload",
    description: "NGOs submit comprehensive proof packages including invoices, photographs, videos, and verification codes to document milestone completion.",
    icon: Upload,
    details: [
      "Purchase invoices & receipts",
      "High-resolution photos",
      "Video documentation",
      "Unique verification codes"
    ]
  },
  {
    step: 3,
    title: "AI Verification Gauntlet",
    subtitle: "Multi-Agent Analysis",
    description: "Our advanced AI system performs comprehensive verification using multiple specialized agents to ensure authenticity and accuracy.",
    icon: Brain,
    details: [
      "Document Analysis Agent",
      "Visual Verification Agent", 
      "Price Oracle Verification",
      "Duplicate & Fraud Detection"
    ]
  },
  {
    step: 4,
    title: "Automated Fund Release",
    subtitle: "Oracle-Triggered Transfer",
    description: "Upon successful verification, our trusted Oracle automatically triggers the smart contract to release funds directly to the NGO's wallet.",
    icon: Zap,
    details: [
      "Instant fund transfer",
      "Blockchain transaction record",
      "Donor notification sent",
      "Impact evidence available"
    ]
  }
];

const VERIFICATION_AGENTS = [
  {
    name: "Document Analyst",
    description: "Verifies authenticity of invoices, checks pricing against market rates, and validates purchase documentation.",
    icon: FileText
  },
  {
    name: "Visual Verification",
    description: "Uses computer vision to count items, verify installation, and check for unique verification codes in photos.",
    icon: Eye
  },
  {
    name: "Price Oracle",
    description: "Cross-references purchase prices with market data to ensure fair pricing and prevent overcharging.",
    icon: TrendingUp
  },
  {
    name: "Fraud Detection", 
    description: "Identifies duplicate submissions, checks for image manipulation, and detects fraudulent patterns.",
    icon: CheckCircle2
  }
];

export const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            How TrustFund Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Our revolutionary platform combines blockchain security, AI verification, and transparent tracking to ensure every donation creates verified impact.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>Blockchain Secured</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-accent" />
              <span>AI Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <span>100% Transparent</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">₹12.5M+</div>
              <div className="text-muted-foreground">Secured in Smart Contracts</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent">99.2%</div>
              <div className="text-muted-foreground">AI Verification Accuracy</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-success">2,847</div>
              <div className="text-muted-foreground">Lives Verified Impacted</div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              The Four-Step Trust Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every donation follows this secure, transparent process to ensure maximum impact and accountability
            </p>
          </div>

          <div className="space-y-12">
            {PROCESS_STEPS.map((step, index) => (
              <div key={step.step} className="relative">
                {index < PROCESS_STEPS.length - 1 && (
                  <div className="absolute left-6 top-20 w-0.5 h-24 bg-gradient-to-b from-primary to-accent hidden md:block" />
                )}
                
                <Card className="shadow-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-3 gap-8 items-center">
                      <div className="md:col-span-2">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="h-12 w-12 gradient-hero rounded-full flex items-center justify-center">
                            <step.icon className="h-6 w-6 text-primary-foreground" />
                          </div>
                          <div>
                            <Badge variant="outline" className="mb-2">Step {step.step}</Badge>
                            <h3 className="text-2xl font-bold">{step.title}</h3>
                            <p className="text-lg text-primary font-medium">{step.subtitle}</p>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                          {step.description}
                        </p>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {step.details.map((detail, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                              <span className="text-sm">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="aspect-square bg-gradient-subtle rounded-2xl flex items-center justify-center">
                          <step.icon className="h-24 w-24 text-primary/20" />
                        </div>
                        {index < PROCESS_STEPS.length - 1 && (
                          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 md:hidden">
                            <ArrowRight className="h-6 w-6 text-primary rotate-90" />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Verification Deep Dive */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              AI Verification Agents
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our multi-agent AI system provides comprehensive verification to ensure every milestone is authentic
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VERIFICATION_AGENTS.map((agent) => (
              <Card key={agent.name} className="text-center shadow-card hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-16 w-16 gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <agent.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold mb-3">{agent.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {agent.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Trust */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Uncompromising Security & Trust
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Blockchain Escrow</h4>
                    <p className="text-muted-foreground">Smart contracts ensure funds can only be released when milestones are verified, eliminating trust issues.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Eye className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Complete Transparency</h4>
                    <p className="text-muted-foreground">Every transaction, verification, and fund release is recorded on the blockchain for public verification.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-12 w-12 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Community Verified</h4>
                    <p className="text-muted-foreground">NGOs are vetted through our tier system, ensuring only legitimate organizations can create campaigns.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-subtle rounded-2xl p-8">
              <div className="text-center mb-6">
                <Target className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Ready to Make Verified Impact?</h3>
                <p className="text-muted-foreground mb-6">
                  Join thousands of donors who trust our platform to ensure their contributions create real, measurable change.
                </p>
                <Link to="/explore">
                  <Button variant="hero" size="lg">
                    Explore Campaigns
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};