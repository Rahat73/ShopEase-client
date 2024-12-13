import { Navbar } from "@/src/components/shared/navbar/navbar";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="relative container mx-auto max-w-7xl px-6 flex-grow">
        {children}
      </main>
    </div>
  );
}
