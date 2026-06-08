import {
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ListFilter,
  Package,
  Search,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductGrid } from "../components/product/ProductGrid";
import { Seo } from "../components/Seo";
import { MaskIcon } from "../components/ui/MaskIcon";
import { allProductsCategory, categories, getCategoryById } from "../data/categories";
import { getProductsByCategory } from "../data/products";
import { getAssetPath } from "../utils/assets";
import { normalizeText } from "../utils/text";

type SortOption = "mais-vendidos" | "az" | "za" | "menor-preco" | "maior-preco";

const sortOptions: Array<{ label: string; value: SortOption }> = [
  { label: "Mais vendidos", value: "mais-vendidos" },
  { label: "A-Z", value: "az" },
  { label: "Z-A", value: "za" },
  { label: "Menor preço", value: "menor-preco" },
  { label: "Maior preço", value: "maior-preco" },
];

const productsPerPage = 12;

const formatOptions = [
  { id: "capsulas", label: "Cápsulas" },
  { id: "gotas", label: "Gotas" },
  { id: "po", label: "Pó" },
];

const sidebarCategoryOrder = [
  "dores-articulares",
  "vida-sexual",
  "emagrecimento",
  "imunidade",
  "pele-cabelos",
  "sono",
  "beleza",
];

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedCategory = searchParams.get("categoria") ?? allProductsCategory.id;
  const searchFromUrl = searchParams.get("busca") ?? "";
  const [search, setSearch] = useState(searchFromUrl);
  const [sortOption, setSortOption] = useState<SortOption>("mais-vendidos");
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const shouldScrollResultsRef = useRef(false);
  const resultsTopRef = useRef<HTMLDivElement>(null);
  const selectedCategory = getCategoryById(requestedCategory) ? requestedCategory : allProductsCategory.id;
  const selectedCategoryData = getCategoryById(selectedCategory);
  const sidebarCategories = sidebarCategoryOrder
    .map((categoryId) => categories.find((category) => category.id === categoryId))
    .filter((category) => category !== undefined);

  useEffect(() => {
    setSearch(searchFromUrl);
  }, [searchFromUrl]);

  const products = useMemo(() => {
    const baseProducts = getProductsByCategory(selectedCategory);
    const query = normalizeText(search);

    const filteredProducts = baseProducts
      .filter((product) => {
        if (!query) {
          return true;
        }

        return normalizeText(`${product.name} ${product.shortDescription} ${product.description}`).includes(query);
      })
      .filter((product) => {
        if (selectedFormats.length === 0) {
          return true;
        }

        return selectedFormats.includes(product.format);
      });

    return [...filteredProducts].sort((firstProduct, secondProduct) => {
      if (sortOption === "az") {
        return firstProduct.name.localeCompare(secondProduct.name, "pt-BR");
      }

      if (sortOption === "za") {
        return secondProduct.name.localeCompare(firstProduct.name, "pt-BR");
      }

      if (sortOption === "menor-preco") {
        return firstProduct.priceCents - secondProduct.priceCents || firstProduct.sortOrder - secondProduct.sortOrder;
      }

      if (sortOption === "maior-preco") {
        return secondProduct.priceCents - firstProduct.priceCents || firstProduct.sortOrder - secondProduct.sortOrder;
      }

      return firstProduct.salesRank - secondProduct.salesRank || firstProduct.sortOrder - secondProduct.sortOrder;
    });
  }, [search, selectedCategory, selectedFormats, sortOption]);

  const totalPages = Math.max(1, Math.ceil(products.length / productsPerPage));
  const paginatedProducts = products.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);
  const firstProductIndex = products.length > 0 ? (currentPage - 1) * productsPerPage + 1 : 0;
  const lastProductIndex = Math.min(currentPage * productsPerPage, products.length);
  const bannerImage = selectedCategoryData?.bannerImage ?? allProductsCategory.bannerImage;

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, selectedFormats, sortOption]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (!shouldScrollResultsRef.current) {
      return;
    }

    shouldScrollResultsRef.current = false;
    setIsTransitioning(true);

    window.setTimeout(() => {
      resultsTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);

    const timeoutId = window.setTimeout(() => {
      setIsTransitioning(false);
    }, 320);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [currentPage, selectedCategory]);

  function handleCategoryChange(categoryId: string) {
    shouldScrollResultsRef.current = true;
    const nextParams = new URLSearchParams(searchParams);

    if (categoryId === allProductsCategory.id) {
      nextParams.delete("categoria");
      setSearchParams(nextParams);
      setIsMobileFiltersOpen(false);
      return;
    }

    nextParams.set("categoria", categoryId);
    setSearchParams(nextParams);
    setIsMobileFiltersOpen(false);
  }

  function handlePageChange(page: number) {
    shouldScrollResultsRef.current = true;
    setCurrentPage(Math.min(totalPages, Math.max(1, page)));
  }

  function toggleFilter(value: string, selectedValues: string[], setSelectedValues: (values: string[]) => void) {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((selectedValue) => selectedValue !== value));
      return;
    }

    setSelectedValues([...selectedValues, value]);
  }

  return (
    <main>
      <Seo
        title="Produtos"
        description="Veja os produtos ativos da Vida Leve e compre diretamente pelo WhatsApp."
        image={bannerImage}
      />

      <section className="bg-leaf-50">
        <div className="w-full">
          <img
            className="h-auto w-full object-contain sm:h-[clamp(160px,21.875vw,420px)] sm:object-cover sm:object-center"
            src={getAssetPath(bannerImage)}
            alt=""
          />
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
            <div className="min-w-0">
              <button
                className="flex min-h-12 w-full items-center justify-between gap-3 rounded-lg border border-leaf-100 bg-white px-4 py-3 text-left text-sm font-bold text-leaf-900 shadow-sm transition-colors hover:bg-leaf-50 lg:hidden"
                type="button"
                aria-expanded={isMobileFiltersOpen}
                aria-controls="products-filters"
                onClick={() => setIsMobileFiltersOpen((value) => !value)}
              >
                <span className="inline-flex items-center gap-2">
                  <ListFilter aria-hidden="true" size={18} />
                  Categorias e formato
                </span>
                <ChevronDown
                  className={[
                    "shrink-0 transition-transform",
                    isMobileFiltersOpen ? "rotate-180" : "rotate-0",
                  ].join(" ")}
                  aria-hidden="true"
                  size={19}
                />
              </button>

              <aside
                id="products-filters"
                className={[
                  "h-fit rounded-lg border border-leaf-100 bg-white p-5 shadow-sm",
                  isMobileFiltersOpen ? "mt-3 block" : "hidden",
                  "lg:sticky lg:top-28 lg:mt-0 lg:block",
                ].join(" ")}
              >
                <div>
                  <h2 className="font-display text-2xl font-bold text-leaf-700">Categorias</h2>
                  <div className="mt-4 grid gap-2">
                    <button
                      className={[
                        "flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-bold transition-colors",
                        selectedCategory === allProductsCategory.id
                          ? "bg-leaf-100 text-leaf-800"
                          : "text-leaf-900/70 hover:bg-leaf-50 hover:text-leaf-800",
                      ].join(" ")}
                      type="button"
                      onClick={() => handleCategoryChange(allProductsCategory.id)}
                    >
                      <Package aria-hidden="true" size={20} />
                      Todos os produtos
                    </button>

                    {sidebarCategories.map((category) => {
                      return (
                        <button
                          key={category.id}
                          className={[
                            "flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-bold transition-colors",
                            selectedCategory === category.id
                              ? "bg-leaf-100 text-leaf-800"
                              : "text-leaf-900/70 hover:bg-leaf-50 hover:text-leaf-800",
                          ].join(" ")}
                          type="button"
                          onClick={() => handleCategoryChange(category.id)}
                        >
                          <MaskIcon className="size-5" src={category.icon} />
                          {category.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8">
                  <h2 className="font-display text-2xl font-bold text-leaf-700">Formato</h2>
                  <div className="mt-4 grid gap-3">
                    {formatOptions.map((format) => (
                      <label
                        key={format.id}
                        className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-leaf-900/70"
                      >
                        <input
                          className="size-5 accent-leaf-700"
                          checked={selectedFormats.includes(format.id)}
                          type="checkbox"
                          onChange={() => toggleFilter(format.id, selectedFormats, setSelectedFormats)}
                        />
                        {format.label}
                      </label>
                    ))}
                  </div>
                </div>
              </aside>
            </div>

            <div className="min-w-0 scroll-mt-28" ref={resultsTopRef}>
              <div className="flex flex-col gap-3 rounded-lg border border-leaf-100 bg-white p-4 shadow-sm md:flex-row">
                <label className="relative block w-full md:flex-1">
                  <span className="sr-only">Buscar produto</span>
                  <Search
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-leaf-500"
                    aria-hidden="true"
                    size={20}
                  />
                  <input
                    className="h-12 w-full rounded-lg border border-leaf-200 bg-[#fffdf8] pl-12 pr-4 text-sm text-leaf-900 outline-none transition focus:border-leaf-500 focus:ring-2 focus:ring-leaf-100"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Buscar produto"
                    type="search"
                  />
                </label>

                <label className="relative block w-full md:max-w-64">
                  <span className="sr-only">Ordenar produtos</span>
                  <ArrowUpDown
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-leaf-500"
                    aria-hidden="true"
                    size={18}
                  />
                  <select
                    className="h-12 w-full appearance-none rounded-lg border border-leaf-200 bg-[#fffdf8] pl-11 pr-9 text-sm font-bold text-leaf-800 outline-none transition focus:border-leaf-500 focus:ring-2 focus:ring-leaf-100"
                    value={sortOption}
                    onChange={(event) => setSortOption(event.target.value as SortOption)}
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-leaf-500"
                    aria-hidden="true"
                    size={18}
                  />
                </label>
              </div>

              <div className="mt-4 text-sm font-semibold text-leaf-800/75">
                {products.length > 0
                  ? `Mostrando ${firstProductIndex}-${lastProductIndex} de ${products.length} ${
                      products.length === 1 ? "produto" : "produtos"
                    }`
                  : "0 produtos encontrados"}
              </div>

              <div className="relative mt-5">
                {isTransitioning ? (
                  <div className="pointer-events-none absolute inset-x-0 top-4 z-20 flex justify-center">
                    <span className="rounded-full border border-leaf-100 bg-white px-4 py-2 text-xs font-bold text-leaf-700 shadow-sm">
                      Atualizando produtos...
                    </span>
                  </div>
                ) : null}

                <div
                  className={[
                    "transition-opacity duration-300 ease-out",
                    isTransitioning ? "opacity-35" : "opacity-100",
                  ].join(" ")}
                >
                  {products.length > 0 ? (
                    <ProductGrid products={paginatedProducts} />
                  ) : (
                    <div className="rounded-lg border border-leaf-100 bg-white px-6 py-12 text-center">
                      <h2 className="text-xl font-bold text-leaf-900">Nenhum produto encontrado</h2>
                      <p className="mt-2 text-sm text-leaf-800/75">Tente buscar por outro termo ou mudar o filtro.</p>
                    </div>
                  )}
                </div>
              </div>

              {totalPages > 1 ? (
                <nav className="mt-8 flex flex-col items-center justify-between gap-4 rounded-lg border border-leaf-100 bg-white p-4 shadow-sm sm:flex-row" aria-label="Paginação de produtos">
                  <button
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-leaf-200 px-4 py-2 text-sm font-bold text-leaf-900 transition-colors hover:bg-leaf-50 disabled:opacity-45"
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    <ChevronLeft aria-hidden="true" size={18} />
                    Anterior
                  </button>

                  <div className="flex flex-wrap justify-center gap-2">
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                      <button
                        key={page}
                        className={[
                          "flex size-10 items-center justify-center rounded-lg text-sm font-bold transition-colors",
                          currentPage === page
                            ? "bg-leaf-700 text-white"
                            : "border border-leaf-200 text-leaf-900 hover:bg-leaf-50",
                        ].join(" ")}
                        type="button"
                        aria-current={currentPage === page ? "page" : undefined}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-leaf-200 px-4 py-2 text-sm font-bold text-leaf-900 transition-colors hover:bg-leaf-50 disabled:opacity-45"
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Próxima
                    <ChevronRight aria-hidden="true" size={18} />
                  </button>
                </nav>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
