import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth-context";
import SplashScreen from "./pages/SplashScreen";
import StudentOnboarding from "./pages/StudentOnboarding";
import MentorOnboarding from "./pages/MentorOnboarding";
import StudentHome from "./pages/StudentHome";
import ExploreMentors from "./pages/ExploreMentors";
import MentorProfileView from "./pages/MentorProfileView";
import CommunityScreen from "./pages/CommunityScreen";
import OpportunitiesFeed from "./pages/OpportunitiesFeed";
import StudentCommunities from "./pages/StudentCommunities";
import StudentProfile from "./pages/StudentProfile";
import MentorDashboard from "./pages/MentorDashboard";
import MentorCommunityManagement from "./pages/MentorCommunityManagement";
import PostOpportunity from "./pages/PostOpportunity";
import MentorMembers from "./pages/MentorMembers";
import MentorProfilePage from "./pages/MentorProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/onboarding/student" element={<StudentOnboarding />} />
            <Route path="/onboarding/mentor" element={<MentorOnboarding />} />
            {/* Student Routes */}
            <Route path="/student/home" element={<StudentHome />} />
            <Route path="/student/explore" element={<ExploreMentors />} />
            <Route path="/student/communities" element={<StudentCommunities />} />
            <Route path="/student/opportunities" element={<OpportunitiesFeed />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            {/* Shared */}
            <Route path="/mentor/:id" element={<MentorProfileView />} />
            <Route path="/community/:id" element={<CommunityScreen />} />
            {/* Mentor Routes */}
            <Route path="/mentor/dashboard" element={<MentorDashboard />} />
            <Route path="/mentor/community" element={<MentorCommunityManagement />} />
            <Route path="/mentor/post" element={<PostOpportunity />} />
            <Route path="/mentor/members" element={<MentorMembers />} />
            <Route path="/mentor/profile" element={<MentorProfilePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
