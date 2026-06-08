import { Mail, ShoppingCart, Sprout, UsersRound, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { categories } from "../../data/categories";
import { company } from "../../data/company";
import { getAssetPath } from "../../utils/assets";
import { getWhatsAppUrl } from "../../utils/whatsapp";
import { MaskIcon } from "../ui/MaskIcon";

const footerBenefits = [
  {
    title: "Atendimento personalizado",
    description: "Fale com um representante e receba orientação ideal para você.",
    icon: UsersRound,
  },
  {
    title: "Produtos selecionados",
    description: "Trabalhamos com marcas confiáveis e ingredientes de qualidade.",
    icon: Sprout,
  },
  {
    title: "Compra assistida",
    description: "Você não compra sozinho, estamos com você em todo o processo.",
    icon: ShoppingCart,
  },
  {
    title: "Suporte rápido",
    description: "Atendimento ágil e humanizado pelo WhatsApp.",
    image: "/whatsapp-icon.svg",
  },
] satisfies Array<{
  title: string;
  description: string;
  icon?: LucideIcon;
  image?: string;
}>;

const footerCategoryOrder = ["dores-articulares", "emagrecimento", "pele-cabelos", "imunidade", "sono"];

export function Footer() {
  const footerCategories = footerCategoryOrder
    .map((categoryId) => categories.find((category) => category.id === categoryId))
    .filter((category) => category !== undefined);

  return (
    <>
      <section className="border-y border-leaf-100 bg-leaf-50 px-4 py-8 text-leaf-900 sm:px-6 lg:px-8" aria-label="Benefícios Vida Leve">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {footerBenefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div key={benefit.title} className="flex items-start gap-4">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-white text-leaf-700 ring-1 ring-leaf-200">
                  {Icon ? (
                    <Icon aria-hidden="true" size={28} strokeWidth={2.2} />
                  ) : (
                    <MaskIcon className="size-7" src={benefit.image ?? ""} />
                  )}
                </span>
                <span>
                  <span className="block font-display text-xl font-bold leading-tight text-leaf-700">
                    {benefit.title}
                  </span>
                  <span className="mt-2 block text-sm leading-5 text-leaf-800/75">{benefit.description}</span>
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-white/10 bg-leaf-900 text-leaf-50">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[minmax(220px,0.75fr)_minmax(160px,0.55fr)_minmax(220px,0.75fr)] lg:px-8">
          <div className="max-w-[17.5rem]">
            <Link to="/" className="inline-flex items-center" aria-label="Voltar para o início">
              <img className="h-16 w-auto" src={getAssetPath("/images/vida-leve-logo.png")} alt="Vida Leve" />
            </Link>
            <p className="mt-5 text-sm leading-7 text-leaf-100">
              Vida Leve é bem-estar natural para o seu dia a dia. Suplementos e produtos naturais com atendimento
              personalizado para cuidar de você.
            </p>
          </div>

          <div className="md:pt-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-leaf-200">Categorias</h2>
            <div className="mt-5 grid gap-3">
              {footerCategories.map((category) => (
                <Link
                  key={category.id}
                  className="text-sm text-leaf-50/90 transition-colors hover:text-leaf-200"
                  to={`/produtos?categoria=${category.id}`}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:pt-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-leaf-200">Contato</h2>
            <div className="mt-5 grid gap-4">
              <a
                className="inline-flex items-center gap-3 text-sm text-leaf-50/90 transition-colors hover:text-leaf-200"
                href={getWhatsAppUrl(company.whatsappMessage)}
                target="_blank"
                rel="noreferrer"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-leaf-100">
                  <MaskIcon className="size-[17px]" src="/whatsapp-icon.svg" />
                </span>
                Atendimento pelo WhatsApp
              </a>
              <a
                className="inline-flex items-center gap-3 text-sm text-leaf-50/90 transition-colors hover:text-leaf-200"
                href={`mailto:${company.email}`}
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-leaf-100">
                  <Mail aria-hidden="true" size={17} />
                </span>
                {company.email}
              </a>
              <a
                className="inline-flex items-center gap-3 text-sm text-leaf-50/90 transition-colors hover:text-leaf-200"
                href="https://www.instagram.com/vidaleve.sup?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noreferrer"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-leaf-100">
                  <MaskIcon className="size-[17px]" src="/instagram-icon.svg" />
                </span>
                vidaleve
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl justify-center px-4 py-5 text-center text-xs text-leaf-200 sm:px-6 lg:px-8">
            <span>© 2026 VIDA LEVE SAUDE LTDA CNPJ: 32.118.067/0001-11</span>
          </div>
        </div>
      </footer>
    </>
  );
}
