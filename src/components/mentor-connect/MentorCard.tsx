import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
}

export function MentorCard({ mentor }: MentorCardProps) {
  const navigate = useNavigate();

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
      </button>
    </div>
  );
}
