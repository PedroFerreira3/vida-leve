import { useEffect } from "react";
import { getAssetPath } from "../utils/assets";

type SeoProps = {
  title: string;
  description: string;
  image?: string;
};

function updateMeta(selector: string, attribute: "content", value: string) {
  const element = document.head.querySelector<HTMLMetaElement>(selector);

  if (element) {
    element.setAttribute(attribute, value);
  }
}

export function Seo({ title, description, image = "/images/banners/banner-homepage.png" }: SeoProps) {
  useEffect(() => {
    const pageTitle = title === "Vida Leve" ? title : `${title} | Vida Leve`;
    const metaImage = getAssetPath(image);

    document.title = pageTitle;
    updateMeta('meta[name="description"]', "content", description);
    updateMeta('meta[property="og:title"]', "content", pageTitle);
    updateMeta('meta[property="og:description"]', "content", description);
    updateMeta('meta[property="og:image"]', "content", metaImage);
  }, [description, image, title]);

  return null;
}
