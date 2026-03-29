import { useState } from "react";
import { opportunities } from "@/lib/mock-data";
import { OpportunityCard } from "@/components/mentor-connect/OpportunityCard";
import { IndustryChip } from "@/components/mentor-connect/IndustryChip";
import { ResponsiveLayout } from "@/components/mentor-connect/ResponsiveLayout";

const typeFilters = ["All", "Internships", "Jobs", "Workshops"];

export default function OpportunitiesFeed() {
  const [selectedType, setSelectedType] = useState("All");

  const filtered = selectedType === "All"
    ? opportunities
    : opportunities.filter((o) => o.type === selectedType.slice(0, -1) || o.type === selectedType);

  return (
    <ResponsiveLayout>
      <div className="min-h-screen bg-background pb-20 lg:pb-8">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
          <h1 className="text-h2 text-foreground">संधी</h1>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {typeFilters.map((t) => (
              <IndustryChip key={t} label={t} selected={selectedType === t} onPress={() => setSelectedType(t)} />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filtered.map((o) => <OpportunityCard key={o.id} opportunity={o} />)}
          </div>
          {filtered.length === 0 && (
            <p className="text-body text-muted-foreground text-center py-8">या filter शी कोणतीही opportunity जुळत नाही.</p>
          )}
        </div>
      </div>
    </ResponsiveLayout>
  );
}
