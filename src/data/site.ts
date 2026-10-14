// Single source of truth for business details. Everything marked TODO is a
// placeholder until the client sends the real values.
export const site = {
  name: "Maličević Enterijeri",
  shortName: "Maličević",
  tagline: { sr: "Namještaj i enterijeri", en: "Furniture & interiors" },
  developer: { name: "Miloš Globočki", linkedin: "https://www.linkedin.com/in/globocki/" },
  phone: { display: "+387 65 000 000", href: "+38765000000" }, // TODO
  viber: "38765000000", // TODO: digits only, with country code; empty string hides it
  whatsapp: "38765000000", // TODO: digits only, with country code
  email: "info@malicevic.example", // TODO
  address: {
    street: "Ulica i broj", // TODO
    city: "Grad", // TODO
    region: "Republika Srpska",
    country: { sr: "Bosna i Hercegovina", en: "Bosnia and Herzegovina" },
    countryCode: "BA",
  },
  mapUrl: "https://maps.google.com/?q=", // TODO: paste the Google Maps share link
  hours: { sr: "Pon–Pet 08–16h, Sub 09–14h", en: "Mon–Fri 8–16, Sat 9–14" }, // TODO
  /** schema.org openingHours; keep in sync with `hours`. */
  openingHours: ["Mo-Fr 08:00-16:00", "Sa 09:00-14:00"], // TODO
  /** schema.org areaServed. */
  areaServed: ["Bosnia and Herzegovina", "Europe"],
  instagram: "https://www.instagram.com/enterijer_malicevic/",
  facebook: "https://www.facebook.com/malicevicenterijeri/",
} as const;
