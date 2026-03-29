import { useAuth } from "@/lib/auth-context";
import { useNavigate } from "react-router-dom";
import { LogOut, Settings, ChevronRight, Edit } from "lucide-react";
import { SkillTag } from "@/components/mentor-connect/SkillTag";
import { ResponsiveLayout } from "@/components/mentor-connect/ResponsiveLayout";
import { toast } from "sonner";

export default function MentorProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("यशस्वीरित्या Sign Out झाले!");
    navigate("/");
  };

  return (
    <ResponsiveLayout>
      <div className="min-h-screen bg-background pb-20 lg:pb-8">
        {/* Cover */}
        <div className="h-32 lg:h-48 bg-gradient-to-r from-mentor to-mentor/70" />

        <div className="max-w-3xl mx-auto px-4 -mt-12 relative z-10 space-y-6">
          <div className="flex justify-between items-end">
            <div className="w-24 h-24 rounded-full bg-mentor/20 border-4 border-card flex items-center justify-center">
              <span className="text-h1 text-mentor">{user?.name?.charAt(0) || "M"}</span>
            </div>
            <button onClick={() => toast.info("Edit Profile येत आहे!")} className="flex items-center gap-1 px-3 py-2 rounded-lg border border-mentor text-mentor text-caption font-medium hover:bg-mentor/5 transition-colors">
              <Edit size={14} />Edit Profile
            </button>
          </div>

          <div>
            <h1 className="text-h2 text-foreground">{user?.name || "Mentor"}</h1>
            <p className="text-body text-muted-foreground">{user?.company || "Company"}</p>
            <div className="flex gap-4 mt-2 text-caption text-muted-foreground">
              <span><strong className="text-foreground">1,240</strong> followers</span>
              <span><strong className="text-foreground">450</strong> members</span>
            </div>
          </div>

          {user?.guidance && (
            <div className="bg-card rounded-card shadow-card border border-border p-4">
              <h3 className="text-body font-semibold text-foreground mb-2">Guidance Offered</h3>
              <p className="text-body text-muted-foreground">{user.guidance}</p>
            </div>
          )}

          {user?.skills && user.skills.length > 0 && (
            <div className="bg-card rounded-card shadow-card border border-border p-4">
              <h3 className="text-body font-semibold text-foreground mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((s) => <SkillTag key={s} label={s} />)}
              </div>
            </div>
          )}

          <div className="bg-card rounded-card shadow-card border border-border overflow-hidden">
            {[
              { label: "My Opportunities", action: () => navigate("/mentor/post") },
              { label: "Community Settings", action: () => navigate("/mentor/community") },
              { label: "Account Settings", action: () => toast.info("Account Settings येत आहे!") },
            ].map((item) => (
              <button key={item.label} onClick={item.action} className="w-full flex items-center justify-between px-4 py-4 border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                <span className="text-body text-foreground">{item.label}</span>
                <ChevronRight size={16} className="text-muted-foreground" />
              </button>
            ))}
          </div>

          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-destructive text-destructive text-body font-medium hover:bg-destructive/5 transition-colors">
            <LogOut size={16} />Sign Out
          </button>
        </div>
      </div>
    </ResponsiveLayout>
  );
}
