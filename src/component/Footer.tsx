import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-violet-100 bg-zinc-950 text-zinc-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 sm:py-12 sm:grid-cols-2 md:grid-cols-3">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400 font-extrabold text-white">
              EL
            </span>
            <span className="text-lg font-black text-white">Event Lab</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-zinc-400">
            Bringing neighbors together through meaningful community events.
          </p>
        </div>
        <div>
          <h2 className="font-bold text-white">Explore</h2>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Link href="/events" className="hover:text-fuchsia-400">Upcoming Events</Link>
            <Link href="/create-event" className="hover:text-fuchsia-400">Create Event</Link>
            <Link href="/joined-events" className="hover:text-fuchsia-400">Joined Events</Link>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-white">Community</h2>
          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Together, we can build stronger and kinder neighborhoods.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="#" aria-label="X" className="flex size-9 items-center justify-center rounded-full border border-zinc-700 font-bold hover:border-fuchsia-400 hover:text-fuchsia-400">𝕏</a>
            <a href="#" aria-label="Facebook" className="flex size-9 items-center justify-center rounded-full border border-zinc-700 font-bold hover:border-fuchsia-400 hover:text-fuchsia-400">f</a>
            <a href="#" aria-label="Instagram" className="flex size-9 items-center justify-center rounded-full border border-zinc-700 font-bold hover:border-fuchsia-400 hover:text-fuchsia-400">◎</a>
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-800 px-6 py-5 text-center text-xs text-zinc-500">
        © 2026 Event Lab. Made for stronger communities.
      </div>
    </footer>
  );
}
