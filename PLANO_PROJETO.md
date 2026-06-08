# Plano do Projeto Vida Leve

## 1. Objetivo

Criar uma página web em **Vite + React + TypeScript + Tailwind CSS** para apresentar a Vida Leve e seus produtos de forma simples, rápida e responsiva.

O projeto terá aparência próxima a um ecommerce, mas sem carrinho, login ou checkout. Quando o usuário se interessar por um produto, ele clicará em um botão de compra e será redirecionado para o WhatsApp com uma mensagem pré-definida relacionada ao produto escolhido.

O site será hospedado na **Hostinger**, então a primeira versão deve funcionar como uma aplicação estática, gerada por `npm run build` e publicada pela pasta `dist`.

## 2. Escopo Inicial

### Telas previstas

- **Homepage**
  - Banner principal.
  - Destaques da marca.
  - Cards de categorias/necessidades.
  - Lista resumida de produtos em destaque.
  - Chamada para WhatsApp.


- **Produtos**
  - Listagem de todos os produtos ativos.
  - Filtros simples por categoria/objetivo, se o design permitir.
  - Busca textual simples, se fizer sentido na implementação.
  - Cards com imagem, nome, descrição curta e CTA para detalhe/WhatsApp.

- **Produto específico**
  - Imagem principal do produto.
  - Nome, descrição, benefícios, modo de uso e informações adicionais.
  - Botão principal de compra via WhatsApp.
  - Produtos relacionados, se houver dados suficientes.

- **Sobre a empresa**
  - História/posicionamento da Vida Leve.
  - Diferenciais.
  - Chamada para contato via WhatsApp.

### Fora do escopo da primeira versão

- Login.
- Carrinho.
- Checkout.
- Área administrativa.
- Integração com gateway de pagamento.
- Controle de estoque em tempo real.
- Backend/API própria.

## 3. Stack Recomendada

- **Vite** para build e desenvolvimento local.
- **React** para componentes e páginas.
- **TypeScript** para tipagem dos produtos, rotas e componentes.
- **Tailwind CSS** para estilização rápida e consistente.
- **React Router** para navegação entre páginas.
- **Lucide React** para ícones, caso sejam necessários.

Dependências prováveis:

```bash
npm create vite@latest . -- --template react-ts
npm install
npm install react-router-dom lucide-react
npm install -D tailwindcss @tailwindcss/vite
```

## 4. Estrutura de Pastas Sugerida

```text
vida-leve/
  public/
    images/
      banners/
      cards/
      products/
  src/
    assets/
    components/
      layout/
      product/
      ui/
    data/
      products.ts
      categories.ts
      company.ts
    pages/
      HomePage.tsx
      ProductsPage.tsx
      ProductDetailPage.tsx
      AboutPage.tsx
    routes/
      AppRoutes.tsx
    utils/
      whatsapp.ts
      format.ts
    App.tsx
    main.tsx
    index.css
  .env.example
  package.json
  vite.config.ts
```

## 5. Gestão Simples de Produtos

Como a primeira versão não terá área administrativa, a forma mais simples e segura de adicionar, ocultar ou remover produtos será por arquivo de dados versionado no projeto.

Arquivo recomendado:

```text
src/data/products.ts
```

Modelo sugerido:

```ts
export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  categoryIds: string[];
  image: string;
  benefits: string[];
  usage?: string;
  whatsappMessage: string;
  featured?: boolean;
  active: boolean;
  sortOrder?: number;
};
```

Exemplo:

```ts
export const products: Product[] = [
  {
    id: "vitamina-d3",
    slug: "vitamina-d3",
    name: "Vitamina D3",
    shortDescription: "Suporte diário para saúde e bem-estar.",
    description: "Produto pensado para auxiliar a rotina de suplementação.",
    categoryIds: ["imunidade"],
    image: "/images/products/vitamina-d3.png",
    benefits: ["Auxilia a rotina de bem-estar", "Fácil de incluir no dia a dia"],
    usage: "Conforme orientação profissional.",
    whatsappMessage: "Olá, tenho interesse na Vitamina D3 da Vida Leve.",
    featured: true,
    active: true,
    sortOrder: 10
  }
];
```

Regras:

- Para **adicionar um produto**, inserir um novo item no array.
- Para **ocultar um produto**, alterar `active` para `false`.
- Para **remover definitivamente**, excluir o item do array e remover a imagem correspondente se ela não for mais usada.
- A listagem pública deve exibir apenas produtos com `active: true`.
- Produtos em destaque na homepage devem usar `featured: true`.
- A ordem pode ser controlada por `sortOrder`.

Essa abordagem é compatível com a Hostinger porque não exige banco de dados nem backend.

## 6. WhatsApp

O número principal deve ficar em variável de ambiente para facilitar ajustes sem mexer na lógica do site.

Arquivo:

```text
.env.example
```

Conteúdo sugerido:

```env
VITE_WHATSAPP_NUMBER=5511999999999
```

Função utilitária:

```text
src/utils/whatsapp.ts
```

Responsabilidades:

- Receber uma mensagem.
- Codificar o texto corretamente.
- Gerar link no formato `https://wa.me/{numero}?text={mensagem}`.

Cuidados:

- Mensagens devem ser específicas por produto.
- O link deve abrir em nova aba.
- O botão deve ter texto claro, como "Comprar pelo WhatsApp".

## 7. Rotas

Rotas iniciais:

```text
/                 Homepage
/produtos         Todos os produtos
/produtos/:slug   Produto específico
/sobre            Sobre a empresa
```

