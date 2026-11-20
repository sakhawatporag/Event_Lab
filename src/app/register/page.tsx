"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useAuth } from "../../component/AuthProvider";
import Footer from "../../component/Footer";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitRegistration = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(name, email);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#faf5ff,#fff7ed,#eff6ff)] dark:bg-zinc-950">
    <main className="relative flex min-h-[calc(100vh-280px)] items-center justify-center overflow-hidden px-6 py-12">
      <div className="absolute -left-20 top-10 size-72 rounded-full bg-violet-300/40 blur-3xl" />
      <div className="absolute -right-20 bottom-10 size-72 rounded-full bg-fuchsia-300/40 blur-3xl" />

      <section className="relative w-full max-w-md rounded-3xl border border-white/70 bg-white/85 p-8 shadow-[0_24px_70px_rgba(76,29,149,0.16)] backdrop-blur-xl sm:p-10">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-linear-to-br from-violet-500 via-fuchsia-500 to-orange-400 text-sm font-extrabold text-white">
              EL
            </span>
            <span className="bg-linear-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-lg font-bold text-transparent">
              Event Lab
            </span>
          </Link>
          <Link
            href="/"
            className="rounded-xl border border-violet-200 bg-white px-4 py-2 text-sm font-bold text-violet-700 transition-colors hover:border-violet-400 hover:bg-violet-50"
          >
            Home
          </Link>
        </div>

        <div className="mb-7 flex gap-2">
          {[1, 2].map((item) => (
            <div
              key={item}
              className={`h-2 flex-1 rounded-full ${item <= step ? "bg-linear-to-r from-violet-500 to-fuchsia-500" : "bg-zinc-200"}`}
            />
          ))}
        </div>

        <span className="text-sm font-bold text-violet-600">Step {step} of 2</span>
        <h1 className="mt-2 text-4xl font-black text-zinc-900">
          {step === 1 ? "Create account" : "Secure account"}
        </h1>

        {step === 1 ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setStep(2);
            }}
            className="mt-8 space-y-5"
          >
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-zinc-700">Full name</span>
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Alex Parker"
                className="w-full rounded-xl border border-violet-100 bg-white px-4 py-3 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-zinc-700">Email address</span>
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-violet-100 bg-white px-4 py-3 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
              />
            </label>
            <button type="submit" className="w-full rounded-xl bg-linear-to-r from-violet-600 to-fuchsia-600 px-5 py-3.5 font-bold text-white">
              Continue
            </button>
          </form>
        ) : (
          <form onSubmit={submitRegistration} className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-zinc-700">Password</span>
              <input
                required
                minLength={6}
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 6 characters"
                className="w-full rounded-xl border border-violet-100 bg-white px-4 py-3 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
              />
            </label>
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="rounded-xl border border-violet-200 px-5 py-3.5 font-bold text-violet-700">
                Back
              </button>
              <button type="submit" className="flex-1 rounded-xl bg-linear-to-r from-violet-600 via-fuchsia-600 to-orange-500 px-5 py-3.5 font-bold text-white">
                Create Account
              </button>
            </div>
          </form>
        )}

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-zinc-200" />
          <span className="text-xs font-bold uppercase tracking-wide text-zinc-400">or</span>
          <div className="h-px flex-1 bg-zinc-200" />
        </div>

        <button
          type="button"
          disabled
          title="Google sign-in will be available when credentials are configured"
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-white px-5 py-3.5 font-bold text-zinc-700 shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5">
            <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.06H12v3.9h5.38a4.6 4.6 0 0 1-1.99 3.02v2.53h3.22c1.88-1.73 2.99-4.28 2.99-7.39Z" />
            <path fill="#34A853" d="M12 22c2.69 0 4.95-.89 6.6-2.38l-3.22-2.53c-.89.6-2.03.95-3.38.95-2.61 0-4.82-1.76-5.61-4.13H3.06v2.61A10 10 0 0 0 12 22Z" />
            <path fill="#FBBC05" d="M6.39 13.91A6 6 0 0 1 6.07 12c0-.66.11-1.3.32-1.91V7.48H3.06A10 10 0 0 0 2 12c0 1.62.39 3.15 1.06 4.52l3.33-2.61Z" />
            <path fill="#EA4335" d="M12 5.96c1.46 0 2.77.5 3.8 1.49l2.85-2.85A9.62 9.62 0 0 0 12 2a10 10 0 0 0-8.94 5.48l3.33 2.61C7.18 7.72 9.39 5.96 12 5.96Z" />
          </svg>
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-zinc-600">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-violet-600 hover:text-fuchsia-600">
            Login
          </Link>
        </p>
      </section>
    </main>
    <Footer />
    </div>
  );
}
