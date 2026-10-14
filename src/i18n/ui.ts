export const languages = { sr: "Srpski", en: "English" } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = "sr";

// NOTE: all copy below is draft text for review with the client.
export const ui = {
  sr: {
    htmlLang: "sr-Latn-BA",
    hreflang: "sr",
    ogLocale: "sr_BA",
    metaTitle: "Maličević Enterijeri | Namještaj i enterijeri po mjeri",
    metaDescription:
      "Namještaj i enterijeri iz naše radionice u Republici Srpskoj, BiH: gotovi proizvodi, dizajnerski komadi i namještaj po mjeri za klijente širom Evrope.",
    skip: "Pređi na sadržaj",
    nav: { home: "Početna", portfolio: "Radovi", services: "Ponuda", about: "O nama", contact: "Kontakt" },
    menu: "Meni",
    close: "Zatvori",
    cta: "Kontaktirajte nas",
    hero: {
      line1: "Namještaj i enterijeri",
      line2: "napravljeni za vas.",
      sub: "Gotovi proizvodi, dizajnerski komadi i namještaj po mjeri. S vama smo od prve ideje do ugradnje.",
      scroll: "Pogledajte radove",
    },
    statement:
      "Svaki prostor ima svoj ritam. Mi pravimo namještaj koji ga prati, od mjere i materijala do posljednjeg detalja.",
    offer: {
      eyebrow: "Ponuda",
      title: "Tri načina da dođete do namještaja iz naše radionice",
      items: [
        { title: "Gotovi proizvodi", text: "Provjereni modeli iz naše proizvodnje, spremni za isporuku, u više materijala i završnih obrada." },
        { title: "Dizajnerski komadi", text: "Autorski namještaj u ograničenim serijama. Komadi sa karakterom, rađeni od odabranih materijala." },
        { title: "Namještaj po mjeri", text: "Kuhinje, plakari i enterijeri projektovani za vaš prostor i izrađeni prema vašim željama." },
      ],
    },
    materials: { label: "Materijali", items: ["Masivno drvo", "Furnir", "Lak", "Kamen", "Metal", "Staklo"] },
    featured: { eyebrow: "Izdvojeno", title: "Odabrani projekti", view: "Pogledaj" },
    video: {
      eyebrow: "Radionica",
      title: "Od skice do ugradnje, sve na jednom mjestu.",
    },
    portfolio: {
      eyebrow: "Radovi",
      title: "Naši radovi",
      filters: { all: "Sve", finished: "Gotovi proizvodi", designer: "Dizajnerski", custom: "Po mjeri" },
      open: "Otvori sliku",
      prev: "Prethodna",
      next: "Sljedeća",
    },
    process: {
      eyebrow: "Kako radimo",
      title: "Od prvog razgovora do ugradnje",
      steps: [
        { title: "Razgovor", text: "Upoznajemo prostor, potrebe i budžet." },
        { title: "Projekat", text: "Skica, 3D prikaz i izbor materijala." },
        { title: "Izrada", text: "Proizvodnja u našoj radionici uz kontrolu kvaliteta." },
        { title: "Ugradnja", text: "Isporuka i montaža bez iznenađenja." },
      ],
    },
    about: {
      eyebrow: "O nama",
      title: "Porodična radionica sa tradicijom.",
      text: "Maličević Enterijeri je radionica posvećena izradi namještaja i enterijera. Spajamo zanatsko iskustvo i savremeni dizajn kako bi svaki komad bio funkcionalan, trajan i lijep.",
      stats: [
        { value: "20+", label: "godina iskustva" },
        { value: "500+", label: "realizovanih projekata" },
        { value: "100%", label: "sopstvena proizvodnja" },
      ],
    },
    contact: {
      eyebrow: "Kontakt",
      title: "Razgovarajmo o vašem prostoru.",
      text: "Pozovite nas ili pišite na Viber, WhatsApp i društvenim mrežama. Radimo za klijente u BiH i širom Evrope.",
      call: "Pozovite",
      whatsapp: "WhatsApp",
      viber: "Viber",
      email: "E-pošta",
      visit: "Posjetite nas",
      hours: "Radno vrijeme",
      map: "Otvori mapu",
    },
    footer: { rights: "Sva prava zadržana.", credit: "Website by", linkedin: "LinkedIn profil" },
  },
  en: {
    htmlLang: "en",
    hreflang: "en",
    ogLocale: "en_GB",
    metaTitle: "Maličević Enterijeri | Furniture & custom interiors",
    metaDescription:
      "Furniture and interiors from our workshop in Republika Srpska, Bosnia and Herzegovina: ready-made, designer and bespoke pieces for clients across Europe.",
    skip: "Skip to content",
    nav: { home: "Home", portfolio: "Portfolio", services: "Services", about: "About", contact: "Contact" },
    menu: "Menu",
    close: "Close",
    cta: "Get in touch",
    hero: {
      line1: "Furniture and interiors",
      line2: "made for you.",
      sub: "Ready-made products, designer pieces and bespoke furniture. We are with you from the first idea to installation.",
      scroll: "See our work",
    },
    statement:
      "Every space has its own rhythm. We build furniture that follows it, from measurements and materials to the last detail.",
    offer: {
      eyebrow: "Services",
      title: "Three ways to get furniture from our workshop",
      items: [
        { title: "Ready-made products", text: "Proven models from our own production, ready to ship, in a range of materials and finishes." },
        { title: "Designer pieces", text: "Signature furniture in limited series. Pieces with character, made from selected materials." },
        { title: "Made to measure", text: "Kitchens, wardrobes and interiors designed for your space and built to your wishes." },
      ],
    },
    materials: { label: "Materials", items: ["Solid wood", "Veneer", "Lacquer", "Stone", "Metal", "Glass"] },
    featured: { eyebrow: "Featured", title: "Selected projects", view: "View" },
    video: {
      eyebrow: "Workshop",
      title: "From sketch to installation, all under one roof.",
    },
    portfolio: {
      eyebrow: "Portfolio",
      title: "Our work",
      filters: { all: "All", finished: "Ready-made", designer: "Designer", custom: "Custom" },
      open: "Open image",
      prev: "Previous",
      next: "Next",
    },
    process: {
      eyebrow: "How we work",
      title: "From first conversation to installation",
      steps: [
        { title: "Talk", text: "We learn about your space, needs and budget." },
        { title: "Design", text: "Sketch, 3D visual and material selection." },
        { title: "Build", text: "Made in our workshop with quality control." },
        { title: "Install", text: "Delivery and fitting without surprises." },
      ],
    },
    about: {
      eyebrow: "About",
      title: "A family workshop with a tradition.",
      text: "Maličević Enterijeri is a workshop dedicated to furniture and interiors. We combine craft experience with contemporary design so every piece is functional, durable and beautiful.",
      stats: [
        { value: "20+", label: "years of experience" },
        { value: "500+", label: "completed projects" },
        { value: "100%", label: "own production" },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's talk about your space.",
      text: "Call us or message us on Viber, WhatsApp or social media. We work with clients in Bosnia and Herzegovina and across Europe.",
      call: "Call",
      whatsapp: "WhatsApp",
      viber: "Viber",
      email: "Email",
      visit: "Visit us",
      hours: "Opening hours",
      map: "Open map",
    },
    footer: { rights: "All rights reserved.", credit: "Website by", linkedin: "LinkedIn profile" },
  },
} as const;

export type UI = (typeof ui)[Lang];
export const getUI = (lang: Lang): UI => ui[lang];
export const otherLang = (lang: Lang): Lang => (lang === "sr" ? "en" : "sr");
export const homePath = (lang: Lang) => (lang === defaultLang ? "/" : `/${lang}/`);
