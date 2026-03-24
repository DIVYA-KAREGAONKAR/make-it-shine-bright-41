import { useState } from "react";
import { Search, Bell } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { mentors, communities, opportunities, industries } from "@/lib/mock-data";
import { IndustryChip } from "@/components/mentor-connect/IndustryChip";
import { MentorCard } from "@/components/mentor-connect/MentorCard";
import { CommunityCard } from "@/components/mentor-connect/CommunityCard";
import { OpportunityCard } from "@/components/mentor-connect/OpportunityCard";
import { BottomNav } from "@/components/mentor-connect/BottomNav";

export default function StudentHome() {
  const { user } = useAuth();
  const [selectedIndustry, setSelectedIndustry] = useState("All");

  const filteredMentors = selectedIndustry === "All"
    ? mentors
    : mentors.filter((m) => m.industry === selectedIndustry);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Top Bar */}
      <div className="sticky top-0 bg-card/80 backdrop-blur-md border-b border-border z-40 px-4 py-3">
        <div className="max-w-lg mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-caption">M</span>
            </div>
            <span className="font-semibold text-body text-foreground">MentorConnect</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-muted-foreground hover:text-foreground transition-colors"><Search size={20} /></button>
            <button className="text-muted-foreground hover:text-foreground transition-colors relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-destructive" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-8">
        {/* Greeting */}
        <div className="animate-fade-in">
          <h1 className="text-h2 text-foreground">{greeting()}, {user?.name || "Student"} 👋</h1>
          <p className="text-body text-muted-foreground">Discover mentors and grow your career.</p>
        </div>

        {/* Industry Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <IndustryChip label="All" selected={selectedIndustry === "All"} onPress={() => setSelectedIndustry("All")} />
          {industries.map((ind) => (
            <IndustryChip key={ind} label={ind} selected={selectedIndustry === ind} onPress={() => setSelectedIndustry(ind)} />
          ))}
        </div>

        {/* Mentors */}
        <div>
          <h2 className="text-h3 text-foreground mb-4">
            Mentors in {selectedIndustry === "All" ? "All Industries" : selectedIndustry}
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {filteredMentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        </div>

        {/* Communities */}
        <div>
          <h2 className="text-h3 text-foreground mb-4">Your Communities</h2>
          <div className="space-y-3">
            {communities.slice(0, 3).map((c) => (
              <CommunityCard key={c.id} community={c} />
            ))}
          </div>
        </div>

        {/* Opportunities */}
        <div>
          <h2 className="text-h3 text-foreground mb-4">Opportunities Near You</h2>
          <div className="space-y-3">
            {opportunities.slice(0, 3).map((o) => (
              <OpportunityCard key={o.id} opportunity={o} />
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
