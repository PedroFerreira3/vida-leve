import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, HeartPulse, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HeroBanner } from "../components/home/HeroBanner";
import { ProductCard } from "../components/product/ProductCard";
import { Seo } from "../components/Seo";
import { SectionHeader } from "../components/ui/SectionHeader";
import { categories, type Category } from "../data/categories";
import { company } from "../data/company";
import { featuredProducts, type Product } from "../data/products";
import { getAssetPath } from "../utils/assets";

const highlights = [
  {
    title: "Curadoria natural",
    description: "Produtos escolhidos para apoiar objetivos reais de cuidado.",
    icon: Sparkles,
  },
  {
    title: "Compra direta",
    description: "Atendimento rapido pelo WhatsApp, sem carrinho ou cadastro.",
    icon: CheckCircle2,
  },
  {
    title: "Rotina leve",
    description: "Categorias organizadas por necessidades do dia a dia.",
    icon: HeartPulse,
  },
  {
    title: "Orientação clara",
    description: "Informacoes objetivas para facilitar sua escolha.",
    icon: ShieldCheck,
  },
];

const homeCategoryOrder = [
  "sono",
  "dores-articulares",
  "vida-sexual",
  "emagrecimento",
  "beleza",
  "imunidade",
  "pele-cabelos",
];

const homeCategories = homeCategoryOrder.flatMap((categoryId) => {
  const category = categories.find((item) => item.id === categoryId);
  return category ? [category] : [];
});

