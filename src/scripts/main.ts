// Tiny, dependency-free enhancements. The page works without any of this.

// 1. Close the mobile menu popover after choosing a link.
const menu = document.getElementById("menu");
menu?.addEventListener("click", (e) => {
  if ((e.target as Element).closest("a")) menu.hidePopover();
});

// 2. Looping videos: play only while visible, skip on reduced motion or data-saver
//    connections (the poster image stays instead).
const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
const skip =
  matchMedia("(prefers-reduced-motion: reduce)").matches || nav.connection?.saveData === true;

// 2a. Hero background: starts at once, and the clip follows the screen shape (a tall one
//     on phones and portrait tablets, a wide one elsewhere), swapping if it is rotated.
const hero = document.querySelector<HTMLVideoElement>("video[data-hero]");
if (hero && !skip) {
  const tall = matchMedia("(orientation: portrait)");
  let shown = "";
  let visible = true;
  const play = () => {
    if (visible) hero.play().catch(() => {});
  };
  const pick = () => {
    const key = tall.matches ? "portrait" : "landscape";
    if (key === shown) return;
    shown = key;
    hero.classList.remove("is-playing");
    hero.replaceChildren(
      ...(JSON.parse(hero.dataset[key]!) as { src: string; type: string }[]).map((s) =>
        Object.assign(document.createElement("source"), s),
      ),
    );
    hero.load();
    play();
  };
  hero.addEventListener("playing", () => hero.classList.add("is-playing"));
  tall.addEventListener("change", pick);
  new IntersectionObserver(([entry]) => {
    visible = !!entry?.isIntersecting;
    if (visible) play();
    else hero.pause();
  }).observe(hero);
  pick();
}

// 2b. Video band: loaded when it comes near the viewport.
const video = document.querySelector<HTMLVideoElement>("video[data-src]");
if (video && !skip) {
  let loaded = false;
  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry) return;
      if (entry.isIntersecting) {
        if (!loaded) {
          loaded = true;
          for (const source of video.querySelectorAll<HTMLSourceElement>("source[data-src]")) {
            source.src = source.dataset.src!;
          }
          video.load();
        }
        video.play().then(() => video.classList.add("is-playing")).catch(() => {});
      } else {
        video.pause();
      }
    },
    { rootMargin: "200px 0px" },
  );
  io.observe(video);
}

// 3. Lightbox for the photos on a project page.
const dialog = document.getElementById("lb") as HTMLDialogElement | null;
if (dialog) {
  const img = dialog.querySelector("img")!;
  const stage = dialog.querySelector("[data-lb-stage]")!;
  const count = dialog.querySelector("[data-lb-count]")!;
  const title = dialog.querySelector("[data-lb-title]")!;
  const note = dialog.querySelector("[data-lb-note]")!;
  const pad = (n: number) => String(n).padStart(2, "0");
  img.addEventListener("load", () => img.classList.add("is-in"));
  const items = () =>
    [...document.querySelectorAll<HTMLElement>("[data-lb]")].filter((el) => el.offsetParent !== null);
  let index = 0;

  const show = (i: number) => {
    const list = items();
    if (!list.length) return;
    index = (i + list.length) % list.length;
    const el = list[index]!;
    img.classList.remove("is-in");
    img.src = el.dataset.full!;
    img.alt = el.dataset.alt ?? "";
    count.textContent = `${pad(index + 1)} / ${pad(list.length)}`;
    title.textContent = el.dataset.title ?? "";
    note.textContent = el.dataset.note ?? "";
  };

  document.addEventListener("click", (e) => {
    const trigger = (e.target as Element).closest<HTMLElement>("[data-lb]");
    if (trigger) {
      show(items().indexOf(trigger));
      dialog.showModal();
    }
  });
  dialog.querySelector("[data-lb-prev]")!.addEventListener("click", () => show(index - 1));
  dialog.querySelector("[data-lb-next]")!.addEventListener("click", () => show(index + 1));
  dialog.querySelector("[data-lb-close]")!.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog || e.target === stage) dialog.close();
  });
  dialog.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });
  // Drop the photo once the fade-out is over, unless the lightbox was reopened.
  dialog.addEventListener("close", () =>
    setTimeout(() => {
      if (!dialog.open) img.removeAttribute("src");
    }, 500),
  );
}
