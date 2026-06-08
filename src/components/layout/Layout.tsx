import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ScrollToTop } from "./ScrollToTop";

export function Layout() {
  return (
    <div className="min-h-screen bg-[#fffdf8] text-leaf-900">
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
