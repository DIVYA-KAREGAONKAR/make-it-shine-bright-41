import { useNavigate } from "react-router-dom";

interface CommunityCardProps {
  community: {
    id: string;
    name: string;
    mentorName: string;
    mentorAvatar: string;
    members: number;
    unread: number;
  };
}

export function CommunityCard({ community }: CommunityCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/community/${community.id}`)}
      className="flex items-center gap-3 p-4 bg-card rounded-card shadow-card border border-border cursor-pointer hover:border-primary/30 transition-colors animate-fade-in"
    >
      <img src={community.mentorAvatar} alt={community.mentorName} className="w-12 h-12 rounded-full object-cover" />
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-body text-foreground truncate">{community.name}</h4>
        <p className="text-caption text-muted-foreground">by {community.mentorName} · {community.members} members</p>
      </div>
      {community.unread > 0 && (
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-caption flex items-center justify-center font-medium">
          {community.unread}
        </span>
      )}
    </div>
  );
}
