import { useAuth } from "@/lib/auth-context";
import { useNavigate } from "react-router-dom";
import { LogOut, Settings, ChevronRight } from "lucide-react";
import { SkillTag } from "@/components/mentor-connect/SkillTag";
import { BottomNav } from "@/components/mentor-connect/BottomNav";

export default function StudentProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-h2 text-foreground">Profile</h1>
          <button className="text-muted-foreground hover:text-foreground"><Settings size={20} /></button>
        </div>

        <div className="bg-card rounded-card shadow-card border border-border p-6 text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <span className="text-h1 text-primary">{user?.name?.charAt(0) || "S"}</span>
          </div>
          <h2 className="text-h3 text-foreground">{user?.name || "Student"}</h2>
          <p className="text-caption text-muted-foreground">{user?.email || "student@example.com"}</p>
        </div>

        {user?.industries && user.industries.length > 0 && (
          <div className="bg-card rounded-card shadow-card border border-border p-4">
            <h3 className="text-body font-semibold text-foreground mb-2">Industries</h3>
            <div className="flex flex-wrap gap-2">
              {user.industries.map((ind) => <SkillTag key={ind} label={ind} />)}
            </div>
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

        {user?.goals && (
          <div className="bg-card rounded-card shadow-card border border-border p-4">
            <h3 className="text-body font-semibold text-foreground mb-2">Goals</h3>
            <p className="text-body text-muted-foreground">{user.goals}</p>
          </div>
        )}

        <div className="bg-card rounded-card shadow-card border border-border overflow-hidden">
          {["Edit Profile", "Saved Opportunities", "Settings"].map((item) => (
            <button key={item} className="w-full flex items-center justify-between px-4 py-4 border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
              <span className="text-body text-foreground">{item}</span>
              <ChevronRight size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>

        <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-destructive text-destructive text-body font-medium hover:bg-destructive/5 transition-colors">
          <LogOut size={16} />Sign Out
        </button>
      </div>
      <BottomNav />
    </div>
  );
}
