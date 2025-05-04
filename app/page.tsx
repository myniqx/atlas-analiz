import { BackgroundImage } from "@/components/background-image";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { AboutUs } from "@/components/sections/about-us";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { HowWeWork } from "@/components/sections/how-we-work";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { contactInfo, faq, footer, images } from "@/data/site-content";
export const dynamic = "force-static";

export default function Home() {
  return (
    <>
      <Hero key="hero" />,
      {[
        <AboutUs key="about-us" />,
        <Services key="services" />,
        <HowWeWork key="how-we-work" />,
        <Testimonials key="testimonials" />,
        <Faq key="faq" content={faq} />,
      ].map((component, index) => (
        <div
          key={index}
          className={`p-4 ${index % 2 === 0 ? "bg-gray-50" : "bg-white/70"}`}
        >
          {component}
        </div>
      ))}
    </>
  );
}
