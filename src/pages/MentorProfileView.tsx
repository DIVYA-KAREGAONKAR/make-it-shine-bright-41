import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Users, UserPlus } from "lucide-react";
import { mentors, opportunities } from "@/lib/mock-data";
import { SkillTag } from "@/components/mentor-connect/SkillTag";
import { toast } from "sonner";

export default function MentorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const mentor = mentors.find((m) => m.id === id);
  const [activeTab, setActiveTab] = useState("about");
  const [following, setFollowing] = useState(false);

  if (!mentor) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Mentor सापडला नाही</div>;

  const mentorOpps = opportunities.filter((o) => o.mentorId === mentor.id);
  const tabs = ["About", "Skills", "Opportunities", "Reviews"];

  const handleFollow = () => {
    setFollowing(!following);
    toast.success(following ? "Unfollowed" : "Following! 🎉");
  };

  const handleJoinCommunity = () => {
    toast.success(`${mentor.name} च्या community मध्ये join झालात! 🙌`);
    navigate("/student/communities");
  };

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-8">
      <div className="relative h-40 lg:h-56">
        <img src={mentor.coverImage} alt="" className="w-full h-full object-cover" />
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 w-9 h-9 rounded-full bg-card/80 backdrop-blur flex items-center justify-center">
          <ArrowLeft size={18} className="text-foreground" />
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-12 relative z-10">
        <img src={mentor.avatar} alt={mentor.name} className="w-24 h-24 rounded-full border-4 border-card object-cover" />

        <div className="mt-3">
          <h1 className="text-h2 text-foreground">{mentor.name}</h1>
          <p className="text-body text-muted-foreground">{mentor.role} at {mentor.company}</p>
          <span className="inline-block mt-1 px-2 py-0.5 rounded-chip bg-primary/10 text-primary text-caption font-medium">{mentor.industry}</span>
        </div>

        <div className="flex gap-6 mt-4">
          <div className="text-center"><span className="text-h3 text-foreground font-bold">{mentor.followers}</span><p className="text-caption text-muted-foreground">Followers</p></div>
          <div className="text-center"><span className="text-h3 text-foreground font-bold">{mentor.communities}</span><p className="text-caption text-muted-foreground">Communities</p></div>
          <div className="text-center"><span className="text-h3 text-foreground font-bold">{mentor.posts}</span><p className="text-caption text-muted-foreground">Posts</p></div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={handleFollow} className={`flex-1 py-3 rounded-lg text-body font-medium flex items-center justify-center gap-2 transition-all ${following ? "bg-secondary text-secondary-foreground" : "border-2 border-primary text-primary"}`}>
            <UserPlus size={16} />{following ? "Following ✓" : "Follow"}
          </button>
          <button onClick={handleJoinCommunity} className="flex-1 py-3 rounded-lg bg-primary text-primary-foreground text-body font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            <Users size={16} />Community Join करा
          </button>
        </div>

        <div className="flex border-b border-border mt-6">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab.toLowerCase())} className={`flex-1 py-3 text-body font-medium transition-colors ${activeTab === tab.toLowerCase() ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="py-6 animate-fade-in">
          {activeTab === "about" && (
            <div className="space-y-4">
              <p className="text-body text-foreground">{mentor.bio}</p>
              <div><span className="text-caption text-muted-foreground font-medium">अनुभव:</span><span className="text-body text-foreground ml-2">{mentor.experience} वर्षे</span></div>
              <div><span className="text-caption text-muted-foreground font-medium">मार्गदर्शन:</span><p className="text-body text-foreground mt-1">{mentor.guidance}</p></div>
            </div>
          )}
          {activeTab === "skills" && (
            <div className="flex flex-wrap gap-2">{mentor.skills.map((s) => <SkillTag key={s} label={s} />)}</div>
          )}
          {activeTab === "opportunities" && (
            <div className="space-y-4">
              {mentorOpps.length > 0 ? mentorOpps.map((o) => (
                <div key={o.id} className="p-4 bg-card rounded-card border border-border">
                  <h4 className="font-semibold text-body text-foreground">{o.title}</h4>
                  <p className="text-caption text-muted-foreground">{o.company} · {o.location}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-chip bg-success/10 text-success text-caption font-medium">{o.type}</span>
                </div>
              )) : <p className="text-body text-muted-foreground">अजून opportunities पोस्ट नाहीत.</p>}
            </div>
          )}
          {activeTab === "reviews" && (
            <p className="text-body text-muted-foreground">अजून reviews नाहीत. पहिला review द्या!</p>
          )}
        </div>
      </div>
    </div>
  );
}
