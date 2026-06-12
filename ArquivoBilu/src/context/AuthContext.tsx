import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";


export type User = {
  id: string;
  name: string;
  email: string;
  avatarEmoji: string;
  createdAt: number;
};

type AuthState =
  | { status: "loading" }
  | { status: "unauthenticated" }
  | { status: "authenticated"; user: User };

type AuthContextType = {
  state: AuthState;
  login:    (email: string, password: string) => Promise<{ error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ error?: string }>;
  logout:   () => Promise<void>;
  updateUser: (fields: Partial<Pick<User, "name" | "avatarEmoji">>) => Promise<void>;
};

const USERS_KEY   = "@arquivo_bilu:users";
const SESSION_KEY = "@arquivo_bilu:session";

const AVATARS = ["🛸", "🚀", "🌍", "🪐", "⭐", "☄️", "🌙", "🔭", "👽", "🌌"];

async function getUsers(): Promise<Record<string, { passwordHash: string; user: User }>> {
  const raw = await AsyncStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : {};
}

async function saveUsers(users: Record<string, { passwordHash: string; user: User }>) {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Hash simples (não criptográfico) — suficiente para login local offline
function hashPassword(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    hash = (Math.imul(31, hash) + password.charCodeAt(i)) | 0;
  }
  return hash.toString(36);
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ status: "loading" });

  useEffect(() => {
    AsyncStorage.getItem(SESSION_KEY).then((raw) => {
      if (raw) {
        setState({ status: "authenticated", user: JSON.parse(raw) });
      } else {
        setState({ status: "unauthenticated" });
      }
    });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const trimmed = email.trim().toLowerCase();
    const users = await getUsers();
    const entry = users[trimmed];
    if (!entry) return { error: "E-mail não encontrado." };
    if (entry.passwordHash !== hashPassword(password)) return { error: "Senha incorreta." };
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(entry.user));
    setState({ status: "authenticated", user: entry.user });
    return {};
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const trimmed = email.trim().toLowerCase();
    if (!name.trim())    return { error: "Informe seu nome." };
    if (!trimmed)        return { error: "Informe um e-mail." };
    if (!trimmed.includes("@")) return { error: "E-mail inválido." };
    if (password.length < 6)  return { error: "A senha precisa ter pelo menos 6 caracteres." };

    const users = await getUsers();
    if (users[trimmed])  return { error: "Este e-mail já está cadastrado." };

    const user: User = {
      id: generateId(),
      name: name.trim(),
      email: trimmed,
      avatarEmoji: AVATARS[Math.floor(Math.random() * AVATARS.length)],
      createdAt: Date.now(),
    };

    users[trimmed] = { passwordHash: hashPassword(password), user };
    await saveUsers(users);
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
    setState({ status: "authenticated", user });
    return {};
  }, []);

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem(SESSION_KEY);
    setState({ status: "unauthenticated" });
  }, []);

  const updateUser = useCallback(async (fields: Partial<Pick<User, "name" | "avatarEmoji">>) => {
    if (state.status !== "authenticated") return;
    const updated = { ...state.user, ...fields };
    const users = await getUsers();
    if (users[updated.email]) {
      users[updated.email].user = updated;
      await saveUsers(users);
    }
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(updated));
    setState({ status: "authenticated", user: updated });
  }, [state]);

  return (
    <AuthContext.Provider value={{ state, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}