"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../component/Navbar";
import { useAuth } from "../../component/AuthProvider";
import Footer from "../../component/Footer";

export default function CreateEventPage() {
  const router = useRouter();
  const { loggedIn, isLoaded, userEmail } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventType, setEventType] = useState("Cleanup");
  const [imageUrl, setImageUrl] = useState("");
  const [location, setLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (isLoaded && !loggedIn) {
      sessionStorage.setItem("eventLabRedirect", "/create-event");
      router.replace("/login");
    }
  }, [loggedIn, isLoaded, router]);

  if (!isLoaded || !loggedIn) {
    return null;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selectedDate = new Date(`${eventDate}T23:59:59`);

    if (selectedDate <= new Date()) {
      setError("Please select a future date.");
      return;
    }

    const storedEvents = JSON.parse(localStorage.getItem("eventLabEvents") || "[]");
    storedEvents.unshift({
      id: crypto.randomUUID(),
      title,
      description,
      eventType,
      imageUrl,
      location,
      eventDate,
      creatorEmail: userEmail,
    });
    localStorage.setItem("eventLabEvents", JSON.stringify(storedEvents));
    setError("");
    setSuccess("Event created successfully!");
    window.setTimeout(() => router.push("/events"), 900);
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#faf5ff,#fff7ed,#eff6ff)]">
      <Navbar />
      <main className="mx-auto min-h-[70vh] max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <section className="rounded-3xl border border-white/70 bg-white/90 p-5 shadow-[0_24px_70px_rgba(76,29,149,0.12)] sm:p-8">
          {success && (
            <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 font-bold text-emerald-700">
              {success}
            </div>
          )}
          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-bold text-red-700">
              {error}
            </div>
          )}
          <span className="text-sm font-bold text-violet-600">New experience</span>
          <h1 className="mt-2 text-4xl font-black text-zinc-900">Create an Event</h1>
          <form onSubmit={handleSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className="mb-2 block text-sm font-bold text-zinc-700">Event name</span>
              <input required value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Summer Music Festival" className="w-full rounded-xl border border-violet-100 px-4 py-3 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100" />
            </label>
            <label className="sm:col-span-2">
              <span className="mb-2 block text-sm font-bold text-zinc-700">Description</span>
              <textarea required rows={4} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Tell people what makes this event special" className="w-full resize-none rounded-xl border border-violet-100 px-4 py-3 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100" />
            </label>
            <label>
              <span className="mb-2 block text-sm font-bold text-zinc-700">Event type</span>
              <select value={eventType} onChange={(event) => setEventType(event.target.value)} className="w-full rounded-xl border border-violet-100 px-4 py-3 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100">
                <option>Cleanup</option>
                <option>Plantation</option>
                <option>Donation</option>
                <option>Workshop</option>
                <option>Concert</option>
                <option>Conference</option>
                <option>Other</option>
              </select>
            </label>
            <label>
              <span className="mb-2 block text-sm font-bold text-zinc-700">Thumbnail Image URL</span>
              <input required type="url" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} placeholder="https://example.com/event.jpg" className="w-full rounded-xl border border-violet-100 px-4 py-3 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100" />
            </label>
            <label>
              <span className="mb-2 block text-sm font-bold text-zinc-700">Date</span>
              <input required type="date" value={eventDate} onChange={(event) => setEventDate(event.target.value)} className="w-full rounded-xl border border-violet-100 px-4 py-3 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100" />
            </label>
            <label>
              <span className="mb-2 block text-sm font-bold text-zinc-700">Location</span>
              <input required value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Dhaka, Bangladesh" className="w-full rounded-xl border border-violet-100 px-4 py-3 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100" />
            </label>
            <button type="submit" className="sm:col-span-2 rounded-xl bg-linear-to-r from-violet-600 via-fuchsia-600 to-orange-500 px-5 py-3.5 font-bold text-white">
              Publish Event
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
