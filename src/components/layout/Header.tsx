import { Menu, Search, X } from "lucide-react";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { company } from "../../data/company";
import { activeProducts } from "../../data/products";
import { getAssetPath } from "../../utils/assets";
import { normalizeText } from "../../utils/text";
import { getWhatsAppUrl } from "../../utils/whatsapp";
import { MaskIcon } from "../ui/MaskIcon";

const navItems = [
  { label: "Início", href: "/" },
  { label: "Produtos", href: "/produtos" },
  { label: "Sobre Nós", href: "/sobre" },
  { label: "Ajuda", href: "/ajuda" },
];

function getNavClass({ isActive }: { isActive: boolean }) {
  return [
    "rounded-lg px-3 py-2 text-sm font-semibold transition-colors whitespace-nowrap",
    isActive ? "bg-leaf-100 text-leaf-800" : "text-leaf-900 hover:bg-leaf-50 hover:text-leaf-700",
  ].join(" ");
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchQuery = search.trim();

  const suggestedProducts = useMemo(() => {
    const query = normalizeText(searchQuery);

    if (!query) {
      return [];
    }

    return activeProducts
      .filter((product) =>
        normalizeText(`${product.name} ${product.shortDescription} ${product.description}`).includes(query),
      )
      .slice(0, 5);
  }, [searchQuery]);

  useEffect(() => {
    if (location.pathname === "/produtos") {
      setSearch(new URLSearchParams(location.search).get("busca") ?? "");
      return;
    }

    setSearch("");
  }, [location.pathname, location.search]);

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = search.trim();
    const params = new URLSearchParams();

    if (query) {
      params.set("busca", query);
    }

    navigate(params.toString() ? `/produtos?${params.toString()}` : "/produtos");
    setIsSearchOpen(false);
    setIsOpen(false);
  }

  function handleProductSelect(slug: string) {
    navigate(`/produtos/${slug}`);
    setSearch("");
    setIsSearchOpen(false);
    setIsOpen(false);
  }

  function renderSearchForm(inputId: string) {
    const shouldShowSuggestions = isSearchOpen && searchQuery.length > 0;

    return (
      <form className="relative w-full" onSubmit={handleSearchSubmit}>
        <label className="sr-only" htmlFor={inputId}>
          Pesquisar produtos
        </label>
        <input
          id={inputId}
          className="h-12 w-full rounded-[18px] border border-leaf-200 bg-[#fffdf8] pl-5 pr-12 text-sm text-leaf-900 outline-none transition placeholder:text-leaf-900/75 focus:border-leaf-500 focus:ring-2 focus:ring-leaf-100"
          value={search}
          onBlur={() => {
            window.setTimeout(() => setIsSearchOpen(false), 120);
          }}
          onChange={(event) => {
            setSearch(event.target.value);
            setIsSearchOpen(true);
          }}
          onFocus={() => setIsSearchOpen(true)}
          placeholder="Pesquisar suplementos, medicamentos, categorias..."
          type="search"
          autoComplete="off"
        />
        <button
          className="absolute right-3 top-6 flex size-9 -translate-y-1/2 items-center justify-center rounded-lg text-leaf-900 transition-colors hover:bg-leaf-50"
          type="submit"
          aria-label="Pesquisar"
        >
          <Search aria-hidden="true" size={22} />
        </button>

        {shouldShowSuggestions ? (
          <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-lg border border-leaf-100 bg-white shadow-xl">
            {suggestedProducts.length > 0 ? (
              <div className="max-h-80 overflow-y-auto p-2">
                {suggestedProducts.map((product) => (
                  <button
                    key={product.id}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors hover:bg-leaf-50"
                    type="button"
                    onMouseDown={(event) => {
                      event.preventDefault();
                      handleProductSelect(product.slug);
                    }}
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-leaf-50">
                      <img className="size-9 object-contain" src={getAssetPath(product.image)} alt="" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-bold text-leaf-900">{product.name}</span>
                      <span className="mt-0.5 line-clamp-1 block text-xs text-leaf-800/70">
                        {product.shortDescription}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-4 py-5 text-sm text-leaf-800/75">Nenhum produto encontrado.</div>
            )}

            <button
              className="flex min-h-11 w-full items-center justify-center gap-2 border-t border-leaf-100 px-4 py-2 text-sm font-bold text-leaf-800 transition-colors hover:bg-leaf-50"
              type="submit"
            >
              <Search aria-hidden="true" size={17} />
              Ver todos os resultados
            </button>
          </div>
        ) : null}
      </form>
    );
  }

  return (
    <header className="sticky top-0 z-40 border-b border-leaf-100 bg-[#fffdf8]/95 backdrop-blur">
      <div className="mx-auto flex min-h-[84px] max-w-[1440px] items-center gap-6 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex shrink-0 items-center"
          aria-label="Voltar para o início"
          onClick={() => setIsOpen(false)}
        >
          <img className="h-16 w-auto" src={getAssetPath("/images/vida-leve-logo.png")} alt="Vida Leve" />
        </Link>

        <div className="hidden min-w-64 flex-1 max-w-[500px] lg:block">{renderSearchForm("site-search")}</div>

        <nav className="ml-auto hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
          {navItems.map((item) => (
            <NavLink key={item.href} to={item.href} className={getNavClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <a
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-leaf-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-leaf-800 focus:outline-none focus:ring-2 focus:ring-leaf-500 focus:ring-offset-2"
            href={getWhatsAppUrl(company.whatsappMessage)}
            target="_blank"
            rel="noreferrer"
          >
            <MaskIcon className="size-[18px]" src="/whatsapp-icon.svg" />
            Falar com representante
          </a>
        </div>

        <button
          className="ml-auto inline-flex size-11 items-center justify-center rounded-lg border border-leaf-200 text-leaf-900 lg:hidden"
          type="button"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-leaf-100 bg-[#fffdf8] px-4 py-4 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2" aria-label="Navegação mobile">
            <div className="mb-3">{renderSearchForm("site-search-mobile")}</div>
            {navItems.map((item) => (
              <NavLink key={item.href} to={item.href} className={getNavClass} onClick={() => setIsOpen(false)}>
                {item.label}
              </NavLink>
            ))}
            <a
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-leaf-700 px-4 py-3 text-sm font-bold text-white"
              href={getWhatsAppUrl(company.whatsappMessage)}
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
            >
              <MaskIcon className="size-[18px]" src="/whatsapp-icon.svg" />
              Falar com representante
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
