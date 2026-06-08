export type ProductFormat = "capsulas" | "gotas" | "po";

export type ProductInfoSection = {
  title: string;
  items: string[];
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  categoryIds: string[];
  image: string;
  benefits: string[];
  benefitTagIds: string[];
  format: ProductFormat;
  quantityLabel: string;
  kitUnits?: number;
  priceCents: number;
  originalPriceCents?: number;
  salesRank: number;
  usage?: string;
  usageInstructions?: string[];
  compositionSections?: ProductInfoSection[];
  nutritionImage: string;
  whatsappMessage: string;
  featured?: boolean;
  active: boolean;
  sortOrder: number;
};

type ProductGroup = {
  id: string;
  baseName: string;
  shortDescription: string;
  description: string;
  categoryIds: string[];
  benefits: string[];
  benefitTagIds: string[];
  format: ProductFormat;
  quantityLabel: string;
  usage: string;
  usageInstructions?: string[];
  compositionSections?: ProductInfoSection[];
  nutritionImage: string;
  variants: Array<{
    id: string;
    name: string;
    image: string;
    kitUnits?: number;
    priceCents: number;
    originalPriceCents?: number;
    featured?: boolean;
  }>;
};

type ProductDetailContent = Pick<ProductGroup, "compositionSections" | "usageInstructions">;

