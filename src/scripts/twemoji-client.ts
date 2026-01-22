const TWEMOJI_SRC =
  "https://cdn.jsdelivr.net/npm/@twemoji/api@latest/dist/twemoji.min.js";

declare global {
  interface Window {
    __twemojiInit?: boolean;
    twemoji?: {
      parse: (root: ParentNode, options?: { className?: string }) => void;
    };
  }
}

const ensureTwemoji = () =>
  new Promise<boolean>((resolve) => {
    if (typeof window.twemoji !== "undefined") return resolve(true);
    const existing = document.getElementById("twemoji-script") as
      | HTMLScriptElement
      | null;

    const script = existing || document.createElement("script");
    if (!existing) {
      script.id = "twemoji-script";
      script.src = TWEMOJI_SRC;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }

    const onLoad = () => resolve(true);
    const onError = () => resolve(false);

    script.addEventListener("load", onLoad, { once: true });
    script.addEventListener("error", onError, { once: true });
  });

const parseTwemoji = (root: ParentNode = document) => {
  if (typeof window.twemoji === "undefined") return;
  root.querySelectorAll(".twemoji").forEach((el) => {
    if (el.querySelector("img.twemoji-img")) return;
    window.twemoji?.parse(el, { className: "twemoji-img" });
  });
};

const run = (root: ParentNode = document) => {
  let tries = 0;
  const tick = () => {
    ensureTwemoji().then((ready) => {
      if (!ready) return;
      parseTwemoji(root);
      if (root.querySelector(".twemoji img.twemoji-img")) return;
      if (tries > 20) return;
      tries += 1;
      setTimeout(tick, 100);
    });
  };
  tick();
};

const observeTwemoji = () => {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node.classList.contains("twemoji") || node.querySelector(".twemoji")) {
          run(node);
        }
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
};

const init = () => {
  if (window.__twemojiInit) return;
  window.__twemojiInit = true;

  run(document);
  observeTwemoji();

  document.addEventListener("swup:contentReplaced", () => run(document));
  document.addEventListener("swup:pageView", () => run(document));
  document.addEventListener("astro:page-load", () => run(document));
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}

export {};
