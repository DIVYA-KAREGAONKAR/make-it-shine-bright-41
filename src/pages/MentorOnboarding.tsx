<<<<<<< HEAD
import { useState, KeyboardEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";
import { StepProgressBar } from "@/components/mentor-connect/StepProgressBar";
import { IndustryChip } from "@/components/mentor-connect/IndustryChip";
import { SkillTag } from "@/components/mentor-connect/SkillTag";
import { Logo } from "@/components/mentor-connect/Logo";
import { LanguageToggle } from "@/components/mentor-connect/LanguageToggle";
import { industries } from "@/lib/constants";
import { ArrowLeft, ArrowRight, Briefcase, Award, Target, Star, Building2 } from "lucide-react";
=======
import { useState, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { StepProgressBar } from "@/components/mentor-connect/StepProgressBar";
import { IndustryChip } from "@/components/mentor-connect/IndustryChip";
import { SkillTag } from "@/components/mentor-connect/SkillTag";
import { industries } from "@/lib/mock-data";
import { ArrowLeft, ArrowRight, Camera } from "lucide-react";
>>>>>>> main
import { toast } from "sonner";

export default function MentorOnboarding() {
  const navigate = useNavigate();
<<<<<<< HEAD
  const { user, updateUser, isAuthenticated } = useAuth();
  const { t } = useLanguage();

  // Start at step 2 because account info (Step 1) was done at registration
  const [step, setStep] = useState(2);
=======
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
>>>>>>> main
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState(5);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [guidance, setGuidance] = useState("");
  const [offerTypes, setOfferTypes] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

<<<<<<< HEAD
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const addSkill = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      const trimmed = skillInput.trim();
      if (skills.length >= 10) { 
        toast.error(t("mentorOnboard.maxSkills") || "Maximum 10 skills allowed"); 
        return; 
      }
      if (!skills.includes(trimmed)) setSkills([...skills, trimmed]);
=======
  const addSkill = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (skills.length >= 10) { toast.error("जास्तीत जास्त 10 skills"); return; }
      if (!skills.includes(skillInput.trim())) setSkills([...skills, skillInput.trim()]);
>>>>>>> main
      setSkillInput("");
    }
  };

  const toggleOffer = (offer: string) => {
    setOfferTypes((prev) => prev.includes(offer) ? prev.filter((o) => o !== offer) : [...prev, offer]);
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};
<<<<<<< HEAD
    if (step === 2) {
      if (!selectedIndustry) newErrors.industry = t("mentorOnboard.industryError") || "Please select an industry";
      if (!role.trim()) newErrors.role = t("mentorOnboard.roleError") || "Professional role is required";
      if (!company.trim()) newErrors.company = t("mentorOnboard.companyError") || "Company name is required";
    }
    if (step === 3) {
      if (!guidance.trim()) newErrors.guidance = t("mentorOnboard.guidanceError") || "Please describe your guidance areas";
=======
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
>>>>>>> main
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

<<<<<<< HEAD
  const handleNext = () => { if (validateStep()) setStep(step + 1); };

  const handleFinish = async () => {
    if (!validateStep()) return;
    try {
      await updateUser({ 
        industries: [selectedIndustry], 
        skills, 
        company, 
        experience, 
        guidance 
      });
      toast.success(t("mentorOnboard.welcome") || `Welcome to MentorConnect, ${user?.name}! 🎓`);
      navigate("/mentor/dashboard");
    } catch (error) {
      toast.error("Failed to save profile. Please try again.");
    }
  };

  if (!user) return null;

  const inputClass = (err?: string) =>
    `w-full px-5 py-4 rounded-2xl border ${err ? "border-destructive ring-destructive/10" : "border-border focus:border-mentor ring-mentor/10"} bg-muted/30 text-foreground text-body focus:ring-4 outline-none transition-all shadow-sm`;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-12 px-6 overflow-x-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-mentor/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="w-full max-w-xl relative z-10 space-y-10 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Logo size="md" variant="mentor" />
          <LanguageToggle />
        </div>

        <div className="space-y-2">
          <StepProgressBar currentStep={step} totalSteps={3} variant="mentor" />
          <p className="text-v-small font-bold text-center text-mentor uppercase tracking-widest">{t("step") || "Step"} {step} / 3</p>
        </div>

        <div className="bg-card rounded-3xl border border-border shadow-2xl p-8 md:p-10 transition-all">
          {step === 2 && (
            <div className="space-y-8 animate-slide-up">
              <div className="space-y-3">
                <h2 className="text-h1 text-foreground flex items-center gap-3">
                  {t("mentorOnboard.step2.title")} <Award className="text-mentor" />
                </h2>
                <p className="text-body text-muted-foreground">
                  {t("mentorOnboard.step2.subtitle")}
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-caption font-bold text-muted-foreground uppercase tracking-widest ml-1">{t("mentorOnboard.industryLabel")}</label>
                  <div className="flex flex-wrap gap-2">
                    {industries.map((ind) => (
                      <IndustryChip key={ind} label={ind} selected={selectedIndustry === ind} variant="mentor" onPress={() => { setSelectedIndustry(ind); setErrors(p => ({ ...p, industry: "" })); }} />
                    ))}
                  </div>
                  {errors.industry && <p className="text-caption text-destructive font-medium ml-1">{errors.industry}</p>}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-caption font-bold text-muted-foreground uppercase tracking-widest ml-1">{t("mentorOnboard.roleLabel") || "Your Role"}</label>
                    <input value={role} onChange={(e) => { setRole(e.target.value); setErrors(p => ({ ...p, role: "" })); }} placeholder={t("mentorOnboard.rolePlaceholder")} className={inputClass(errors.role)} />
                    {errors.role && <p className="text-caption text-destructive font-medium ml-1">{errors.role}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-caption font-bold text-muted-foreground uppercase tracking-widest ml-1 font-bold">{t("mentorOnboard.companyLabel") || "Company"}</label>
                    <input value={company} onChange={(e) => { setCompany(e.target.value); setErrors(p => ({ ...p, company: "" })); }} placeholder={t("mentorOnboard.companyPlaceholder")} className={inputClass(errors.company)} />
                    {errors.company && <p className="text-caption text-destructive font-medium ml-1">{errors.company}</p>}
                  </div>
                </div>

                <div className="space-y-4 p-5 rounded-2xl bg-muted/40 border border-border">
                  <label className="text-caption font-bold text-muted-foreground uppercase tracking-widest flex items-center justify-between">
                    <span>{t("mentorOnboard.experienceLabel", { n: experience })}</span>
                    <span className="text-mentor bg-mentor/10 px-3 py-1 rounded-lg">{experience} yrs</span>
                  </label>
                  <input type="range" min={0} max={30} value={experience} onChange={(e) => setExperience(Number(e.target.value))} className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-mentor" />
                </div>

                <div className="space-y-2">
                  <label className="text-caption font-bold text-muted-foreground uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Star size={14} className="text-mentor" />
                    {t("mentorOnboard.skillsLabel")}
                  </label>
                  <div className="relative group">
                    <input 
                      value={skillInput} 
                      onChange={(e) => setSkillInput(e.target.value)} 
                      onKeyDown={addSkill} 
                      placeholder={t("mentorOnboard.skillPlaceholder")} 
                      className="w-full pl-5 pr-12 py-4 rounded-2xl border border-border bg-muted/30 text-foreground text-body focus:ring-4 focus:ring-mentor/10 focus:border-mentor outline-none transition-all" 
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground bg-card border border-border px-2 py-1 rounded-lg">
                      Enter
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {skills.map((s) => (
                      <SkillTag 
                        key={s} 
                        label={s} 
                        removable 
                        onRemove={() => setSkills(skills.filter((sk) => sk !== s))} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-slide-up">
              <div className="space-y-3">
                <h2 className="text-h1 text-foreground flex items-center gap-3">
                  {t("mentorOnboard.step3.title")} <Target className="text-mentor" />
                </h2>
                <p className="text-body text-muted-foreground">
                  {t("mentorOnboard.step3.subtitle")}
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-caption font-bold text-muted-foreground uppercase tracking-widest ml-1">{t("mentorOnboard.guidanceLabel")}</label>
                  <textarea 
                    value={guidance} 
                    onChange={(e) => { setGuidance(e.target.value); setErrors(p => ({ ...p, guidance: "" })); }} 
                    placeholder={t("mentorOnboard.guidancePlaceholder")} 
                    rows={4} 
                    className={`w-full px-5 py-4 rounded-2xl border ${errors.guidance ? "border-destructive ring-destructive/10" : "border-border focus:border-mentor ring-mentor/10"} bg-muted/30 text-foreground text-body focus:ring-4 outline-none transition-all resize-none shadow-sm`}
                  />
                  {errors.guidance && <p className="text-caption text-destructive font-medium ml-1">{errors.guidance}</p>}
                </div>

                <div className="space-y-4">
                  <label className="text-caption font-bold text-muted-foreground uppercase tracking-widest ml-1">{t("mentorOnboard.offerLabel")}</label>
                  <div className="flex flex-wrap gap-2">
                    {["Internships", "Jobs", "Workshops", "Mentorship Calls", "Resources"].map((o) => (
                      <IndustryChip 
                        key={o} 
                        label={o} 
                        selected={offerTypes.includes(o)} 
                        variant="mentor" 
                        onPress={() => toggleOffer(o)} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-4">
          {step > 2 ? (
            <button 
              onClick={() => setStep(step - 1)} 
              className="flex items-center gap-2 px-6 py-3 rounded-2xl text-body font-bold text-muted-foreground hover:text-foreground hover:bg-muted transition-all active:scale-95"
            >
              <ArrowLeft size={18} /> {t("back")}
            </button>
          ) : <div />}

          <button 
            onClick={step < 3 ? handleNext : handleFinish} 
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-mentor text-mentor-foreground text-body font-bold shadow-xl shadow-mentor/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            {step < 3 ? (
              <>{t("next")} <ArrowRight size={20} /></>
            ) : (
              t("mentorOnboard.finish")
            )}
          </button>
        </div>
=======
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
>>>>>>> main
      </div>
    </div>
  );
}
