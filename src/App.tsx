import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CampaignProvider } from "./contexts/CampaignContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { ExplorePage } from "./pages/ExplorePage";
import { HowItWorksPage } from "./pages/HowItWorksPage";
import { DashboardPage } from "./pages/DashboardPage";
import { NGOPortalPage } from "./pages/NGOPortalPage";
import { AdminPortalPage } from "./pages/AdminPortalPage";
import { ViewEvidencePage } from "./pages/ViewEvidencePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CampaignProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              
              {/* Donor Portal Routes */}
              <Route path="/donor/dashboard" element={
                <ProtectedRoute allowedRoles={['donor']}>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              
              {/* NGO Portal Routes */}
              <Route path="/ngo/project-management" element={
                <ProtectedRoute allowedRoles={['ngo']}>
                  <NGOPortalPage />
                </ProtectedRoute>
              } />
              
              {/* Admin Portal Routes */}
              <Route path="/admin/user-management" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminPortalPage />
                </ProtectedRoute>
              } />
              
              {/* Evidence page accessible to all logged-in users */}
              <Route path="/evidence/:campaignId" element={
                <ProtectedRoute allowedRoles={['donor', 'ngo', 'admin']}>
                  <ViewEvidencePage />
                </ProtectedRoute>
              } />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CampaignProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
