export type Category = {
  id: string;
  name: string;
  description: string;
  cardImage: string;
  bannerImage: string;
  icon: string;
  accentColor: string;
};

export const categories: Category[] = [
  {
    id: "imunidade",
    name: "Imunidade",
    description: "Suporte para fortalecer a rotina de cuidados diários.",
    cardImage: "/images/cards/imunidade-card.png",
    bannerImage: "/images/categories/imunidade-banner.png",
    icon: "/health_and_safety.svg",
    accentColor: "#477020",
  },
  {
    id: "sono",
    name: "Sono",
    description: "Produtos para uma noite mais tranquila e reparadora.",
    cardImage: "/images/cards/sono-card-hd.png",
    bannerImage: "/images/categories/sono-banner.png",
    icon: "/moon_stars.svg",
    accentColor: "#5b6f9f",
  },
  {
    id: "pele-cabelos",
    name: "Pele e cabelos",
    description: "Cuidado diário para beleza, vitalidade e bem-estar.",
    cardImage: "/images/cards/pele-cabelos-card.png",
    bannerImage: "/images/categories/pele-cabelos-banner.png",
    icon: "/self_care.svg",
    accentColor: "#b6694f",
  },
  {
    id: "emagrecimento",
    name: "Emagrecimento",
    description: "Apoio para uma rotina leve, ativa e equilibrada.",
    cardImage: "/images/cards/emagrecimento-card.png",
    bannerImage: "/images/categories/emagrecimento-banner.png",
    icon: "/metabolism.svg",
    accentColor: "#618c2d",
  },
  {
    id: "dores-articulares",
    name: "Dores articulares",
    description: "Cuidado para mobilidade, conforto e movimento.",
    cardImage: "/images/cards/dores-card.png",
    bannerImage: "/images/categories/dores-articulares-banner.png",
    icon: "/rheumatology.svg",
    accentColor: "#ba8c42",
  },
  {
    id: "beleza",
    name: "Beleza",
    description: "Formulações para cuidado de dentro para fora.",
    cardImage: "/images/cards/beleza-card.png",
    bannerImage: "/images/categories/beleza-banner.png",
    icon: "/spa.svg",
    accentColor: "#b6694f",
  },
  {
    id: "vida-sexual",
    name: "Vida sexual",
    description: "Bem-estar e disposição para a vida adulta.",
    cardImage: "/images/cards/vida-sexual-card-hd.png",
    bannerImage: "/images/categories/vida-sexual-banner.png",
    icon: "/person_heart.svg",
    accentColor: "#8a6246",
  },
];

export const allProductsCategory = {
  id: "todos",
  name: "Todos",
  description: "Veja todos os produtos ativos da Vida Leve.",
  bannerImage: "/images/banners/banner-produtos.png",
};

export function getCategoryById(id: string) {
  return categories.find((category) => category.id === id);
}
