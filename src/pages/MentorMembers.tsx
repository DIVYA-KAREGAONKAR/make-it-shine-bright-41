import { useState } from "react";
import { communities } from "@/lib/mock-data";
import { ResponsiveLayout } from "@/components/mentor-connect/ResponsiveLayout";
import { Users, Calendar } from "lucide-react";
import { toast } from "sonner";

const initialMembers = [
  { id: "1", name: "सुमित गायकवाड", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd9c?w=150&h=150&fit=crop&crop=face", joined: "जानेवारी 2026" },
  { id: "2", name: "स्नेहा कदम", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face", joined: "फेब्रुवारी 2026" },
  { id: "3", name: "अभिषेक मोरे", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face", joined: "मार्च 2026" },
  { id: "4", name: "पूजा पवार", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face", joined: "मार्च 2026" },
];

export default function MentorMembers() {
  const [members, setMembers] = useState(initialMembers);

  const handleRemove = (id: string, name: string) => {
    if (window.confirm(`${name} ला community मधून काढायचं आहे का?`)) {
      setMembers((prev) => prev.filter((m) => m.id !== id));
      toast.success(`${name} ला काढले.`);
    }
  };

  return (
    <ResponsiveLayout>
      <div className="min-h-screen bg-background pb-20 lg:pb-8">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-h2 text-foreground">Members</h1>
            <span className="text-caption text-muted-foreground flex items-center gap-1"><Users size={14} />{members.length} total</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {members.map((m) => (
              <div key={m.id} className="flex items-center gap-3 p-4 bg-card rounded-card shadow-card border border-border">
                <img src={m.avatar} alt={m.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1">
                  <h4 className="font-semibold text-body text-foreground">{m.name}</h4>
                  <p className="text-caption text-muted-foreground flex items-center gap-1"><Calendar size={10} />Joined {m.joined}</p>
                </div>
                <button onClick={() => handleRemove(m.id, m.name)} className="text-caption text-destructive font-medium hover:underline">Remove</button>
              </div>
            ))}
          </div>
          {members.length === 0 && (
            <p className="text-body text-muted-foreground text-center py-8">कोणतेही members नाहीत.</p>
          )}
        </div>
      </div>
    </ResponsiveLayout>
  );
}
