"use client";

import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

export default function Navbar() {
  const router = useRouter();
  const { loggedIn, userName, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("eventLabTheme");
    const useDark = savedTheme === "dark";
    setDarkMode(useDark);
    document.documentElement.classList.toggle("dark", useDark);
  }, []);

  const toggleTheme = () => {
    const nextMode = !darkMode;
    setDarkMode(nextMode);
    localStorage.setItem("eventLabTheme", nextMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", nextMode);
  };
  const initials = userName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <nav className="relative z-30 w-full border-b border-white/30 bg-white/85 px-6 py-4 text-zinc-900 shadow-[0_8px_30px_rgba(79,70,229,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/85 dark:text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="group flex items-center gap-3 font-bold">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400 text-sm font-extrabold text-white shadow-[0_8px_24px_rgba(168,85,247,0.35)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
            EL
          </span>
          <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-orange-500 bg-clip-text text-lg text-transparent">
            Event Lab
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle navigation"
          className="rounded-xl border border-violet-200 p-2 md:hidden dark:border-zinc-700"
        >
          <span className="block h-0.5 w-5 bg-current" />
          <span className="my-1 block h-0.5 w-5 bg-current" />
          <span className="block h-0.5 w-5 bg-current" />
        </button>

        <div className={`${mobileOpen ? "absolute left-4 right-4 top-[76px] flex" : "hidden"} flex-col items-stretch gap-4 rounded-2xl border border-violet-100 bg-white/95 p-4 shadow-xl md:relative md:left-auto md:right-auto md:top-auto md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0 md:shadow-none dark:border-zinc-700 dark:bg-zinc-950/95 md:dark:bg-transparent`}>
          <Link
            href="/events"
            className="relative font-semibold text-zinc-700 transition-colors after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-gradient-to-r after:from-violet-500 after:to-fuchsia-500 after:transition-transform hover:text-violet-600 hover:after:scale-x-100 dark:text-zinc-200"
          >
            Upcoming Events
          </Link>
          <button
            type="button"
            onClick={() => router.push(loggedIn ? "/create-event" : "/login")}
            className="text-left font-semibold text-zinc-700 hover:text-violet-600 md:text-center dark:text-zinc-200"
          >
            Create Event
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle light and dark theme"
            className="flex size-10 items-center justify-center rounded-full border border-violet-200 bg-white text-lg shadow-sm hover:bg-violet-50 dark:border-zinc-700 dark:bg-zinc-900"
          >
            {darkMode ? "☀" : "☾"}
          </button>

          {loggedIn ? (
            <div className="relative">
              <button
                type="button"
                aria-expanded={profileOpen}
                aria-haspopup="menu"
                onClick={() => setProfileOpen((open) => !open)}
                onMouseEnter={() => setProfileOpen(true)}
                className="group relative flex items-center gap-2 rounded-full"
              >
                <span className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-fuchsia-100 font-bold text-violet-700 ring-2 ring-violet-500/30 ring-offset-2 ring-offset-white transition-transform duration-200 group-hover:scale-105 dark:ring-offset-zinc-950">
                  {initials}
                </span>
                <span className="pointer-events-none absolute right-0 top-14 z-20 whitespace-nowrap rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-xl transition-all group-hover:-translate-y-1 group-hover:opacity-100">
                  {userName}
                </span>
              </button>

              {profileOpen && (
                <div
                  role="menu"
                  onMouseLeave={() => setProfileOpen(false)}
                  className="absolute right-0 top-14 z-10 w-56 overflow-hidden rounded-2xl border border-violet-100 bg-white/95 p-2 shadow-[0_18px_45px_rgba(76,29,149,0.18)] backdrop-blur-xl dark:border-violet-900/50 dark:bg-zinc-900/95"
                >
                  <Link
                    role="menuitem"
                    href="/create-event"
                    className="block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gradient-to-r hover:from-violet-50 hover:to-fuchsia-50 hover:text-violet-700 dark:hover:from-violet-950 dark:hover:to-fuchsia-950"
                  >
                    Create Event
                  </Link>
                  <Link
                    role="menuitem"
                    href="/manage-events"
                    className="block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gradient-to-r hover:from-violet-50 hover:to-fuchsia-50 hover:text-violet-700 dark:hover:from-violet-950 dark:hover:to-fuchsia-950"
                  >
                    Manage Events
                  </Link>
                  <Link
                    role="menuitem"
                    href="/joined-events"
                    className="block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gradient-to-r hover:from-violet-50 hover:to-fuchsia-50 hover:text-violet-700 dark:hover:from-violet-950 dark:hover:to-fuchsia-950"
                  >
                    Joined Events
                  </Link>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      logout();
                      setProfileOpen(false);
                      router.push("/");
                    }}
                    className="mt-2 w-full border-t border-zinc-200 px-4 pt-3 text-left text-sm font-semibold text-red-500 transition-colors hover:text-red-700 dark:border-zinc-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_22px_rgba(168,85,247,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(168,85,247,0.38)]"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
