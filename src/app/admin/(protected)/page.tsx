import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/about/About";
import Services from "@/components/Services";
import Banner from "@/components/Banner";
import Portfolio from "@/components/Portfolio";
import Packs from "@/components/Packs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getHomeData, getProfilePhoto } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [{ services, projects, packs }, photo] = await Promise.all([getHomeData(), getProfilePhoto()]);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About photo={photo} />
        <Services services={services} />
        <Banner />
        <Portfolio projects={projects} />
        <Packs packs={packs} />
        <Contact packs={packs.map((p) => p.name)} />
      </main>
      <Footer />
    </>
  );
}