import { Navbar } from "@/src/components/shared/navbar/navbar";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar />
      <main className="relative container mx-auto flex-grow">{children}</main>
    </div>
  );
}
