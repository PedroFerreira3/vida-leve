import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Leaf,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductCard } from "../components/product/ProductCard";
import { Seo } from "../components/Seo";
import { SectionHeader } from "../components/ui/SectionHeader";
import { WhatsAppButton } from "../components/ui/WhatsAppButton";
import { getCategoryById, type Category } from "../data/categories";
import { getProductBySlug, getProductDisplayName, getRelatedProducts, type Product } from "../data/products";
import { getAssetPath } from "../utils/assets";
import { NotFoundPage } from "./NotFoundPage";

function formatPrice(priceCents: number) {
  return new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
  }).format(priceCents / 100);
}

function getFormatLabel(format: Product["format"]) {
  const labels: Record<Product["format"], string> = {
    capsulas: "Cápsulas",
    gotas: "Gotas",
    po: "Pó",
  };

  return labels[format];
}

function getFormatDescription(format: Product["format"]) {
  const descriptions: Record<Product["format"], string> = {
    capsulas: "Formato prático",
    gotas: "Fácil de dosar",
    po: "Fácil de misturar",
  };

  return descriptions[format];
}

function getRoutineDescription(format: Product["format"]) {
  const descriptions: Record<Product["format"], string> = {
    capsulas: "Fácil de ingerir",
    gotas: "Prático na rotina",
    po: "Combina com bebidas",
  };

  return descriptions[format];
}

function getKitLabel(kitUnits?: number) {
  return kitUnits ? `Kit c/ ${kitUnits} unidades` : "Quantidade por unidade";
}

