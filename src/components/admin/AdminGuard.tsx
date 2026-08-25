"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      // The login page must be accessible without authentication.
      if (pathname === "/admin/login") {
        setAuthenticated(true);
        setChecking(false);
        return;
      }

      const supabase = createClient();

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        setAuthenticated(false);
        setChecking(false);
        router.replace("/admin/login");
        return;
      }

      setAuthenticated(true);
      setChecking(false);
    }

    checkAuth();
  }, [pathname, router]);

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