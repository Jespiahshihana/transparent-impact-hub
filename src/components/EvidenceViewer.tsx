import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, FileText, Image as ImageIcon, Play, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Evidence {
  type: "image" | "video" | "pdf";
  url: string;
  title: string;
  description?: string;
}

interface EvidenceViewerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  milestoneTitle: string;
  evidence: Evidence[];
  blockchainTxHash?: string;
}

export const EvidenceViewer = ({
  isOpen,
  onOpenChange,
  milestoneTitle,
  evidence,
  blockchainTxHash,
}: EvidenceViewerProps) => {
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);

  const getEvidenceIcon = (type: Evidence["type"]) => {
    switch (type) {
      case "image":
        return ImageIcon;
      case "video":
        return Play;
      case "pdf":
        return FileText;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            <DialogTitle className="text-lg">{milestoneTitle} - Completed</DialogTitle>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-3 gap-6 h-full">
          {/* Evidence List */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
              Proof of Impact
            </h3>
            
            <div className="space-y-2">
              {evidence.map((item, index) => {
                const Icon = getEvidenceIcon(item.type);
                return (
                  <div
                    key={index}
                    className={cn(
                      "p-3 rounded-lg border cursor-pointer transition-smooth hover:border-primary",
                      selectedEvidence === item && "border-primary bg-primary/5"
                    )}
                    onClick={() => setSelectedEvidence(item)}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </div>
                    {item.description && (
                      <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Blockchain Link */}
            {blockchainTxHash && (
              <div className="pt-4 border-t">
                <h4 className="font-semibold text-sm mb-2">Blockchain Verification</h4>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => window.open(`https://etherscan.io/tx/${blockchainTxHash}`, "_blank")}
                >
                  <ExternalLink className="h-4 w-4" />
                  View Transaction on Explorer
                </Button>
                <Badge variant="secondary" className="mt-2 text-xs">
                  Funds Released: ₹4,00,000
                </Badge>
              </div>
            )}
          </div>

          {/* Evidence Viewer */}
          <div className="md:col-span-2 bg-muted/30 rounded-lg overflow-hidden">
            {selectedEvidence ? (
              <div className="h-full">
                {selectedEvidence.type === "image" && (
                  <img
                    src={selectedEvidence.url}
                    alt={selectedEvidence.title}
                    className="w-full h-full object-contain"
                  />
                )}
                
                {selectedEvidence.type === "video" && (
                  <video
                    src={selectedEvidence.url}
                    controls
                    className="w-full h-full"
                  />
                )}
                
                {selectedEvidence.type === "pdf" && (
                  <iframe
                    src={selectedEvidence.url}
                    className="w-full h-full"
                    title={selectedEvidence.title}
                  />
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                  <p>Select an item to view evidence</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};