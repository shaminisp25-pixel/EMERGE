import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useUserData } from "@/hooks/useUserData";
import BottomNav from "@/components/layout/BottomNav";
import Login from "./pages/Login";
import OnboardingFlow from "./components/onboarding/OnboardingFlow";
import Home from "./pages/Home";
import Pet from "./pages/Pet";
import Journal from "./pages/Journal";
import Wrapped from "./pages/Wrapped";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isLoggedIn, needsOnboarding, loading, login, completeOnboarding, userData } = useUserData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary text-xl">Loading...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Login onLogin={login} />;
  }

  if (needsOnboarding) {
    return <OnboardingFlow onComplete={completeOnboarding} />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pet" element={<Pet />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/wrapped" element={<Wrapped />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {userData && <BottomNav petType={userData.pet.type} petName={userData.pet.name} />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
