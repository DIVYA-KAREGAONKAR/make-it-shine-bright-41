export const industries = [
  "Software", "Agriculture", "Manufacturing", "Healthcare", "Finance", "Education", "Engineering", "Design"
];

export const mentors = [
  {
    id: "1",
    name: "राहुल देशमुख",
    role: "Senior Software Engineer",
    company: "TCS Nashik",
    industry: "Software",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    bio: "नाशिकमधून 10+ वर्षांचा अनुभव. Full-stack development आणि mentoring मध्ये passion.",
    skills: ["React", "Node.js", "Python", "System Design", "AWS"],
    followers: 1240,
    communities: 2,
    posts: 45,
    experience: 12,
    guidance: "करिअर मार्गदर्शन, कोड review, इंटरव्ह्यू तयारी, आणि technical mentorship.",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=300&fit=crop",
  },
  {
    id: "2",
    name: "संदीप पाटील",
    role: "Farm Operations Director",
    company: "Sahyadri Farms, Nashik",
    industry: "Agriculture",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "नाशिक जिल्ह्यातील शेतकऱ्यांसाठी शाश्वत शेती उपक्रम. द्राक्ष, कांदा आणि agritech.",
    skills: ["Agribusiness", "Crop Science", "Supply Chain", "Sustainability"],
    followers: 830,
    communities: 1,
    posts: 32,
    experience: 15,
    guidance: "कृषी उद्योजकता, शाश्वत शेती, आणि agritech अवलंबन.",
    coverImage: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&h=300&fit=crop",
  },
  {
    id: "3",
    name: "डॉ. अमिना शेख",
    role: "Chief Medical Officer",
    company: "Wockhardt Hospital, Nashik",
    industry: "Healthcare",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    bio: "नाशिकमध्ये आरोग्य सेवेचा प्रसार आणि वैद्यकीय विद्यार्थ्यांना मार्गदर्शन.",
    skills: ["Clinical Research", "Healthcare Management", "Public Health", "Telemedicine"],
    followers: 2100,
    communities: 3,
    posts: 67,
    experience: 20,
    guidance: "वैद्यकीय करिअर मार्ग, संशोधन mentorship, आणि healthcare innovation.",
    coverImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=300&fit=crop",
  },
  {
    id: "4",
    name: "मनीष कुलकर्णी",
    role: "VP of Finance",
    company: "HDFC Bank, Nashik",
    industry: "Finance",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: "विद्यार्थ्यांना finance आणि investment banking समजावून सांगतो.",
    skills: ["Financial Analysis", "Investment Banking", "Risk Management", "Fintech"],
    followers: 960,
    communities: 1,
    posts: 28,
    experience: 14,
    guidance: "Finance करिअर सल्ला, CA/CFA तयारी, आणि fintech संधी.",
    coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=300&fit=crop",
  },
  {
    id: "5",
    name: "प्रिया जोशी",
    role: "Product Design Lead",
    company: "Infosys Pune",
    industry: "Design",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    bio: "UX/UI डिझाइन मध्ये 9 वर्षांचा अनुभव. नवीन designers ला मार्गदर्शन.",
    skills: ["UI/UX Design", "Figma", "Design Systems", "User Research", "Prototyping"],
    followers: 1800,
    communities: 2,
    posts: 52,
    experience: 9,
    guidance: "Portfolio reviews, design thinking, आणि tech design मध्ये प्रवेश.",
    coverImage: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=300&fit=crop",
  },
  {
    id: "6",
    name: "अमित भोसले",
    role: "ML Engineer",
    company: "Persistent Systems, Nashik",
    industry: "Software",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    bio: "AI systems बनवतो. Machine learning शिकवायला आवडतं.",
    skills: ["Machine Learning", "Python", "TensorFlow", "NLP", "Data Science"],
    followers: 3200,
    communities: 2,
    posts: 89,
    experience: 8,
    guidance: "AI/ML करिअर मार्ग, research papers, आणि project mentorship.",
    coverImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=300&fit=crop",
  },
];

