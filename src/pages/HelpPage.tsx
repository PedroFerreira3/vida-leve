import {
  Clock,
  CreditCard,
  Mail,
  MessageCircle,
  PackageCheck,
  Phone,
  ShieldCheck,
  Truck,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { Seo } from "../components/Seo";
import { MaskIcon } from "../components/ui/MaskIcon";
import { WhatsAppButton } from "../components/ui/WhatsAppButton";
import { company } from "../data/company";
import { getAssetPath } from "../utils/assets";
import { getWhatsAppNumber } from "../utils/whatsapp";

const helpBannerImage = "/images/banners/banner-ajuda.png";

type ContactItem = {
  description: string;
  icon: LucideIcon;
  title: string;
};

type ServiceStep = {
  description: string;
  icon?: LucideIcon;
  image?: string;
  title: string;
};

type FaqItem = {
  answer: string;
  icon: LucideIcon;
  question: string;
};

function formatPhoneNumber(value: string) {
  const digits = value.replace(/\D/g, "");
  const localDigits = digits.startsWith("55") ? digits.slice(2) : digits;

  if (localDigits.length === 11) {
    return `(${localDigits.slice(0, 2)}) ${localDigits.slice(2, 7)}-${localDigits.slice(7)}`;
  }

  if (localDigits.length === 10) {
    return `(${localDigits.slice(0, 2)}) ${localDigits.slice(2, 6)}-${localDigits.slice(6)}`;
  }

  return value;
}

const contactItems: ContactItem[] = [
  {
    description: "Seg a Sex, 8h às 18h",
    icon: Phone,
    title: formatPhoneNumber(getWhatsAppNumber()),
  },
  {
    description: "Respondemos em até 24h",
    icon: Mail,
    title: company.email,
  },
  {
    description: "Seg a Sex: 8h às 18h · Sábado: 8h às 12h",
    icon: Clock,
    title: "Horário de atendimento",
  },
];

const serviceSteps: ServiceStep[] = [
  {
    description: "Clique no botão e comece uma conversa com nossa equipe.",
    image: "/whatsapp-icon.svg",
    title: "Fale pelo WhatsApp",
  },
  {
    description: "Conte qual produto ou objetivo de cuidado você está buscando.",
    icon: UserRound,
    title: "Conte sua necessidade",
  },
  {
    description: "Receba orientações para finalizar sua compra com mais segurança.",
    icon: PackageCheck,
    title: "Receba sua indicação",
  },
];

const faqItems: FaqItem[] = [
  {
    answer:
      "A entrega é combinada diretamente com o representante durante o atendimento, de acordo com disponibilidade e endereço.",
    icon: Truck,
    question: "Como funciona a entrega?",
  },
  {
    answer: "Você pode pagar por Pix ou cartão de crédito em até 12x.",
    icon: CreditCard,
    question: "Quais são as formas de pagamento?",
  },
  {
    answer: "Sim. Clique no WhatsApp e envie sua dúvida para receber orientação antes de escolher o produto.",
    icon: MessageCircle,
    question: "Tenho dúvidas sobre os produtos. Como falar?",
  },
  {
    answer: "Nossa equipe responde dentro do horário de atendimento e busca retornar as mensagens em até 24h.",
    icon: Clock,
    question: "Qual o tempo de retorno do atendimento?",
  },
];

export function HelpPage() {
  return (
    <main>
      <Seo
        title="Ajuda"
        description="Tire dúvidas sobre busca, produtos e atendimento da Vida Leve."
        image={helpBannerImage}
      />

      <section className="bg-leaf-50">
        <div className="w-full">
          <img
            className="h-auto w-full object-contain sm:h-[clamp(160px,21.875vw,420px)] sm:object-cover sm:object-center"
            src={getAssetPath(helpBannerImage)}
            alt="Atendimento Vida Leve"
          />
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-2xl border border-leaf-100 bg-white shadow-sm">
            <div className="grid gap-6 p-6 sm:p-8">
              <div>
                <h1 className="font-display text-4xl leading-tight text-leaf-900 sm:text-5xl">Fale conosco</h1>
                <p className="mt-4 max-w-sm text-sm leading-7 text-leaf-800/75">
                  Escolha o canal que preferir. Nossa equipe está pronta para te atender.
                </p>
              </div>

              <div className="grid gap-4 rounded-xl border border-leaf-100 bg-leaf-50/50 p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center">
                <span className="flex size-14 items-center justify-center rounded-full bg-white text-leaf-700 shadow-sm">
                  <MaskIcon className="size-7" src="/whatsapp-icon.svg" />
                </span>
                <div>
                  <h2 className="text-base font-bold text-leaf-900">WhatsApp</h2>
                  <p className="mt-1 text-sm leading-6 text-leaf-800/70">Fale agora com um representante.</p>
                </div>
                <WhatsAppButton
                  className="w-full sm:w-auto"
                  message={company.whatsappMessage}
                  label="Falar com representante"
                />
              </div>

              <div className="grid gap-3">
                {contactItems.map(({ description, icon: Icon, title }) => (
                  <article
                    key={title}
                    className="grid gap-4 rounded-xl border border-leaf-100 bg-white p-4 sm:grid-cols-[auto_1fr] sm:items-center"
                  >
                    <span className="flex size-12 items-center justify-center rounded-full bg-leaf-50 text-leaf-700">
                      <Icon aria-hidden="true" size={23} strokeWidth={1.8} />
                    </span>
                    <span className="min-w-0">
                      <h2 className="break-words text-base font-bold text-leaf-900">{title}</h2>
                      <p className="mt-1 text-sm leading-6 text-leaf-800/70">{description}</p>
                    </span>
                  </article>
                ))}
              </div>
            </div>

            <div className="border-t border-leaf-100 px-6 py-4 sm:px-8">
              <p className="flex flex-col items-center justify-center gap-2 text-center text-sm font-semibold text-leaf-800/75 sm:flex-row">
                <ShieldCheck aria-hidden="true" className="text-leaf-700" size={18} />
                Seus dados estão protegidos. Atendimento seguro e humanizado.
              </p>
            </div>
          </div>

          <section className="mt-12">
            <div className="flex items-center gap-6">
              <span className="h-px flex-1 bg-leaf-100" />
              <h2 className="text-center font-display text-3xl text-leaf-900">Como funciona o atendimento</h2>
              <span className="h-px flex-1 bg-leaf-100" />
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {serviceSteps.map(({ description, icon: Icon, image, title }, index) => (
                <article key={title} className="relative grid gap-4 rounded-xl bg-white p-5 md:grid-cols-[auto_1fr]">
                  <span className="absolute left-4 top-4 flex size-7 items-center justify-center rounded-full bg-leaf-700 text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <span className="ml-8 flex size-20 items-center justify-center rounded-full bg-leaf-50 text-leaf-700 md:ml-0">
                    {image ? (
                      <MaskIcon className="size-9" src={image} />
                    ) : Icon ? (
                      <Icon aria-hidden="true" size={34} strokeWidth={1.7} />
                    ) : null}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-leaf-900">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-leaf-800/70">{description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-center font-display text-3xl text-leaf-900">Perguntas frequentes</h2>
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {faqItems.map(({ answer, icon: Icon, question }) => (
                <article key={question} className="rounded-xl border border-leaf-100 bg-white shadow-sm">
                  <div className="flex min-h-14 items-center gap-3 px-5 py-3 text-sm font-bold text-leaf-900">
                    <Icon className="shrink-0 text-leaf-700" aria-hidden="true" size={20} strokeWidth={1.8} />
                    <span className="flex-1">{question}</span>
                  </div>
                  <p className="border-t border-leaf-100 px-5 py-4 text-sm leading-6 text-leaf-800/70">{answer}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
