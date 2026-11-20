export const instant = false;

import { Suspense } from "react";
import EventDetailsClient from "./EventDetailsClient";

export default function EventDetailsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-50" />}>
      <EventDetailsClient />
    </Suspense>
  );
}
