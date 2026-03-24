import { MapPin, Calendar, Bookmark } from "lucide-react";
import { useState } from "react";

interface OpportunityCardProps {
  opportunity: {
    id: string;
    title: string;
    type: string;
    company: string;
    location: string;
    deadline: string;
    mentorName: string;
  };
  onApply?: () => void;
}

export function OpportunityCard({ opportunity, onApply }: OpportunityCardProps) {
  const [saved, setSaved] = useState(false);

  const typeBadgeClass =
    opportunity.type === "Internship"
      ? "bg-success/10 text-success"
      : opportunity.type === "Job"
      ? "bg-primary/10 text-primary"
      : "bg-warning/10 text-warning";

  return (
    <div className="bg-card rounded-card shadow-card border border-border p-4 animate-fade-in">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-semibold text-body text-foreground">{opportunity.title}</h4>
          <p className="text-caption text-muted-foreground">{opportunity.company}</p>
        </div>
        <button onClick={() => setSaved(!saved)} className="text-muted-foreground hover:text-primary transition-colors">
          <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <span className={`inline-block px-2 py-0.5 rounded-chip text-caption font-medium ${typeBadgeClass}`}>
        {opportunity.type}
      </span>
      <div className="flex items-center gap-4 mt-3 text-caption text-muted-foreground">
        <span className="flex items-center gap-1"><MapPin size={12} />{opportunity.location}</span>
        <span className="flex items-center gap-1"><Calendar size={12} />{opportunity.deadline}</span>
      </div>
      <p className="text-caption text-muted-foreground mt-2">Posted by {opportunity.mentorName}</p>
      <button
        onClick={onApply}
        className="mt-3 w-full py-2 rounded-md bg-primary text-primary-foreground text-caption font-medium hover:opacity-90 transition-opacity"
      >
        Apply
      </button>
    </div>
  );
}
