<<<<<<< HEAD
import { MapPin, Calendar, Bookmark, Briefcase, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/lib/language-context";
import { useAuth } from "@/lib/auth-context";
import { useOpportunities } from "@/lib/opportunities-context";
import { Opportunity } from "@/lib/types";

interface OpportunityCardProps {
  opportunity: Opportunity;
=======
import { MapPin, Calendar, Bookmark } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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
>>>>>>> main
  onApply?: () => void;
}

export function OpportunityCard({ opportunity, onApply }: OpportunityCardProps) {
<<<<<<< HEAD
  const { getLocalized, t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const { savedOpportunityIds, toggleSaveOpportunity } = useOpportunities();
  const [applied, setApplied] = useState(false);

  const isSaved = savedOpportunityIds.includes(opportunity.id);

  const typeBadgeClass =
    opportunity.type === "Internship"
      ? "bg-emerald-500/10 text-emerald-600"
      : opportunity.type === "Job"
      ? "bg-blue-500/10 text-blue-600"
      : "bg-amber-500/10 text-amber-600";

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error(t("auth.signInToViewProfile") || "Please sign in to save opportunities");
      return;
    }

    try {
      await toggleSaveOpportunity(opportunity.id);
      if (isSaved) {
        toast.success(t("opps.removedBookmark") || "Bookmark removed");
      } else {
        toast.success(t("opps.addedBookmark") || "Bookmarked! 🔖");
      }
    } catch (error) {
       toast.error("Failed to update bookmark");
    }
  };

  const handleApply = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error(t("auth.signInToViewProfile") || "Please sign in to apply");
      return;
    }

    if (applied) {
      toast.info(t("opps.alreadyApplied") || "You have already applied!");
      return;
    }
    setApplied(true);
    toast.success(t("opps.applySuccess", { title: getLocalized(opportunity.title) }) || `Successfully applied for ${getLocalized(opportunity.title)}! 🎉`);
=======
  const [saved, setSaved] = useState(false);
  const [applied, setApplied] = useState(false);

  const typeBadgeClass =
    opportunity.type === "Internship"
      ? "bg-success/10 text-success"
      : opportunity.type === "Job"
      ? "bg-primary/10 text-primary"
      : "bg-warning/10 text-warning";

  const handleSave = () => {
    setSaved(!saved);
    toast.success(saved ? "Bookmark काढले" : "Bookmarked! 🔖");
  };

  const handleApply = () => {
    if (applied) {
      toast.info("तुम्ही आधीच apply केले आहे!");
      return;
    }
    setApplied(true);
    toast.success(`"${opportunity.title}" साठी यशस्वीरित्या apply केले! 🎉`);
>>>>>>> main
    onApply?.();
  };

  return (
<<<<<<< HEAD
    <div className="bg-card rounded-2xl shadow-sm border border-border p-5 animate-fade-in hover:shadow-md transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
            <Briefcase size={22} />
          </div>
          <div>
            <h4 className="font-bold text-body text-foreground leading-snug group-hover:text-primary transition-colors">
              {getLocalized(opportunity.title)}
            </h4>
            <p className="text-caption text-muted-foreground font-medium">{opportunity.company}</p>
          </div>
        </div>
        <button 
          onClick={handleSave} 
          className={`p-2 rounded-lg transition-all ${isSaved ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary/20 hover:text-primary"}`}
          title={t("save") || "Save"}
        >
          <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${typeBadgeClass}`}>
          {opportunity.type}
        </span>
      </div>

      <div className="flex flex-col gap-2 p-3 bg-muted/40 rounded-xl mb-4 text-v-small text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-muted-foreground/60" />
          <span className="font-medium text-foreground/80">{getLocalized(opportunity.location)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-muted-foreground/60" />
          <span className="font-medium text-foreground/80">{t("opps.deadline") || "Deadline"}: {opportunity.deadline}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/50">
        <p className="text-v-small text-muted-foreground font-medium">
          {t("by") || "by"} {getLocalized(opportunity.mentorName)}
        </p>
        <button
          onClick={handleApply}
          className={applied ? "h-11 px-6 rounded-xl text-caption font-bold transition-all active:scale-95 flex items-center justify-center whitespace-nowrap gap-2 bg-emerald-500 text-white" : "btn-primary"}
        >
          {applied ? <><CheckCircle2 size={18} /> {t("opps.applied") || "Applied"}</> : t("opportunities.applyNow")}
        </button>
      </div>
=======
    <div className="bg-card rounded-card shadow-card border border-border p-4 animate-fade-in">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-semibold text-body text-foreground">{opportunity.title}</h4>
          <p className="text-caption text-muted-foreground">{opportunity.company}</p>
        </div>
        <button onClick={handleSave} className={`transition-colors ${saved ? "text-primary" : "text-muted-foreground hover:text-primary"}`}>
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
        onClick={handleApply}
        className={`mt-3 w-full py-2 rounded-md text-caption font-medium transition-opacity ${
          applied
            ? "bg-success text-success-foreground"
            : "bg-primary text-primary-foreground hover:opacity-90"
        }`}
      >
        {applied ? "Applied ✓" : "Apply करा"}
      </button>
>>>>>>> main
    </div>
  );
}
