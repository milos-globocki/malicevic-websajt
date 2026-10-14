// Single source of truth for business details. Contact details, address and social
// links come from the client's previous website (enterijermalicevic.ba). Everything
// still marked TODO is a placeholder until the client confirms it.
export const site = {
  name: "Maličević Enterijeri",
  shortName: "Maličević",
  tagline: { sr: "Namještaj i enterijeri", en: "Furniture & interiors" },
  developer: { name: "Miloš Globočki", linkedin: "https://www.linkedin.com/in/globocki/" },
  legalName: "Maličević Wood Form d.o.o.",
  phone: { display: "+387 65 684 451", href: "+38765684451" },
  phone2: { display: "+387 66 029 090", href: "+38766029090" },
  viber: "38765684451", // digits only, with country code; empty string hides it
  whatsapp: "38765684451", // digits only, with country code
  email: "info@enterijermalicevic.ba",
  address: {
    street: "", // TODO: the old site only lists the city; empty hides the line
    postalCode: "78000",
    city: "Banja Luka",
    region: "Republika Srpska",
    country: { sr: "Bosna i Hercegovina", en: "Bosnia and Herzegovina" },
    countryCode: "BA",
  },
  geo: { latitude: 44.7643189, longitude: 17.2040237 },
  mapUrl: "https://maps.google.com/?q=44.7643189,17.2040237",
  hours: { sr: "Pon–Pet 08–16h, Sub 09–14h", en: "Mon–Fri 8–16, Sat 9–14" }, // TODO
  /** schema.org openingHours; keep in sync with `hours`. */
  openingHours: ["Mo-Fr 08:00-16:00", "Sa 09:00-14:00"], // TODO
  /** schema.org areaServed. */
  areaServed: ["Bosnia and Herzegovina", "Europe"],
  instagram: "https://www.instagram.com/enterijer_malicevic/",
  facebook: "https://www.facebook.com/malicevicenterijeri/",
  tiktok: "https://www.tiktok.com/@enterijermalicevic",
} as const;
