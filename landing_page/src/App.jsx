import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logoImage from "../images/logo.webp";
import storyCraftImage from "../images/handcraft1.webp";
import storyLegacyImage from "../images/neck1.webp";
import storyPackagingImage from "../images/packaging.png";
import introVideo from "../videos/f1.mp4";
import heroVideo from "../videos/l1.mp4";
import packagingVideo from "../videos/pack.mp4";
import sectionTwoMangalsutraVideo from "../videos/sec2m.mp4";
import sectionTwoVideo from "../videos/sec2n.mp4";
import sectionTwoWatchVideo from "../videos/sec2n1.mp4";
import sectionTwoNecklaceVideo from "../videos/sec2n22.mp4";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Collections", href: "#collections" },
  { label: "Our Story", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const categories = [
  {
    id: "mangalsutra",
    title: "Mangalsutra",
    subtitle: "Timeless Tradition",
    video: sectionTwoMangalsutraVideo,
    description:
      "Elegant black-bead styling with a handcrafted centerpiece, designed for modern brides, festive dressing, and everyday heirloom wear.",
  },
  {
    id: "watches",
    title: "Watches",
    subtitle: "Crafted Precision",
    video: sectionTwoWatchVideo,
    description:
      "Jewelry-inspired timepieces finished with festive shine, refined bracelet forms, and luxury detailing that feel as precious as fine accessories.",
  },
  {
    id: "necklaces",
    title: "Necklaces",
    subtitle: "Luminous Layers",
    video: sectionTwoNecklaceVideo,
    description:
      "Statement silhouettes with rich stone placement, graceful curves, and a couture finish made for bridal and occasion dressing.",
  },
  {
    id: "chokers",
    title: "Chokers",
    subtitle: "Regal Statement",
    video: sectionTwoVideo,
    description:
      "Close-neck artistry with regal structure, couture polish, and a bold festive presence that frames the neckline beautifully.",
  },
];

const storyPages = [
  {
    chapter: "Page 1",
    title: "How Roshni Began",
    image: storyCraftImage,
    lines: [
      "Roshni Creations started from a small family workshop where each design was sketched by hand and crafted with patience.",
      "What began as a passion for meaningful jewelry slowly became a promise: every piece should carry warmth, elegance, and emotion.",
    ],
  },
  {
    chapter: "Page 2",
    title: "Crafted With Intention",
    image: storyLegacyImage,
    lines: [
      "Every collection is built with attention to detail, from stone setting and finish quality to how the product is presented in hand.",
      "We blend tradition with modern style so each design feels timeless, wearable, and deeply personal for every occasion.",
    ],
  },
  {
    chapter: "Page 3",
    title: "A Story You Continue",
    image: storyPackagingImage,
    lines: [
      "For us, trust is not a tagline. It is built through consistency, transparent quality, and the joy our customers feel when they open every box.",
      "Roshni Creations is not only our story. With every order, it becomes yours too.",
    ],
  },
];

const footerBeads = [
  { left: "8%", top: "22%", size: 14 },
  { left: "18%", top: "22%", size: 16 },
  { left: "29%", top: "22%", size: 13 },
  { left: "41%", top: "22%", size: 15 },
  { left: "54%", top: "22%", size: 14 },
  { left: "67%", top: "22%", size: 16 },
  { left: "80%", top: "22%", size: 14 },
  { left: "92%", top: "22%", size: 12 },
];

const sectionThemes = {
  home: "linear-gradient(135deg,#2a0613 0%,#5b1d33 46%,#f2dfce 100%)",
  collections: "linear-gradient(145deg,#3a0c1b 0%,#6d2740 42%,#efd9c2 100%)",
  packaging: "linear-gradient(160deg,#290610 0%,#4e1a2d 48%,#f1ddc9 100%)",
  about: "linear-gradient(135deg,#f2dfce 0%,#e7c8ab 42%,#6a1d33 100%)",
  contact: "linear-gradient(145deg,#320916 0%,#5a1d33 45%,#e9cfb2 100%)",
  footer: "linear-gradient(140deg,#22050d 0%,#4c1630 42%,#d9b892 100%)",
};

function CategoryCard({ category, active, onClick, cardRef, shouldPreload }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) {
      return;
    }

    if (active) {
      const playPromise = videoElement.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
      return;
    }

    videoElement.pause();
  }, [active]);

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={onClick}
      className={`group relative shrink-0 snap-center overflow-hidden rounded-[2rem] border text-left transition-all duration-500 ease-out ${
        active
          ? "w-[84vw] max-w-[460px] scale-100 opacity-100 border-gold-300/40 shadow-[0_34px_90px_rgba(13,3,8,0.3)]"
          : "w-[74vw] max-w-[390px] scale-[0.85] opacity-60 border-white/10 shadow-[0_20px_56px_rgba(13,3,8,0.18)]"
      }`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(145deg,#34111c_0%,#5c2437_40%,#f2dfce_120%)]" />
      <div className="card-texture absolute inset-0 opacity-25" />
      <div
        className={`absolute -inset-10 rounded-[3rem] bg-[radial-gradient(circle,rgba(255,243,227,0.38)_0%,rgba(255,243,227,0.08)_42%,transparent_72%)] blur-2xl transition-opacity duration-500 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="card-shimmer pointer-events-none absolute inset-y-0 -left-1/3 w-1/2 -skew-x-12 bg-[linear-gradient(90deg,transparent,rgba(255,223,176,0.3),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,8,12,0.04)_0%,rgba(22,8,12,0.18)_46%,rgba(22,8,12,0.74)_100%)]" />

      <div className="relative flex h-[560px] flex-col justify-between p-8 sm:h-[620px] sm:p-9">
        <div className="flex justify-end">
          <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.32em] text-cream-50/70">
            Roshni
          </span>
        </div>

        <div className="relative mx-auto flex h-[350px] w-full items-center justify-center overflow-hidden rounded-[1.6rem] sm:h-[400px]">
          <video
            ref={videoRef}
            src={category.video}
            className={`h-full w-full object-cover drop-shadow-[0_20px_40px_rgba(0,0,0,0.28)] transition duration-700 group-hover:scale-105 ${
              active ? "translate-y-0" : "translate-y-3"
            }`}
            autoPlay={active}
            muted
            loop={active}
            playsInline
            preload={active || shouldPreload ? "auto" : "none"}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,8,12,0.02)_0%,rgba(22,8,12,0.12)_44%,rgba(22,8,12,0.36)_100%)]" />
        </div>

        <div className="collection-copy translate-y-0 transition duration-500 group-hover:-translate-y-1">
          <p className="text-base font-bold uppercase tracking-[0.24em] text-[#e8d7c1] sm:text-lg">
            {category.subtitle}
          </p>
          <h3 className="mt-3 font-display text-6xl font-bold text-[#fff3e3] sm:text-7xl">
            {category.title}
          </h3>
          <p
            className={`mt-5 max-w-[28rem] text-lg font-bold leading-9 text-[#f6ead8] transition-all duration-500 sm:text-[1.22rem] ${
              active ? "max-h-40 opacity-100" : "max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100"
            } overflow-hidden`}
          >
            {category.description}
          </p>
        </div>
      </div>
    </button>
  );
}

function App() {
  const introRef = useRef(null);
  const introLayerRef = useRef(null);
  const mistRef = useRef(null);
  const mistLayersRef = useRef([]);
  const heroVideoRef = useRef(null);
  const packagingVideoRef = useRef(null);
  const carouselRef = useRef(null);
  const collectionsSectionRef = useRef(null);
  const sectionTitleRef = useRef(null);
  const collectionsTopRef = useRef(null);
  const packagingRef = useRef(null);
  const storyBookRef = useRef(null);
  const storyPageRefs = useRef([]);
  const footerRef = useRef(null);
  const footerBeadRefs = useRef([]);
  const cardsRef = useRef([]);
  const carouselRafRef = useRef(null);
  const [transitionComplete, setTransitionComplete] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [storyPage, setStoryPage] = useState(0);
  const [collectionsNearViewport, setCollectionsNearViewport] = useState(false);
  const [packagingNearViewport, setPackagingNearViewport] = useState(false);
  const [activeTheme, setActiveTheme] = useState("home");
  const [themeLayers, setThemeLayers] = useState(["home", "home"]);
  const [visibleThemeLayer, setVisibleThemeLayer] = useState(0);

  const totalSlides = categories.length;
  const activeCategory = useMemo(() => categories[activeIndex] ?? categories[0], [activeIndex]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = !transitionComplete || menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [transitionComplete, menuOpen]);

  useEffect(() => {
    if (heroVideoRef.current) {
      heroVideoRef.current.load();
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled((current) => {
        const next = window.scrollY > 24;
        return current === next ? current : next;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const collectionsSection = collectionsSectionRef.current;
    const packagingSection = packagingRef.current;

    if (!collectionsSection && !packagingSection) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === collectionsSection) {
            setCollectionsNearViewport(entry.isIntersecting);
          }
          if (entry.target === packagingSection) {
            setPackagingNearViewport(entry.isIntersecting);
          }
        });
      },
      { rootMargin: "420px 0px", threshold: 0.01 },
    );

    if (collectionsSection) {
      observer.observe(collectionsSection);
    }
    if (packagingSection) {
      observer.observe(packagingSection);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!packagingNearViewport || !packagingVideoRef.current) {
      return;
    }

    packagingVideoRef.current.load();
  }, [packagingNearViewport]);

  useEffect(() => {
    return () => {
      if (carouselRafRef.current) {
        window.cancelAnimationFrame(carouselRafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    mistLayersRef.current = mistLayersRef.current.filter(Boolean);

    const introVideoElement = introRef.current;
    const introLayer = introLayerRef.current;
    const mist = mistRef.current;
    const mistLayers = mistLayersRef.current;

    if (!introVideoElement || !introLayer || !mist || mistLayers.length === 0) {
      return undefined;
    }

    gsap.set(introLayer, { autoAlpha: 1 });
    gsap.set(mist, { autoAlpha: 0 });
    gsap.set(mistLayers, { autoAlpha: 0, scale: 0.92, filter: "blur(42px)" });

    const runTransition = () => {
      if (introVideoElement.dataset.completed === "true") {
        return;
      }

      introVideoElement.dataset.completed = "true";

      const timeline = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          gsap.set(introLayer, { display: "none", pointerEvents: "none" });
          setTransitionComplete(true);
        },
      });

      timeline
        .to(mist, { autoAlpha: 1, duration: 0.35 }, 0)
        .to(
          mistLayers[0],
          { autoAlpha: 0.95, scale: 1.28, filter: "blur(96px)", duration: 1.7 },
          0,
        )
        .to(
          mistLayers[1],
          { autoAlpha: 0.8, scale: 1.4, filter: "blur(120px)", duration: 1.95 },
          0.08,
        )
        .to(
          mistLayers[2],
          { autoAlpha: 0.65, scale: 1.52, filter: "blur(132px)", duration: 2.1 },
          0.12,
        )
        .to(introVideoElement, { autoAlpha: 0, duration: 0.95 }, 0.2)
        .to(introLayer, { autoAlpha: 0, duration: 1.15 }, 0.24)
        .to(
          mistLayers,
          { autoAlpha: 0.18, scale: 1.18, filter: "blur(72px)", duration: 1.3, stagger: 0.04 },
          1.15,
        )
        .to(mist, { autoAlpha: 0, duration: 1.15 }, 1.25);
    };

    const fallbackTimeout = window.setTimeout(runTransition, 10000);

    introVideoElement.addEventListener("ended", runTransition);

    return () => {
      window.clearTimeout(fallbackTimeout);
      introVideoElement.removeEventListener("ended", runTransition);
    };
  }, []);

  useEffect(() => {
    if (!transitionComplete || !heroVideoRef.current) {
      return undefined;
    }

    const zoomTween = gsap.fromTo(
      heroVideoRef.current,
      { scale: 1 },
      { scale: 1.05, duration: 12, ease: "none" },
    );

    return () => {
      zoomTween.kill();
    };
  }, [transitionComplete]);

  useEffect(() => {
    if (!sectionTitleRef.current || !carouselRef.current) {
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        [sectionTitleRef.current, carouselRef.current],
        { autoAlpha: 0, y: 48 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          stagger: 0.16,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#collections",
            start: "top 72%",
            end: "bottom 35%",
            toggleActions: "play reverse play reverse",
          },
        },
      );

      gsap.fromTo(
        ".collection-copy",
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#collections",
            start: "top 68%",
            end: "bottom 35%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
    });

    return () => {
      context.revert();
    };
  }, []);

  useEffect(() => {
    if (!packagingRef.current) {
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        ".packaging-copy, .packaging-media",
        { autoAlpha: 0, y: 42, scale: 0.98 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.95,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: packagingRef.current,
            start: "top 72%",
            end: "bottom 30%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
    }, packagingRef);

    return () => {
      context.revert();
    };
  }, []);

  useEffect(() => {
    if (!collectionsTopRef.current) {
      return undefined;
    }

    const wave = collectionsTopRef.current;
    const tween = gsap.to(wave, {
      yPercent: 10,
      xPercent: 2,
      duration: 5.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      tween.kill();
    };
  }, []);

  useEffect(() => {
    const activeCard = cardsRef.current[activeIndex];
    if (!activeCard) {
      return;
    }

    gsap.fromTo(
      activeCard,
      { y: 16 },
      { y: 0, duration: 0.55, ease: "power3.out", overwrite: "auto" },
    );
  }, [activeIndex]);

  useEffect(() => {
    if (!storyBookRef.current) {
      return undefined;
    }

    const pages = storyPageRefs.current.filter(Boolean);
    if (pages.length === 0) {
      return undefined;
    }

    pages.forEach((page, index) => {
      const pageOffset = storyPage - index;
      const isPast = index < storyPage;
      const isCurrent = index === storyPage;
      const depth = pages.length - Math.abs(index - storyPage);

      const target = isPast
        ? {
            x: -120 - pageOffset * 22,
            y: 8 + pageOffset * 1.5,
            rotateY: -162,
            rotateZ: -7,
            scale: 0.94,
            autoAlpha: 0.56,
            zIndex: depth,
          }
        : isCurrent
          ? {
              x: 0,
              y: 0,
              rotateY: 0,
              rotateZ: 0,
              scale: 1,
              autoAlpha: 1,
              zIndex: pages.length + 5,
            }
          : {
              x: (index - storyPage) * 18,
              y: (index - storyPage) * 2,
              rotateY: 0,
              rotateZ: 0,
              scale: 0.985,
              autoAlpha: 0.94,
              zIndex: depth,
            };

      gsap.to(page, {
        ...target,
        duration: 0.9,
        ease: "power3.inOut",
        transformOrigin: "left center",
      });
    });

    return undefined;
  }, [storyPage]);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.utils.toArray(".story-reveal, .contact-reveal, .footer-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
              end: "bottom 35%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      });
    });

    return () => {
      context.revert();
    };
  }, []);

  useEffect(() => {
    if (!footerRef.current) {
      return undefined;
    }

    const beads = footerBeadRefs.current.filter(Boolean);
    if (beads.length === 0) {
      return undefined;
    }

    beads.forEach((bead, index) => {
      gsap.to(bead, {
        y: index % 2 === 0 ? -4 : 5,
        duration: 2.8 + (index % 3) * 0.3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });

    return () => {
      beads.forEach((bead) => gsap.killTweensOf(bead));
    };
  }, []);

  useEffect(() => {
    const themedSections = gsap.utils.toArray("section[data-theme], footer[data-theme]");

    if (themedSections.length === 0) {
      return undefined;
    }

    const triggers = themedSections.map((section) => {
      const theme = section.getAttribute("data-theme");
      return ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          if (theme) {
            setActiveTheme(theme);
          }
        },
        onEnterBack: () => {
          if (theme) {
            setActiveTheme(theme);
          }
        },
      });
    });

    const currentSection = themedSections.find((section) => {
      const rect = section.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      return rect.top <= viewportCenter && rect.bottom >= viewportCenter;
    });

    if (currentSection) {
      const theme = currentSection.getAttribute("data-theme");
      if (theme) {
        setActiveTheme(theme);
      }
    }

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const currentVisibleTheme = themeLayers[visibleThemeLayer];
    if (activeTheme === currentVisibleTheme) {
      return;
    }

    const nextLayer = visibleThemeLayer === 0 ? 1 : 0;
    setThemeLayers((previous) => {
      const updated = [...previous];
      updated[nextLayer] = activeTheme;
      return updated;
    });
    setVisibleThemeLayer(nextLayer);
  }, [activeTheme, themeLayers, visibleThemeLayer]);

  const setMistLayerRef = (element, index) => {
    mistLayersRef.current[index] = element;
  };

  const scrollToIndex = (index) => {
    const container = carouselRef.current;
    const card = cardsRef.current[index];

    if (!container || !card) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const target =
      container.scrollLeft + (cardRect.left - containerRect.left) - (containerRect.width - cardRect.width) / 2;

    container.scrollTo({
      left: target,
      behavior: "smooth",
    });

    setActiveIndex(index);
  };

  const handleCarouselScroll = () => {
    if (carouselRafRef.current) {
      return;
    }

    const container = carouselRef.current;
    if (!container) {
      return;
    }

    carouselRafRef.current = window.requestAnimationFrame(() => {
      carouselRafRef.current = null;

      const containerCenter = container.scrollLeft + container.clientWidth / 2;
      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      cardsRef.current.forEach((card, index) => {
        if (!card) {
          return;
        }

        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(containerCenter - cardCenter);

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      setActiveIndex((current) => (current === nearestIndex ? current : nearestIndex));
    });
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const setStoryPageRef = (element, index) => {
    storyPageRefs.current[index] = element;
  };

  const setFooterBeadRef = (element, index) => {
    footerBeadRefs.current[index] = element;
  };

  const goToNextStoryPage = () => {
    setStoryPage((current) => Math.min(current + 1, storyPages.length - 1));
  };

  const goToPreviousStoryPage = () => {
    setStoryPage((current) => Math.max(current - 1, 0));
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden font-body text-cream-50">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            visibleThemeLayer === 0 ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: sectionThemes[themeLayers[0]] ?? sectionThemes.home }}
        />
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            visibleThemeLayer === 1 ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: sectionThemes[themeLayers[1]] ?? sectionThemes.home }}
        />
      </div>

      <div className="relative z-10">
      <header className="fixed inset-x-0 top-0 z-50">
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-cream-50 transition-all duration-500 sm:px-8 lg:px-12 ${
            isScrolled || menuOpen
              ? "bg-[rgba(25,11,15,0.72)] shadow-[0_14px_34px_rgba(8,3,5,0.18)] backdrop-blur-md"
              : "bg-[rgba(255,250,242,0.06)] shadow-[0_10px_26px_rgba(8,3,5,0.08)] backdrop-blur-[10px]"
          }`}
        >
          <a href="#home" className="flex items-center gap-3">
            <img
              src={logoImage}
              alt="Roshni Creations"
              className="h-9 w-9 object-contain sm:h-10 sm:w-10"
            />
            <span className="font-display text-xl tracking-[0.08em] text-cream-50 sm:text-2xl">
              Roshni Creations
            </span>
          </a>

          <div className="hidden items-center gap-12 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative font-display text-lg tracking-[0.07em] text-cream-50/92 transition-colors duration-300 hover:text-gold-300"
              >
                {link.label}
                <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-gold-300 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
            <a
              href="https://finaladmindashboard.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-gold-300 px-4 py-2 font-display text-sm tracking-[0.07em] text-gold-200 transition-colors duration-300 hover:bg-gold-300 hover:text-burgundy-950"
            >
              Admin
            </a>
            <a
              href="https://roshaniworkflowapp.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-gold-300 px-4 py-2 font-display text-sm tracking-[0.07em] text-burgundy-950 transition-colors duration-300 hover:bg-gold-200"
            >
              Try it now Yourself
            </a>
            <a
              href="https://roshni-frontend-5noi.onrender.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-cream-50/70 bg-cream-50 px-4 py-2 font-display text-sm tracking-[0.07em] text-burgundy-950 transition-colors duration-300 hover:bg-cream-100"
            >
              Get started
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center text-cream-50 lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className="relative h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-300 ${
                  menuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-px w-5 bg-current transition-opacity duration-300 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] h-px w-5 bg-current transition-transform duration-300 ${
                  menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </nav>

        <div
          className={`overflow-hidden border-t border-white/10 bg-[rgba(25,11,15,0.92)] backdrop-blur-md transition-[max-height,opacity] duration-300 lg:hidden ${
            menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col px-5 py-4 sm:px-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="border-b border-white/8 py-4 font-display text-lg tracking-[0.06em] text-cream-50/92 last:border-b-0 hover:text-gold-300"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://finaladmindashboard.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="mt-4 rounded-full border border-gold-300 px-4 py-3 text-center font-display tracking-[0.07em] text-gold-200 transition-colors duration-300 hover:bg-gold-300 hover:text-burgundy-950"
            >
              Admin
            </a>
            <a
              href="https://finalartryon.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="mt-3 rounded-full bg-gold-300 px-4 py-3 text-center font-display tracking-[0.07em] text-burgundy-950 transition-colors duration-300 hover:bg-gold-200"
            >
              Try it now Yourself
            </a>
            <a
              href="https://roshni-frontend-5noi.onrender.com/"
              target="_blank"
              rel="noreferrer"
              className="mt-3 rounded-full bg-cream-50 px-4 py-3 text-center font-display tracking-[0.07em] text-burgundy-950 transition-colors duration-300 hover:bg-cream-100"
            >
              Get started
            </a>
          </div>
        </div>
      </header>

      <section id="home" data-theme="home" className="relative h-screen">
        <video
          ref={heroVideoRef}
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />

        <div
          ref={introLayerRef}
          className="absolute inset-0 z-30 flex items-center justify-center bg-burgundy-950 will-change-opacity"
        >
          <video
            ref={introRef}
            className="h-full w-full object-cover will-change-opacity"
            src={introVideo}
            autoPlay
            muted
            playsInline
            preload="auto"
          />
        </div>

        <div
          ref={mistRef}
          className="pointer-events-none absolute inset-0 z-40 overflow-hidden"
          aria-hidden="true"
        >
          <div
            ref={(element) => setMistLayerRef(element, 0)}
            className="absolute left-1/2 top-1/2 h-[58vmax] w-[58vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mist-core mix-blend-screen will-change-transform"
          />
          <div
            ref={(element) => setMistLayerRef(element, 1)}
            className="absolute left-1/2 top-1/2 h-[76vmax] w-[76vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,246,234,0.55)_0%,rgba(244,225,198,0.34)_32%,rgba(98,68,58,0.1)_65%,transparent_78%)] mix-blend-screen will-change-transform"
          />
          <div
            ref={(element) => setMistLayerRef(element, 2)}
            className="absolute left-1/2 top-1/2 h-[96vmax] w-[96vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(249,237,224,0.38)_0%,rgba(196,162,138,0.18)_40%,transparent_74%)] mix-blend-screen will-change-transform"
          />
        </div>
      </section>

      <section
        id="collections"
        ref={collectionsSectionRef}
        data-theme="collections"
        className="relative overflow-hidden py-24"
      >
        <div
          ref={collectionsTopRef}
          className="pointer-events-none absolute inset-x-0 -top-20 z-10 h-40 collection-top-blend"
        />
        <div className="pointer-events-none absolute inset-0 card-texture opacity-20" />
        <div className="collection-separator pointer-events-none absolute inset-x-0 bottom-0 h-36" />
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div ref={sectionTitleRef} className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.36em] text-[#e8d7c1]">Section 2</p>
            <p className="script-heading mt-6 text-4xl text-[#d9bea0] sm:text-5xl">
              The Artistry Series
            </p>
            <h2 className="editorial-heading mt-4 text-6xl text-[#fff3e3] sm:text-7xl lg:text-[6.5rem]">
              Discover Our Signature
              <br />
              Categories
            </h2>
            <p className="mt-5 text-xl font-bold tracking-[0.08em] text-[#dcc2a2] sm:text-2xl">
              Handcrafted silhouettes in a warm beige luxury palette.
            </p>
            <p className="mt-5 text-base font-semibold leading-8 text-[#f6ead8]/92 sm:text-lg">
              A refined carousel designed to let every jewelry line breathe. Swipe or use the
              arrows to bring each collection into focus.
            </p>
          </div>

          <div className="mt-14 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d9bea0]">Active Category</p>
              <div className="mt-3 inline-flex items-center gap-3 rounded-full border border-[#d9bea0]/30 bg-[rgba(232,215,193,0.08)] px-5 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.14)] backdrop-blur-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-[#d9bea0] shadow-[0_0_16px_rgba(217,190,160,0.8)]" />
                <p className="font-display text-4xl font-bold text-[#fff3e3] sm:text-5xl">
                  {activeCategory.title}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollToIndex((activeIndex - 1 + totalSlides) % totalSlides)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-white/[0.05] text-xl text-cream-50 transition hover:border-gold-300/40 hover:text-gold-300"
                aria-label="Previous category"
              >
                {"<"}
              </button>
              <button
                type="button"
                onClick={() => scrollToIndex((activeIndex + 1) % totalSlides)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-white/[0.05] text-xl text-cream-50 transition hover:border-gold-300/40 hover:text-gold-300"
                aria-label="Next category"
              >
                {">"}
              </button>
            </div>
          </div>

          <div
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            className="mt-10 flex snap-x snap-mandatory gap-2 overflow-x-auto px-[10vw] pb-4 pt-4 scrollbar-none sm:px-[16vw] lg:px-[18vw]"
          >
            {categories.map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                active={index === activeIndex}
                shouldPreload={collectionsNearViewport && Math.abs(index - activeIndex) <= 1}
                onClick={() => scrollToIndex(index)}
                cardRef={(element) => {
                  cardsRef.current[index] = element;
                }}
              />
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            {categories.map((category, index) => (
              <button
                key={category.id}
                type="button"
                onClick={() => scrollToIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "w-9 bg-gold-300" : "w-2.5 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to ${category.title}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        ref={packagingRef}
        data-theme="packaging"
        className="relative overflow-hidden px-6 py-24 sm:px-8 lg:min-h-screen lg:px-12"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,190,160,0.12)_0%,transparent_30%),radial-gradient(circle_at_bottom_left,rgba(125,49,72,0.18)_0%,transparent_34%)]" />
        <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:min-h-screen lg:justify-center">
          <div className="packaging-copy mx-auto max-w-4xl text-center">
            <p className="script-heading text-4xl text-[#d9bea0] sm:text-5xl">
              The Final Impression
            </p>
            <h2 className="editorial-heading mt-5 text-5xl text-[#fff3e3] sm:text-6xl lg:text-[5.8rem]">
              Every Package Tells a Story of Quality and Trust
            </h2>
            <p className="mt-6 text-lg font-semibold leading-8 text-[#f6ead8]/90 sm:text-xl">
              Every package tells a story of quality and trust.
            </p>
            <p className="packaging-neon mt-5 text-2xl font-black uppercase tracking-[0.08em] sm:text-3xl lg:text-4xl">
              Wrapped with attention, delivered with affection.
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-base font-semibold leading-8 text-[#e8d7c1]/80 sm:text-lg">
              Roshni Creations packaging is designed to make each piece feel unforgettable before
              the box is even opened.
            </p>
          </div>

          <div className="packaging-media">
            <div className="overflow-hidden rounded-[2.4rem] border border-[#d9bea0]/16 bg-white/[0.04] p-3 shadow-[0_32px_90px_rgba(0,0,0,0.28)] backdrop-blur-sm sm:p-4">
              <div className="overflow-hidden rounded-[1.8rem]">
                <video
                  ref={packagingVideoRef}
                  src={packagingVideo}
                  className="h-[52vh] w-full object-cover sm:h-[58vh] lg:h-[68vh]"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload={packagingNearViewport ? "auto" : "none"}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        data-theme="about"
        className="px-6 py-24 sm:px-10 lg:px-12"
      >
        <div className="mx-auto max-w-6xl">
          <p className="story-reveal text-sm font-bold uppercase tracking-[0.32em] text-[#5b1225]">
            Section 4
          </p>
          <h2 className="story-reveal mt-4 font-display text-4xl text-[#4a0f1f] sm:text-5xl lg:text-6xl">
            Our Story of Brand
          </h2>
          <p className="story-reveal mt-4 max-w-3xl text-base font-semibold leading-8 text-[#5b1225]/90 sm:text-lg">
            Click next and flip through our brand story.
          </p>

          <div className="story-reveal mt-10">
            <div
              ref={storyBookRef}
              className="relative mx-auto h-[450px] w-full max-w-4xl [perspective:2200px] sm:h-[500px]"
            >
              <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-[radial-gradient(circle_at_center,rgba(122,34,58,0.18)_0%,rgba(122,34,58,0.04)_48%,transparent_80%)] blur-2xl" />

              {storyPages.map((page, index) => (
                <article
                  key={page.chapter}
                  ref={(element) => setStoryPageRef(element, index)}
                  className="absolute inset-0 origin-left overflow-hidden rounded-[1.6rem] border border-[#7a223a]/25 bg-[linear-gradient(155deg,#fff6ec_0%,#f4e1ca_46%,#efd7ba_100%)] p-6 shadow-[0_26px_60px_rgba(71,18,34,0.24)] sm:p-8"
                >
                  <div className="absolute inset-y-0 left-0 w-4 bg-[linear-gradient(180deg,rgba(122,34,58,0.25)_0%,rgba(122,34,58,0.06)_100%)]" />
                  <p className="pl-4 text-xs font-extrabold uppercase tracking-[0.28em] text-[#4a0f1f]">
                    {page.chapter}
                  </p>
                  <h3 className="pl-4 pt-3 font-display text-3xl font-extrabold text-[#3d0b18] sm:text-4xl">
                    {page.title}
                  </h3>
                  <div className="mt-6 flex flex-col gap-5 pl-4 sm:flex-row sm:items-start">
                    <div className="w-full overflow-hidden rounded-xl border border-[#7a223a]/25 bg-white/70 shadow-[0_12px_28px_rgba(83,21,38,0.18)] sm:w-[160px]">
                      <img
                        src={page.image}
                        alt={page.title}
                        className="h-40 w-full object-cover sm:h-44"
                      />
                    </div>
                    <div className="flex-1 space-y-5">
                      {page.lines.map((line) => (
                        <p key={line} className="text-base font-bold leading-8 text-[#3d0b18] sm:text-lg">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={goToPreviousStoryPage}
                className="rounded-full border border-[#7a223a]/40 bg-white/45 px-5 py-2 text-sm font-bold uppercase tracking-[0.16em] text-[#5b1225] transition hover:bg-white/70 disabled:cursor-not-allowed disabled:opacity-45"
                disabled={storyPage === 0}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={goToNextStoryPage}
                className="rounded-full border border-[#7a223a]/40 bg-[#7a223a] px-5 py-2 text-sm font-bold uppercase tracking-[0.16em] text-[#fdf5ea] transition hover:bg-[#5b1225] disabled:cursor-not-allowed disabled:opacity-45"
                disabled={storyPage === storyPages.length - 1}
              >
                Next Page
              </button>
              <p className="w-full text-center text-xs font-bold uppercase tracking-[0.2em] text-[#5b1225]/70">
                Page {storyPage + 1} of {storyPages.length}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" data-theme="contact" className="px-6 py-24 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-6xl" />
      </section>

      <footer
        ref={footerRef}
        data-theme="footer"
        className="relative overflow-hidden px-6 pb-12 pt-16 sm:px-10 lg:px-12"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,226,192,0.12)_0%,transparent_30%),radial-gradient(circle_at_80%_70%,rgba(103,27,49,0.28)_0%,transparent_36%)]" />
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[1.7rem] border border-[#f2d9bc]/30 bg-[linear-gradient(150deg,rgba(44,9,21,0.88)_0%,rgba(82,24,44,0.82)_48%,rgba(232,199,162,0.2)_100%)] px-6 py-8 shadow-[0_20px_60px_rgba(22,5,11,0.4)] backdrop-blur-md sm:px-8">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 border-b border-[#f2d9bc]/18">
              {footerBeads.map((bead, index) => (
                <span
                  key={`${bead.left}-${bead.top}-${bead.size}`}
                  ref={(element) => setFooterBeadRef(element, index)}
                  className="absolute rounded-full border border-[#f8ddbd]/50 bg-[radial-gradient(circle_at_28%_30%,#fff7ef_0%,#efd0a8_56%,#c08662_100%)]"
                  style={{
                    left: bead.left,
                    top: bead.top,
                    width: `${bead.size}px`,
                    height: `${bead.size}px`,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="footer-reveal text-xs font-bold uppercase tracking-[0.3em] text-[#f2d9bc]">
                  Roshni Creations
                </p>
                <p className="footer-reveal mt-3 max-w-xs text-sm font-semibold leading-7 text-[#f7e7d4]/90">
                  Handcrafted jewelry and gifting experiences designed with timeless elegance and trust.
                </p>
              </div>

              <div>
                <p className="footer-reveal text-xs font-bold uppercase tracking-[0.3em] text-[#f2d9bc]">
                  Quick Links
                </p>
                <div className="footer-reveal mt-3 flex flex-col gap-2 text-sm font-semibold text-[#f7e7d4]/90">
                  <a href="#home" className="hover:text-white">Home</a>
                  <a href="#collections" className="hover:text-white">Collections</a>
                  <a href="#about" className="hover:text-white">Our Story</a>
                  <a href="#contact" className="hover:text-white">Contact</a>
                </div>
              </div>

              <div>
                <p className="footer-reveal text-xs font-bold uppercase tracking-[0.3em] text-[#f2d9bc]">
                  Contact
                </p>
                <div className="footer-reveal mt-3 flex flex-col gap-2 text-sm font-semibold text-[#f7e7d4]/90">
                  <p>+91 98765 43210</p>
                  <p>hello@roshnicreations.com</p>
                  <p>Panipat, Haryana</p>
                </div>
              </div>

              <div>
                <p className="footer-reveal text-xs font-bold uppercase tracking-[0.3em] text-[#f2d9bc]">
                  Follow
                </p>
                <div className="footer-reveal mt-3 flex flex-col gap-2 text-sm font-semibold text-[#f7e7d4]/90">
                  <a href="#" className="hover:text-white">Instagram</a>
                  <a href="#" className="hover:text-white">Facebook</a>
                  <a href="#" className="hover:text-white">Pinterest</a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-reveal mt-6 flex flex-wrap items-center justify-between gap-4 text-sm font-semibold text-[#f2d9bc]/88">
            <p>© 2026 Roshni Creations</p>
            <p>Handcrafted in India</p>
            <a href="#home" className="hover:text-white">Back to top</a>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}

export default App;
