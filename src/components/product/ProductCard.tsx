import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getCategoryById } from "../../data/categories";
import { getProductDisplayName, type Product } from "../../data/products";
import { getAssetPath } from "../../utils/assets";
import { WhatsAppButton } from "../ui/WhatsAppButton";

type ProductCardProps = {
  product: Product;
};

const formatLabels: Record<Product["format"], string> = {
  capsulas: "Cápsulas",
  gotas: "Gotas",
  po: "Pó",
};

function formatPrice(priceCents: number) {
  return new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
  }).format(priceCents / 100);
}

function getQuantityDescription(product: Product) {
  return product.kitUnits ? `${product.quantityLabel} por unidade` : product.quantityLabel;
}

export function ProductCard({ product }: ProductCardProps) {
  const productDisplayName = getProductDisplayName(product);
  const quantityDescription = getQuantityDescription(product);
  const categoryNames = product.categoryIds
    .map((categoryId) => getCategoryById(categoryId)?.name)
    .filter(Boolean)
    .slice(0, 2);

  return (
    <article className="relative flex h-full flex-col rounded-lg border border-leaf-100 bg-white p-5 shadow-sm transition hover:border-leaf-200 hover:shadow-md">
      <Link
        className="absolute inset-0 z-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-leaf-500 focus:ring-offset-2"
        to={`/produtos/${product.slug}`}
        aria-label={`Ver detalhes de ${productDisplayName}`}
      />

      <div className="flex flex-col gap-4">
        <div className="flex h-56 w-full items-center justify-center rounded-lg bg-white">
          <img
            className="size-48 rounded-lg object-contain"
            src={getAssetPath(product.image)}
            alt={productDisplayName}
            loading="lazy"
          />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-leaf-100 px-2 py-1 text-xs font-bold text-leaf-800">
              {formatLabels[product.format]}
            </span>
            {categoryNames.map((name) => (
              <span key={name} className="rounded-md bg-earth-50 px-2 py-1 text-xs font-bold text-leaf-700">
                {name}
              </span>
            ))}
          </div>
          <h3 className="mt-3 text-lg font-bold text-leaf-900">{productDisplayName}</h3>
          <p className="mt-1 text-sm font-semibold text-leaf-700">{quantityDescription}</p>
        </div>
      </div>

      <p className="mt-4 flex-1 text-sm leading-6 text-leaf-800/75">{product.shortDescription}</p>

      <div className="mt-5 border-t border-leaf-100 pt-4">
        <span className="block text-xs font-bold uppercase tracking-[0.14em] text-leaf-600">Preço</span>
        {product.originalPriceCents ? (
          <span className="mt-1 block text-sm font-semibold text-leaf-800/55 line-through">
            {formatPrice(product.originalPriceCents)}
          </span>
        ) : null}
        <strong className="block text-2xl font-bold text-leaf-900">{formatPrice(product.priceCents)}</strong>
      </div>

      <div className="relative z-20 mt-5 flex flex-col gap-3">
        <WhatsAppButton className="w-full" message={product.whatsappMessage} />
        <Link
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-leaf-200 px-4 py-2 text-sm font-bold text-leaf-900 transition-colors hover:bg-leaf-50"
          to={`/produtos/${product.slug}`}
        >
          Ver detalhes
          <ArrowRight aria-hidden="true" size={17} />
        </Link>
      </div>
    </article>
  );
}
