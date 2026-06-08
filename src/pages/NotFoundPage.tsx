import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";

export function NotFoundPage() {
  return (
    <main className="px-4 py-20 sm:px-6 lg:px-8">
      <Seo title="Página não encontrada" description="A página solicitada não foi encontrada na Vida Leve." />
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-leaf-600">404</p>
        <h1 className="mt-3 font-display text-4xl text-leaf-900 sm:text-5xl">Página não encontrada</h1>
        <p className="mt-5 text-base leading-7 text-leaf-800/80">
          O endereço acessado não existe ou o produto não está mais ativo no catálogo.
        </p>
        <Link
          className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-leaf-700 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-leaf-800"
          to="/produtos"
        >
          <ArrowLeft aria-hidden="true" size={18} />
          Ver produtos
        </Link>
      </div>
    </main>
  );
}
