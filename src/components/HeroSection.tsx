import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, Eye, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-subtle">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Transparent
                <span className="block gradient-hero bg-clip-text text-transparent">
                  Impact Giving
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                See exactly how your donations create real change. Every contribution is tracked, verified, and proven with blockchain transparency.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl">
                Explore Campaigns
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="xl">
                <Play className="h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div className="text-sm font-medium">Verified NGOs</div>
                <div className="text-xs text-muted-foreground">Bronze to Gold tiers</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <div className="text-sm font-medium">Full Transparency</div>
                <div className="text-xs text-muted-foreground">Every transaction tracked</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div className="text-sm font-medium">Proven Impact</div>
                <div className="text-xs text-muted-foreground">AI-verified milestones</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-elegant">
              <img
                src={heroImage}
                alt="Children learning with laptops in classroom"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating stats */}
            <div className="absolute -top-4 -right-4 bg-card p-4 rounded-xl shadow-card border">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">₹2.4M</div>
                <div className="text-xs text-muted-foreground">Donated this month</div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-card p-4 rounded-xl shadow-card border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1,247</div>
                <div className="text-xs text-muted-foreground">Lives impacted</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};