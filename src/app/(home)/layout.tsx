import Nav from "@/components/Nav";
import MouseFollower from "@/components/MouseFollower";
import Footer from "@/components/Footer";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="home-layout">
      <a href="#main-content" className="skip-nav">
        Skip to main content
      </a>
      <Nav />
      <main id="main-content">
        {children}
      </main>
      <Footer />
      <MouseFollower />
    </div>
  );
}
