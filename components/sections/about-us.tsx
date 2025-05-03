import { ImageFallback } from "@/components/image-fallback"
import { ColoredHeader } from "@/components/colored-header"
import { Search, Shield, Users } from "lucide-react"

interface AboutUsProps {
  content: {
    title: string
    description: string
    features: {
      title: string
      description: string
    }[]
  }
  aboutImage: string
}

export function AboutUs({ content, aboutImage }: AboutUsProps) {
  // Array of icons to use for features
  const icons = [
    <Search key={0} className="h-6 w-6 text-black flex-shrink-0" />,
    <Shield key={1} className="h-6 w-6 text-black flex-shrink-0" />,
    <Users key={2} className="h-6 w-6 text-black flex-shrink-0" />,
  ]

  return (
    <section id="about-us" className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="relative w-full aspect-[4/3]">
              <ImageFallback
                src={aboutImage || "/placeholder.svg"}
                alt="Office Corridor"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <ColoredHeader h={2} className="text-3xl font-bold mb-6">
              {content.title}
            </ColoredHeader>
            <p className="text-gray-700 mb-8">{content.description}</p>

            <div className="space-y-6">
              {content.features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  {icons[index % icons.length]}
                  <div>
                    <ColoredHeader h={3} className="font-medium">
                      {feature.title}
                    </ColoredHeader>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
