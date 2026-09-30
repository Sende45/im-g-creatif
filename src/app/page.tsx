import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Banner from "@/components/Banner";
import Portfolio from "@/components/Portfolio";
import Packs from "@/components/Packs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getHomeData } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { services, projects, packs } = await getHomeData();

  return (
    <>
      <Header />
      <main>
        <Hero />
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