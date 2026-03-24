import { createContext, useContext, useState, ReactNode } from "react";

type Role = "student" | "mentor" | null;

interface User {
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  industries: string[];
  skills: string[];
  goals?: string;
  company?: string;
  experience?: number;
  guidance?: string;
}

interface AuthContextType {
  user: User | null;
  role: Role;
  setRole: (role: Role) => void;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role>(null);

  const login = (userData: User) => {
    setUser(userData);
    setRole(userData.role);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, setRole, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
