import { communities } from "@/lib/mock-data";
import { BottomNav } from "@/components/mentor-connect/BottomNav";
import { Users, Calendar } from "lucide-react";

const members = [
  { name: "Alex Johnson", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd9c?w=150&h=150&fit=crop&crop=face", joined: "Jan 2026" },
  { name: "Priya Sharma", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face", joined: "Feb 2026" },
  { name: "Marcus Lee", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face", joined: "Mar 2026" },
  { name: "Emily Davis", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face", joined: "Mar 2026" },
];

export default function MentorMembers() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-h2 text-foreground">Members</h1>
          <span className="text-caption text-muted-foreground flex items-center gap-1"><Users size={14} />{communities[0].members} total</span>
        </div>
        <div className="space-y-3">
          {members.map((m) => (
            <div key={m.name} className="flex items-center gap-3 p-4 bg-card rounded-card shadow-card border border-border">
              <img src={m.avatar} alt={m.name} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1">
                <h4 className="font-semibold text-body text-foreground">{m.name}</h4>
                <p className="text-caption text-muted-foreground flex items-center gap-1"><Calendar size={10} />Joined {m.joined}</p>
              </div>
              <button className="text-caption text-destructive font-medium hover:underline">Remove</button>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
