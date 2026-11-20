export type EventItem = {
  id: string;
  title: string;
  description: string;
  eventType: string;
  imageUrl: string;
  location: string;
  eventDate: string;
  creatorEmail: string;
};

const futureDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
};

export const seedEvents: EventItem[] = [
  {
    id: "seed-river-cleanup",
    title: "Riverside Community Cleanup",
    description: "Join volunteers for a morning cleanup along the riverbank, followed by refreshments and a community briefing.",
    eventType: "Cleanup",
    imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=900&q=85",
    location: "Hatirjheel, Dhaka",
    eventDate: futureDate(5),
    creatorEmail: "community@eventlab.org",
  },
  {
    id: "seed-winter-drive",
    title: "Winter Clothes Distribution",
    description: "Help sort, pack, and distribute warm clothes to families in need across Mirpur and adjacent neighborhoods.",
    eventType: "Donation",
    imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=900&q=85",
    location: "Mirpur 10, Dhaka",
    eventDate: futureDate(8),
    creatorEmail: "community@eventlab.org",
  },
  {
    id: "seed-plantation",
    title: "Urban Tree Plantation Day",
    description: "Plant native trees in parks and roadside spaces to improve shade, air quality, and urban biodiversity.",
    eventType: "Plantation",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=900&q=85",
    location: "Ramna Park, Dhaka",
    eventDate: futureDate(12),
    creatorEmail: "green@eventlab.org",
  },
  {
    id: "seed-food-drive",
    title: "Neighborhood Food Relief",
    description: "Prepare and distribute nutritious meal packages with local families and community support volunteers.",
    eventType: "Donation",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=85",
    location: "Mohammadpur, Dhaka",
    eventDate: futureDate(16),
    creatorEmail: "relief@eventlab.org",
  },
  {
    id: "seed-learning-workshop",
    title: "Free Learning Workshop",
    description: "Support a friendly learning workshop covering basic digital skills, career planning, and online safety.",
    eventType: "Workshop",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db645?auto=format&fit=crop&w=900&q=85",
    location: "Dhanmondi, Dhaka",
    eventDate: futureDate(20),
    creatorEmail: "learning@eventlab.org",
  },
  {
    id: "seed-community-garden",
    title: "Community Garden Weekend",
    description: "Help build raised garden beds, grow seasonal vegetables, and learn practical home gardening techniques.",
    eventType: "Plantation",
    imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=85",
    location: "Uttara Sector 7, Dhaka",
    eventDate: futureDate(24),
    creatorEmail: "garden@eventlab.org",
  },
];

export function getEventsForDisplay(): EventItem[] {
  const stored = JSON.parse(localStorage.getItem("eventLabEvents") || "[]") as EventItem[];
  const merged = [...stored, ...seedEvents.filter((seed) => !stored.some((event) => event.id === seed.id))];
  return merged
    .filter((event) => new Date(`${event.eventDate}T23:59:59`) > new Date())
    .sort((a, b) => a.eventDate.localeCompare(b.eventDate));
}