const productDetailContentByGroupId: Record<string, ProductDetailContent> = {
  q10: {
    usageInstructions: ["Ingerir 1 cápsula, 2 vezes ao dia, de preferência nas principais refeições."],
    compositionSections: [
      {
        title: "Ingredientes",
        items: ["Coenzima Q10 e vitamina E (acetato de D-alfatocoferol)."],
      },
      {
        title: "Composição da cápsula",
        items: ["Gelatina e umectante glicerina."],
      },
      {
        title: "Alérgicos",
        items: [
          "Não contém glúten.",
          "Não contém açúcar.",
          "Não contém lactose.",
          "Sem transgênicos.",
          "Sem conservantes.",
          "Sem fermento.",
          "Sem soja.",
        ],
      },
    ],
  },
  "ora-pro-nobis": {
    usageInstructions: ["Ingerir 5g ao dia na água, smoothies, sopas, molhos, pães, bolos e sobremesas."],
    compositionSections: [
      {
        title: "Ingredientes",
        items: [
          "Maltodextrina, ora-pro-nóbis (Pereskia aculeata), aroma idêntico ao natural de frutas vermelhas, edulcorante INS 955, acidulante INS 330, antiumectante INS 551 e corantes artificiais: amaranto (INS 123) 55,9%, azul brilhante FCF (INS 133) 0,1% e INS 110.",
        ],
      },
      {
        title: "Alérgicos",
        items: [
          "Pode conter leite e derivados.",
          "Pode conter soja.",
          "Pode conter crustáceos.",
          "Pode conter látex.",
          "Não contém glúten.",
        ],
      },
    ],
  },
  ostd5: {
    usageInstructions: ["Ingerir 1 cápsula, 3 vezes ao dia, junto com líquidos."],
    compositionSections: [
      {
        title: "Ingredientes",
        items: ["Carbonato de cálcio, óxido de magnésio, menaquinona-7 e colecalciferol."],
      },
      {
        title: "Agente de massa",
        items: ["INS 460i e antiumectante INS 551."],
      },
      {
        title: "Composição da cápsula",
        items: ["Gelatina e umectante INS 422."],
      },
      {
        title: "Alérgicos",
        items: [
          "Pode conter leite e derivados.",
          "Pode conter soja.",
          "Pode conter crustáceos.",
          "Pode conter látex.",
          "Não contém glúten.",
        ],
      },
    ],
  },
  curcuma: {
    usageInstructions: ["Dissolver 5g do produto em 50ml de água."],
    compositionSections: [
      {
        title: "Ingredientes",
        items: [
          "Extrato de rizomas de cúrcuma longa, L-glutamina, retinol, cloridrato de piridoxina, cianocobalamina, ácido ascórbico, DL-alfa-tocoferol, acetilcisteína, maltodextrina, aroma de frutas vermelhas idêntico ao natural e ácido cítrico.",
        ],
      },
      {
        title: "Alérgicos",
        items: ["Não informado na imagem enviada."],
      },
    ],
  },
  mag7: {
    usageInstructions: ["Ingerir 2 cápsulas ao dia, junto com líquidos."],
    compositionSections: [
      {
        title: "Ingredientes",
        items: [
          "Cloreto de magnésio, óxido de magnésio, bisglicinato de magnésio, sulfato de magnésio, magnésio citrato malato, taurato de magnésio e malato de magnésio.",
        ],
      },
      {
        title: "Agente de massa",
        items: ["Amido de milho."],
      },
      {
        title: "Composição da cápsula",
        items: ["Gelatina e umectante INS 422."],
      },
      {
        title: "Alérgicos",
        items: [
          "Pode conter leite e derivados.",
          "Pode conter soja.",
          "Pode conter crustáceos.",
          "Pode conter látex.",
          "Não contém glúten.",
        ],
      },
    ],
  },
  melatonina: {
    usageInstructions: ["Tomar 1 cápsula ao dia, com água, após as 16:00 horas."],
    compositionSections: [
      {
        title: "Ingredientes",
        items: ["Melatonina e amido de milho."],
      },
      {
        title: "Composição da cápsula",
        items: ["Gelatina e umectante glicerina.", "Cápsulas coloridas: contém corante alimentício/artificial."],
      },
      {
        title: "Alérgicos",
        items: [
          "Não contém glúten.",
          "Não contém açúcar.",
          "Não contém lactose.",
          "Pode conter látex.",
          "Pode conter corante alimentício.",
        ],
      },
    ],
  },
  "colageno-limao": {
    usageInstructions: [
      "Consumir 3g, equivalente a 1 colher de chá, ao dia. Diluir em 200ml de água, suco ou vitaminas.",
    ],
    compositionSections: [
      {
        title: "Ingredientes",
        items: [
          "Peptídeos bioativos de colágeno hidrolisado, maltodextrina, ascorbato de sódio (vitamina C), DL alfa acetato de tocoferol (vitamina E), palmitato de retinol (vitamina A), sulfato de zinco mono-hidratado (zinco), sulfato de manganês mono-hidratado (manganês), acidulante ácido cítrico, antiumectante dióxido de silício, edulcorante sucralose, aromatizante sintético idêntico ao natural de uva e corante natural vinho.",
        ],
      },
      {
        title: "Alérgicos",
        items: [
          "Não contém glúten.",
          "Não contém açúcar.",
          "Pode conter derivados de leite de vaca, soja e ovo.",
        ],
      },
    ],
  },
  "colageno-uva": {
    usageInstructions: [
      "Consumir 3g, equivalente a 1 colher de chá, ao dia. Diluir em 200ml de água, suco ou vitaminas.",
    ],
    compositionSections: [
      {
        title: "Ingredientes",
        items: [
          "Peptídeos bioativos de colágeno hidrolisado, maltodextrina, ascorbato de sódio (vitamina C), DL alfa acetato de tocoferol (vitamina E), palmitato de retinol (vitamina A), sulfato de zinco mono-hidratado (zinco), sulfato de manganês mono-hidratado (manganês), acidulante ácido cítrico, antiumectante dióxido de silício, edulcorante sucralose, aromatizante sintético idêntico ao natural de uva e corante natural vinho.",
        ],
      },
      {
        title: "Alérgicos",
        items: [
          "Não contém glúten.",
          "Não contém açúcar.",
          "Pode conter derivados de leite de vaca, soja e ovo.",
        ],
      },
    ],
  },
  "colageno-imune": {
    usageInstructions: ["Ingerir 3 cápsulas ao dia, junto com líquidos."],
    compositionSections: [
      {
        title: "Ingredientes",
        items: ["Colágeno hidrolisado e ácido ascórbico."],
      },
      {
        title: "Agente de massa",
        items: ["Amido de milho."],
      },
      {
        title: "Composição da cápsula",
        items: ["Gelatina e umectante INS 422."],
      },
      {
        title: "Alérgicos",
        items: [
          "Pode conter leite e derivados.",
          "Pode conter soja.",
          "Pode conter crustáceos.",
          "Pode conter látex.",
          "Não contém glúten.",
        ],
      },
    ],
  },
  polivitaminico: {
    usageInstructions: ["Ingerir 2 cápsulas, 2 vezes ao dia, junto com líquidos."],
    compositionSections: [
      {
        title: "Ingredientes",
        items: [
          "Bisglicinato de cálcio, bisglicinato ferroso, bisglicinato de magnésio, bisglicinato de zinco, bisglicinato de cobre, bisglicinato de manganês, iodeto de sódio, picolinato de cromo, molibdato de sódio, L-selenometionina, retinol, colecalciferol, ácido ascórbico, DL-alfa-tocoferol, cloridrato de tiamina, riboflavina, nicotinamida, cloridrato de piridoxina, cianocobalamina, ácido fólico, menaquinona-7, D-biotina, pantotenato de cálcio e fósforo.",
        ],
      },
      {
        title: "Agente de massa",
        items: ["INS 460i."],
      },
      {
        title: "Composição da cápsula",
        items: ["Gelatina e umectante INS 422."],
      },
      {
        title: "Alérgicos",
        items: [
          "Pode conter leite e derivados.",
          "Pode conter soja.",
          "Pode conter crustáceos.",
          "Pode conter látex.",
          "Não contém glúten.",
        ],
      },
    ],
  },
  potente: {
    usageInstructions: [
      "Tomar 1 cápsula ao dia.",
      "Não exceder a recomendação diária de consumo indicada na embalagem.",
      "Indicado para adultos.",
    ],
    compositionSections: [
      {
        title: "Ingredientes",
        items: [
          "L-arginina, extrato de semente de feno-grego (Trigonella foenum-graecum L.), taurina, guaraná em pó (Paullinia cupana), bisglicinato de zinco e tetraborato de sódio decahidratado.",
        ],
      },
      {
        title: "Agente de massa",
        items: ["INS 460i."],
      },
      {
        title: "Composição da cápsula",
        items: ["Gelatina e umectante INS 422."],
      },
      {
        title: "Alérgicos",
        items: [
          "Pode conter leite e derivados.",
          "Pode conter soja.",
          "Pode conter crustáceos.",
          "Pode conter látex.",
          "Não contém glúten.",
        ],
      },
    ],
  },
  "beautiful-skin": {
    usageInstructions: ["Ingerir 1 cápsula ao dia, junto com água."],
    compositionSections: [
      {
        title: "Ingredientes",
        items: ["Colágeno peptídeos, ácido hialurônico, ácido ascórbico, vitamina A, vitamina E, biotina e amido de milho."],
      },
      {
        title: "Composição da cápsula",
        items: ["Gelatina e umectante glicerina.", "Cápsula colorida, contém corante alimentício/artificial."],
      },
      {
        title: "Alérgicos",
        items: [
          "Não contém glúten.",
          "Não contém açúcar.",
          "Não contém lactose.",
          "Pode conter látex.",
          "Pode conter corante alimentício.",
        ],
      },
    ],
  },
  omega: {
    usageInstructions: ["Ingerir 1 cápsula, 2 vezes ao dia, junto com líquido."],
    compositionSections: [
      {
        title: "Ingredientes",
        items: [
          "Óleo de cártamo (Carthamus tinctorius L.), óleo de linhaça/linho (Linum usitatissimum L.), óleo de gergelim (Sesamum indicum L.), óleo de girassol (Helianthus annuus L.) e óleo de semente de borragem (Borago officinalis L.).",
        ],
      },
      {
        title: "Composição da cápsula",
        items: ["Gelatina, água purificada e umectante INS 422."],
      },
      {
        title: "Alérgicos",
        items: [
          "Contém derivados de peixe.",
          "Pode conter trigo, centeio, cevada, aveia, crustáceos (krill e caranguejo), ovos, leite, amêndoas, amendoim, avelãs, castanhas, macadâmias, nozes, pecãs, pinoli, pistaches e soja.",
          "Contém glúten.",
        ],
      },
    ],
  },
};

function makeSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getKitUnits(value: string) {
  const match = value.match(/\bKit\s+(\d+)\b/i);
  return match ? Number(match[1]) : undefined;
}

function getProductWhatsAppMessage(productName: string, baseName: string, kitUnits?: number) {
  const interestName = kitUnits ? `Kit com ${kitUnits} unidades de ${baseName}` : productName;

  return `Olá, tenho interesse no ${interestName} da Vida Leve.`;
}

function makeProducts(groups: ProductGroup[]): Product[] {
  let currentOrder = 10;

  return groups.flatMap((group, groupIndex) =>
    group.variants.map((variant, variantIndex) => {
      const detailContent = productDetailContentByGroupId[group.id] ?? {};
      const kitUnits = variant.kitUnits ?? getKitUnits(variant.name);
      const product: Product = {
        id: variant.id,
        slug: makeSlug(variant.name),
        name: variant.name,
        shortDescription: group.shortDescription,
        description: group.description,
        categoryIds: group.categoryIds,
        image: variant.image,
        benefits: group.benefits,
        benefitTagIds: group.benefitTagIds,
        format: group.format,
        quantityLabel: group.quantityLabel,
        kitUnits,
        priceCents: variant.priceCents,
        originalPriceCents: variant.originalPriceCents,
        salesRank: groupIndex * 10 + variantIndex + 1,
        usage: group.usage,
        usageInstructions: group.usageInstructions ?? detailContent.usageInstructions,
        compositionSections: group.compositionSections ?? detailContent.compositionSections,
        nutritionImage: group.nutritionImage,
        whatsappMessage: getProductWhatsAppMessage(variant.name, group.baseName, kitUnits),
        featured: variant.featured,
        active: true,
        sortOrder: currentOrder,
      };

      currentOrder += 10;
      return product;
    }),
  );
}

