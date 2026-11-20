"use client";

import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { useAuth } from "../component/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

type EventItem = {
  id: string;
  title: string;
  description: string;
  eventType: string;
  imageUrl: string;
  location: string;
  eventDate: string;
};

export default function Home() {
  const router = useRouter();
  const { loggedIn } = useAuth();
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("eventLabEvents") || "[]") as EventItem[];
    setEvents(
      stored
        .filter((event) => new Date(`${event.eventDate}T23:59:59`) > new Date())
        .slice(0, 6),
    );
  }, []);

  const openCreateEvent = () => {
    router.push(loggedIn ? "/create-event" : "/login");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,#faf5ff_0%,#fff7ed_50%,#eff6ff_100%)] font-sans text-zinc-900 dark:bg-[linear-gradient(135deg,#09090b_0%,#18112b_50%,#17120a_100%)] dark:text-white">
      <Navbar />
      <main>
        <section className="relative mx-auto grid min-h-[620px] max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-[1fr_.85fr]">
          <div className="pointer-events-none absolute -left-32 top-20 size-80 rounded-full bg-violet-300/35 blur-3xl" />
          <div className="relative max-w-2xl">
          <span className="inline-flex rounded-full border border-violet-200 bg-white/70 px-4 py-2 text-sm font-bold text-violet-700 shadow-sm backdrop-blur-sm dark:border-violet-800 dark:bg-zinc-900/70 dark:text-violet-300">
            Community-powered social events
          </span>
          <h1 className="mt-6 text-5xl font-black leading-tight sm:text-6xl">
            Make a difference,
            <span className="block bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
              together.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
            Discover community cleanups, donation drives, and local projects where every contribution matters.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/events" className="rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-7 py-3.5 font-bold text-white shadow-[0_12px_30px_rgba(124,58,237,0.28)] transition-transform hover:-translate-y-1">
              Explore Events
            </Link>
            <button
              type="button"
              onClick={openCreateEvent}
              className="rounded-2xl border border-violet-200 bg-white/80 px-7 py-3.5 font-bold text-violet-700 shadow-sm backdrop-blur-sm transition-all hover:border-violet-400 hover:bg-white dark:border-violet-800 dark:bg-zinc-900/80 dark:text-violet-300"
            >
              Create an Event
            </button>
          </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute -inset-6 rotate-3 rounded-[2.5rem] bg-gradient-to-br from-violet-300/50 via-fuchsia-200/50 to-orange-300/50" />
            <div className="relative min-h-[440px] overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-7 shadow-2xl backdrop-blur-xl dark:border-zinc-700 dark:bg-zinc-900/85">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-violet-600">Community pulse</p>
                  <p className="mt-1 text-2xl font-black">This week</p>
                </div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xl text-white">
                  +
                </div>
              </div>
              <div className="mt-7 grid grid-cols-3 gap-3">
                {[
                  ["12", "Events"],
                  ["348", "People"],
                  ["28", "Cities"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-violet-100 bg-violet-50/70 p-4 text-center dark:border-zinc-700 dark:bg-zinc-800/80">
                    <p className="text-xl font-black text-violet-600">{value}</p>
                    <p className="mt-1 text-xs font-bold text-zinc-500 dark:text-zinc-400">{label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 to-fuchsia-50 p-5 dark:border-zinc-700 dark:bg-zinc-800">
                <div className="flex items-center gap-4">
                  <div className="relative flex size-16 items-center justify-center rounded-full bg-white shadow-sm dark:bg-zinc-900">
                    <div className="absolute inset-2 rounded-full border-4 border-violet-100 border-r-fuchsia-500 border-t-orange-400" />
                    <span className="text-sm font-black text-violet-600">76%</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-black">Community goal</p>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Neighborhood support</p>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-white dark:bg-zinc-700">
                      <div className="h-full w-[76%] rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between rounded-2xl bg-zinc-950 px-5 py-4 text-white">
                <div>
                  <p className="text-xs font-bold text-violet-300">Next event</p>
                  <p className="mt-1 font-black">Community Meetup</p>
                </div>
                <span className="rounded-xl bg-white/10 px-3 py-2 text-sm font-bold">Sat</span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white/60 px-6 py-20 dark:bg-zinc-950/40">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <span className="text-sm font-bold text-violet-600">Why Event Lab</span>
              <h2 className="mt-2 text-4xl font-black">Small actions, lasting impact</h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                ["01", "Create Together", "Start local projects and bring caring people around a shared goal."],
                ["02", "Join Your Community", "Find meaningful opportunities close to home and meet your neighbors."],
                ["03", "Track Real Impact", "Organize activity, manage events, and celebrate every contribution."],
              ].map(([number, title, text]) => (
                <article key={number} className="rounded-3xl border border-violet-100 bg-white p-7 shadow-[0_16px_40px_rgba(76,29,149,0.08)] dark:border-zinc-800 dark:bg-zinc-900">
                  <span className="text-3xl font-black text-fuchsia-500">{number}</span>
                  <h3 className="mt-5 text-xl font-black">{title}</h3>
                  <p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-400">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="text-sm font-bold text-violet-600">Coming soon</span>
                <h2 className="mt-2 text-4xl font-black">Recent Upcoming Events</h2>
              </div>
              <Link href="/events" className="hidden font-bold text-violet-600 hover:text-fuchsia-600 sm:block">View all →</Link>
            </div>
            {events.length > 0 ? (
              <div className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                  <Link key={event.id} href={`/events/${event.id}`} className="overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-[0_16px_40px_rgba(76,29,149,0.10)] transition-transform hover:-translate-y-1 dark:border-zinc-800 dark:bg-zinc-900">
                    <img src={event.imageUrl} alt={event.title} className="h-52 w-full object-cover" />
                    <div className="p-5">
                      <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">{event.eventType}</span>
                      <h3 className="mt-4 text-xl font-black">{event.title}</h3>
                      <p className="mt-2 text-sm text-zinc-500">{event.location} · {new Date(`${event.eventDate}T00:00:00`).toLocaleDateString()}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-9 rounded-3xl border border-violet-100 bg-white/70 p-10 text-center dark:border-zinc-800 dark:bg-zinc-900/70">
                <p className="font-bold text-zinc-600 dark:text-zinc-300">New community events will appear here.</p>
              </div>
            )}
          </div>
        </section>

        <section className="bg-white/60 px-6 py-20 dark:bg-zinc-950/40">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <span className="text-sm font-bold text-violet-600">Community gallery</span>
              <h2 className="mt-2 text-4xl font-black">Moments of impact</h2>
            </div>
            <div className="mt-9 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                "photo-1469571486292-0ba58a3f068b",
                "photo-1488521787991-ed7bbaae773c",
                "photo-1593113646773-028c64a8f1b8",
                "photo-1559027615-cd4628902d4a",
              ].map((photo, index) => (
                <img key={photo} src={`https://images.unsplash.com/${photo}?auto=format&fit=crop&w=700&q=85`} alt={`Community event ${index + 1}`} className="h-56 w-full rounded-2xl object-cover shadow-lg" />
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl rounded-[2rem] bg-gradient-to-r from-violet-600 via-fuchsia-600 to-orange-500 px-6 py-12 text-center text-white shadow-[0_24px_60px_rgba(124,58,237,0.24)] sm:px-12">
            <h2 className="text-3xl font-black sm:text-4xl">Join the community newsletter</h2>
            <p className="mt-3 text-white/85">Get inspiring stories and new community events in your inbox.</p>
            <form className="mx-auto mt-7 flex max-w-xl flex-col gap-3 sm:flex-row" onSubmit={(event) => event.preventDefault()}>
              <input type="email" required placeholder="Email address" className="min-w-0 flex-1 rounded-xl border-0 bg-white px-5 py-3.5 text-zinc-900 outline-none" />
              <button type="submit" className="rounded-xl bg-zinc-950 px-6 py-3.5 font-bold text-white">Subscribe</button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