Tratamentos necessários:

- Se o produto não existir ou estiver inativo, mostrar uma página simples de não encontrado.
- Usar slugs legíveis e estáveis.
- Manter navegação clara entre homepage, produtos e sobre.

## 8. Assets e Design

Assets já existentes:

```text
Template-figma/
  Homepage.pdf
  Imagens/
    Vida-leve-banner-homepage.png
    produtos/
    cards/
    banners-categorias/
```

Plano para uso das imagens:

- Copiar as imagens finais para `public/images`.
- Padronizar nomes em lowercase sem acentos, por exemplo `vitamina-d3.png`.
- Usar imagens de produtos em cards e páginas de detalhe.
- Usar banners/categorias onde o design pedir.
- Manter proporções fixas nos cards para evitar quebra visual.

Quando o link do Figma estiver disponível, usar o design como referência para:

- Cores.
- Tipografia.
- Espaçamentos.
- Hierarquia visual.
- Estados responsivos.

## 9. Componentes Principais

Componentes recomendados:

- `Header`
- `Footer`
- `MobileMenu`
- `ProductCard`
- `ProductGrid`
- `ProductDetail`
- `CategoryCard`
- `HeroBanner`
- `WhatsAppButton`
- `SectionTitle`
- `EmptyState`
- `NotFound`

Princípios:

- Componentes pequenos e reutilizáveis.
- Dados de produto separados da interface.
- Botão de WhatsApp centralizado em uma função utilitária.
- Layout responsivo desde o início.

## 10. Responsividade

Breakpoints prioritários:

- Mobile: 360px a 480px.
- Tablet: 768px.
- Desktop: 1024px+.
- Desktop largo: 1280px+.

Cuidados:

- Cards de produto não devem quebrar texto.
- Imagens devem manter proporção consistente.
- Menu mobile deve ser simples e acessível.
- Botões de compra devem ficar fáceis de tocar no mobile.

## 11. SEO e Compartilhamento

Mesmo sendo um site simples, a primeira versão deve incluir:

- `title` e `description` adequados.
- Estrutura semântica com `main`, `section`, `nav` e headings corretos.
- URLs amigáveis para produtos.
- Imagens com `alt`.
- `robots.txt`.
- `sitemap.xml`, se a lista de páginas/produtos estiver estável.
- Metatags Open Graph básicas.

## 12. Performance

Como o site será hospedado na Hostinger e terá muitas imagens, priorizar:

- Imagens otimizadas.
- Uso de `loading="lazy"` nas imagens fora da primeira dobra.
- Evitar bibliotecas pesadas.
- Build estático com Vite.
- CSS via Tailwind com purge/build padrão.
- Componentes sem renderizações complexas desnecessárias.

## 13. Deploy na Hostinger

Fluxo recomendado:

1. Rodar build local:

```bash
npm run build
```

2. Conferir prévia:

```bash
npm run preview
```

3. Enviar o conteúdo da pasta:

```text
dist/
```

para a pasta pública da Hostinger, normalmente:

```text
public_html/
```

4. Configurar fallback para SPA.

Arquivo recomendado na pasta publicada:

```text
.htaccess
```

Conteúdo:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

Esse fallback é necessário para que rotas como `/produtos/vitamina-d3` funcionem quando o usuário acessa diretamente a URL.

## 14. Etapas de Implementação

### Fase 1: Preparação

- Inicializar projeto Vite com React e TypeScript.
- Instalar Tailwind CSS.
- Instalar React Router.
- Organizar estrutura de pastas.
- Criar `.env.example`.
- Copiar e padronizar imagens para `public/images`.

### Fase 2: Base visual

- Configurar tema base do Tailwind.
- Criar layout principal com header e footer.
- Definir estilos globais.
- Criar componentes base de botão, seção e grid.

### Fase 3: Dados

- Criar `categories.ts`.
- Criar `products.ts`.
- Cadastrar produtos iniciais com imagens existentes.
- Criar utilitário de WhatsApp.
- Garantir filtro por produtos ativos.

### Fase 4: Páginas

- Implementar homepage.
- Implementar listagem de produtos.
- Implementar detalhe do produto por `slug`.
- Implementar página sobre.
- Implementar página de erro/não encontrado.

### Fase 5: Ajustes visuais

- Comparar implementação com o design do Figma/PDF.
- Ajustar espaçamentos, cores, tipografia e responsividade.
- Validar imagens em mobile e desktop.
- Conferir textos e CTAs.

### Fase 6: SEO e deploy

- Configurar metatags básicas.
- Criar `robots.txt`.
- Criar `.htaccess` para Hostinger.
- Rodar build.
- Testar `npm run preview`.
- Publicar `dist` na Hostinger.

## 15. Checklist de Qualidade

- Todas as rotas principais funcionam.
- Produtos inativos não aparecem no site.
- Botões de WhatsApp geram mensagens corretas.
- Imagens carregam corretamente.
- Layout está bom em mobile e desktop.
- Acesso direto a `/produtos/:slug` funciona após deploy.
- Build roda sem erros.
- Não existem textos quebrados ou sobrepostos.
- Links de navegação estão corretos.
- Página de produto inexistente tem tratamento adequado.

## 16. Próxima Ação Recomendada

Começar pela inicialização do projeto Vite na raiz do repositório, configurar Tailwind e React Router, depois importar as imagens existentes para `public/images` com nomes padronizados. Em seguida, criar os arquivos `products.ts` e `categories.ts`, pois eles vão guiar a implementação das páginas.
