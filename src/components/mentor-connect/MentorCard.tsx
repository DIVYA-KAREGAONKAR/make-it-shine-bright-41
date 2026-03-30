import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { useLanguage } from "@/lib/language-context";
import { LocalizedString, Mentor } from "@/lib/types";

interface MentorCardProps {
  mentor: Mentor;
=======

interface MentorCardProps {
  mentor: {
    id: string;
    name: string;
    role: string;
    company: string;
    industry: string;
    avatar: string;
    followers: number;
  };
>>>>>>> main
}

export function MentorCard({ mentor }: MentorCardProps) {
  const navigate = useNavigate();
<<<<<<< HEAD
  const { getLocalized, t } = useLanguage();

  return (
    <div className="min-w-[200px] bg-card rounded-card shadow-card p-4 flex flex-col items-center gap-3 border border-border animate-fade-in group hover:border-primary/50 transition-all duration-300">
      <div className="relative">
        <img 
          src={mentor.avatar} 
          alt={getLocalized(mentor.name)} 
          className="w-20 h-20 rounded-full object-cover border-2 border-transparent group-hover:border-primary transition-all" 
        />
        <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-card rounded-full" />
      </div>
      
      <div className="text-center space-y-1">
        <h4 className="font-bold text-body text-foreground line-clamp-1">{getLocalized(mentor.name)}</h4>
        <p className="text-caption text-muted-foreground line-clamp-1">{getLocalized(mentor.role)}</p>
        <p className="text-v-small text-muted-foreground font-medium">{mentor.company}</p>
      </div>

      <div className="flex items-center gap-3 w-full justify-center">
        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-v-small font-bold uppercase tracking-wider">
          {mentor.industry}
        </span>
        <div className="flex items-center gap-1 text-v-small text-muted-foreground">
          <Users size={12} />
          <span>{mentor.followers}</span>
        </div>
      </div>

      <button
        onClick={() => navigate(`/mentor/profile/${mentor.id}`)}
        className="btn-primary w-full mt-1"
      >
        {t("mentor.viewProfile")}
=======

  return (
    <div className="min-w-[200px] bg-card rounded-card shadow-card p-4 flex flex-col items-center gap-3 border border-border animate-fade-in">
      <img src={mentor.avatar} alt={mentor.name} className="w-16 h-16 rounded-full object-cover" />
      <div className="text-center">
        <h4 className="font-semibold text-body text-foreground">{mentor.name}</h4>
        <p className="text-caption text-muted-foreground">{mentor.role}</p>
        <p className="text-caption text-muted-foreground">{mentor.company}</p>
      </div>
      <span className="px-2 py-0.5 rounded-chip bg-primary/10 text-primary text-caption font-medium">
        {mentor.industry}
      </span>
      <div className="flex items-center gap-1 text-caption text-muted-foreground">
        <Users size={12} />
        <span>{mentor.followers}</span>
      </div>
      <button
        onClick={() => navigate(`/mentor/${mentor.id}`)}
        className="w-full py-2 rounded-md bg-primary text-primary-foreground text-caption font-medium hover:opacity-90 transition-opacity"
      >
        View Profile
>>>>>>> main
      </button>
    </div>
  );
}