export const communities = [
  { id: "1", name: "Nashik Software Engineers", mentorId: "1", mentorName: "राहुल देशमुख", mentorAvatar: mentors[0].avatar, members: 450, unread: 3, industry: "Software" },
  { id: "2", name: "Nashik AgriTech मंडळ", mentorId: "2", mentorName: "संदीप पाटील", mentorAvatar: mentors[1].avatar, members: 210, unread: 0, industry: "Agriculture" },
  { id: "3", name: "Healthcare Leaders Nashik", mentorId: "3", mentorName: "डॉ. अमिना शेख", mentorAvatar: mentors[2].avatar, members: 680, unread: 5, industry: "Healthcare" },
  { id: "4", name: "AI & ML Nashik Community", mentorId: "6", mentorName: "अमित भोसले", mentorAvatar: mentors[5].avatar, members: 1200, unread: 12, industry: "Software" },
  { id: "5", name: "Design Circle Nashik", mentorId: "5", mentorName: "प्रिया जोशी", mentorAvatar: mentors[4].avatar, members: 520, unread: 1, industry: "Design" },
];

export const opportunities = [
  { id: "1", title: "Frontend Intern", type: "Internship", company: "TCS Nashik", location: "Nashik, Maharashtra", deadline: "2026-04-15", mentorName: "राहुल देशमुख", mentorId: "1", industry: "Software", description: "Frontend team मध्ये 3 महिन्यांचे internship. Google Workspace products वर काम.", requirements: ["React/Angular अनुभव", "HTML/CSS proficiency", "CS मध्ये शिकत असलेले"] },
  { id: "2", title: "Junior Data Scientist", type: "Job", company: "Persistent Systems, Nashik", location: "Nashik, Maharashtra", deadline: "2026-04-30", mentorName: "अमित भोसले", mentorId: "6", industry: "Software", description: "Large language models आणि data pipelines वर Full-time role.", requirements: ["MS in CS किंवा संबंधित", "Python proficiency", "ML framework अनुभव"] },
  { id: "3", title: "Agricultural Research Assistant", type: "Internship", company: "Sahyadri Farms, Nashik", location: "Nashik, Maharashtra", deadline: "2026-05-01", mentorName: "संदीप पाटील", mentorId: "2", industry: "Agriculture", description: "शाश्वत शेती संशोधन आणि field trials मध्ये मदत.", requirements: ["Agriculture किंवा Biology major", "Field work अनुभव"] },
  { id: "4", title: "UX Design Workshop", type: "Workshop", company: "Infosys Pune", location: "Online", deadline: "2026-04-10", mentorName: "प्रिया जोशी", mentorId: "5", industry: "Design", description: "Design systems आणि component libraries वर hands-on workshop.", requirements: ["Basic Figma knowledge", "Portfolio with 2+ projects"] },
  { id: "5", title: "Clinical Research Intern", type: "Internship", company: "Wockhardt Hospital, Nashik", location: "Nashik, Maharashtra", deadline: "2026-05-15", mentorName: "डॉ. अमिना शेख", mentorId: "3", industry: "Healthcare", description: "Clinical trials आणि patient data analysis मध्ये support.", requirements: ["Pre-med किंवा Public Health student", "तपशीलवार काम करण्याची क्षमता"] },
];

