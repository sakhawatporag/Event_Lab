"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import { useAuth } from "../../component/AuthProvider";
import Link from "next/link";
import Image from "next/image";

type EventItem = { id: string; title: string; eventType: string; imageUrl: string; location: string; eventDate: string; description: string };

export default function JoinedEventsPage() {
  const router = useRouter();
  const { loggedIn, isLoaded, userEmail } = useAuth();
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    if (isLoaded && !loggedIn) router.replace("/login");
  }, [isLoaded, loggedIn, router]);

  useEffect(() => {
    if (!isLoaded || !loggedIn) return;
    queueMicrotask(() => {
      const joins = JSON.parse(localStorage.getItem("eventLabJoins") || "[]");
      const eventIds = joins
        .filter((join: { userEmail: string }) => join.userEmail === userEmail)
        .map((join: { eventId: string }) => join.eventId);
      const allEvents = JSON.parse(localStorage.getItem("eventLabEvents") || "[]") as EventItem[];
      setEvents(
        allEvents
          .filter((event) => eventIds.includes(event.id))
          .sort((a, b) => a.eventDate.localeCompare(b.eventDate)),
      );
    });
  }, [isLoaded, loggedIn, userEmail]);

  if (!isLoaded || !loggedIn) return null;

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#faf5ff,#fff7ed,#eff6ff)] dark:bg-zinc-950">
      <Navbar />
      <main className="mx-auto min-h-[70vh] max-w-6xl px-6 py-12">
        <span className="text-sm font-bold text-violet-600">Your participation</span>
        <h1 className="mt-2 text-4xl font-black">Joined Events</h1>
        {events.length === 0 ? (
          <div className="mt-8 rounded-3xl bg-white p-10 text-center shadow-xl dark:bg-zinc-900">
            <p className="font-bold text-zinc-700 dark:text-zinc-300">You have not joined an event yet.</p>
            <Link href="/events" className="mt-5 inline-block rounded-xl bg-violet-600 px-5 py-3 font-bold text-white">Explore Events</Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Link key={event.id} href={`/events/${event.id}`} className="overflow-hidden rounded-3xl bg-white shadow-lg dark:bg-zinc-900">
                <Image src={event.imageUrl} alt={event.title} width={800} height={384} unoptimized className="h-48 w-full object-cover" />
                <div className="p-5">
                  <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">{event.eventType}</span>
                  <h2 className="mt-4 text-xl font-black">{event.title}</h2>
                  <p className="mt-2 text-sm text-zinc-500">{event.location} · {new Date(`${event.eventDate}T00:00:00`).toLocaleDateString()}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
