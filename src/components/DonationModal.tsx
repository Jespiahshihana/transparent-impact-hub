import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { CreditCard, Smartphone, DollarSign, Heart, Gift } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface DonationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  campaignTitle: string;
  ngoName: string;
}

const SUGGESTED_AMOUNTS = [500, 1000, 2500, 5000];

export const DonationModal = ({
  isOpen,
  onOpenChange,
  campaignTitle,
  ngoName,
}: DonationModalProps) => {
  const [amount, setAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isRecurring, setIsRecurring] = useState(false);
  const [isHonorDonation, setIsHonorDonation] = useState(false);
  const [honorName, setHonorName] = useState("");

  const handleAmountSelect = (value: number) => {
    setAmount(value);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setAmount(null);
  };

  const finalAmount = amount || parseInt(customAmount) || 0;

  const handleDonate = () => {
    // Simulate donation processing
    toast({
      title: "Success! 🎉",
      description: `Your donation of ₹${finalAmount.toLocaleString()} has been added to the secure Escrow fund. Thank you for your support!`,
      duration: 5000,
    });
    
    console.log("Donation submitted:", {
      amount: finalAmount,
      isRecurring,
      isHonorDonation,
      honorName,
      paymentMethod,
      campaign: campaignTitle,
      ngo: ngoName,
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            Donate to {campaignTitle}
          </DialogTitle>
          <p className="text-center text-sm text-muted-foreground">
            Supporting {ngoName}
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Amount Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Choose Amount</Label>
            <div className="grid grid-cols-2 gap-2">
              {SUGGESTED_AMOUNTS.map((value) => (
                <Button
                  key={value}
                  variant={amount === value ? "donation" : "outline"}
                  size="sm"
                  onClick={() => handleAmountSelect(value)}
                >
                  ₹{value.toLocaleString()}
                </Button>
              ))}
            </div>
            
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter custom amount"
                type="number"
                className="pl-10"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
              />
            </div>
          </div>

          <Separator />

          {/* Donation Options */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="recurring"
                checked={isRecurring}
                onCheckedChange={(checked) => setIsRecurring(checked === true)}
              />
              <Label htmlFor="recurring" className="text-sm">
                Make this a monthly recurring donation
              </Label>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="honor"
                  checked={isHonorDonation}
                  onCheckedChange={(checked) => setIsHonorDonation(checked === true)}
                />
                <Label htmlFor="honor" className="text-sm">
                  Donate in honor of someone
                </Label>
              </div>
              
              {isHonorDonation && (
                <Input
                  placeholder="Enter name"
                  value={honorName}
                  onChange={(e) => setHonorName(e.target.value)}
                  className="mt-2"
                />
              )}
            </div>
          </div>

          <Separator />

          {/* Payment Method */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Payment Method</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Credit/Debit Card
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi" className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  UPI Payment
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="crypto" id="crypto" />
                <Label htmlFor="crypto" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Cryptocurrency
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Donation Summary */}
          {finalAmount > 0 && (
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span>Donation Amount:</span>
                <span className="font-medium">₹{finalAmount.toLocaleString()}</span>
              </div>
              {isRecurring && (
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Frequency:</span>
                  <span>Monthly</span>
                </div>
              )}
              {isHonorDonation && honorName && (
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>In honor of:</span>
                  <span>{honorName}</span>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button
              variant="donation"
              disabled={finalAmount === 0}
              className="flex-1"
              onClick={handleDonate}
            >
              <Heart className="h-4 w-4" />
              Donate ₹{finalAmount.toLocaleString()}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};