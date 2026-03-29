import { GraduationCap, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";

export default function SplashScreen() {
  const navigate = useNavigate();
  const { setRole } = useAuth();

  const handleRole = (role: "student" | "mentor") => {
    setRole(role);
    navigate(role === "student" ? "/onboarding/student" : "/onboarding/mentor");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-mentor/5 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center max-w-lg w-full animate-slide-up">
        {/* Logo */}
        <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-4">
          <span className="text-primary-foreground font-bold text-h2">M</span>
        </div>
        <h1 className="text-h1 text-foreground mb-1">MentorConnect</h1>
        <p className="text-caption text-primary font-medium mb-1">🏔️ नाशिक, महाराष्ट्र</p>
        <p className="text-body text-muted-foreground text-center mb-12">
          Industry mentors शी जोडा. तुमचे भविष्य घडवा.
        </p>

        {/* Role Selection Cards */}
        <div className="w-full space-y-4">
          <button
            onClick={() => handleRole("student")}
            className="w-full p-6 rounded-card bg-card shadow-card border-2 border-transparent hover:border-primary transition-all flex items-center gap-4 group"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <GraduationCap size={28} className="text-primary" />
            </div>
            <div className="text-left">
              <h3 className="text-h3 text-foreground">मी विद्यार्थी आहे</h3>
              <p className="text-caption text-muted-foreground">Mentors शोधा, communities जॉइन करा, संधी मिळवा</p>
            </div>
          </button>

          <button
            onClick={() => handleRole("mentor")}
            className="w-full p-6 rounded-card bg-card shadow-card border-2 border-transparent hover:border-mentor transition-all flex items-center gap-4 group"
          >
            <div className="w-14 h-14 rounded-xl bg-mentor/10 flex items-center justify-center group-hover:bg-mentor/20 transition-colors">
              <Building2 size={28} className="text-mentor" />
            </div>
            <div className="text-left">
              <h3 className="text-h3 text-foreground">मी Mentor आहे</h3>
              <p className="text-caption text-muted-foreground">विद्यार्थ्यांना मार्गदर्शन करा, community बनवा</p>
            </div>
          </button>
        </div>

        <p className="mt-8 text-caption text-muted-foreground">
          आधीच account आहे?{" "}
          <button onClick={() => navigate("/login")} className="text-primary font-medium hover:underline">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
