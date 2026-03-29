import { useState, useRef, useEffect } from "react";
import { Send, Smile } from "lucide-react";
import { chatMessages, ChatMessage } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

export function ChatSection() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>(chatMessages);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) {
      toast.error("कृपया मेसेज टाइप करा");
      return;
    }
    if (trimmed.length > 500) {
      toast.error("मेसेज 500 characters पेक्षा कमी असावा");
      return;
    }

    const newMsg: ChatMessage = {
      id: `c${Date.now()}`,
      senderId: "me",
      senderName: user?.name || "तुम्ही",
      senderAvatar: "",
      isMentor: user?.role === "mentor",
      text: trimmed,
      timestamp: new Date().toISOString(),
      time: new Date().toLocaleTimeString("mr-IN", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const currentUserId = "me";

  return (
    <div className="flex flex-col h-[calc(100vh-220px)] lg:h-[calc(100vh-180px)]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3">
        {messages.map((msg) => {
          const isMe = msg.senderId === currentUserId;
          return (
            <div key={msg.id} className={`flex gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
              {!isMe && (
                <img
                  src={msg.senderAvatar}
                  alt={msg.senderName}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-1"
                />
              )}
              <div className={`max-w-[75%] lg:max-w-[60%]`}>
                {!isMe && (
                  <span className={`text-[11px] font-medium mb-0.5 block ${msg.isMentor ? "text-mentor" : "text-muted-foreground"}`}>
                    {msg.senderName} {msg.isMentor && "🎓"}
                  </span>
                )}
                <div
                  className={`px-3 py-2 rounded-2xl text-body leading-relaxed ${
                    isMe
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : msg.isMentor
                      ? "bg-mentor/10 text-foreground rounded-tl-sm border border-mentor/20"
                      : "bg-card text-foreground rounded-tl-sm border border-border"
                  }`}
                >
                  {msg.text}
                </div>
                <span className={`text-[10px] text-muted-foreground mt-0.5 block ${isMe ? "text-right" : "text-left"}`}>
                  {msg.time}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card px-3 py-2">
        <div className="flex items-end gap-2 max-w-3xl mx-auto">
          <button className="text-muted-foreground hover:text-foreground p-2">
            <Smile size={20} />
          </button>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="मेसेज टाइप करा..."
            rows={1}
            className="flex-1 resize-none bg-muted rounded-2xl px-4 py-2.5 text-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 max-h-24"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-2.5 rounded-full bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90 transition-opacity"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
