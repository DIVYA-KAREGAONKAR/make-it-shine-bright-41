import { useState, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { StepProgressBar } from "@/components/mentor-connect/StepProgressBar";
import { IndustryChip } from "@/components/mentor-connect/IndustryChip";
import { SkillTag } from "@/components/mentor-connect/SkillTag";
import { industries } from "@/lib/mock-data";
import { ArrowLeft, ArrowRight, Camera } from "lucide-react";
import { toast } from "sonner";

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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addSkill = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (skills.length >= 10) { toast.error("जास्तीत जास्त 10 skills"); return; }
      if (!skills.includes(skillInput.trim())) setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const toggleOffer = (offer: string) => {
    setOfferTypes((prev) => prev.includes(offer) ? prev.filter((o) => o !== offer) : [...prev, offer]);
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
    if (step === 2) {
      if (!selectedIndustry) newErrors.industry = "Industry निवडा";
      if (!role.trim()) newErrors.role = "Current role आवश्यक आहे";
      if (!company.trim()) newErrors.company = "Company name आवश्यक आहे";
    }
    if (step === 3) {
      if (!guidance.trim()) newErrors.guidance = "Guidance description आवश्यक आहे";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
  };

  const handleFinish = () => {
    if (!validateStep()) return;
    login({ name, email, role: "mentor", industries: [selectedIndustry], skills, company, experience, guidance });
    toast.success("स्वागत आहे, Mentor! 🎉");
    navigate("/mentor/dashboard");
  };

  return (
    <div className="min-h-screen bg-background px-6 py-8 max-w-lg mx-auto">
      <StepProgressBar currentStep={step} totalSteps={3} variant="mentor" />

      <div className="mt-8 animate-fade-in">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-h1 text-foreground">Mentor खाते तयार करा</h2>
            <p className="text-body text-muted-foreground">तुमच्याबद्दल सांगा.</p>
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center cursor-pointer hover:bg-muted transition-colors">
                <Camera size={24} className="text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <input value={name} onChange={(e) => { setName(e.target.value); setErrors(prev => ({ ...prev, name: '' })); }} placeholder="पूर्ण नाव" className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-destructive' : 'border-input'} bg-card text-foreground text-body focus:ring-2 focus:ring-mentor/30 outline-none`} />
                {errors.name && <p className="text-caption text-destructive mt-1">{errors.name}</p>}
              </div>
              <div>
                <input value={email} onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: '' })); }} type="email" placeholder="Email address" className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-destructive' : 'border-input'} bg-card text-foreground text-body focus:ring-2 focus:ring-mentor/30 outline-none`} />
                {errors.email && <p className="text-caption text-destructive mt-1">{errors.email}</p>}
              </div>
              <div>
                <input value={password} onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: '' })); }} type="password" placeholder="Password" className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-destructive' : 'border-input'} bg-card text-foreground text-body focus:ring-2 focus:ring-mentor/30 outline-none`} />
                {errors.password && <p className="text-caption text-destructive mt-1">{errors.password}</p>}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-h1 text-foreground">व्यावसायिक तपशील</h2>
            <p className="text-body text-muted-foreground">तुमची professional माहिती शेअर करा.</p>
            <div className="space-y-4">
              <div>
                <label className="text-caption text-muted-foreground font-medium mb-2 block">Industry *</label>
                <div className="flex flex-wrap gap-2">
                  {industries.map((ind) => (
                    <IndustryChip key={ind} label={ind} selected={selectedIndustry === ind} variant="mentor" onPress={() => { setSelectedIndustry(ind); setErrors(prev => ({ ...prev, industry: '' })); }} />
                  ))}
                </div>
                {errors.industry && <p className="text-caption text-destructive mt-1">{errors.industry}</p>}
              </div>
              <div>
                <input value={role} onChange={(e) => { setRole(e.target.value); setErrors(prev => ({ ...prev, role: '' })); }} placeholder="Current role (उदा. Senior Engineer)" className={`w-full px-4 py-3 rounded-lg border ${errors.role ? 'border-destructive' : 'border-input'} bg-card text-foreground text-body focus:ring-2 focus:ring-mentor/30 outline-none`} />
                {errors.role && <p className="text-caption text-destructive mt-1">{errors.role}</p>}
              </div>
              <div>
                <input value={company} onChange={(e) => { setCompany(e.target.value); setErrors(prev => ({ ...prev, company: '' })); }} placeholder="Company" className={`w-full px-4 py-3 rounded-lg border ${errors.company ? 'border-destructive' : 'border-input'} bg-card text-foreground text-body focus:ring-2 focus:ring-mentor/30 outline-none`} />
                {errors.company && <p className="text-caption text-destructive mt-1">{errors.company}</p>}
              </div>
              <div>
                <label className="text-caption text-muted-foreground font-medium mb-2 block">अनुभव: {experience} वर्षे</label>
                <input type="range" min={0} max={30} value={experience} onChange={(e) => setExperience(Number(e.target.value))} className="w-full accent-mentor" />
              </div>
              <div>
                <label className="text-caption text-muted-foreground font-medium mb-2 block">Skills</label>
                <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={addSkill} placeholder="Skill टाइप करा आणि Enter दाबा" className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground text-body focus:ring-2 focus:ring-mentor/30 outline-none" />
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
            <h2 className="text-h1 text-foreground">तुम्ही काय देऊ शकता?</h2>
            <p className="text-body text-muted-foreground">विद्यार्थ्यांना तुम्ही कसे मदत कराल ते सांगा.</p>
            <div>
              <label className="text-caption text-muted-foreground font-medium mb-2 block">मार्गदर्शन *</label>
              <textarea value={guidance} onChange={(e) => { setGuidance(e.target.value); setErrors(prev => ({ ...prev, guidance: '' })); }} placeholder="उदा. करिअर मार्गदर्शन, कोड reviews, इंटरव्ह्यू तयारी..." rows={3} className={`w-full px-4 py-3 rounded-lg border ${errors.guidance ? 'border-destructive' : 'border-input'} bg-card text-foreground text-body focus:ring-2 focus:ring-mentor/30 outline-none resize-none`} />
              {errors.guidance && <p className="text-caption text-destructive mt-1">{errors.guidance}</p>}
            </div>
            <div>
              <label className="text-caption text-muted-foreground font-medium mb-2 block">शेअर करू शकता</label>
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
            <ArrowLeft size={16} /> मागे
          </button>
        ) : <div />}
        {step < 3 ? (
          <button onClick={handleNext} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-mentor text-mentor-foreground text-body font-medium hover:opacity-90 transition-opacity">
            पुढे <ArrowRight size={16} />
          </button>
        ) : (
          <button onClick={handleFinish} className="px-6 py-3 rounded-lg bg-mentor text-mentor-foreground text-body font-medium hover:opacity-90 transition-opacity">
            Profile सेट करा 🏢
          </button>
        )}
      </div>
    </div>
  );
}
