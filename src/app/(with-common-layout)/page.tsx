import BannerSection from "./_components/banner-section";
import CategoriesSection from "./_components/categories-section";
import FlashSellSection from "./_components/flash-sell-section";
import ProductsSection from "./_components/products-section";

import ScrollToTopBtn from "@/src/components/ui/scroll-top-btn";

export default function Home() {
  return (
    <div>
      <ScrollToTopBtn />
      <div className="mb-10">
        <BannerSection />
      </div>
      <div className="mb-10">
        <FlashSellSection />
      </div>
      <div className="mb-10">
        <CategoriesSection />
      </div>
      <div className="mb-10">
        <ProductsSection />
      </div>
    </div>
  );
}
