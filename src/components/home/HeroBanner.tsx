import { getAssetPath } from "../../utils/assets";

export function HeroBanner() {
  return (
    <section className="bg-leaf-50">
      <div className="w-full">
        <img
          className="h-auto w-full"
          src={getAssetPath("/images/banners/banner-homepage.png")}
          alt="Vida Leve, bem-estar natural para o seu dia a dia"
        />
      </div>
    </section>
  );
}
