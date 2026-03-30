<<<<<<< HEAD
import { FileText, Link, Video, File, Download, User, Calendar } from "lucide-react";
import { useResources } from "@/lib/resources-context";
import { SharedResource } from "@/lib/types";
import { useLanguage } from "@/lib/language-context";
=======
import { FileText, Link, Video, File, Download } from "lucide-react";
import { sharedResources, SharedResource } from "@/lib/mock-data";
>>>>>>> main
import { toast } from "sonner";

const iconMap = {
  pdf: FileText,
  link: Link,
  video: Video,
  document: File,
};

const colorMap = {
<<<<<<< HEAD
  pdf: "text-red-500 bg-red-500/10",
  link: "text-blue-500 bg-blue-500/10",
  video: "text-purple-500 bg-purple-500/10",
  document: "text-amber-500 bg-amber-500/10",
};

export function SharedResourcesList() {
  const { resources } = useResources();
  const { t, getLocalized } = useLanguage();

  const handleDownload = (resource: SharedResource) => {
    const title = getLocalized(resource.title);
    toast.success(`${title} ${t("resource.share.download") || "downloading"}...`);
    if (resource.url && resource.url !== "#") {
      window.open(resource.url, "_blank", "noopener,noreferrer");
    }
  };

  if (resources.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center space-y-3 opacity-60">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <File size={32} className="text-muted-foreground" />
        </div>
        <p className="text-body font-medium">{t("resource.share.noResources") || "No resources shared yet"}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {resources.map((r) => {
        const Icon = iconMap[r.type];
        const color = colorMap[r.type];
        const title = getLocalized(r.title);
        const description = getLocalized(r.description);
        const sharedBy = getLocalized(r.sharedBy);
        const sharedDate = getLocalized(r.sharedDate);

        return (
          <div key={r.id} className="group bg-card rounded-2xl border border-border p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-300 animate-fade-in relative overflow-hidden">
            <div className="flex gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform ${color}`}>
                <Icon size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <h4 className="text-body font-bold text-foreground truncate group-hover:text-primary transition-colors pr-2">
                    {title}
                  </h4>
                  <button
                    onClick={() => handleDownload(r)}
                    className="p-2 rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all shadow-sm flex-shrink-0"
                    title={t("resource.share.download")}
=======
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
>>>>>>> main
                  >
                    <Download size={16} />
                  </button>
                </div>
<<<<<<< HEAD
                
                <p className="text-caption text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                  {description}
                </p>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-4 pt-3 border-t border-border/50 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
                  <span className="flex items-center gap-1.5">
                    <User size={12} className="text-primary/60" />
                    {sharedBy}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-primary/60" />
                    {sharedDate}
                  </span>
                </div>
=======
>>>>>>> main
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
