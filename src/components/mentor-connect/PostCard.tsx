import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";

interface PostCardProps {
  post: {
    id: string;
    authorName: string;
    authorAvatar: string;
    isMentor: boolean;
    timestamp: string;
    content: string;
    likes: number;
    comments: number;
  };
}

export function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div className="bg-card rounded-card shadow-card border border-border p-4 animate-fade-in">
      <div className="flex items-center gap-3 mb-3">
        <img src={post.authorAvatar} alt={post.authorName} className="w-10 h-10 rounded-full object-cover" />
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-body text-foreground">{post.authorName}</span>
            {post.isMentor && (
              <span className="px-1.5 py-0.5 rounded-sm bg-mentor/10 text-mentor text-[10px] font-semibold uppercase">
                Mentor
              </span>
            )}
          </div>
          <span className="text-caption text-muted-foreground">{post.timestamp}</span>
        </div>
      </div>
      <p className="text-body text-foreground mb-4">{post.content}</p>
      <div className="flex items-center gap-6 text-muted-foreground">
        <button onClick={toggleLike} className={`flex items-center gap-1 text-caption transition-colors ${liked ? "text-destructive" : "hover:text-destructive"}`}>
          <Heart size={16} fill={liked ? "currentColor" : "none"} />
          <span>{likeCount}</span>
        </button>
        <button className="flex items-center gap-1 text-caption hover:text-primary transition-colors">
          <MessageCircle size={16} />
          <span>{post.comments}</span>
        </button>
        <button className="flex items-center gap-1 text-caption hover:text-primary transition-colors">
          <Share2 size={16} />
        </button>
      </div>
    </div>
  );
}