const productGroups: ProductGroup[] = [
  {
    id: "q10",
    baseName: "Coenzima Q10",
    shortDescription: "Suplemento em cápsulas para apoiar energia, vitalidade e rotina antioxidante.",
    description:
      "Coenzima Q10 em cápsulas, uma opção prática para quem busca complementar a rotina com foco em disposição, energia celular e cuidado antioxidante.",
    categoryIds: ["imunidade", "beleza"],
    benefits: ["Apoia a vitalidade diária", "Combina com rotinas antioxidantes", "Formato prático em cápsulas"],
    benefitTagIds: ["acao-antioxidante", "energetico-natural"],
    format: "capsulas",
    quantityLabel: "60 cápsulas",
    usage: "Consumir conforme orientação profissional ou recomendação do rótulo.",
    nutritionImage: "/imagens-produtos/q10/tabela-nutricional.png",
    variants: [
      {
        id: "coenzima-q10",
        name: "Coenzima Q10",
        image: "/imagens-produtos/q10/q10-60cap.png",
        originalPriceCents: 39990,
        priceCents: 29990,
        featured: true,
      },
      {
        id: "coenzima-q10-kit-3",
        name: "Coenzima Q10 Kit 3",
        image: "/imagens-produtos/q10/q10-60cap-kit3.png",
        originalPriceCents: 129990,
        priceCents: 79990,
      },
      {
        id: "coenzima-q10-kit-6",
        name: "Coenzima Q10 Kit 6",
        image: "/imagens-produtos/q10/q10-60cap-kit6.png",
        originalPriceCents: 199990,
        priceCents: 137990,
      },
    ],
  },
  {
    id: "ora-pro-nobis",
    baseName: "Ora Pro Nobis em pó",
    shortDescription: "Produto em pó para complementar a rotina com nutrientes de origem vegetal.",
    description:
      "Ora Pro Nobis em pó para quem deseja uma opção natural e versátil, fácil de incluir em bebidas, vitaminas e preparos do dia a dia.",
    categoryIds: ["emagrecimento", "imunidade"],
    benefits: ["Apoia uma rotina equilibrada", "Origem vegetal", "Fácil de combinar com preparos diários"],
    benefitTagIds: ["rico-vitaminas", "energetico-natural"],
    format: "po",
    quantityLabel: "200g",
    usage: "Misturar conforme orientação profissional ou recomendação do rótulo.",
    nutritionImage: "/imagens-produtos/ora-pro-nobis/tabela-nutricional.png",
    variants: [
      {
        id: "ora-pro-nobis-em-po",
        name: "Ora Pro Nobis em pó",
        image: "/imagens-produtos/ora-pro-nobis/ora-pro-nobis.png",
        originalPriceCents: 59990,
        priceCents: 39990,
        featured: true,
      },
      {
        id: "ora-pro-nobis-em-po-kit-3",
        name: "Ora Pro Nobis em pó Kit 3",
        image: "/imagens-produtos/ora-pro-nobis/ora-pro-nobis-kit3.png",
        originalPriceCents: 149990,
        priceCents: 99990,
      },
      {
        id: "ora-pro-nobis-em-po-kit-6",
        name: "Ora Pro Nobis em pó Kit 6",
        image: "/imagens-produtos/ora-pro-nobis/ora-pro-nobis-kit6.png",
        originalPriceCents: 249990,
        priceCents: 179990,
      },
    ],
  },
  {
    id: "ostd5",
    baseName: "Ostd5",
    shortDescription: "Cápsulas para apoiar rotina de ossos, mobilidade e cuidado diário.",
    description:
      "Ostd5 foi pensado para quem busca suporte diário para cuidados com ossos, movimento e bem-estar de forma prática.",
    categoryIds: ["dores-articulares", "imunidade"],
    benefits: ["Apoia cuidados com mobilidade", "Complementa a rotina diária", "Formato prático em cápsulas"],
    benefitTagIds: ["fortalece-imunidade", "rico-vitaminas"],
    format: "capsulas",
    quantityLabel: "120 cápsulas",
    usage: "Consumir conforme orientação profissional ou recomendação do rótulo.",
    nutritionImage: "/imagens-produtos/ostd5/tabela-nutricional.png",
    variants: [
      {
        id: "ostd5",
        name: "Ostd5",
        image: "/imagens-produtos/ostd5/ostd5.png",
        originalPriceCents: 39990,
        priceCents: 34990,
        featured: true,
      },
      {
        id: "ostd5-kit-3",
        name: "Ostd5 Kit 3",
        image: "/imagens-produtos/ostd5/ostd5-kit3.png",
        priceCents: 89990,
      },
      {
        id: "ostd5-kit-6",
        name: "Ostd5 Kit 6",
        image: "/imagens-produtos/ostd5/ostd5-kit6.png",
        originalPriceCents: 209990,
        priceCents: 149990,
      },
    ],
  },
  {
    id: "curcuma",
    baseName: "Cúrcuma",
    shortDescription: "Produto em pó com perfil natural para conforto, equilíbrio e rotina antioxidante.",
    description:
      "Cúrcuma em pó para apoiar uma rotina de bem-estar com praticidade e ingredientes associados ao cuidado natural.",
    categoryIds: ["dores-articulares", "imunidade"],
    benefits: ["Apoia o conforto diário", "Combina com rotinas antioxidantes", "Fórmula prática"],
    benefitTagIds: ["acao-antioxidante"],
    format: "po",
    quantityLabel: "150g",
    usage: "Consumir conforme orientação profissional ou recomendação do rótulo.",
    nutritionImage: "/imagens-produtos/curcuma/tabela-nutricional.png",
    variants: [
      {
        id: "curcuma",
        name: "Cúrcuma",
        image: "/imagens-produtos/curcuma/curcuma.png",
        originalPriceCents: 49990,
        priceCents: 34990,
        featured: true,
      },
      {
        id: "curcuma-kit-3",
        name: "Cúrcuma Kit 3",
        image: "/imagens-produtos/curcuma/curcuma-kit3.png",
        originalPriceCents: 99990,
        priceCents: 89990,
      },
      {
        id: "curcuma-kit-6",
        name: "Cúrcuma Kit 6",
        image: "/imagens-produtos/curcuma/curcuma-kit6.png",
        originalPriceCents: 199990,
        priceCents: 149990,
      },
    ],
  },
  {
    id: "mag7",
    baseName: "Mag7",
    shortDescription: "Cápsulas para apoiar equilíbrio, descanso e bem-estar diário.",
    description:
      "Mag7 é uma opção em cápsulas para complementar uma rotina de equilíbrio, relaxamento e cuidado constante.",
    categoryIds: ["sono", "dores-articulares"],
    benefits: ["Apoia uma rotina equilibrada", "Combina com hábitos de descanso", "Formato prático"],
    benefitTagIds: ["energetico-natural"],
    format: "capsulas",
    quantityLabel: "120 cápsulas",
    usage: "Consumir conforme orientação profissional ou recomendação do rótulo.",
    nutritionImage: "/imagens-produtos/mag/tabela-nutricional.png",
    variants: [
      {
        id: "mag7",
        name: "Mag7",
        image: "/imagens-produtos/mag/mag-120cap.png",
        originalPriceCents: 39990,
        priceCents: 34990,
      },
      {
        id: "mag7-kit-3",
        name: "Mag7 Kit 3",
        image: "/imagens-produtos/mag/mag-120cap-kit3.png",
        priceCents: 89990,
      },
      {
        id: "mag7-kit-6",
        name: "Mag7 Kit 6",
        image: "/imagens-produtos/mag/mag-120cap-kit6.png",
        originalPriceCents: 209990,
        priceCents: 149990,
      },
    ],
  },
  {
    id: "melatonina",
    baseName: "Melatonina",
    shortDescription: "Cápsulas para apoiar uma rotina noturna mais organizada.",
    description:
      "Melatonina em cápsulas para quem busca apoio na rotina de sono e descanso, com compra simples pelo WhatsApp.",
    categoryIds: ["sono"],
    benefits: ["Apoia a rotina de descanso", "Uso prático em cápsulas", "Boa opção para hábitos noturnos"],
    benefitTagIds: ["energetico-natural"],
    format: "capsulas",
    quantityLabel: "30 cápsulas",
    usage: "Consumir conforme orientação profissional ou recomendação do rótulo.",
    nutritionImage: "/imagens-produtos/melatonina/tabela-nutricional.png",
    variants: [
      {
        id: "melatonina",
        name: "Melatonina",
        image: "/imagens-produtos/melatonina/melatonina-30cap.png",
        originalPriceCents: 39990,
        priceCents: 34990,
      },
      {
        id: "melatonina-kit-3",
        name: "Melatonina Kit 3",
        image: "/imagens-produtos/melatonina/melatonina-30cap-kit3.png",
        priceCents: 79990,
      },
      {
        id: "melatonina-kit-6",
        name: "Melatonina Kit 6",
        image: "/imagens-produtos/melatonina/melatonina-30cap-kit6.png",
        originalPriceCents: 299990,
        priceCents: 119990,
      },
    ],
  },
  {
    id: "colageno-limao",
    baseName: "Colágeno Limão",
    shortDescription: "Colágeno em pó sabor limão para rotina de beleza e autocuidado.",
    description:
      "Colágeno em pó sabor limão, pensado para quem busca uma forma prática e saborosa de manter uma rotina de beleza.",
    categoryIds: ["beleza", "pele-cabelos"],
    benefits: ["Apoia rotinas de beleza", "Foco em pele e cabelos", "Formato em pó para preparar no dia a dia"],
    benefitTagIds: ["rico-vitaminas"],
    format: "po",
    quantityLabel: "200g",
    usage: "Diluir conforme orientação profissional ou recomendação do rótulo.",
    nutritionImage: "/imagens-produtos/colageno/tabela-nutricional-limao.png",
    variants: [
      {
        id: "colageno-limao",
        name: "Colágeno Limão",
        image: "/imagens-produtos/colageno/colageno-limao.png",
        originalPriceCents: 39990,
        priceCents: 34990,
      },
      {
        id: "colageno-limao-kit-3",
        name: "Colágeno Limão Kit 3",
        image: "/imagens-produtos/colageno/colageno-limao-kit3.png",
        priceCents: 89990,
      },
      {
        id: "colageno-limao-kit-6",
        name: "Colágeno Limão Kit 6",
        image: "/imagens-produtos/colageno/colageno-limao-kit6.png",
        originalPriceCents: 209990,
        priceCents: 149990,
      },
    ],
  },
  {
    id: "colageno-uva",
    baseName: "Colágeno Uva",
    shortDescription: "Colágeno em pó sabor uva para beleza, pele e cabelos.",
    description:
      "Colágeno em pó sabor uva, uma opção para incluir o autocuidado na rotina com preparo simples.",
    categoryIds: ["beleza", "pele-cabelos"],
    benefits: ["Apoia rotinas de beleza", "Foco em pele e cabelos", "Opção em pó para preparo diário"],
    benefitTagIds: ["rico-vitaminas", "acao-antioxidante"],
    format: "po",
    quantityLabel: "200g",
    usage: "Diluir conforme orientação profissional ou recomendação do rótulo.",
    nutritionImage: "/imagens-produtos/colageno/tabela-nutricional-uva.png",
    variants: [
      {
        id: "colageno-uva",
        name: "Colágeno Uva",
        image: "/imagens-produtos/colageno/colageno-uva.png",
        originalPriceCents: 59990,
        priceCents: 39990,
      },
      {
        id: "colageno-uva-kit-3",
        name: "Colágeno Uva Kit 3",
        image: "/imagens-produtos/colageno/colageno-uva-kit3.png",
        originalPriceCents: 149990,
        priceCents: 99990,
      },
      {
        id: "colageno-uva-kit-6",
        name: "Colágeno Uva Kit 6",
        image: "/imagens-produtos/colageno/colageno-uva-kit6.png",
        originalPriceCents: 249990,
        priceCents: 179990,
      },
    ],
  },
  {
    id: "colageno-imune",
    baseName: "Colágeno Imune",
    shortDescription: "Cápsulas para apoiar beleza, pele, cabelos e cuidado diário.",
    description:
      "Colágeno Imune em cápsulas, indicado para quem deseja combinar autocuidado, beleza e rotina de bem-estar.",
    categoryIds: ["beleza", "pele-cabelos", "imunidade"],
    benefits: ["Apoia rotinas de beleza", "Foco em pele e cabelos", "Complementa cuidados diários"],
    benefitTagIds: ["fortalece-imunidade", "rico-vitaminas"],
    format: "capsulas",
    quantityLabel: "120 cápsulas",
    usage: "Consumir conforme orientação profissional ou recomendação do rótulo.",
    nutritionImage: "/imagens-produtos/pink/tabela-nutricional.png",
    variants: [
      {
        id: "colageno-imune",
        name: "Colágeno Imune",
        image: "/imagens-produtos/pink/colageno-120cap.png",
        originalPriceCents: 49990,
        priceCents: 34990,
        featured: true,
      },
      {
        id: "colageno-imune-kit-3",
        name: "Colágeno Imune Kit 3",
        image: "/imagens-produtos/pink/colageno-120cap-kit3.png",
        originalPriceCents: 99990,
        priceCents: 89990,
      },
      {
        id: "colageno-imune-kit-6",
        name: "Colágeno Imune Kit 6",
        image: "/imagens-produtos/pink/colageno-120cap-kit6.png",
        originalPriceCents: 187990,
        priceCents: 137990,
      },
    ],
  },
  {
    id: "polivitaminico",
    baseName: "Polivitamínico",
    shortDescription: "Cápsulas para complementar a rotina com vitaminas e minerais.",
    description:
      "Polivitamínico em cápsulas para quem busca uma opção prática para apoiar cuidados diários e bem-estar.",
    categoryIds: ["imunidade"],
    benefits: ["Apoia o cuidado diário", "Ajuda a manter a rotina mais completa", "Fácil de incluir no dia a dia"],
    benefitTagIds: ["fortalece-imunidade", "rico-vitaminas"],
    format: "capsulas",
    quantityLabel: "120 cápsulas",
    usage: "Consumir conforme orientação profissional ou recomendação do rótulo.",
    nutritionImage: "/imagens-produtos/polivitaminico/tabela-nutricional.png",
    variants: [
      {
        id: "polivitaminico",
        name: "Polivitamínico",
        image: "/imagens-produtos/polivitaminico/polivitaminico-120cap.png",
        originalPriceCents: 39990,
        priceCents: 34990,
      },
      {
        id: "polivitaminico-kit-3",
        name: "Polivitamínico Kit 3",
        image: "/imagens-produtos/polivitaminico/polivitaminico-120cap-kit3.png",
        originalPriceCents: 99990,
        priceCents: 89990,
      },
      {
        id: "polivitaminico-kit-6",
        name: "Polivitamínico Kit 6",
        image: "/imagens-produtos/polivitaminico/polivitaminico-120cap-kit6.png",
        originalPriceCents: 209990,
        priceCents: 149990,
      },
    ],
  },
  {
    id: "potente",
    baseName: "Potente",
    shortDescription: "Cápsulas para apoiar disposição e bem-estar na vida adulta.",
    description:
      "Potente em cápsulas, uma opção para quem busca apoio à disposição e bem-estar em uma rotina adulta.",
    categoryIds: ["vida-sexual"],
    benefits: ["Apoia a disposição diária", "Formato prático em cápsulas", "Combina com hábitos equilibrados"],
    benefitTagIds: ["energetico-natural"],
    format: "capsulas",
    quantityLabel: "30 cápsulas",
    usage: "Consumir conforme orientação profissional ou recomendação do rótulo.",
    nutritionImage: "/imagens-produtos/potente/tabela-nutricional.png",
    variants: [
      {
        id: "potente",
        name: "Potente",
        image: "/imagens-produtos/potente/potente-30cap.png",
        originalPriceCents: 59990,
        priceCents: 34990,
      },
      {
        id: "potente-kit-3",
        name: "Potente Kit 3",
        image: "/imagens-produtos/potente/potente-30cap-kit3.png",
        priceCents: 89990,
      },
      {
        id: "potente-kit-6",
        name: "Potente Kit 6",
        image: "/imagens-produtos/potente/potente-30cap-kit6.png",
        originalPriceCents: 299990,
        priceCents: 149990,
      },
    ],
  },
  {
    id: "beautiful-skin",
    baseName: "Beautiful Skin",
    shortDescription: "Cápsulas para rotina de beleza, pele e cabelos.",
    description:
      "Beautiful Skin em cápsulas para quem deseja fortalecer uma rotina de autocuidado e beleza de dentro para fora.",
    categoryIds: ["beleza", "pele-cabelos"],
    benefits: ["Apoia rotinas de beleza", "Foco em pele e cabelos", "Fácil de manter no dia a dia"],
    benefitTagIds: ["rico-vitaminas"],
    format: "capsulas",
    quantityLabel: "60 cápsulas",
    usage: "Consumir conforme orientação profissional ou recomendação do rótulo.",
    nutritionImage: "/imagens-produtos/beautiful/tabela-nutricional.png",
    variants: [
      {
        id: "beautiful-skin",
        name: "Beautiful Skin",
        image: "/imagens-produtos/beautiful/beautiful-skin-60cap.png",
        originalPriceCents: 39990,
        priceCents: 34990,
      },
      {
        id: "beautiful-skin-kit-3",
        name: "Beautiful Skin Kit 3",
        image: "/imagens-produtos/beautiful/beautiful-skin-60cap-kit3.png",
        priceCents: 89990,
      },
      {
        id: "beautiful-skin-kit-6",
        name: "Beautiful Skin Kit 6",
        image: "/imagens-produtos/beautiful/beautiful-skin-60cap-kit6.png",
        originalPriceCents: 209990,
        priceCents: 149990,
      },
    ],
  },
  {
    id: "beautiful-skin-gotas",
    baseName: "Beautiful Skin Gotas",
    shortDescription: "Gotas para apoiar a rotina de beleza e autocuidado.",
    description:
      "Beautiful Skin Gotas é uma alternativa prática para quem prefere suplementação líquida na rotina de cuidado com beleza.",
    categoryIds: ["beleza", "pele-cabelos"],
    benefits: ["Apoia rotinas de beleza", "Formato em gotas", "Fácil de encaixar no dia a dia"],
    benefitTagIds: ["rico-vitaminas"],
    format: "gotas",
    quantityLabel: "30ml",
    usage: "Consumir conforme orientação profissional ou recomendação do rótulo.",
    nutritionImage: "/imagens-produtos/beautiful/tabela-nutricional.png",
    variants: [
      {
        id: "beautiful-skin-gotas",
        name: "Beautiful Skin Gotas",
        image: "/imagens-produtos/beautiful/beautiful-skin-gotas.png",
        originalPriceCents: 49990,
        priceCents: 34990,
      },
      {
        id: "beautiful-skin-gotas-kit-3",
        name: "Beautiful Skin Gotas Kit 3",
        image: "/imagens-produtos/beautiful/beautiful-skin-gotas-kit3.png",
        originalPriceCents: 159990,
        priceCents: 89990,
      },
      {
        id: "beautiful-skin-gotas-kit-6",
        name: "Beautiful Skin Gotas Kit 6",
        image: "/imagens-produtos/beautiful/beautiful-skin-gotas-kit6.png",
        originalPriceCents: 249990,
        priceCents: 149990,
      },
    ],
  },
  {
    id: "omega",
    baseName: "Omega",
    shortDescription: "Cápsulas para apoiar bem-estar, equilíbrio e cuidado contínuo.",
    description:
      "Omega em cápsulas, uma opção para quem deseja complementar a rotina com foco em bem-estar e cuidado diário.",
    categoryIds: ["dores-articulares", "imunidade"],
    benefits: ["Apoia o bem-estar geral", "Complementa a rotina de cuidados", "Formato prático em cápsulas"],
    benefitTagIds: ["acao-antioxidante"],
    format: "capsulas",
    quantityLabel: "120 cápsulas",
    usage: "Consumir conforme orientação profissional ou recomendação do rótulo.",
    nutritionImage: "/imagens-produtos/omega/tabela-nutricional.png",
    variants: [
      {
        id: "omega",
        name: "Omega",
        image: "/imagens-produtos/omega/omega-120cap.png",
        originalPriceCents: 39990,
        priceCents: 34990,
        featured: true,
      },
      {
        id: "omega-kit-3",
        name: "Omega Kit 3",
        image: "/imagens-produtos/omega/omega-120cap-kit3.png",
        priceCents: 89990,
      },
      {
        id: "omega-kit-6",
        name: "Omega Kit 6",
        image: "/imagens-produtos/omega/omega-120cap-kit6.png",
        originalPriceCents: 209990,
        priceCents: 149990,
      },
    ],
  },
];

export const products: Product[] = makeProducts(productGroups);

export const activeProducts = products
  .filter((product) => product.active)
  .sort((a, b) => a.sortOrder - b.sortOrder);

export const featuredProducts = activeProducts.filter((product) => product.featured);

export function getProductBySlug(slug: string) {
  return activeProducts.find((product) => product.slug === slug);
}

export function getProductDisplayName(product: Product) {
  if (!product.kitUnits) {
    return product.name;
  }

  return product.name.replace(/\bKit\s+\d+\b/i, `Kit c/ ${product.kitUnits} unidades`);
}

export function getProductsByCategory(categoryId: string) {
  if (categoryId === "todos") {
    return activeProducts;
  }

  return activeProducts.filter((product) => product.categoryIds.includes(categoryId));
}

export function getRelatedProducts(product: Product, limit = 3) {
  return activeProducts
    .filter((candidate) => candidate.id !== product.id)
    .filter((candidate) => candidate.categoryIds.some((categoryId) => product.categoryIds.includes(categoryId)))
    .slice(0, limit);
}
