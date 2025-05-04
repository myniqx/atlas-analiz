import { ColoredHeader } from "@/components/colored-header";
import { Button } from "@/components/ui/button";
import { contactInfo, hero } from "@/data/site-content";
import { MessageCircleCode, MessageCircleQuestion } from "lucide-react";
import Link from "next/link";

export function Hero() {
  const content = hero;
  const whatsapp = contactInfo.whatsapp;

  return (
    <section
      id="hero"
      className="min-h-screen pt-20 relative flex items-center overflow-hidden text-shadow-xl"
    >
      {/* <YoyoVideo heroVideo={heroVideo} />

      {/* Dark overlay 
      <div className="absolute inset-0 bg-black/20 z-10"></div>*/}

      {/* Interactive molecular background */}
      {/*  <MolecularBackground />*/}

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-20">
        <div
          className="max-w-2xl"
          style={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)",
          }}
        >
          <ColoredHeader
            h={1}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            {content.title}
          </ColoredHeader>
          <p className="text-lg text-white/90 mb-8">{content.description}</p>
          <div className="flex flex-row gap-6">
            <Link href="/fiyat-teklifi-alin">
              <Button className="bg-white text-black hover:bg-gray-200">
                <MessageCircleCode /> {content.ctaText}
              </Button>
            </Link>

            <Link
              href={`https://wa.me/${whatsapp.number}?text=${whatsapp.defaultMessage}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-white text-black hover:bg-gray-200">
                <MessageCircleQuestion /> {content.whatsappText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
