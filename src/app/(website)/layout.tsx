import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8">
        {children}
      </main>
      <Footer />
    </>
  );
}