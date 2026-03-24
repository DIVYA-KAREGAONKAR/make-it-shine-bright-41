import { useState } from "react";
import { Search } from "lucide-react";
import { mentors, industries } from "@/lib/mock-data";
import { IndustryChip } from "@/components/mentor-connect/IndustryChip";
import { MentorCard } from "@/components/mentor-connect/MentorCard";
import { BottomNav } from "@/components/mentor-connect/BottomNav";

export default function ExploreMentors() {
  const [query, setQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");

  const filtered = mentors.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(query.toLowerCase()) || m.company.toLowerCase().includes(query.toLowerCase());
    const matchesIndustry = selectedIndustry === "All" || m.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <h1 className="text-h2 text-foreground">Explore Mentors</h1>

        {/* Search */}
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search mentors, companies..." className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-card text-foreground text-body focus:ring-2 focus:ring-primary/30 outline-none" />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <IndustryChip label="All" selected={selectedIndustry === "All"} onPress={() => setSelectedIndustry("All")} />
          {industries.map((ind) => (
            <IndustryChip key={ind} label={ind} selected={selectedIndustry === ind} onPress={() => setSelectedIndustry(ind)} />
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filtered.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-body text-muted-foreground">No mentors found. Try a different search or filter.</p>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
