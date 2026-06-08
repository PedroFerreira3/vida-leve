import { CheckCircle2, Eye, HeartHandshake, Leaf, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { SectionHeader } from "../components/ui/SectionHeader";
import { WhatsAppButton } from "../components/ui/WhatsAppButton";
import { company } from "../data/company";
import { getAssetPath } from "../utils/assets";

const aboutBannerImage = "/images/banners/banner-sobre-nos.png";

const storyParagraphs = [
  "A Vida Leve nasceu com o desejo de tornar o cuidado diário mais simples, próximo e humano. A empresa começou atendendo pessoas que buscavam produtos naturais, suplementos e orientações mais claras antes de decidir o que comprar.",
  "Com o tempo, esse atendimento virou o centro da marca: ouvir primeiro, entender o objetivo de cada pessoa e indicar caminhos com responsabilidade. Por isso, a compra acontece com apoio de um representante, sem pressa e sem etapas desnecessárias.",
  "Hoje, a Vida Leve reúne produtos selecionados para diferentes rotinas de cuidado, sempre com a proposta de aproximar bem-estar, informação e acolhimento.",
];

const principles = [
  {
    title: "Missão",
    description:
      "Facilitar o acesso a produtos naturais e suplementos com atendimento próximo, orientação clara e uma experiência de compra simples.",
    icon: HeartHandshake,
  },
  {
    title: "Visão",
    description:
      "Ser lembrada como uma marca de confiança para quem busca bem-estar natural com atendimento humano e responsável.",
    icon: Eye,
  },
  {
    title: "Valores",
    description:
      "Atuar com acolhimento, responsabilidade e clareza para construir uma jornada de cuidado mais leve no dia a dia.",
    icon: Target,
  },
];

const goals = [
  "Oferecer uma curadoria confiável de produtos naturais e suplementos.",
  "Manter um atendimento direto, acolhedor e personalizado.",
  "Ajudar o cliente a escolher produtos alinhados ao seu objetivo.",
  "Simplificar a compra pelo WhatsApp, sem cadastro ou carrinho.",
];

export function AboutPage() {
  return (
    <main>
      <Seo
        title="Sobre Nós"
        description="Conheça a história, missão, visão e valores da Vida Leve."
        image={aboutBannerImage}
      />

      <section className="bg-leaf-50">
        <div className="w-full">
          <img
            className="h-auto w-full object-contain sm:h-[clamp(160px,21.875vw,420px)] sm:object-cover sm:object-center"
            src={getAssetPath(aboutBannerImage)}
            alt="Vida Leve"
          />
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf-600">Sobre nós</p>
            <h1 className="mt-4 max-w-3xl font-display text-5xl leading-tight text-leaf-900 sm:text-6xl">
              {company.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-leaf-800/80">
              Bem-estar natural para o seu dia a dia, com produtos selecionados e atendimento feito para entender você antes
              de finalizar a compra.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton message={company.whatsappMessage} label="Falar com representante" />
              <Link
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-leaf-200 px-5 py-3 text-sm font-bold text-leaf-900 transition-colors hover:bg-leaf-50"
                to="/produtos"
              >
                Ver produtos
              </Link>
            </div>

          </div>

          <article className="rounded-2xl border border-leaf-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-4">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-leaf-50 text-leaf-700">
                <Leaf aria-hidden="true" size={28} strokeWidth={1.8} />
              </span>
              <h2 className="font-display text-3xl text-leaf-900">Nossa trajetória</h2>
            </div>
            <div className="mt-6 grid gap-5">
              {storyParagraphs.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-7 text-leaf-800/75">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="bg-leaf-50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            align="center"
            eyebrow="Direção da empresa"
            title="Missão, visão e valores"
            description="Os pilares que orientam a forma como a Vida Leve atende, seleciona produtos e constrói confiança."
          />

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {principles.map(({ description, icon: Icon, title }) => (
              <article key={title} className="rounded-2xl border border-leaf-100 bg-white p-6 shadow-sm">
                <span className="flex size-12 items-center justify-center rounded-full bg-leaf-50 text-leaf-700">
                  <Icon aria-hidden="true" size={25} strokeWidth={1.8} />
                </span>
                <h2 className="mt-5 font-display text-2xl text-leaf-900">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-leaf-800/75">{description}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-leaf-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-3xl text-leaf-900">O que buscamos todos os dias</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {goals.map((goal) => (
                <div key={goal} className="flex gap-3 rounded-xl bg-leaf-50/70 p-4">
                  <CheckCircle2 className="mt-0.5 shrink-0 fill-leaf-600 text-white" aria-hidden="true" size={18} />
                  <p className="text-sm font-semibold leading-6 text-leaf-800">{goal}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf-600">Atendimento Vida Leve</p>
          <h2 className="mt-3 font-display text-4xl text-leaf-900">Quer conhecer melhor nossos produtos?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-leaf-800/75">
            Fale com um representante para tirar dúvidas, entender as opções disponíveis e receber uma orientação mais
            alinhada ao seu objetivo.
          </p>
          <div className="mt-7 flex justify-center">
            <WhatsAppButton message={company.whatsappMessage} label="Falar com representante" />
          </div>
        </div>
      </section>
    </main>
  );
}
