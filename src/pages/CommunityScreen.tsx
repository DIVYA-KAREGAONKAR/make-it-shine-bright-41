import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Users } from "lucide-react";
import { communities } from "@/lib/mock-data";
import { ChatSection } from "@/components/mentor-connect/ChatSection";
import { SharedResourcesList } from "@/components/mentor-connect/SharedResourcesList";
import { ResponsiveLayout } from "@/components/mentor-connect/ResponsiveLayout";
import { toast } from "sonner";

export default function CommunityScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const community = communities.find((c) => c.id === id);
  const [activeTab, setActiveTab] = useState("chat");
  const [joined, setJoined] = useState(true);

  if (!community) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Community सापडली नाही</div>;

  const tabs = ["Chat", "Opportunities", "Members", "Resources"];

  const handleLeave = () => {
    if (window.confirm("Community सोडायची आहे का?")) {
      setJoined(false);
      toast.success("Community सोडली");
      navigate("/student/communities");
    }
  };

  return (
    <ResponsiveLayout>
      <div className="min-h-screen bg-background pb-20 lg:pb-0">
        <div className="bg-card border-b border-border px-4 py-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground"><ArrowLeft size={20} /></button>
              <div className="flex-1">
                <h1 className="text-h3 text-foreground">{community.name}</h1>
                <div className="flex items-center gap-2 text-caption text-muted-foreground">
                  <img src={community.mentorAvatar} alt="" className="w-5 h-5 rounded-full" />
                  <span>{community.mentorName}</span>
                  <span>·</span>
                  <Users size={12} />
                  <span>{community.members} members</span>
                </div>
              </div>
              <button onClick={handleLeave} className="text-caption text-destructive font-medium">Leave</button>
            </div>

            <div className="flex border-b border-border -mx-4 px-4 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab.toLowerCase())} className={`flex-shrink-0 px-4 py-3 text-body font-medium transition-colors whitespace-nowrap ${activeTab === tab.toLowerCase() ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          {activeTab === "chat" && <ChatSection />}
          {activeTab === "opportunities" && <p className="text-body text-muted-foreground text-center py-8 px-4">या community मध्ये अजून opportunities पोस्ट नाहीत.</p>}
          {activeTab === "members" && <p className="text-body text-muted-foreground text-center py-8 px-4">Member list लवकरच.</p>}
          {activeTab === "resources" && (
            <div className="px-4 py-6">
              <SharedResourcesList />
            </div>
          )}
        </div>
      </div>
    </ResponsiveLayout>
  );
}
