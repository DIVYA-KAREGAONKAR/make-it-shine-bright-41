import { useState } from "react";
import { Search, Bell } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { mentors, communities, opportunities, industries } from "@/lib/mock-data";
import { IndustryChip } from "@/components/mentor-connect/IndustryChip";
import { MentorCard } from "@/components/mentor-connect/MentorCard";
import { CommunityCard } from "@/components/mentor-connect/CommunityCard";
import { OpportunityCard } from "@/components/mentor-connect/OpportunityCard";
import { ResponsiveLayout } from "@/components/mentor-connect/ResponsiveLayout";
import { toast } from "sonner";

export default function StudentHome() {
  const { user } = useAuth();
  const [selectedIndustry, setSelectedIndustry] = useState("All");

  const filteredMentors = selectedIndustry === "All"
    ? mentors
    : mentors.filter((m) => m.industry === selectedIndustry);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "सुप्रभात";
    if (hour < 18) return "शुभ दुपार";
    return "शुभ संध्याकाळ";
  };

  return (
    <ResponsiveLayout>
      <div className="min-h-screen bg-background pb-20 lg:pb-8">
        {/* Top Bar */}
        <div className="sticky top-0 bg-card/80 backdrop-blur-md border-b border-border z-40 px-4 py-3 lg:hidden">
          <div className="max-w-3xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-caption">M</span>
              </div>
              <span className="font-semibold text-body text-foreground">MentorConnect</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => toast.info("Search येत आहे!")} className="text-muted-foreground hover:text-foreground transition-colors"><Search size={20} /></button>
              <button onClick={() => toast.info("Notifications येत आहे!")} className="text-muted-foreground hover:text-foreground transition-colors relative">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-destructive" />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
          {/* Greeting */}
          <div className="animate-fade-in">
            <h1 className="text-h2 text-foreground">{greeting()}, {user?.name || "विद्यार्थी"} 🙏</h1>
            <p className="text-body text-muted-foreground">Mentors शोधा आणि करिअर वाढवा.</p>
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
              {selectedIndustry === "All" ? "सर्व" : selectedIndustry} मधील Mentors
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMentors.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>
          </div>

          {/* Communities */}
          <div>
            <h2 className="text-h3 text-foreground mb-4">तुमच्या Communities</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {communities.slice(0, 3).map((c) => (
                <CommunityCard key={c.id} community={c} />
              ))}
            </div>
          </div>

          {/* Opportunities */}
          <div>
            <h2 className="text-h3 text-foreground mb-4">नाशिक मधील संधी</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {opportunities.slice(0, 3).map((o) => (
                <OpportunityCard key={o.id} opportunity={o} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ResponsiveLayout>
  );
}
