import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import UserLogin from "./pages/user/UserLogin";
import UserDashboard from "./pages/user/UserDashboard";
import BookSession from "./pages/user/BookSession";
import CounselorList from "./pages/user/CounselorList";
import AiChat from "./pages/user/AiChat";
import CounselorLogin from "./pages/counselor/CounselorLogin";
import CounselorDashboard from "./pages/counselor/CounselorDashboard";
import PatientList from "./pages/counselor/PatientList";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          
          {/* User Routes */}
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/book-session" element={<BookSession />} />
          <Route path="/user/counselors" element={<CounselorList />} />
          <Route path="/user/ai-chat" element={<AiChat />} />
          
          {/* Counselor Routes */}
          <Route path="/counselor/login" element={<CounselorLogin />} />
          <Route path="/counselor/dashboard" element={<CounselorDashboard />} />
          <Route path="/counselor/patients" element={<PatientList />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
