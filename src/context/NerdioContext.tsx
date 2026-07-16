import { createContext, useContext } from "react";
import { Profile } from "@/lib/nerdio-data";

type NerdioContextValue = {
  profile: Profile | null;
  setProfile: (p: Profile) => void;
  isConnected: boolean;
  connecting: boolean;
  connectX: (targetPath?: string) => void;
};

export const NerdioContext = createContext<NerdioContextValue | null>(null);

/* Throws if used outside <AppLayout>, which is deliberate — every page
   under the shell should always have this in context, connected or not. */
export function useNerdioProfile() {
  const ctx = useContext(NerdioContext);
  if (!ctx) throw new Error("useNerdioProfile must be used within AppLayout");
  return ctx;
}
