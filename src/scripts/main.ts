// Tiny, dependency-free enhancements. The page works without any of this.

// 0. Smooth scrolling for in-page links, switched on only once the page has loaded: the
//    jump to /#section on arrival from another page should land at once.
const smooth = () => requestAnimationFrame(() => (document.documentElement.dataset.smooth = ""));
if (document.readyState === "complete") smooth();
else addEventListener("load", smooth, { once: true });

// 1. Close the mobile menu popover after choosing a link on this page. A link to another
//    page leaves it open, so the page transition fades the menu itself into the next page
//    (a half closed menu would bleed over it). Coming Back to that page, it is closed at
//    once, before the page shows.
const menu = document.getElementById("menu");
menu?.addEventListener("click", (e) => {
  const link = (e.target as Element).closest("a");
  if (link && link.pathname === location.pathname) menu.hidePopover();
});
const closeMenuNow = () => {
  if (!menu?.matches(":popover-open")) return;
  menu.style.transition = "none";
  menu.hidePopover();
  requestAnimationFrame(() => menu.style.removeProperty("transition"));
};
addEventListener("pagereveal", closeMenuNow);
addEventListener("pageshow", (e) => {
  if (e.persisted) closeMenuNow();
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

// 2c. Project clips (Reel.astro): sources attached when a clip nears the screen, played
//     while it is on it. Skipped, the poster frame shows instead (.is-on reveals it).
//     A clip starts only once it has stayed in view a moment: a jump to a section further
//     down flies past the featured stack, and starting its clips on the way drops frames.
//     The poster is the clip's first frame, so the wait does not show.
for (const reel of document.querySelectorAll<HTMLVideoElement>("video[data-reel]")) {
  if (skip) {
    reel.classList.add("is-on");
    continue;
  }
  let loaded = false;
  let wait = 0;
  const start = () => {
    if (!loaded) {
      loaded = true;
      reel.replaceChildren(
        ...(JSON.parse(reel.dataset.reel!) as { src: string; type: string }[]).map((s) =>
          Object.assign(document.createElement("source"), s),
        ),
      );
      reel.preload = "auto";
      reel.load();
    }
    reel.play().catch(() => {});
  };
  reel.addEventListener("playing", () => reel.classList.add("is-on"), { once: true });
  new IntersectionObserver(([entry]) => {
    clearTimeout(wait);
    if (!entry?.isIntersecting) return reel.pause();
    wait = window.setTimeout(start, 400);
  }).observe(reel);
}

// 3. Lightbox for the photos on a project page.
const dialog = document.getElementById("lb") as HTMLDialogElement | null;
if (dialog) {
  const img = dialog.querySelector("img")!;
  const stage = dialog.querySelector("[data-lb-stage]")!;
  const count = dialog.querySelector("[data-lb-count]")!;
  const title = dialog.querySelector("[data-lb-title]");
  const note = dialog.querySelector("[data-lb-note]");
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
    if (title) title.textContent = el.dataset.title ?? "";
    if (note) note.textContent = el.dataset.note ?? "";
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

// 3b. The dive into the statement's full stop (Statement.astro): the motion is CSS on the
//     scroll; this tells it where the dot sits, measured again whenever the text reflows,
//     and finishes the move once the scroll stops half way. offsetLeft/Top give the layout
//     position, unmoved by the zoom.
const dive = document.querySelector<HTMLElement>("[data-dive]");
if (dive) {
  const pin = dive.firstElementChild as HTMLElement;
  const cam = pin.querySelector<HTMLElement>(".dive-cam")!;
  const text = pin.querySelector<HTMLElement>(".dive-text")!;
  const dot = pin.querySelector<HTMLElement>(".dive-dot")!;
  // Position within the pin, whichever ancestors the browser counts as offset parents.
  const at = (el: HTMLElement) => {
    let x = 0;
    let y = 0;
    for (let e: HTMLElement | null = el; e && e !== pin; e = e.offsetParent as HTMLElement | null) {
      x += e.offsetLeft;
      y += e.offsetTop;
    }
    return [x, y] as const;
  };
  const measure = () => {
    // The camera is the screen with the browser bars showing; the pin reaches on to the
    // bottom of the screen without them.
    const w = pin.clientWidth;
    const h = cam.clientHeight;
    const r = parseFloat(getComputedStyle(dot).width) / 2;
    const [dl, dt] = at(dot);
    const [tl, tt] = at(text);
    const x = dl + r;
    const y = dt + r;
    const R = Math.ceil(Math.hypot(w / 2, Math.max(h / 2, pin.clientHeight - h / 2))) + 2;
    const set = (k: string, v: number) => pin.style.setProperty(k, `${v}px`);
    set("--dx", x);
    set("--dy", y);
    set("--cy", h / 2);
    set("--tx", w / 2 - x);
    set("--ty", h / 2 - y);
    set("--ox", x - tl);
    set("--oy", y - tt);
    set("--R", R);
    pin.style.setProperty("--s0", String(r / R));
    dive.dataset.ready = "";
  };
  const ro = new ResizeObserver(measure);
  ro.observe(pin);
  ro.observe(cam);
  ro.observe(text);
  document.fonts.ready.then(measure);

  // The move from the full statement to the offer heading is never left half way: once
  // the scroll stops in between, it glides on to the end it was heading for, down to the
  // heading at its anchor position (#services, cards below) or back up to the statement.
  // Only a scroll that has come to rest is moved, so a fling or a trackpad's coast plays
  // out first. A touch, a key or a wheel turned the other way hands the scroll back.
  const services = document.getElementById("services");
  if (services && CSS.supports("animation-timeline: view()")) {
    const calm = matchMedia("(prefers-reduced-motion: reduce)");
    // Cover 103svh on the scene's timeline (global.css, "Dive"); the camera is 100svh.
    const ends = () => {
      const y = scrollY;
      return [
        dive.getBoundingClientRect().top + y - innerHeight + cam.clientHeight * 1.03,
        services.getBoundingClientRect().top + y - parseFloat(getComputedStyle(services).scrollMarginTop),
      ] as const;
    };
    let last = scrollY;
    let dir = 0;
    let touching = false;
    let glide = 0;
    let glideDir = 0;
    let rest = 0;
    // While gliding, the wheel turned the same way is held back rather than fought.
    const wheel = (e: WheelEvent) => {
      if (Math.sign(e.deltaY) === glideDir) e.preventDefault();
      else if (e.deltaY) stop();
    };
    const stop = () => {
      cancelAnimationFrame(glide);
      glide = 0;
      removeEventListener("wheel", wheel);
    };
    const settle = () => {
      if (glide || touching || !dir || calm.matches) return;
      const [from, to] = ends();
      const y = scrollY;
      if (y <= from + 1 || y >= to - 1) return;
      const target = dir > 0 ? to : from;
      const time = 250 + (850 * Math.abs(target - y)) / (to - from);
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min((now - start) / time, 1);
        const e = t < 0.5 ? 4 * t ** 3 : 1 - (2 - 2 * t) ** 3 / 2;
        scrollTo({ top: y + (target - y) * e, behavior: "instant" });
        if (t < 1) glide = requestAnimationFrame(step);
        else stop();
      };
      glideDir = dir;
      glide = requestAnimationFrame(step);
      addEventListener("wheel", wheel, { passive: false });
    };
    // At rest: the scroll has been still a moment (Safari has no scrollend yet), or a
    // finger has just let go without a fling.
    const later = () => {
      clearTimeout(rest);
      rest = window.setTimeout(settle, 150);
    };
    addEventListener(
      "scroll",
      () => {
        if (!glide && scrollY !== last) dir = Math.sign(scrollY - last);
        last = scrollY;
        later();
      },
      { passive: true },
    );
    addEventListener("scrollend", settle);
    addEventListener(
      "touchstart",
      () => {
        touching = true;
        stop();
      },
      { passive: true },
    );
    const lift = () => {
      touching = false;
      later();
    };
    addEventListener("touchend", lift, { passive: true });
    addEventListener("touchcancel", lift, { passive: true });
    addEventListener("keydown", stop);
  }
}

// 4. Page transitions: the crossfade itself is CSS (@view-transition). Here we pick the one
//    photo that should grow into the next page's hero, or shrink back into its card:
//    [data-vt] marks project photos, [data-vt-href] the project page each one opens and
//    [data-vt-self] the hero of the current project page. Only a pair that is on screen
//    gets a name, so the photo never flies in from off screen, and the names are dropped
//    once the transition ends.
type Transition = { finished: Promise<unknown> } | null | undefined;
const shown = (el: Element) => {
  const r = el.getBoundingClientRect();
  return r.width > 0 && r.bottom > 0 && r.top < innerHeight;
};
const ownHero = document.querySelector<HTMLElement>("[data-vt-self]");
const cardFor = (url?: string) => {
  if (!url) return undefined;
  const path = new URL(url).pathname;
  return [...document.querySelectorAll<HTMLElement>("[data-vt-href]")].find(
    (el) => el.dataset.vtHref === path && shown(el),
  );
};
const morph = (el: HTMLElement | null | undefined, vt: Transition) => {
  if (!el || !vt) return;
  el.style.setProperty("view-transition-name", `pj-${el.dataset.vt}`);
  vt.finished.finally(() => el.style.removeProperty("view-transition-name"));
};
addEventListener("pageswap", (e) => {
  const { viewTransition, activation } = e as Event & {
    viewTransition?: Transition;
    activation?: { entry?: { url?: string } } | null;
  };
  morph(cardFor(activation?.entry?.url) ?? (ownHero && shown(ownHero) ? ownHero : undefined), viewTransition);
});
// Arriving from another page of the site (with a transition): the crossfade is the
// entrance, so the home page skips its opening sequence (see [data-arrived] in the CSS).
// Only the first reveal counts; a page restored by Back keeps the state it was left in.
let revealed = false;
addEventListener("pagereveal", (e) => {
  const { viewTransition } = e as Event & { viewTransition?: Transition };
  if (viewTransition && !revealed) document.documentElement.dataset.arrived = "";
  revealed = true;
  const nav = (window as Window & { navigation?: { activation?: { from?: { url?: string } | null } } }).navigation;
  morph(ownHero ?? cardFor(nav?.activation?.from?.url), viewTransition);
});
