import { Bell, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { StatCard } from "@/components/mentor-connect/StatCard";
import { posts } from "@/lib/mock-data";
import { PostCard } from "@/components/mentor-connect/PostCard";
import { BottomNav } from "@/components/mentor-connect/BottomNav";

export default function MentorDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Top Bar */}
      <div className="sticky top-0 bg-card/80 backdrop-blur-md border-b border-border z-40 px-4 py-3">
        <div className="max-w-lg mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-mentor flex items-center justify-center">
              <span className="text-mentor-foreground font-bold text-caption">M</span>
            </div>
            <span className="font-semibold text-body text-foreground">MentorConnect</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-muted-foreground hover:text-foreground"><Bell size={20} /></button>
            <button className="text-muted-foreground hover:text-foreground"><Settings size={20} /></button>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <h1 className="text-h2 text-foreground animate-fade-in">Welcome back, {user?.name || "Mentor"} 👋</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard label="Total Followers" value="1,240" variant="mentor" />
          <StatCard label="Community Members" value="450" variant="mentor" />
          <StatCard label="Opportunities Posted" value="12" variant="primary" />
          <StatCard label="This Week's Reach" value="3.2K" variant="default" />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Post Opportunity", action: () => navigate("/mentor/post") },
            { label: "Share Resource", action: () => {} },
            { label: "Start Discussion", action: () => {} },
          ].map((btn) => (
            <button key={btn.label} onClick={btn.action} className="p-3 rounded-card bg-mentor/10 text-mentor text-caption font-medium text-center hover:bg-mentor/20 transition-colors">
              {btn.label}
            </button>
          ))}
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-h3 text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {posts.slice(0, 3).map((p) => <PostCard key={p.id} post={p} />)}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
