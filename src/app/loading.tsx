export default function Loading() {
  return (
    <div className="h-screen bg-black/10 fixed inset-0 z-[999] backdrop-blur-md flex justify-center items-center">
      <span className="text-3xl italic font-extrabold animate-pulse">
        ShopEase
      </span>
    </div>
  );
}
