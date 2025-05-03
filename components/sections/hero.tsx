import { Button } from "@/components/ui/button"
import { ColoredHeader } from "@/components/colored-header"
import { MolecularBackground } from "@/components/molecular-background"
import { YoyoVideo } from "../yoyo-video"

interface HeroProps {
  content: {
    title: string
    description: string
    ctaText: string
  }
  heroImage: string
  heroVideo: string
}

export function Hero({ content, heroImage, heroVideo }: HeroProps) {
  return (
    <section id="hero" className="min-h-screen pt-20 relative flex items-center overflow-hidden bg-white">
      <YoyoVideo heroVideo={heroVideo} />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20 z-10"></div>

      {/* Interactive molecular background */}
      <MolecularBackground />

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-20">
        <div className="max-w-2xl">
          <ColoredHeader h={1} className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {content.title}
          </ColoredHeader>
          <p className="text-lg text-white/90 mb-8">{content.description}</p>
          <Button className="bg-white text-black hover:bg-gray-200">{content.ctaText}</Button>
        </div>
      </div>
    </section>
  )
}
