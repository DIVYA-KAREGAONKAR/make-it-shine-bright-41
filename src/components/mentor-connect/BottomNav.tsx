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
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
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
