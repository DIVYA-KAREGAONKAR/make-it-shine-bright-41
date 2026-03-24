import { useState, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { StepProgressBar } from "@/components/mentor-connect/StepProgressBar";
import { IndustryChip } from "@/components/mentor-connect/IndustryChip";
import { SkillTag } from "@/components/mentor-connect/SkillTag";
import { industries } from "@/lib/mock-data";
import { ArrowLeft, ArrowRight, Camera } from "lucide-react";

export default function StudentOnboarding() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [goals, setGoals] = useState("");

  const toggleIndustry = (ind: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(ind) ? prev.filter((i) => i !== ind) : [...prev, ind]
    );
  };

  const addSkill = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleFinish = () => {
    login({ name, email, role: "student", industries: selectedIndustries, skills, goals });
    navigate("/student/home");
  };

  return (
    <div className="min-h-screen bg-background px-6 py-8 max-w-md mx-auto">
      <StepProgressBar currentStep={step} totalSteps={3} variant="student" />

      <div className="mt-8 animate-fade-in">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-h1 text-foreground">Create your account</h2>
            <p className="text-body text-muted-foreground">Let's get started with the basics.</p>
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center cursor-pointer hover:bg-muted transition-colors">
                <Camera size={24} className="text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-4">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground text-body focus:ring-2 focus:ring-primary/30 outline-none" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email address" className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground text-body focus:ring-2 focus:ring-primary/30 outline-none" />
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground text-body focus:ring-2 focus:ring-primary/30 outline-none" />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-h1 text-foreground">Pick your industries</h2>
            <p className="text-body text-muted-foreground">Select the industries you're interested in.</p>
            <div className="flex flex-wrap gap-3">
              {industries.map((ind) => (
                <IndustryChip key={ind} label={ind} selected={selectedIndustries.includes(ind)} onPress={() => toggleIndustry(ind)} />
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-h1 text-foreground">Skills & Goals</h2>
            <p className="text-body text-muted-foreground">Tell us what you know and where you're headed.</p>
            <div>
              <label className="text-caption text-muted-foreground font-medium mb-2 block">Skills</label>
              <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={addSkill} placeholder="Type a skill and press Enter" className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground text-body focus:ring-2 focus:ring-primary/30 outline-none" />
              <div className="flex flex-wrap gap-2 mt-3">
                {skills.map((s) => (
                  <SkillTag key={s} label={s} removable onRemove={() => setSkills(skills.filter((sk) => sk !== s))} />
                ))}
              </div>
            </div>
            <div>
              <label className="text-caption text-muted-foreground font-medium mb-2 block">Your Goals</label>
              <textarea value={goals} onChange={(e) => setGoals(e.target.value)} placeholder="e.g. Get an internship in software by 2026" rows={3} className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground text-body focus:ring-2 focus:ring-primary/30 outline-none resize-none" />
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
        <div className="flex items-center gap-3">
          {step > 1 && step < 3 && (
            <button onClick={() => setStep(step + 1)} className="text-body text-muted-foreground hover:text-foreground transition-colors">Skip</button>
          )}
          {step < 3 ? (
            <button onClick={() => setStep(step + 1)} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground text-body font-medium hover:opacity-90 transition-opacity">
              Next <ArrowRight size={16} />
            </button>
          ) : (
            <button onClick={handleFinish} className="px-6 py-3 rounded-lg bg-primary text-primary-foreground text-body font-medium hover:opacity-90 transition-opacity">
              Enter App 🚀
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
