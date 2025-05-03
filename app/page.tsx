import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/sections/hero"
import { AboutUs } from "@/components/sections/about-us"
import { Services } from "@/components/sections/services"
import { HowWeWork } from "@/components/sections/how-we-work"
import { Testimonials } from "@/components/sections/testimonials"
import { Faq } from "@/components/sections/faq"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/footer"
import { BackgroundImage } from "@/components/background-image"
import {
  images,
  hero,
  aboutUs,
  services,
  howWeWork,
  testimonials,
  faq,
  contact,
  footer,
  contactInfo,
  videos,
} from "@/data/site-content"

export default function Home() {
  return (
    <main className="relative">
      <BackgroundImage src={images.background} />
      <Navbar />
      <Hero content={hero} heroImage={images.hero} heroVideo={videos.video} />
      <AboutUs content={aboutUs} aboutImage={images.aboutUs} />
      <Services content={services} />
      <HowWeWork content={howWeWork} />
      <Testimonials content={testimonials} />
      <Faq content={faq} />
      <Contact content={contact} contactInfo={contactInfo} />
      <Footer content={footer} contactInfo={contactInfo} />
    </main>
  )
}