export const posts = [
  { id: "1", authorName: "राहुल देशमुख", authorAvatar: mentors[0].avatar, isMentor: true, timestamp: "2 तासांपूर्वी", content: "Frontend developers साठी नवीन internship opportunity टाकली आहे! Opportunities tab बघा. 🚀", likes: 24, comments: 8 },
  { id: "2", authorName: "सुमित गायकवाड", authorAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd9c?w=150&h=150&fit=crop&crop=face", isMentor: false, timestamp: "4 तासांपूर्वी", content: "System design शिकण्यासाठी कोणी resources सुचवू शकेल का? माझा interview आहे.", likes: 15, comments: 12 },
  { id: "3", authorName: "अमित भोसले", authorAvatar: mentors[5].avatar, isMentor: true, timestamp: "1 दिवसापूर्वी", content: "System design बद्दल चांगला प्रश्न! Martin Kleppmann चे 'Designing Data-Intensive Applications' वाचा. GitHub वर System Design Primer पण बघा.", likes: 42, comments: 6 },
  { id: "4", authorName: "स्नेहा कदम", authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face", isMentor: false, timestamp: "1 दिवसापूर्वी", content: "TCS internship मध्ये select झालो! राहुल सरांचे खूप आभार मार्गदर्शनासाठी! 🎉", likes: 89, comments: 23 },
];

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  isMentor: boolean;
  text: string;
  timestamp: string;
  time: string;
}

export const chatMessages: ChatMessage[] = [
  { id: "c1", senderId: "1", senderName: "राहुल देशमुख", senderAvatar: mentors[0].avatar, isMentor: true, text: "सर्वांना नमस्कार! आजच्या session ला स्वागत आहे 🙏", timestamp: "2026-03-29T10:00:00", time: "सकाळी 10:00" },
  { id: "c2", senderId: "s1", senderName: "सुमित गायकवाड", senderAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd9c?w=150&h=150&fit=crop&crop=face", isMentor: false, text: "नमस्कार सर! React hooks बद्दल एक doubt आहे.", timestamp: "2026-03-29T10:02:00", time: "सकाळी 10:02" },
  { id: "c3", senderId: "1", senderName: "राहुल देशमुख", senderAvatar: mentors[0].avatar, isMentor: true, text: "विचार! useEffect आणि useCallback बद्दल बोलूया. कोणता hook वापरायचा ते project वर depend करतं.", timestamp: "2026-03-29T10:03:00", time: "सकाळी 10:03" },
  { id: "c4", senderId: "s2", senderName: "स्नेहा कदम", senderAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face", isMentor: false, text: "सर, मी TCS interview ची तयारी करतेय. काही tips देता का?", timestamp: "2026-03-29T10:05:00", time: "सकाळी 10:05" },
  { id: "c5", senderId: "1", senderName: "राहुल देशमुख", senderAvatar: mentors[0].avatar, isMentor: true, text: "हो नक्कीच! DSA practice करा, system design basics शिका, आणि project explain करायला तयार रहा. Resources tab मध्ये मी काही PDF शेअर केल्या आहेत 📚", timestamp: "2026-03-29T10:07:00", time: "सकाळी 10:07" },
  { id: "c6", senderId: "s3", senderName: "अभिषेक मोरे", senderAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face", isMentor: false, text: "सर, Nashik मध्ये कोणत्या IT companies मध्ये opportunities आहेत?", timestamp: "2026-03-29T10:10:00", time: "सकाळी 10:10" },
  { id: "c7", senderId: "1", senderName: "राहुल देशमुख", senderAvatar: mentors[0].avatar, isMentor: true, text: "Nashik मध्ये TCS, Persistent, KPIT, Emerson सारख्या companies आहेत. Ambad आणि Satpur MIDC मध्ये बऱ्याच companies आहेत.", timestamp: "2026-03-29T10:12:00", time: "सकाळी 10:12" },
];

export interface SharedResource {
  id: string;
  title: string;
  type: "pdf" | "link" | "video" | "document";
  url: string;
  sharedBy: string;
  sharedDate: string;
  description: string;
}

export const sharedResources: SharedResource[] = [
  { id: "r1", title: "React Hooks Complete Guide", type: "pdf", url: "#", sharedBy: "राहुल देशमुख", sharedDate: "25 मार्च 2026", description: "React hooks चे सर्व concepts एकत्र - useState, useEffect, useCallback, useMemo" },
  { id: "r2", title: "System Design Interview Prep", type: "pdf", url: "#", sharedBy: "राहुल देशमुख", sharedDate: "22 मार्च 2026", description: "Top 20 system design questions with solutions" },
  { id: "r3", title: "DSA Practice Sheet", type: "link", url: "#", sharedBy: "राहुल देशमुख", sharedDate: "20 मार्च 2026", description: "LeetCode आणि GeeksforGeeks वरील important problems ची list" },
  { id: "r4", title: "TCS Interview Experience", type: "video", url: "#", sharedBy: "राहुल देशमुख", sharedDate: "18 मार्च 2026", description: "TCS NQT आणि technical round ची तयारी कशी करावी - video tutorial" },
  { id: "r5", title: "Resume Template for Freshers", type: "document", url: "#", sharedBy: "राहुल देशमुख", sharedDate: "15 मार्च 2026", description: "IT freshers साठी professional resume template" },
];
