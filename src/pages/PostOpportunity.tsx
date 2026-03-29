import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { IndustryChip } from "@/components/mentor-connect/IndustryChip";
import { ResponsiveLayout } from "@/components/mentor-connect/ResponsiveLayout";
import { toast } from "sonner";

const opportunityTypes = ["Internship", "Job", "Workshop", "Mentorship Call", "Resource"];

interface FormErrors {
  title?: string;
  type?: string;
  company?: string;
  location?: string;
  description?: string;
  deadline?: string;
}

export default function PostOpportunity() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [remote, setRemote] = useState(false);
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!title.trim()) newErrors.title = "Title आवश्यक आहे";
    else if (title.trim().length < 3) newErrors.title = "Title किमान 3 characters असावे";
    else if (title.trim().length > 100) newErrors.title = "Title 100 characters पेक्षा कमी असावे";
    
    if (!type) newErrors.type = "Type निवडा";
    if (!company.trim()) newErrors.company = "Company name आवश्यक आहे";
    if (!remote && !location.trim()) newErrors.location = "Location आवश्यक आहे किंवा Remote निवडा";
    if (!description.trim()) newErrors.description = "Description आवश्यक आहे";
    else if (description.trim().length < 20) newErrors.description = "Description किमान 20 characters असावे";
    if (!deadline) newErrors.deadline = "Deadline आवश्यक आहे";
    else if (new Date(deadline) <= new Date()) newErrors.deadline = "Deadline भविष्यातील तारीख असावी";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      toast.success("Opportunity यशस्वीरित्या पोस्ट झाली! 🎉");
      navigate("/mentor/dashboard");
    } else {
      toast.error("कृपया सर्व फील्ड योग्यरित्या भरा");
    }
  };

  return (
    <ResponsiveLayout>
      <div className="min-h-screen bg-background pb-20 lg:pb-8">
        <div className="bg-card border-b border-border px-4 py-4">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground lg:hidden"><ArrowLeft size={20} /></button>
            <h1 className="text-h3 text-foreground">Opportunity पोस्ट करा</h1>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <label className="text-caption text-muted-foreground font-medium mb-2 block">Title *</label>
              <input value={title} onChange={(e) => { setTitle(e.target.value); setErrors(prev => ({ ...prev, title: undefined })); }} placeholder="उदा. Frontend Intern" className={`w-full px-4 py-3 rounded-lg border ${errors.title ? 'border-destructive' : 'border-input'} bg-card text-foreground text-body focus:ring-2 focus:ring-mentor/30 outline-none`} />
              {errors.title && <p className="text-caption text-destructive mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="text-caption text-muted-foreground font-medium mb-2 block">Company *</label>
              <input value={company} onChange={(e) => { setCompany(e.target.value); setErrors(prev => ({ ...prev, company: undefined })); }} placeholder="Company name" className={`w-full px-4 py-3 rounded-lg border ${errors.company ? 'border-destructive' : 'border-input'} bg-card text-foreground text-body focus:ring-2 focus:ring-mentor/30 outline-none`} />
              {errors.company && <p className="text-caption text-destructive mt-1">{errors.company}</p>}
            </div>

            <div className="lg:col-span-2">
              <label className="text-caption text-muted-foreground font-medium mb-2 block">Type *</label>
              <div className="flex flex-wrap gap-2">
                {opportunityTypes.map((t) => (
                  <IndustryChip key={t} label={t} selected={type === t} variant="mentor" onPress={() => { setType(t); setErrors(prev => ({ ...prev, type: undefined })); }} />
                ))}
              </div>
              {errors.type && <p className="text-caption text-destructive mt-1">{errors.type}</p>}
            </div>

            <div>
              <label className="text-caption text-muted-foreground font-medium mb-2 block">Location *</label>
              <div className="flex gap-3">
                <input value={location} onChange={(e) => { setLocation(e.target.value); setErrors(prev => ({ ...prev, location: undefined })); }} placeholder="शहर, राज्य" className={`flex-1 px-4 py-3 rounded-lg border ${errors.location ? 'border-destructive' : 'border-input'} bg-card text-foreground text-body focus:ring-2 focus:ring-mentor/30 outline-none`} />
                <button onClick={() => { setRemote(!remote); setErrors(prev => ({ ...prev, location: undefined })); }} className={`px-4 py-3 rounded-lg text-caption font-medium transition-colors ${remote ? "bg-mentor text-mentor-foreground" : "bg-secondary text-secondary-foreground"}`}>
                  Remote
                </button>
              </div>
              {errors.location && <p className="text-caption text-destructive mt-1">{errors.location}</p>}
            </div>

            <div>
              <label className="text-caption text-muted-foreground font-medium mb-2 block">Application Deadline *</label>
              <input type="date" value={deadline} onChange={(e) => { setDeadline(e.target.value); setErrors(prev => ({ ...prev, deadline: undefined })); }} className={`w-full px-4 py-3 rounded-lg border ${errors.deadline ? 'border-destructive' : 'border-input'} bg-card text-foreground text-body focus:ring-2 focus:ring-mentor/30 outline-none`} />
              {errors.deadline && <p className="text-caption text-destructive mt-1">{errors.deadline}</p>}
            </div>

            <div className="lg:col-span-2">
              <label className="text-caption text-muted-foreground font-medium mb-2 block">Description *</label>
              <textarea value={description} onChange={(e) => { setDescription(e.target.value); setErrors(prev => ({ ...prev, description: undefined })); }} placeholder="Opportunity बद्दल सांगा..." rows={4} className={`w-full px-4 py-3 rounded-lg border ${errors.description ? 'border-destructive' : 'border-input'} bg-card text-foreground text-body focus:ring-2 focus:ring-mentor/30 outline-none resize-none`} />
              {errors.description && <p className="text-caption text-destructive mt-1">{errors.description}</p>}
            </div>

            <div className="lg:col-span-2">
              <button onClick={handleSubmit} className="w-full py-3 rounded-lg bg-mentor text-mentor-foreground text-body font-medium hover:opacity-90 transition-opacity">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveLayout>
  );
}
