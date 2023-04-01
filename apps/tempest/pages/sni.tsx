import { useEffect, useState } from "react";
import { SnesSession } from "~/../../packages/tracker-core";

export default function Home() {
  const [session, setSession] = useState<SnesSession | null>(null);
  useEffect(() => {
    const newSession = new SnesSession();
    setSession(newSession);
    newSession.connect();
  }, []);
  return <></>;
}
