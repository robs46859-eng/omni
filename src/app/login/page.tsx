"use client";

import { FormEvent, useEffect, useState, Suspense } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl") || "/executive";

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(callbackUrl);
    }
  }, [callbackUrl, router, status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setIsSubmitting(false);

    if (!result || result.error) {
      setError("Sign in failed. Check the configured admin credentials.");
      return;
    }

    router.replace(result.url || callbackUrl);
    router.refresh();
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <label className="block space-y-2 text-sm">
        <span className="text-slate-200">Email</span>
        <input
          className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
        />
      </label>

      <label className="block space-y-2 text-sm">
        <span className="text-slate-200">Password</span>
        <input
          className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
        />
      </label>

      {error ? <p className="text-sm text-rose-300">{error}</p> : null}

      <button
        className="w-full rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-cyan-200"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-16 text-slate-50">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur">
        <div className="mb-8 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">OmniScale</p>
          <h1 className="text-3xl font-semibold tracking-tight">Secure operator sign in</h1>
          <p className="text-sm text-slate-300">
            Use the bootstrap admin credentials configured in the deployment environment.
          </p>
        </div>

        <Suspense fallback={<div className="text-center py-4 italic text-slate-400">Loading authentication...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