function ProductDetailsSummary({ categories, product }: { categories: Category[]; product: Product }) {
  const productDisplayName = getProductDisplayName(product);
  const productHighlights: Array<{ description: string; isPrice?: boolean; title: string }> = [
    {
      description: getFormatDescription(product.format),
      title: getFormatLabel(product.format),
    },
    {
      description: getKitLabel(product.kitUnits),
      title: product.quantityLabel,
    },
    {
      description: product.originalPriceCents ? `De ${formatPrice(product.originalPriceCents)}` : "Valor do produto",
      isPrice: true,
      title: formatPrice(product.priceCents),
    },
    {
      description: getRoutineDescription(product.format),
      title: "Uso diário",
    },
  ];

  return (
    <div className="h-full rounded-2xl border border-leaf-100 bg-white px-6 py-7 shadow-sm sm:px-8 lg:px-10">
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-bold uppercase tracking-[0.14em] text-leaf-600">
        {categories.map((category) => (
          <Link key={category.id} className="transition-colors hover:text-leaf-900" to={`/produtos?categoria=${category.id}`}>
            {category.name}
          </Link>
        ))}
      </div>

      <h1 className="mt-4 font-display text-4xl leading-tight text-leaf-900 sm:text-5xl">{productDisplayName}</h1>
      <p className="mt-3 max-w-2xl text-lg font-semibold leading-8 text-leaf-800">{product.shortDescription}</p>
      <p className="mt-5 max-w-2xl text-sm leading-7 text-leaf-800/75">{product.description}</p>

      <ul className="mt-7 grid gap-3">
        {product.benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-3 text-sm font-semibold leading-6 text-leaf-800">
            <CheckCircle2 className="mt-0.5 shrink-0 fill-leaf-600 text-white" aria-hidden="true" size={18} />
            {benefit}
          </li>
        ))}
      </ul>

      <div className="mt-8 grid overflow-hidden rounded-xl border border-leaf-100 bg-leaf-50/70 sm:grid-cols-2 xl:grid-cols-4">
        {productHighlights.map(({ description, isPrice, title }) => (
          <div key={title} className="border-b border-leaf-100 px-4 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
            <div>
              <strong className={["block font-bold text-leaf-900", isPrice ? "text-2xl leading-none" : "text-sm"].join(" ")}>
                {title}
              </strong>
              <span
                className={[
                  "mt-1 block text-xs leading-5",
                  isPrice && product.originalPriceCents ? "font-semibold text-leaf-800/55 line-through" : "text-leaf-800/65",
                ].join(" ")}
              >
                {description}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <WhatsAppButton className="sm:min-w-64" message={product.whatsappMessage} />
        <Link
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-leaf-200 bg-leaf-50 px-5 py-3 text-sm font-bold text-leaf-900 transition-colors hover:bg-leaf-100"
          to="/sobre"
        >
          <Leaf aria-hidden="true" size={18} />
          Conhecer a Vida Leve
        </Link>
      </div>

      <p className="mt-5 text-xs leading-5 text-leaf-800/65">
        A compra deste produto é finalizada com o atendimento de um representante que vai te orientar sobre o melhor uso
        para o seu objetivo.
      </p>
    </div>
  );
}

function ProductImageGallery({ product }: { product: Product }) {
  const productDisplayName = getProductDisplayName(product);
  const galleryImages = useMemo(
    () =>
      [
        {
          alt: productDisplayName,
          label: "Produto",
          src: getAssetPath(product.image),
        },
        product.nutritionImage
          ? {
              alt: `Tabela nutricional do produto ${productDisplayName}`,
              label: "Tabela nutricional",
              src: getAssetPath(product.nutritionImage),
            }
          : undefined,
      ].filter((image): image is { alt: string; label: string; src: string } => image !== undefined),
    [product.image, product.nutritionImage, productDisplayName],
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loadedImageSources, setLoadedImageSources] = useState<Set<string>>(() => new Set());
  const activeImage = galleryImages[activeImageIndex];
  const isActiveImageLoaded = loadedImageSources.has(activeImage.src);

  useEffect(() => {
    setActiveImageIndex(0);
    setLoadedImageSources(new Set());
  }, [product.id]);

  function showPreviousImage() {
    setActiveImageIndex((currentIndex) => (currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1));
  }

  function showNextImage() {
    setActiveImageIndex((currentIndex) => (currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1));
  }

  useEffect(() => {
    if (galleryImages.length <= 1) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      const activeElement = document.activeElement;
      const isTyping =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement instanceof HTMLSelectElement ||
        activeElement?.getAttribute("contenteditable") === "true";

      if (isTyping) {
        return;
      }

      if (event.key === "ArrowLeft") {
        setActiveImageIndex((currentIndex) => (currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1));
      }

      if (event.key === "ArrowRight") {
        setActiveImageIndex((currentIndex) => (currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1));
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [galleryImages.length]);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-leaf-100 bg-white p-4 shadow-sm">
      <div className="relative min-h-[360px] flex-1 overflow-hidden rounded-xl bg-white sm:min-h-[420px]">
        <img
          className={[
            "absolute inset-0 h-full w-full rounded-xl object-contain transition-opacity duration-200",
            isActiveImageLoaded ? "opacity-100" : "opacity-35",
          ].join(" ")}
          src={activeImage.src}
          alt={activeImage.alt}
          onLoad={() => {
            setLoadedImageSources((currentSources) => {
              const nextSources = new Set(currentSources);
              nextSources.add(activeImage.src);
              return nextSources;
            });
          }}
        />

        {!isActiveImageLoaded ? (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70 backdrop-blur-[1px]">
            <span className="rounded-full border border-leaf-100 bg-white px-4 py-2 text-xs font-bold text-leaf-700 shadow-sm">
              Carregando imagem...
            </span>
          </div>
        ) : null}

        {galleryImages.length > 1 ? (
          <>
            <button
              className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-leaf-900 shadow-sm transition-colors hover:bg-leaf-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white/90"
              type="button"
              aria-label="Imagem anterior"
              onClick={showPreviousImage}
            >
              <ChevronLeft aria-hidden="true" size={22} />
            </button>
            <button
              className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-leaf-900 shadow-sm transition-colors hover:bg-leaf-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white/90"
              type="button"
              aria-label="Próxima imagem"
              onClick={showNextImage}
            >
              <ChevronRight aria-hidden="true" size={22} />
            </button>
          </>
        ) : null}
      </div>

      <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
        {galleryImages.map((image, index) => (
          <button
            key={image.label}
            className={[
              "relative size-20 shrink-0 overflow-hidden rounded-xl border bg-white p-1 transition-colors sm:size-24",
              activeImageIndex === index
                ? "border-leaf-700 ring-2 ring-leaf-100"
                : "border-leaf-100 hover:border-leaf-300 hover:bg-leaf-50",
            ].join(" ")}
            type="button"
            aria-label={`Mostrar ${image.label}`}
            aria-current={activeImageIndex === index ? "true" : undefined}
            onClick={() => setActiveImageIndex(index)}
          >
            <img className="h-full w-full rounded-lg object-contain" src={image.src} alt="" aria-hidden="true" />
            <span className="sr-only">{image.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

type ProductInfoTabId = "descricao" | "beneficios" | "como-usar" | "composicao";

function ProductInformationCard({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState<ProductInfoTabId>("descricao");
  const usageInstructions =
    product.usageInstructions && product.usageInstructions.length > 0
      ? product.usageInstructions
      : [product.usage ?? "Consumir conforme orientação profissional ou recomendação do rótulo."];
  const compositionSections = product.compositionSections ?? [];
  const compositionGridColumnsClass =
    compositionSections.length <= 1
      ? "sm:grid-cols-1"
      : compositionSections.length === 2
        ? "sm:grid-cols-2"
        : compositionSections.length === 3
          ? "sm:grid-cols-3"
          : "sm:grid-cols-4";
  const tabs: Array<{ id: ProductInfoTabId; label: string }> = [
    { id: "descricao", label: "Descrição" },
    { id: "beneficios", label: "Benefícios" },
    { id: "como-usar", label: "Como usar" },
    { id: "composicao", label: "Composição" },
  ];

  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-leaf-100 bg-white shadow-sm">
      <div className="grid grid-cols-2 border-b border-leaf-100 px-3 sm:flex sm:overflow-x-auto sm:px-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={[
              "relative min-h-12 px-2 text-sm font-bold transition-colors sm:min-h-14 sm:shrink-0 sm:px-4",
              activeTab === tab.id ? "text-leaf-800" : "text-leaf-800/60 hover:text-leaf-900",
            ].join(" ")}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {activeTab === tab.id ? (
              <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-leaf-600 sm:inset-x-4" />
            ) : null}
          </button>
        ))}
      </div>

      <div className="p-5 sm:p-7">
        {activeTab === "descricao" ? (
          <div className="rounded-xl border border-leaf-100 bg-leaf-50/40 p-5">
            <h2 className="text-base font-bold text-leaf-900">Descrição</h2>
            <p className="mt-4 text-sm leading-7 text-leaf-800/75">{product.description}</p>
            <p className="mt-4 text-sm leading-7 text-leaf-800/75">{product.shortDescription}</p>
          </div>
        ) : null}

        {activeTab === "beneficios" ? (
          <div className="rounded-xl border border-leaf-100 bg-leaf-50/40 p-5">
            <h2 className="text-base font-bold text-leaf-900">Principais benefícios</h2>
            <ul className="mt-4 grid gap-3">
              {product.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-sm leading-6 text-leaf-800/80">
                  <CheckCircle2 className="mt-0.5 shrink-0 fill-leaf-600 text-white" aria-hidden="true" size={18} />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {activeTab === "como-usar" ? (
          <div className="rounded-xl border border-leaf-100 bg-leaf-50/40 p-5">
            <h2 className="text-base font-bold text-leaf-900">Como usar</h2>
            <ul className="mt-4 grid gap-3">
              {usageInstructions.map((instruction) => (
                <li key={instruction} className="flex items-start gap-3 text-sm leading-6 text-leaf-800/80">
                  <CheckCircle2 className="mt-0.5 shrink-0 fill-leaf-600 text-white" aria-hidden="true" size={18} />
                  {instruction}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {activeTab === "composicao" ? (
          <div className="rounded-xl border border-leaf-100 bg-leaf-50/40 p-5">
            <div className="flex items-center gap-2 text-leaf-900">
              <CircleHelp aria-hidden="true" size={19} />
              <h2 className="text-base font-bold">Composição</h2>
            </div>
            {compositionSections.length > 0 ? (
              <div className={["mt-4 grid grid-cols-1 gap-4", compositionGridColumnsClass].join(" ")}>
                {compositionSections.map((section) => (
                  <section key={section.title} className="h-full rounded-lg border border-leaf-100 bg-white/70 p-4">
                    <h3 className="text-sm font-bold text-leaf-900">{section.title}</h3>
                    <ul className="mt-3 grid gap-2">
                      {section.items.map((item) => (
                        <li key={item} className="text-sm leading-6 text-leaf-800/75">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            ) : (
              <>
                <p className="mt-4 text-sm leading-7 text-leaf-800/75">
                  A composição completa deste produto está disponível na tabela nutricional da embalagem. Você pode conferir
                  a imagem da tabela na galeria acima.
                </p>
                <p className="mt-3 text-sm leading-7 text-leaf-800/75">
                  Formato: <strong className="text-leaf-900">{getFormatLabel(product.format)}</strong>. Em caso de dúvidas
                  sobre ingredientes, restrições ou melhor uso, fale com um representante antes de finalizar a compra.
                </p>
              </>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function RelatedProductsCarousel({ products }: { products: Product[] }) {
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
      left: direction === "left" ? -carousel.clientWidth * 0.85 : carousel.clientWidth * 0.85,
    });
  }

  return (
    <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader title="Produtos relacionados" description="Outras opções próximas ao seu objetivo." />

        <div className="relative mt-8">
          <button
            className="absolute left-2 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-leaf-100 bg-white/95 text-leaf-900 shadow-md transition-colors hover:bg-leaf-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white/95 sm:-left-5"
            type="button"
            aria-label="Ver produtos relacionados anteriores"
            disabled={!hasCarouselOverflow}
            onClick={() => scrollCarousel("left")}
          >
            <ChevronLeft aria-hidden="true" size={22} />
          </button>

          <div
            ref={carouselRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 scroll-smooth"
          >
            {products.map((relatedProduct) => (
              <div key={relatedProduct.id} className="min-w-[280px] max-w-[340px] snap-start sm:min-w-[320px]">
                <ProductCard product={relatedProduct} />
              </div>
            ))}
          </div>

          <button
            className="absolute right-2 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-leaf-100 bg-white/95 text-leaf-900 shadow-md transition-colors hover:bg-leaf-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white/95 sm:-right-5"
            type="button"
            aria-label="Ver próximos produtos relacionados"
            disabled={!hasCarouselOverflow}
            onClick={() => scrollCarousel("right")}
          >
            <ChevronRight aria-hidden="true" size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}

export function ProductDetailPage() {
  const { slug } = useParams();
  const product = slug ? getProductBySlug(slug) : undefined;

  if (!product) {
    return <NotFoundPage />;
  }

  const relatedProducts = getRelatedProducts(product, 10);
  const productDisplayName = getProductDisplayName(product);
  const categories = product.categoryIds.flatMap((categoryId) => {
    const category = getCategoryById(categoryId);
    return category ? [category] : [];
  });

  return (
    <main>
      <Seo title={productDisplayName} description={product.shortDescription} image={product.image} />

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-leaf-200 px-4 py-2 text-sm font-bold text-leaf-900 transition-colors hover:bg-leaf-50"
            to="/produtos"
          >
            <ArrowLeft aria-hidden="true" size={17} />
            Voltar aos produtos
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
            <ProductImageGallery product={product} />

            <ProductDetailsSummary categories={categories} product={product} />
          </div>

          <ProductInformationCard product={product} />
        </div>
      </section>

      {relatedProducts.length > 0 ? <RelatedProductsCarousel products={relatedProducts} /> : null}
    </main>
  );
}
