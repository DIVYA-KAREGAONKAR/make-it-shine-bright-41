import { useState, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { StepProgressBar } from "@/components/mentor-connect/StepProgressBar";
import { IndustryChip } from "@/components/mentor-connect/IndustryChip";
import { SkillTag } from "@/components/mentor-connect/SkillTag";
import { industries } from "@/lib/mock-data";
import { ArrowLeft, ArrowRight, Camera } from "lucide-react";

export default function MentorOnboarding() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState(5);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [guidance, setGuidance] = useState("");
  const [offerTypes, setOfferTypes] = useState<string[]>([]);

  const addSkill = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const toggleOffer = (offer: string) => {
    setOfferTypes((prev) => prev.includes(offer) ? prev.filter((o) => o !== offer) : [...prev, offer]);
  };

  const handleFinish = () => {
    login({ name, email, role: "mentor", industries: [selectedIndustry], skills, company, experience, guidance });
    navigate("/mentor/dashboard");
  };

  return (
    <div className="min-h-screen bg-background px-6 py-8 max-w-md mx-auto">
      <StepProgressBar currentStep={step} totalSteps={3} variant="mentor" />

      <div className="mt-8 animate-fade-in">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-h1 text-foreground">Create your mentor account</h2>
            <p className="text-body text-muted-foreground">Tell us about yourself.</p>
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center cursor-pointer hover:bg-muted transition-colors">
                <Camera size={24} className="text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-4">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground text-body focus:ring-2 focus:ring-mentor/30 outline-none" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email address" className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground text-body focus:ring-2 focus:ring-mentor/30 outline-none" />
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground text-body focus:ring-2 focus:ring-mentor/30 outline-none" />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-h1 text-foreground">Professional details</h2>
            <p className="text-body text-muted-foreground">Share your professional background.</p>
            <div className="space-y-4">
              <div>
                <label className="text-caption text-muted-foreground font-medium mb-2 block">Industry</label>
                <div className="flex flex-wrap gap-2">
                  {industries.map((ind) => (
                    <IndustryChip key={ind} label={ind} selected={selectedIndustry === ind} variant="mentor" onPress={() => setSelectedIndustry(ind)} />
                  ))}
                </div>
              </div>
              <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Current role (e.g. Senior Engineer)" className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground text-body focus:ring-2 focus:ring-mentor/30 outline-none" />
              <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground text-body focus:ring-2 focus:ring-mentor/30 outline-none" />
              <div>
                <label className="text-caption text-muted-foreground font-medium mb-2 block">Years of experience: {experience}</label>
                <input type="range" min={0} max={30} value={experience} onChange={(e) => setExperience(Number(e.target.value))} className="w-full accent-mentor" />
              </div>
              <div>
                <label className="text-caption text-muted-foreground font-medium mb-2 block">Skills</label>
                <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={addSkill} placeholder="Type a skill and press Enter" className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground text-body focus:ring-2 focus:ring-mentor/30 outline-none" />
                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.map((s) => (
                    <SkillTag key={s} label={s} removable onRemove={() => setSkills(skills.filter((sk) => sk !== s))} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-h1 text-foreground">What will you offer?</h2>
            <p className="text-body text-muted-foreground">Tell students how you can help.</p>
            <div>
              <label className="text-caption text-muted-foreground font-medium mb-2 block">Guidance you offer</label>
              <textarea value={guidance} onChange={(e) => setGuidance(e.target.value)} placeholder="e.g. Career guidance, code reviews, interview prep..." rows={3} className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground text-body focus:ring-2 focus:ring-mentor/30 outline-none resize-none" />
            </div>
            <div>
              <label className="text-caption text-muted-foreground font-medium mb-2 block">Opportunities you can share</label>
              <div className="flex flex-wrap gap-2">
                {["Internships", "Jobs", "Workshops", "Mentorship Calls", "Resources"].map((o) => (
                  <IndustryChip key={o} label={o} selected={offerTypes.includes(o)} variant="mentor" onPress={() => toggleOffer(o)} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-10">
        {step > 1 ? (
          <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 text-body text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} /> Back
          </button>
        ) : <div />}
        {step < 3 ? (
          <button onClick={() => setStep(step + 1)} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-mentor text-mentor-foreground text-body font-medium hover:opacity-90 transition-opacity">
            Next <ArrowRight size={16} />
          </button>
        ) : (
          <button onClick={handleFinish} className="px-6 py-3 rounded-lg bg-mentor text-mentor-foreground text-body font-medium hover:opacity-90 transition-opacity">
            Set Up My Profile 🏢
          </button>
        )}
      </div>
    </div>
  );
}
