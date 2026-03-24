import { useState } from "react";
import { opportunities } from "@/lib/mock-data";
import { OpportunityCard } from "@/components/mentor-connect/OpportunityCard";
import { IndustryChip } from "@/components/mentor-connect/IndustryChip";
import { BottomNav } from "@/components/mentor-connect/BottomNav";

const typeFilters = ["All", "Internships", "Jobs", "Workshops"];

export default function OpportunitiesFeed() {
  const [selectedType, setSelectedType] = useState("All");

  const filtered = selectedType === "All"
    ? opportunities
    : opportunities.filter((o) => o.type === selectedType.slice(0, -1) || o.type === selectedType);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <h1 className="text-h2 text-foreground">Opportunities</h1>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {typeFilters.map((t) => (
            <IndustryChip key={t} label={t} selected={selectedType === t} onPress={() => setSelectedType(t)} />
          ))}
        </div>
        <div className="space-y-4">
          {filtered.map((o) => <OpportunityCard key={o.id} opportunity={o} />)}
        </div>
        {filtered.length === 0 && (
          <p className="text-body text-muted-foreground text-center py-8">No opportunities match this filter.</p>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
