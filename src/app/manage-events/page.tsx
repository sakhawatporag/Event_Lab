"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import { useAuth } from "../../component/AuthProvider";
import Image from "next/image";

type EventItem = { id: string; title: string; eventType: string; imageUrl: string; location: string; eventDate: string; description: string; creatorEmail: string };

export default function ManageEventsPage() {
  const router = useRouter();
  const { loggedIn, isLoaded, userEmail } = useAuth();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [editing, setEditing] = useState<EventItem | null>(null);

  useEffect(() => {
    if (isLoaded && !loggedIn) router.replace("/login");
  }, [isLoaded, loggedIn, router]);

  useEffect(() => {
    if (!isLoaded || !loggedIn) return;
    queueMicrotask(() => {
      const allEvents = JSON.parse(localStorage.getItem("eventLabEvents") || "[]") as EventItem[];
      setEvents(allEvents.filter((event) => event.creatorEmail === userEmail));
    });
  }, [isLoaded, loggedIn, userEmail]);

  const saveEvent = () => {
    if (!editing) return;
    const allEvents = JSON.parse(localStorage.getItem("eventLabEvents") || "[]") as EventItem[];
    localStorage.setItem("eventLabEvents", JSON.stringify(allEvents.map((event) => event.id === editing.id ? editing : event)));
    setEvents((current) => current.map((event) => event.id === editing.id ? editing : event));
    setEditing(null);
  };

  const deleteEvent = (id: string) => {
    const allEvents = JSON.parse(localStorage.getItem("eventLabEvents") || "[]") as EventItem[];
    const remaining = allEvents.filter((event) => event.id !== id);
    localStorage.setItem("eventLabEvents", JSON.stringify(remaining));
    setEvents((current) => current.filter((event) => event.id !== id));
  };

  if (!isLoaded || !loggedIn) return null;

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#faf5ff,#fff7ed,#eff6ff)] dark:bg-zinc-950">
      <Navbar />
      <main className="mx-auto min-h-[70vh] max-w-6xl px-6 py-12">
        <span className="text-sm font-bold text-violet-600">Organizer dashboard</span>
        <h1 className="mt-2 text-4xl font-black">Manage Events</h1>
        {events.length === 0 ? (
          <div className="mt-8 rounded-3xl bg-white p-10 text-center font-bold text-zinc-600 shadow-xl dark:bg-zinc-900 dark:text-zinc-300">
            You have not created any events yet.
          </div>
        ) : (
          <div className="mt-8 space-y-5">
            {events.map((event) => (
              <article key={event.id} className="flex flex-col gap-5 rounded-3xl bg-white p-5 shadow-lg sm:flex-row sm:items-center dark:bg-zinc-900">
                <Image src={event.imageUrl} alt={event.title} width={416} height={288} unoptimized className="h-36 w-full rounded-2xl object-cover sm:w-52" />
                <div className="flex-1">
                  <span className="text-xs font-bold text-violet-600">{event.eventType}</span>
                  <h2 className="mt-1 text-xl font-black">{event.title}</h2>
                  <p className="mt-1 text-sm text-zinc-500">{event.location} · {new Date(`${event.eventDate}T00:00:00`).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setEditing({ ...event })} className="rounded-xl border border-violet-200 px-4 py-2 font-bold text-violet-700">Update</button>
                  <button type="button" onClick={() => deleteEvent(event.id)} className="rounded-xl bg-red-50 px-4 py-2 font-bold text-red-600">Delete</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 dark:bg-zinc-900">
            <h2 className="text-2xl font-black">Update Event</h2>
            <div className="mt-5 space-y-4">
              <input value={editing.title} onChange={(event) => setEditing({ ...editing, title: event.target.value })} className="w-full rounded-xl border border-violet-100 px-4 py-3 dark:bg-zinc-800" />
              <input value={editing.location} onChange={(event) => setEditing({ ...editing, location: event.target.value })} className="w-full rounded-xl border border-violet-100 px-4 py-3 dark:bg-zinc-800" />
              <input type="date" min={new Date().toISOString().split("T")[0]} value={editing.eventDate} onChange={(event) => setEditing({ ...editing, eventDate: event.target.value })} className="w-full rounded-xl border border-violet-100 px-4 py-3 dark:bg-zinc-800" />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setEditing(null)} className="rounded-xl border border-zinc-200 px-4 py-2 font-bold">Cancel</button>
              <button type="button" onClick={saveEvent} className="rounded-xl bg-violet-600 px-4 py-2 font-bold text-white">Save Changes</button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
