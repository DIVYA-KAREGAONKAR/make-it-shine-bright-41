import { useState } from "react";
import { communities } from "@/lib/mock-data";
import { BottomNav } from "@/components/mentor-connect/BottomNav";
import { ChatSection } from "@/components/mentor-connect/ChatSection";
import { SharedResourcesList } from "@/components/mentor-connect/SharedResourcesList";
import { ResponsiveLayout } from "@/components/mentor-connect/ResponsiveLayout";
import { Settings, Users, Upload } from "lucide-react";
import { OpportunityCard } from "@/components/mentor-connect/OpportunityCard";
import { opportunities } from "@/lib/mock-data";
import { toast } from "sonner";

export default function MentorCommunityManagement() {
  const [activeTab, setActiveTab] = useState("chat");
  const community = communities[0];
  const tabs = ["Chat", "Opportunities", "Members", "Shared Resources"];
  const communityOpps = opportunities.filter((o) => o.mentorId === community.mentorId);

  const handleSettings = () => {
    toast.info("Community settings येत आहे लवकरच!");
  };

  return (
    <ResponsiveLayout>
      <div className="min-h-screen bg-background pb-20 lg:pb-0">
        {/* Header */}
        <div className="bg-card border-b border-border px-4 py-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h1 className="text-h3 text-foreground">{community.name}</h1>
                <div className="flex items-center gap-2 text-caption text-muted-foreground">
                  <Users size={12} /><span>{community.members} members</span>
                </div>
              </div>
              <button onClick={handleSettings} className="text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-muted transition-colors">
                <Settings size={20} />
              </button>
            </div>
            <div className="flex border-b border-border -mx-4 px-4 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`flex-shrink-0 px-4 py-3 text-body font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.toLowerCase()
                      ? "text-mentor border-b-2 border-mentor"
                      : "text-muted-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          {activeTab === "chat" && <ChatSection />}
          
          {activeTab === "opportunities" && (
            <div className="px-4 py-6 space-y-4">
              {communityOpps.length > 0 ? (
                communityOpps.map((o) => <OpportunityCard key={o.id} opportunity={o} />)
              ) : (
                <p className="text-body text-muted-foreground text-center py-8">अजून कोणत्याही opportunities पोस्ट केल्या नाहीत.</p>
              )}
            </div>
          )}
          
          {activeTab === "members" && (
            <div className="px-4 py-6">
              <p className="text-body text-muted-foreground text-center py-8">Member management लवकरच येत आहे.</p>
            </div>
          )}
          
          {activeTab === "shared resources" && (
            <div className="px-4 py-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-h3 text-foreground">Shared Resources</h2>
                <button
                  onClick={() => toast.success("Resource upload feature लवकरच!")}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-mentor/10 text-mentor text-caption font-medium hover:bg-mentor/20 transition-colors"
                >
                  <Upload size={14} /> Upload
                </button>
              </div>
              <SharedResourcesList />
            </div>
          )}
        </div>
      </div>
    </ResponsiveLayout>
  );
}
