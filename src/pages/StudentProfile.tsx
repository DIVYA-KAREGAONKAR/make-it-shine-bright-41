import { useAuth } from "@/lib/auth-context";
import { useNavigate } from "react-router-dom";
import { LogOut, Settings, ChevronRight } from "lucide-react";
import { SkillTag } from "@/components/mentor-connect/SkillTag";
import { ResponsiveLayout } from "@/components/mentor-connect/ResponsiveLayout";
import { toast } from "sonner";

export default function StudentProfile() {
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
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-h2 text-foreground">प्रोफाइल</h1>
            <button onClick={() => toast.info("Settings येत आहे!")} className="text-muted-foreground hover:text-foreground"><Settings size={20} /></button>
          </div>

          <div className="bg-card rounded-card shadow-card border border-border p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <span className="text-h1 text-primary">{user?.name?.charAt(0) || "S"}</span>
            </div>
            <h2 className="text-h3 text-foreground">{user?.name || "विद्यार्थी"}</h2>
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
            {[
              { label: "Edit Profile", action: () => toast.info("Edit Profile येत आहे!") },
              { label: "Saved Opportunities", action: () => toast.info("Saved opportunities येत आहे!") },
              { label: "Settings", action: () => toast.info("Settings येत आहे!") },
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
