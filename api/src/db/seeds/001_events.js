/**
 * @param {import("knex").Knex} knex
 */
export async function seed(knex) {
  await knex("event").del();

  await knex("event")
    .insert([
      {
        id: 1,
        title: "Copenhagen Coffee Crawl",
        description:
          "A relaxed Saturday walk between 4 specialty cafés. Includes tasting notes, small pastry, and a guide to brewing styles.",
        event_location: "Barista coffee, Fredreiksberg",
        event_date: "2026-05-04 10:00:00",
        price: 100,
        currency: "DKK",
        available_tickets: 20,
      },
      {
        id: 2,
        title: "After-Work Board Games Night",
        description:
          "Drop in with friends or come solo. We’ll teach quick games, set you up at a table, and keep the vibe cozy and social.",
        event_location: "Farum Bytorv, Farum",
        event_date: "2026-05-22 16:00:00",
        price: 70,
        currency: "DKK",
        available_tickets: 30,
      },
      {
        id: 3,
        title: "Beginner Pasta Workshop",
        description:
          "Hands-on workshop: mix dough, roll sheets, shape pasta, and finish with a simple sauce. You’ll leave with a small take-home pack.",
        event_location:
          "CPH Cooking Class, Herluf Trolles Gade 9, 1st floor, 1052 København K",
        event_date: "2026-05-30 11:00:00",
        price: 900,
        currency: "DKK",
        available_tickets: 15,
      },
      {
        id: 4,
        title: "Sunday Park Run & Stretch",
        description:
          "Easy-paced community run (5K-ish) followed by guided stretching. All levels welcome—walkers included.",
        event_location: "Amager Beach Park, Amager",
        event_date: "2026-05-03 10:00:00",
        price: 50,
        currency: "DKK",
        available_tickets: 70,
      },
      {
        id: 5,
        title: "Indie Film Screening: Short Nights",
        description:
          "A curated set of local short films with a short Q&A after. Seats are limited—arrive early for the best spots.",
        event_location: "Cinemateket, Gothersgade 55, 1123 København K",
        event_date: "2026-06-17 18:30:00",
        price: 110,
        currency: "DKK",
        available_tickets: 150,
      },
      {
        id: 6,
        title: "Photography Walk: City Lights",
        description:
          "Evening photo walk focused on street scenes and reflections. Bring any camera—even a phone—and we’ll share tips on composition and exposure.",
        event_location: "Nyhavn (Anchor Monument), Nyhavn 39, 1051 København K",
        event_date: "2026-05-16 19:30:00",
        price: 180,
        currency: "DKK",
        available_tickets: 80,
      },
      {
        id: 7,
        title: "Bread & Butter Tasting",
        description:
          "Taste 6 breads and 5 butters (classic + flavored). Learn what makes a good crumb, crust, and fermentation—and why butter matters.",
        event_location: "Meyers Madhus, Nørrebrogade 52C, 2200 København N",
        event_date: "2026-05-23 10:00:00",
        price: 120,
        currency: "DKK",
        available_tickets: 100,
      },
      {
        id: 8,
        title: "Live Jazz Trio at the Loft",
        description:
          "An intimate set with modern standards and originals. Ticket includes a welcome drink; doors open 19:00.",
        event_location: "Epicurus Jazz Room, Ny Østergade 9, 1101 København K",
        event_date: "2026-05-09 19:30:00",
        price: 300,
        currency: "DKK",
        available_tickets: 150,
      },
      {
        id: 9,
        title: "Rock Music Concert",
        description:
          "An intimate set with modern standards and originals. Live music event along with audience choice singalong.",
        event_location:
          "Royal Arena Copenhagen, Hannemanns Allé 18-20, 2300 København S.",
        event_date: "2026-07-25 15:30:00",
        price: 300,
        currency: "DKK",
        available_tickets: 450,
      },
      {
        id: 10,
        title: "Tech Conference",
        description:
          "Tech talks and networking event with many experienced people.Its a great event to have small talks and discussions to connect with people.",
        event_location: "Bella Center, Center Boulevard 5 2300 København S",
        event_date: "2026-07-15 09:00:00",
        price: 150,
        currency: "DKK",
        available_tickets: 200,
      },
      {
        id: 11,
        title: "Telugu Stand-up Comedy",
        description:
          "A night of Telugu laughter, NRI life stories, and nonstop comedy—right here in Copenhagen!",
        event_location: "Herlev Bio Theatre, Herlev",
        event_date: "2026-10-10 19:00:00",
        price: 100,
        currency: "DKK",
        available_tickets: 80,
      },
      {
        id: 12,
        title: "ITDAY Copenhagen",
        description:
          "Your gateway to jobs, networking, and innovation in Denmark’s biggest IT career fair.",
        event_location: "'DGI Byen, Copenhagen",
        event_date: "2027-03-09 10:00:00",
        price: 0.0,
        currency: "DKK",
        available_tickets: 200,
      },
    ])
    .onConflict("id")
    .merge();
}
