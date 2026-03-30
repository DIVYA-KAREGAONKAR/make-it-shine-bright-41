import { useState, useRef, useEffect } from "react";
<<<<<<< HEAD
import { Send, Hash } from "lucide-react";
import { chatMessages } from "@/lib/constants";
import { ChatMessage } from "@/lib/types";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";
=======
import { Send, Smile } from "lucide-react";
import { chatMessages, ChatMessage } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";
>>>>>>> main
import { toast } from "sonner";

export function ChatSection() {
  const { user } = useAuth();
<<<<<<< HEAD
  const { t, getLocalized, language } = useLanguage();
=======
>>>>>>> main
  const [messages, setMessages] = useState<ChatMessage[]>(chatMessages);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
<<<<<<< HEAD
    if (!trimmed) { 
      toast.error(t("chat.errorEmpty") || "Message cannot be empty"); 
      return; 
    }
    if (trimmed.length > 500) { 
      toast.error(t("chat.errorTooLong") || "Message is too long"); 
      return; 
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString(language === "en" ? "en-US" : "mr-IN", { 
      hour: "2-digit", 
      minute: "2-digit" 
    });

    const newMsg: ChatMessage = {
      id: `c${Date.now()}`,
      senderId: "me",
      senderName: { en: user?.name || "Me", mr: user?.name || "मी" },
      senderAvatar: "",
      isMentor: user?.role === "mentor",
      text: { en: trimmed, mr: trimmed }, // User input is same for both in this mock
      timestamp: now.toISOString(),
      time: { en: timeStr, mr: timeStr },
=======
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
>>>>>>> main
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
<<<<<<< HEAD
    if (e.key === "Enter" && !e.shiftKey) { 
      e.preventDefault(); 
      handleSend(); 
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-220px)] lg:h-[calc(100vh-180px)] bg-muted/20 rounded-2xl border border-border overflow-hidden">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-thin scrollbar-thumb-border">
        {messages.map((msg, index) => {
          const isMe = msg.senderId === "me";
          const showAvatar = !isMe && (index === 0 || messages[index-1].senderId !== msg.senderId);
          
          return (
            <div key={msg.id} className={`flex gap-3 ${isMe ? "flex-row-reverse" : "flex-row"} animate-fade-in`}>
              <div className="w-8 flex-shrink-0">
                {showAvatar && (
                  <img 
                    src={msg.senderAvatar || `https://ui-avatars.com/api/?name=${getLocalized(msg.senderName)}&background=random`} 
                    alt={getLocalized(msg.senderName)} 
                    className="w-8 h-8 rounded-full object-cover border border-border shadow-sm" 
                  />
                )}
              </div>
              
              <div className={`max-w-[80%] lg:max-w-[70%] space-y-1 ${isMe ? "items-end" : "items-start"}`}>
                {!isMe && showAvatar && (
                  <span className={`text-[11px] font-bold ml-1 flex items-center gap-1 ${msg.isMentor ? "text-mentor" : "text-muted-foreground"}`}>
                    {getLocalized(msg.senderName)} 
                    {msg.isMentor && <span title="Verified Mentor">🎓</span>}
                  </span>
                )}
                
                <div className={`relative px-4 py-2.5 rounded-2xl text-body shadow-sm leading-relaxed transition-all hover:shadow-md ${
                  isMe
                    ? "bg-primary text-primary-foreground rounded-tr-none"
                    : msg.isMentor
                    ? "bg-card text-foreground rounded-tl-none border-l-4 border-l-mentor"
                    : "bg-card text-foreground rounded-tl-none border border-border"
                }`}>
                  {getLocalized(msg.text)}
                  <div className={`absolute bottom-[-18px] whitespace-nowrap text-[10px] font-medium text-muted-foreground/60 ${isMe ? "right-1 text-right" : "left-1 text-left"}`}>
                    {getLocalized(msg.time)}
                  </div>
                </div>
=======
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
>>>>>>> main
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
<<<<<<< HEAD
      <div className="p-4 bg-card border-t border-border">
        <div className="flex items-end gap-3 max-w-4xl mx-auto bg-muted rounded-2xl p-2 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
=======
      <div className="border-t border-border bg-card px-3 py-2">
        <div className="flex items-end gap-2 max-w-3xl mx-auto">
          <button className="text-muted-foreground hover:text-foreground p-2">
            <Smile size={20} />
          </button>
>>>>>>> main
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
<<<<<<< HEAD
            placeholder={t("chat.placeholder") || "Type a message..."}
            rows={1}
            className="flex-1 resize-none bg-transparent border-none px-3 py-2 text-body text-foreground placeholder:text-muted-foreground focus:outline-none max-h-32"
=======
            placeholder="मेसेज टाइप करा..."
            rows={1}
            className="flex-1 resize-none bg-muted rounded-2xl px-4 py-2.5 text-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 max-h-24"
>>>>>>> main
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
<<<<<<< HEAD
            className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:hover:scale-100"
=======
            className="p-2.5 rounded-full bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90 transition-opacity"
>>>>>>> main
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
