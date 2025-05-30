import "./index.css";
import { useState, useEffect } from "react";
import { type Session } from "@supabase/supabase-js";
import { Auth as SupaAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import supabase from "./lib/createClient";
import App from "./App";

export default function Auth() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div style={{ maxWidth: "400px", margin: "0 auto", paddingTop: "50px" }}>
        <SupaAuth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
          onlyThirdPartyProviders={false}
          theme="dark"
        />
      </div>
    );
  } else {
    return <App />;
  }
}
