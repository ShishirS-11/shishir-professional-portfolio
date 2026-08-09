"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    let mounted = true;

    async function checkSession() {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (!mounted) return;

        if (error || !session) {
          setAuthenticated(false);
          setChecking(false);

          router.replace("/admin/login");
          return;
        }

        setAuthenticated(true);
        setChecking(false);
      } catch (error) {
        console.error("Admin authentication error:", error);

        if (!mounted) return;

        setAuthenticated(false);
        setChecking(false);

        router.replace("/admin/login");
      }
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted) return;

        if (event === "SIGNED_OUT") {
          setAuthenticated(false);
          router.replace("/admin/login");
          return;
        }

        if (
          session &&
          (event === "SIGNED_IN" ||
            event === "TOKEN_REFRESHED" ||
            event === "INITIAL_SESSION")
        ) {
          setAuthenticated(true);
          setChecking(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050807] text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-emerald-400" />

          <p className="text-sm text-zinc-500">
            Checking authentication...
          </p>
        </div>
      </main>
    );
  }

  if (!authenticated) {
    return null;
  }

  return <>{children}</>;
}