import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { Portfolio } from "@/components/Portfolio";
import { Services } from "@/components/Services";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Services />
      <Portfolio />
      <Faq />
      <Contact />
    </main>
  );
}
