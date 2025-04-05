// User provider
// create context type
// create user context
// create  useUser hooks to use user and setUser function
// create  user provider
import { schema } from "@resume/db";
import {
  createContext,
  ReactNode,
  use,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../../db/src/schema";

type UserContextType = {
  user: schema.User | null;
  setUser: (user: schema.User | null) => void;
};

const UserContext = createContext<UserContextType | null>(null);

export function useUser(): UserContextType {
  let context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export function UserProvider({
  children,
  userPromise,
}: {
  children: ReactNode;
  userPromise: Promise<User | null>;
}) {
  const initialUser = use(userPromise);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
