import { FileText, Link, Video, File, Download } from "lucide-react";
import { sharedResources, SharedResource } from "@/lib/mock-data";
import { toast } from "sonner";

const iconMap = {
  pdf: FileText,
  link: Link,
  video: Video,
  document: File,
};

const colorMap = {
  pdf: "text-destructive bg-destructive/10",
  link: "text-primary bg-primary/10",
  video: "text-mentor bg-mentor/10",
  document: "text-warning bg-warning/10",
};

export function SharedResourcesList() {
  const handleDownload = (resource: SharedResource) => {
    toast.success(`"${resource.title}" डाउनलोड सुरू...`);
  };

  return (
    <div className="space-y-3">
      {sharedResources.map((r) => {
        const Icon = iconMap[r.type];
        const color = colorMap[r.type];
        return (
          <div key={r.id} className="bg-card rounded-card border border-border p-4 hover:shadow-card transition-shadow">
            <div className="flex gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
                <Icon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-body font-semibold text-foreground truncate">{r.title}</h4>
                <p className="text-caption text-muted-foreground mt-0.5 line-clamp-2">{r.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[11px] text-muted-foreground">
                    {r.sharedBy} · {r.sharedDate}
                  </span>
                  <button
                    onClick={() => handleDownload(r)}
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    <Download size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
