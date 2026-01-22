import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Recherche from "./pages/Recherche";
import Disciplines from "./pages/Disciplines";
import ClubDetail from "./pages/ClubDetail";
import Carte from "./pages/Carte";
import Aide from "./pages/Aide";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/recherche" element={<Recherche />} />
          <Route path="/disciplines" element={<Disciplines />} />
          <Route path="/club/:id" element={<ClubDetail />} />
          <Route path="/carte" element={<Carte />} />
          <Route path="/aide" element={<Aide />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
