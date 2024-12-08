import BannerSection from "./_components/banner-section";
import FlashSellSection from "./_components/flash-sell-section";

export default function Home() {
  return (
    <div>
      <div className="mb-4">
        <BannerSection />
      </div>
      <div className="mb-4">
        <FlashSellSection />
      </div>
    </div>
  );
}
