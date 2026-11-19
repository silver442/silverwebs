import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { Portfolio } from "@/components/Portfolio";
import { Services } from "@/components/Services";

function SectionDivider() {
  return <div aria-hidden="true" className="section-divider mx-auto max-w-5xl" />;
}

export default function Home() {
  return (
    <main className="flex-1 bg-abyss">
      <Hero />
      <Services />
      <SectionDivider />
      <Portfolio />
      <SectionDivider />
      <Faq />
      <SectionDivider />
      <Contact />
    </main>
  );
}
