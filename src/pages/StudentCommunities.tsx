import { communities } from "@/lib/mock-data";
import { CommunityCard } from "@/components/mentor-connect/CommunityCard";
import { BottomNav } from "@/components/mentor-connect/BottomNav";

export default function StudentCommunities() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <h1 className="text-h2 text-foreground">My Communities</h1>
        <div className="space-y-3">
          {communities.map((c) => (
            <CommunityCard key={c.id} community={c} />
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
