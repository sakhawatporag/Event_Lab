"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../../component/Navbar";
import Footer from "../../../component/Footer";
import { useAuth } from "../../../component/AuthProvider";

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

export default function EventDetailsClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { loggedIn, isLoaded, userEmail, userName } = useAuth();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const events = JSON.parse(localStorage.getItem("eventLabEvents") || "[]") as EventItem[];
    setEvent(events.find((item) => item.id === id) || null);
  }, [id]);

  const joinEvent = () => {
    if (!loggedIn) {
      sessionStorage.setItem("eventLabRedirect", `/events/${id}`);
      router.push("/login");
      return;
    }

    if (!event) return;
    const joins = JSON.parse(localStorage.getItem("eventLabJoins") || "[]");
    const exists = joins.some((join: { eventId: string; userEmail: string }) =>
      join.eventId === event.id && join.userEmail === userEmail,
    );
    if (!exists) {
      joins.push({ eventId: event.id, userEmail, userName, joinedAt: new Date().toISOString() });
      localStorage.setItem("eventLabJoins", JSON.stringify(joins));
    }
    setMessage("You have joined this event!");
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#faf5ff,#fff7ed,#eff6ff)] dark:bg-zinc-950">
      <Navbar />
      <main className="mx-auto min-h-[70vh] max-w-5xl px-6 py-12">
        {!event ? (
          <div className="rounded-3xl bg-white p-10 text-center font-bold text-zinc-700 shadow-xl dark:bg-zinc-900 dark:text-zinc-300">
            Loading event details...
          </div>
        ) : (
          <article className="overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-[0_24px_70px_rgba(76,29,149,0.14)] dark:border-zinc-800 dark:bg-zinc-900">
            <img src={event.imageUrl} alt={event.title} className="h-72 w-full object-cover sm:h-[420px]" />
            <div className="p-6 sm:p-10">
              <span className="rounded-full bg-violet-100 px-4 py-1.5 text-sm font-bold text-violet-700">{event.eventType}</span>
              <h1 className="mt-5 text-4xl font-black sm:text-5xl">{event.title}</h1>
              <div className="mt-5 flex flex-wrap gap-5 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                <span>Location: {event.location}</span>
                <span>Date: {new Date(`${event.eventDate}T00:00:00`).toLocaleDateString()}</span>
              </div>
              <p className="mt-8 max-w-3xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">{event.description}</p>
              {message && (
                <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 font-bold text-emerald-700">
                  {message}
                </div>
              )}
              <button
                type="button"
                onClick={joinEvent}
                disabled={!isLoaded}
                className="mt-8 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-orange-500 px-7 py-3.5 font-bold text-white shadow-[0_12px_28px_rgba(168,85,247,0.28)]"
              >
                Join Event
              </button>
            </div>
          </article>
        )}
      </main>
      <Footer />
    </div>
  );
}
