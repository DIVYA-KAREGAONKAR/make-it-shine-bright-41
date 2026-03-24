import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Users } from "lucide-react";
import { communities, posts } from "@/lib/mock-data";
import { PostCard } from "@/components/mentor-connect/PostCard";
import { BottomNav } from "@/components/mentor-connect/BottomNav";

export default function CommunityScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const community = communities.find((c) => c.id === id);
  const [activeTab, setActiveTab] = useState("feed");

  if (!community) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Community not found</div>;

  const tabs = ["Feed", "Opportunities", "Members", "Resources"];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="max-w-lg mx-auto">
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
            <button className="text-caption text-destructive font-medium">Leave</button>
          </div>

          <div className="flex border-b border-border -mx-4 px-4">
            {tabs.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab.toLowerCase())} className={`flex-1 py-3 text-body font-medium transition-colors ${activeTab === tab.toLowerCase() ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {activeTab === "feed" && (
          <div className="space-y-4">
            {posts.map((post) => <PostCard key={post.id} post={post} />)}
          </div>
        )}
        {activeTab === "opportunities" && <p className="text-body text-muted-foreground text-center py-8">No opportunities posted in this community yet.</p>}
        {activeTab === "members" && <p className="text-body text-muted-foreground text-center py-8">Member list coming soon.</p>}
        {activeTab === "resources" && <p className="text-body text-muted-foreground text-center py-8">No resources shared yet.</p>}
      </div>

      {/* FAB */}
      <button className="fixed bottom-20 right-4 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity z-40">
        <Plus size={24} />
      </button>

      <BottomNav />
    </div>
  );
}