function CategoryCarousel({ items }: { items: Category[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [hasCarouselOverflow, setHasCarouselOverflow] = useState(false);

  useEffect(() => {
    const carouselElement = carouselRef.current;

    if (!carouselElement) {
      return;
    }

    function updateCarouselControls() {
      const currentCarousel = carouselRef.current;

      if (!currentCarousel) {
        return;
      }

      const scrollTolerance = 2;
      setHasCarouselOverflow(currentCarousel.scrollWidth > currentCarousel.clientWidth + scrollTolerance);
      setCanScrollLeft(currentCarousel.scrollLeft > scrollTolerance);
      setCanScrollRight(
        currentCarousel.scrollLeft + currentCarousel.clientWidth < currentCarousel.scrollWidth - scrollTolerance,
      );
    }

    updateCarouselControls();
    const animationFrameId = window.requestAnimationFrame(updateCarouselControls);
    let resizeObserver: ResizeObserver | undefined;

    carouselElement.addEventListener("scroll", updateCarouselControls, { passive: true });
    window.addEventListener("resize", updateCarouselControls);

    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(updateCarouselControls);
      resizeObserver.observe(carouselElement);
    }

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      carouselElement.removeEventListener("scroll", updateCarouselControls);
      window.removeEventListener("resize", updateCarouselControls);
      resizeObserver?.disconnect();
    };
  }, [items.length]);

  function scrollCarousel(direction: "left" | "right") {
    const carousel = carouselRef.current;

    if (!carousel || !hasCarouselOverflow) {
      return;
    }

    if (direction === "left" && !canScrollLeft) {
      carousel.scrollTo({
        behavior: "smooth",
        left: carousel.scrollWidth - carousel.clientWidth,
      });
      return;
    }

    if (direction === "right" && !canScrollRight) {
      carousel.scrollTo({
        behavior: "smooth",
        left: 0,
      });
      return;
    }

    carousel.scrollBy({
      behavior: "smooth",
      left: direction === "left" ? -carousel.clientWidth * 0.82 : carousel.clientWidth * 0.82,
    });
  }

  return (
    <div className="relative mt-9">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#fffdf8] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#fffdf8] to-transparent" />

      <button
        className="absolute left-0 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-leaf-100 bg-white/95 text-leaf-900 shadow-md backdrop-blur transition-colors duration-300 hover:bg-leaf-50 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-white/95 sm:-left-5"
        type="button"
        aria-label="Ver categorias anteriores"
        disabled={!hasCarouselOverflow}
        onClick={() => scrollCarousel("left")}
      >
        <ChevronLeft aria-hidden="true" size={25} />
      </button>

      <div
        ref={carouselRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-10 pb-6 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-6"
      >
        {items.map((category) => (
          <Link
            key={category.id}
            className="group relative min-w-[230px] snap-center overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-leaf-100 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl hover:ring-leaf-200 sm:min-w-[280px] lg:min-w-[320px]"
            to={`/produtos?categoria=${category.id}`}
            aria-label={`Ver produtos da categoria ${category.name}`}
          >
            <span className="block aspect-square overflow-hidden rounded-2xl">
              <img
                className="h-full w-full rounded-2xl object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                src={getAssetPath(category.cardImage)}
                alt=""
                loading="lazy"
              />
            </span>
            <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-leaf-900/80 via-leaf-900/25 to-transparent px-5 pb-4 pt-14 text-sm font-bold text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              Explorar categoria
              <ArrowRight
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
                size={17}
              />
            </span>
          </Link>
        ))}
      </div>

      <button
        className="absolute right-0 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-leaf-100 bg-white/95 text-leaf-900 shadow-md backdrop-blur transition-colors duration-300 hover:bg-leaf-50 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-white/95 sm:-right-5"
        type="button"
        aria-label="Ver próximas categorias"
        disabled={!hasCarouselOverflow}
        onClick={() => scrollCarousel("right")}
      >
        <ChevronRight aria-hidden="true" size={25} />
      </button>
    </div>
  );
}

function FeaturedProductsCarousel({ products }: { products: Product[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [hasCarouselOverflow, setHasCarouselOverflow] = useState(false);

  useEffect(() => {
    const carouselElement = carouselRef.current;

    if (!carouselElement) {
      return;
    }

    function updateCarouselControls() {
      const currentCarousel = carouselRef.current;

      if (!currentCarousel) {
        return;
      }

      const scrollTolerance = 2;
      setHasCarouselOverflow(currentCarousel.scrollWidth > currentCarousel.clientWidth + scrollTolerance);
      setCanScrollLeft(currentCarousel.scrollLeft > scrollTolerance);
      setCanScrollRight(
        currentCarousel.scrollLeft + currentCarousel.clientWidth < currentCarousel.scrollWidth - scrollTolerance,
      );
    }

    updateCarouselControls();
    const animationFrameId = window.requestAnimationFrame(updateCarouselControls);
    let resizeObserver: ResizeObserver | undefined;

    carouselElement.addEventListener("scroll", updateCarouselControls, { passive: true });
    window.addEventListener("resize", updateCarouselControls);

    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(updateCarouselControls);
      resizeObserver.observe(carouselElement);
    }

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      carouselElement.removeEventListener("scroll", updateCarouselControls);
      window.removeEventListener("resize", updateCarouselControls);
      resizeObserver?.disconnect();
    };
  }, [products.length]);

  function scrollCarousel(direction: "left" | "right") {
    const carousel = carouselRef.current;

    if (!carousel || !hasCarouselOverflow) {
      return;
    }

    if (direction === "left" && !canScrollLeft) {
      carousel.scrollTo({
        behavior: "smooth",
        left: carousel.scrollWidth - carousel.clientWidth,
      });
      return;
    }

    if (direction === "right" && !canScrollRight) {
      carousel.scrollTo({
        behavior: "smooth",
        left: 0,
      });
      return;
    }

    carousel.scrollBy({
      behavior: "smooth",
      left: direction === "left" ? -carousel.clientWidth * 0.86 : carousel.clientWidth * 0.86,
    });
  }

  return (
    <div className="relative mt-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#fffdf8] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#fffdf8] to-transparent" />

      <button
        className="absolute left-0 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-leaf-100 bg-white/95 text-leaf-900 shadow-md backdrop-blur transition-colors duration-300 hover:bg-leaf-50 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-white/95 sm:-left-5"
        type="button"
        aria-label="Ver produtos em destaque anteriores"
        disabled={!hasCarouselOverflow}
        onClick={() => scrollCarousel("left")}
      >
        <ChevronLeft aria-hidden="true" size={25} />
      </button>

      <div
        ref={carouselRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-10 pb-6 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-6"
      >
        {products.map((product) => (
          <div key={product.id} className="min-w-[280px] max-w-[340px] snap-center sm:min-w-[320px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <button
        className="absolute right-0 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-leaf-100 bg-white/95 text-leaf-900 shadow-md backdrop-blur transition-colors duration-300 hover:bg-leaf-50 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-white/95 sm:-right-5"
        type="button"
        aria-label="Ver próximos produtos em destaque"
        disabled={!hasCarouselOverflow}
        onClick={() => scrollCarousel("right")}
      >
        <ChevronRight aria-hidden="true" size={25} />
      </button>
    </div>
  );
}

export function HomePage() {
  return (
    <main>
      <Seo
        title="Vida Leve"
        description="Produtos naturais e suplementos selecionados para uma rotina de bem-estar simples e acolhedora."
      />
      <HeroBanner />

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Cuidado por objetivo"
            title="Encontre produtos pelo que você quer cuidar"
            description="As categorias ajudam a navegar por necessidades comuns da rotina, da imunidade ao sono."
          />
          <CategoryCarousel items={homeCategories} />
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              eyebrow="Destaques"
              title="Produtos em destaque"
              description="Uma seleção inicial para conhecer a linha Vida Leve."
            />
            <Link
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-leaf-200 px-5 py-3 text-sm font-bold text-leaf-900 transition-colors hover:bg-leaf-50"
              to="/produtos"
            >
              Ver todos
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
          <FeaturedProductsCarousel products={featuredProducts} />
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeader eyebrow="Vida Leve" title={company.tagline} description={company.about} />
            <Link
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-leaf-700 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-leaf-800"
              to="/sobre"
            >
              Conhecer a empresa
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="rounded-lg border border-leaf-100 bg-white p-5 shadow-sm">
                  <span className="flex size-11 items-center justify-center rounded-lg bg-leaf-100 text-leaf-700">
                    <Icon aria-hidden="true" size={22} />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-leaf-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-leaf-800/75">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
