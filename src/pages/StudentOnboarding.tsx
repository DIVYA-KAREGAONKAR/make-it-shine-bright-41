import { useState, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { StepProgressBar } from "@/components/mentor-connect/StepProgressBar";
import { IndustryChip } from "@/components/mentor-connect/IndustryChip";
import { SkillTag } from "@/components/mentor-connect/SkillTag";
import { industries } from "@/lib/mock-data";
import { ArrowLeft, ArrowRight, Camera } from "lucide-react";
import { toast } from "sonner";

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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleIndustry = (ind: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(ind) ? prev.filter((i) => i !== ind) : [...prev, ind]
    );
  };

  const addSkill = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (skills.length >= 10) { toast.error("जास्तीत जास्त 10 skills"); return; }
      if (!skills.includes(skillInput.trim())) setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!name.trim()) newErrors.name = "नाव आवश्यक आहे";
      else if (name.trim().length < 2) newErrors.name = "नाव किमान 2 characters असावे";
      if (!email.trim()) newErrors.email = "Email आवश्यक आहे";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "योग्य email टाका";
      if (!password) newErrors.password = "Password आवश्यक आहे";
      else if (password.length < 6) newErrors.password = "Password किमान 6 characters असावा";
    }
    if (step === 2 && selectedIndustries.length === 0) {
      newErrors.industries = "किमान एक industry निवडा";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
  };

  const handleFinish = () => {
    if (!validateStep()) return;
    login({ name, email, role: "student", industries: selectedIndustries, skills, goals });
    toast.success("स्वागत आहे! 🎉");
    navigate("/student/home");
  };

  return (
    <div className="min-h-screen bg-background px-6 py-8 max-w-lg mx-auto">
      <StepProgressBar currentStep={step} totalSteps={3} variant="student" />

      <div className="mt-8 animate-fade-in">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-h1 text-foreground">तुमचे खाते तयार करा</h2>
            <p className="text-body text-muted-foreground">मूलभूत माहिती भरा.</p>
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center cursor-pointer hover:bg-muted transition-colors">
                <Camera size={24} className="text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <input value={name} onChange={(e) => { setName(e.target.value); setErrors(prev => ({ ...prev, name: '' })); }} placeholder="पूर्ण नाव" className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-destructive' : 'border-input'} bg-card text-foreground text-body focus:ring-2 focus:ring-primary/30 outline-none`} />
                {errors.name && <p className="text-caption text-destructive mt-1">{errors.name}</p>}
              </div>
              <div>
                <input value={email} onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: '' })); }} type="email" placeholder="Email address" className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-destructive' : 'border-input'} bg-card text-foreground text-body focus:ring-2 focus:ring-primary/30 outline-none`} />
                {errors.email && <p className="text-caption text-destructive mt-1">{errors.email}</p>}
              </div>
              <div>
                <input value={password} onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: '' })); }} type="password" placeholder="Password" className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-destructive' : 'border-input'} bg-card text-foreground text-body focus:ring-2 focus:ring-primary/30 outline-none`} />
                {errors.password && <p className="text-caption text-destructive mt-1">{errors.password}</p>}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-h1 text-foreground">Industries निवडा</h2>
            <p className="text-body text-muted-foreground">तुम्हाला कोणत्या industries मध्ये interest आहे ते निवडा.</p>
            <div className="flex flex-wrap gap-3">
              {industries.map((ind) => (
                <IndustryChip key={ind} label={ind} selected={selectedIndustries.includes(ind)} onPress={() => toggleIndustry(ind)} />
              ))}
            </div>
            {errors.industries && <p className="text-caption text-destructive">{errors.industries}</p>}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-h1 text-foreground">Skills & Goals</h2>
            <p className="text-body text-muted-foreground">तुमच्या skills आणि goals बद्दल सांगा.</p>
            <div>
              <label className="text-caption text-muted-foreground font-medium mb-2 block">Skills</label>
              <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={addSkill} placeholder="Skill टाइप करा आणि Enter दाबा" className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground text-body focus:ring-2 focus:ring-primary/30 outline-none" />
              <div className="flex flex-wrap gap-2 mt-3">
                {skills.map((s) => (
                  <SkillTag key={s} label={s} removable onRemove={() => setSkills(skills.filter((sk) => sk !== s))} />
                ))}
              </div>
            </div>
            <div>
              <label className="text-caption text-muted-foreground font-medium mb-2 block">तुमचे Goals</label>
              <textarea value={goals} onChange={(e) => setGoals(e.target.value)} placeholder="उदा. 2026 पर्यंत software मध्ये internship मिळवायचे" rows={3} className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground text-body focus:ring-2 focus:ring-primary/30 outline-none resize-none" />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-10">
        {step > 1 ? (
          <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 text-body text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} /> मागे
          </button>
        ) : <div />}
        <div className="flex items-center gap-3">
          {step === 2 && (
            <button onClick={() => setStep(step + 1)} className="text-body text-muted-foreground hover:text-foreground transition-colors">Skip</button>
          )}
          {step < 3 ? (
            <button onClick={handleNext} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground text-body font-medium hover:opacity-90 transition-opacity">
              पुढे <ArrowRight size={16} />
            </button>
          ) : (
            <button onClick={handleFinish} className="px-6 py-3 rounded-lg bg-primary text-primary-foreground text-body font-medium hover:opacity-90 transition-opacity">
              App मध्ये प्रवेश करा 🚀
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
