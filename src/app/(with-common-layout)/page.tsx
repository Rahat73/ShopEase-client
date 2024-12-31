import BannerSection from "./_components/banner-section";
import CategoriesSection from "./_components/categories-section";
import FlashSellSection from "./_components/flash-sell-section";
import ProductsSection from "./_components/products-section";
import JustForYou from "./_components/products-section/just-for-you";
import VendorsSection from "./_components/vendors-section";
import ServiceSection from "./_components/service-section";

import { getCurrentUser } from "@/src/services/auth-service";
import ScrollToTopBtn from "@/src/components/ui/scroll-top-btn";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <div>
      <ScrollToTopBtn />
      <div className="mb-20">
        <BannerSection />
      </div>
      <div className="mb-20">
        <FlashSellSection />
      </div>
      <div className="mb-20">
        <CategoriesSection />
      </div>
      <div className="mb-20">
        <VendorsSection />
      </div>
      {user?.role === "CUSTOMER" ? (
        <div className="mb-20">
          <JustForYou />
        </div>
      ) : (
        <div className="mb-20">
          <ProductsSection />
        </div>
      )}
      <div className="mb-20">
        <ServiceSection />
      </div>
    </div>
  );
}
