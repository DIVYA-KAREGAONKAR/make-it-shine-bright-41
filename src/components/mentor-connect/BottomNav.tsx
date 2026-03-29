import { Home, Search, Users, Briefcase, User, LayoutDashboard, MessageSquare, PlusCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";

const studentTabs = [
  { path: "/student/home", icon: Home, label: "Home" },
  { path: "/student/explore", icon: Search, label: "Explore" },
  { path: "/student/communities", icon: Users, label: "Communities" },
  { path: "/student/opportunities", icon: Briefcase, label: "Jobs" },
  { path: "/student/profile", icon: User, label: "Profile" },
];

const mentorTabs = [
  { path: "/mentor/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/mentor/community", icon: MessageSquare, label: "Community" },
  { path: "/mentor/post", icon: PlusCircle, label: "Post" },
  { path: "/mentor/members", icon: Users, label: "Members" },
  { path: "/mentor/profile", icon: User, label: "Profile" },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useAuth();

  const tabs = role === "mentor" ? mentorTabs : studentTabs;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 lg:hidden">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive = location.pathname.startsWith(tab.path);
          const Icon = tab.icon;
          const activeColor = role === "mentor" ? "text-mentor" : "text-primary";
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-1 px-3 py-1 transition-colors ${isActive ? activeColor : "text-muted-foreground"}`}
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export function DesktopSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useAuth();

  const tabs = role === "mentor" ? mentorTabs : studentTabs;

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border flex-col z-50">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${role === "mentor" ? "bg-mentor" : "bg-primary"} flex items-center justify-center`}>
            <span className={`${role === "mentor" ? "text-mentor-foreground" : "text-primary-foreground"} font-bold text-body`}>M</span>
          </div>
          <div>
            <span className="font-semibold text-body text-foreground block">MentorConnect</span>
            <span className="text-caption text-muted-foreground">नाशिक</span>
          </div>
        </div>
      </div>
      <nav className="flex-1 py-4">
        {tabs.map((tab) => {
          const isActive = location.pathname.startsWith(tab.path);
          const Icon = tab.icon;
          const activeClass = role === "mentor" 
            ? "bg-mentor/10 text-mentor border-r-2 border-mentor" 
            : "bg-primary/10 text-primary border-r-2 border-primary";
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-body font-medium transition-colors ${isActive ? activeClass : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"}`}
            >
              <Icon size={20} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border">
        <p className="text-caption text-muted-foreground text-center">🏔️ Made with ❤️ in Nashik</p>
      </div>
    </aside>
  );
}
