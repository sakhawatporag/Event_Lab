"use client";

import { useEffect, useState } from "react";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import Link from "next/link";

type EventItem = {
  id: string;
  title: string;
  description: string;
  eventType: string;
  imageUrl: string;
  location: string;
  eventDate: string;
  creatorEmail: string;
};

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("eventLabEvents") || "[]") as EventItem[];
    setEvents(stored.filter((event) => new Date(`${event.eventDate}T23:59:59`) > new Date()));
  }, []);

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#faf5ff,#fff7ed,#eff6ff)]">
      <Navbar />
      <main className="mx-auto min-h-[70vh] max-w-6xl px-6 py-12">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="text-sm font-bold text-violet-600">Discover and join</span>
            <h1 className="mt-2 text-4xl font-black text-zinc-900">Upcoming Events</h1>
          </div>
        </div>

        {events.length === 0 ? (
          <section className="rounded-3xl border border-violet-100 bg-white/80 p-10 text-center shadow-[0_20px_50px_rgba(76,29,149,0.10)]">
            <p className="text-lg font-bold text-zinc-700">No upcoming events yet.</p>
            <p className="mt-2 text-zinc-500">Create the first event and inspire others to join.</p>
          </section>
        ) : (
          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article key={event.id} className="overflow-hidden rounded-3xl border border-white/80 bg-white/90 shadow-[0_18px_45px_rgba(76,29,149,0.12)]">
                <img src={event.imageUrl} alt={event.title} className="h-48 w-full object-cover" />
                <div className="p-5">
                  <span className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
                    {event.eventType}
                  </span>
                  <h2 className="mt-3 text-xl font-black text-zinc-900">{event.title}</h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-600">{event.description}</p>
                  <div className="mt-4 space-y-1 text-sm font-medium text-zinc-500">
                    <p>{event.location}</p>
                    <p>{new Date(`${event.eventDate}T00:00:00`).toLocaleDateString()}</p>
                  </div>
                  <Link href={`/events/${event.id}`} className="mt-5 block rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-3 text-center text-sm font-bold text-white">
                    View Event
                  </Link>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
