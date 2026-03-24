import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { IndustryChip } from "@/components/mentor-connect/IndustryChip";
import { BottomNav } from "@/components/mentor-connect/BottomNav";
import { toast } from "sonner";

const opportunityTypes = ["Internship", "Job", "Workshop", "Mentorship Call", "Resource"];

export default function PostOpportunity() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [remote, setRemote] = useState(false);
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = () => {
    toast.success("Opportunity posted successfully!");
    navigate("/mentor/dashboard");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground"><ArrowLeft size={20} /></button>
          <h1 className="text-h3 text-foreground">Post Opportunity</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-5">
        <div>
          <label className="text-caption text-muted-foreground font-medium mb-2 block">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Frontend Intern" className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground text-body focus:ring-2 focus:ring-mentor/30 outline-none" />
        </div>

        <div>
          <label className="text-caption text-muted-foreground font-medium mb-2 block">Type</label>
          <div className="flex flex-wrap gap-2">
            {opportunityTypes.map((t) => (
              <IndustryChip key={t} label={t} selected={type === t} variant="mentor" onPress={() => setType(t)} />
            ))}
          </div>
        </div>

        <div>
          <label className="text-caption text-muted-foreground font-medium mb-2 block">Company</label>
          <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company name" className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground text-body focus:ring-2 focus:ring-mentor/30 outline-none" />
        </div>

        <div>
          <label className="text-caption text-muted-foreground font-medium mb-2 block">Location</label>
          <div className="flex gap-3">
            <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City, Country" className="flex-1 px-4 py-3 rounded-lg border border-input bg-card text-foreground text-body focus:ring-2 focus:ring-mentor/30 outline-none" />
            <button onClick={() => setRemote(!remote)} className={`px-4 py-3 rounded-lg text-caption font-medium transition-colors ${remote ? "bg-mentor text-mentor-foreground" : "bg-secondary text-secondary-foreground"}`}>
              Remote
            </button>
          </div>
        </div>

        <div>
          <label className="text-caption text-muted-foreground font-medium mb-2 block">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the opportunity..." rows={4} className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground text-body focus:ring-2 focus:ring-mentor/30 outline-none resize-none" />
        </div>

        <div>
          <label className="text-caption text-muted-foreground font-medium mb-2 block">Application Deadline</label>
          <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground text-body focus:ring-2 focus:ring-mentor/30 outline-none" />
        </div>

        <button onClick={handleSubmit} className="w-full py-3 rounded-lg bg-mentor text-mentor-foreground text-body font-medium hover:opacity-90 transition-opacity">
          Submit
        </button>
      </div>
      <BottomNav />
    </div>
  );
}
