import { Navbar } from "@/src/components/shared/navbar/navbar";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar />
      <main className="relative">{children}</main>
    </div>
  );
}
