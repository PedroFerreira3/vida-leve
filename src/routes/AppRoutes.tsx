import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { AboutPage } from "../pages/AboutPage";
import { HelpPage } from "../pages/HelpPage";
import { HomePage } from "../pages/HomePage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ProductDetailPage } from "../pages/ProductDetailPage";
import { ProductsPage } from "../pages/ProductsPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="produtos" element={<ProductsPage />} />
        <Route path="produtos/:slug" element={<ProductDetailPage />} />
        <Route path="sobre" element={<AboutPage />} />
        <Route path="ajuda" element={<HelpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
