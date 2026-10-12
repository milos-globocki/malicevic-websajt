// Tiny, dependency-free enhancements. The page works without any of this.

// 1. Close the mobile menu popover after choosing a link.
const menu = document.getElementById("menu");
menu?.addEventListener("click", (e) => {
  if ((e.target as Element).closest("a")) menu.hidePopover();
});

// 2. Looping video: load lazily, play only while visible, skip on reduced
//    motion or data-saver connections (the poster image stays instead).
const video = document.querySelector<HTMLVideoElement>("video[data-src]");
if (video) {
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
  const skip =
    matchMedia("(prefers-reduced-motion: reduce)").matches || nav.connection?.saveData === true;
  if (!skip) {
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
}

// 3. Lightbox for the portfolio grid.
const dialog = document.getElementById("lb") as HTMLDialogElement | null;
if (dialog) {
  const img = dialog.querySelector("img")!;
  const caption = dialog.querySelector("[data-lb-caption]")!;
  const items = () =>
    [...document.querySelectorAll<HTMLElement>("[data-lb]")].filter((el) => el.offsetParent !== null);
  let index = 0;

  const show = (i: number) => {
    const list = items();
    if (!list.length) return;
    index = (i + list.length) % list.length;
    const el = list[index]!;
    img.src = el.dataset.full!;
    img.alt = el.dataset.alt ?? "";
    caption.textContent = el.dataset.caption ?? "";
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
    if (e.target === dialog) dialog.close();
  });
  dialog.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });
  dialog.addEventListener("close", () => (img.src = ""));
}
