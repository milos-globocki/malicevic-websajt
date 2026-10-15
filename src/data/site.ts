// Single source of truth for business details. Contact details, address and social
// links come from the client's previous website (enterijermalicevic.ba). Everything
// still marked TODO is a placeholder until the client confirms it.
export const site = {
  name: "Maličević Enterijeri",
  shortName: "Maličević",
  tagline: { sr: "Namještaj i enterijeri", en: "Furniture & interiors" },
  developer: { name: "Miloš Globočki", linkedin: "https://www.linkedin.com/in/globocki/" },
  legalName: "Maličević Wood Form d.o.o.",
  // Three numbers, each with one job. `display` is what visitors read, `href` is the
  // dialable form with country code.
  /** Phone calls. */
  phone: { display: "+387 66 029 090", href: "+38766029090" },
  /** Viber and WhatsApp share this one number; both apps are linked from one row. */
  messenger: { display: "+387 65 684 451", href: "+38765684451", digits: "38765684451" },
  /** International line, calls only. TODO: the client has not sent it yet; empty strings hide the row. */
  phoneIntl: { display: "", href: "" },
  email: "info@enterijermalicevic.ba",
  address: {
    street: "", // no public premises: customers are not invited to visit, so keep this empty
    postalCode: "78000",
    city: "Banja Luka",
    region: "Republika Srpska",
    country: { sr: "Bosna i Hercegovina", en: "Bosnia and Herzegovina" },
    countryCode: "BA",
  },
  geo: { latitude: 44.7643189, longitude: 17.2040237 },
  hours: { sr: "Pon–Pet 08–16h, Sub 09–14h", en: "Mon–Fri 8–16, Sat 9–14" }, // TODO
  /** schema.org openingHours; keep in sync with `hours`. */
  openingHours: ["Mo-Fr 08:00-16:00", "Sa 09:00-14:00"], // TODO
  /** schema.org areaServed. */
  areaServed: ["Bosnia and Herzegovina", "Europe"],
  instagram: "https://www.instagram.com/enterijer_malicevic/",
  facebook: "https://www.facebook.com/malicevicenterijeri/",
  tiktok: "https://www.tiktok.com/@enterijermalicevic",
} as const;
